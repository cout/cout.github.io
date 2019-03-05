---
title: A faster stack
wordpress_id: 6
wordpress_url: urn:uuid:7a51fb37-bbad-4abd-98c4-aec3e6621b87
date: '2008-10-15 06:35:00 -0400'
date_gmt: '2008-10-15 11:35:00 -0400'
categories:
- ludicrous
- ruby
tags: []
comments:
- id: 3
  author: roger
  author_email: ''
  author_url: ''
  date: '2008-10-24 03:39:24 -0400'
  date_gmt: '2008-10-24 08:39:24 -0400'
  content: Wow looks nice. My question is&hellip;how to decide between llvm, libjit,
    lightning, and re-tooling psyco&ndash;which would be fastest? How to decide? I&rsquo;ll
    admit libjit looks simplest, and has a reasonably friendly license now&ndash;my
    question is basically which is fastest/best? Thanks! -=R
- id: 4
  author: roger
  author_email: ''
  author_url: ''
  date: '2009-01-02 14:06:32 -0500'
  date_gmt: '2009-01-02 19:06:32 -0500'
  content: Can&rsquo;t you just use your own stack though?
- id: 5
  author: roger
  author_email: ''
  author_url: ''
  date: '2009-01-02 14:06:46 -0500'
  date_gmt: '2009-01-02 19:06:46 -0500'
  content: my latest idea is to convert procs to methods a la http://betterlogic.com/roger/?p=706
    :)
---
I&#8217;m back in the country now and starting to work on Ludicrous again.  A number of YARV instructions have now been implemented and very simple methods can be executed.

Stack manipulation is tricky.  As mentioned before, the first pass of JIT-compiling YARV bytecode actually allocated a Ruby array for every method invocation, calling rb_ary_push() and rb_ary_pop() to manipulate the stack.  As you can imagine, this is quite slow.

The next pass tried to actually use the real YARV stack.  This meant directly accessing Ruby&#8217;s thread structure to get a pointer to the stack.  It was faster than using an array, but there were too many edge cases where the stack pointer wasn&#8217;t being manipulated properly.

The current solution uses a static stack instead of a dynamic stack, pushing and popping the stack at compile time rather than at run time.  This means that stack operations can actually be optimized into register operations.  It obviously doesn&#8217;t work with all possible YARV bytecode, but I don&#8217;t know of any cases where Ruby generates bytecode that needs a run-time stack (e.g. pushing a value onto the stack in a loop).  In any case there are some rudimentary checks for such code, e.g. that the stack size is the same at the beginning and end of a detected loop.

The next challenge to tackle is to implement rescue and ensure.  I&#8217;ve already got PUSH_TAG, POP_TAG, and EXEC_TAG implemented in ruby-jit (impossible on 1.8, since the current tag is private in eval.c), and the rest should come relatively easily.

