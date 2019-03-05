---
title: Converting stack-to-register
wordpress_id: 14
wordpress_url: http://nonstdout.rubystuff.org/?p=14
date: '2009-12-20 10:49:54 -0500'
date_gmt: '2009-12-20 15:49:54 -0500'
categories:
- Uncategorized
tags:
- ludicrous
- jit
- libjit
- ruby
- yarv
- stack
- register
comments:
- id: 14
  author: Icke
  author_email: chabawiki@gmail.com
  author_url: ''
  date: '2010-03-25 13:52:18 -0400'
  date_gmt: '2010-03-25 18:52:18 -0400'
  content: Hi, I'm interested on using this code http://rubystuff.org/ruby-irc/irc.rb.html
    for a project where I need a irc bot. My project will be open source (GPL). Can
    I use your snippet and license it under GPL? It'll be great :)
- id: 15
  author: cout
  author_email: curlypaul924@gmail.com
  author_url: ''
  date: '2010-11-05 18:39:20 -0400'
  date_gmt: '2010-11-05 23:39:20 -0400'
  content: "Yes, feel free to use that code (irc.rb) however you like.  Credit me
    or don't, depending on what's convenient for you.  License the resulting code
    however is convenient as well.  For Ruby code, I am personally a fan of either
    Ruby's double-license (GPL+Artistic) or the Jim Weirich license (essentially a
    2-line BSD-style license, convenient due to its length).  But you should pick
    the license that works best for you.\r\n\r\nSimilar caveats apply as to Java (tm);
    if you use irc.rb in any software systems which incorporate a nuclear fission-powered
    device, you do so at your own risk.  Please do not hold me responsible for any
    excess limbs or digits or other mutations in your offspring.  You have been warned."
- id: 52
  author: GeorgePen
  author_email: ursulafilatova@mail.ru
  author_url: http://Yourwebsite
  date: '2015-12-07 05:12:40 -0500'
  date_gmt: '2015-12-07 10:12:40 -0500'
  content: "="
- id: 53
  author: cheap albion gold
  author_email: ugyjkgct@gmail.com
  author_url: http://cheapalbiongold
  date: '2016-06-24 20:47:56 -0400'
  date_gmt: '2016-06-25 01:47:56 -0400'
  content: "Good !|Cool! I love your this bolg.\r\ncheap albion gold http://albion-online.bloggersdelight.dk/relationship-of-laborer-and-housing-system-in-albion-online/"
---
Like many other virtual machines, the YARV machine is stack-based.&nbsp; Because most modern CPUs are register-based, to compile YARV bytecode to efficient native code means the stack operations need to be converted to register operations.

Ludicrous does this by walking the instruction sequence and pushing and popping value objects onto and off of a stack at compile-time.&nbsp; This completely eliminates the YARV stack (the machine stack is still used by libjit as necessary), but has some limitations: all control paths must produce an identical stack.&nbsp; A conditional that produces a different size stack in one path than in another will break this scheme.

Ludicrous does its best to detect this situation if it ever comes up and will refuse to compile bytecode that tries to do evil things like this.&nbsp; However, I recently discovered a case that wasn't covered:

```ruby
irb(main):001:0> require 'internal/method'
=> true
irb(main):002:0> def foo; return true ? 1 : 2; end
=> nil
irb(main):003:0> puts method(:foo).body.body.disasm
== disasm: <RubyVM::InstructionSequence:foo@(irb)>======================
0000 trace&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 8&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (&nbsp;&nbsp; 8)
0002 putobject&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1
0004 jump&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 8
0006 putobject&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2
0008 trace&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 16
0010 leave
=> nil
```

Here YARV has made an optimization -- true is always true, so a conditional branch is unnecessary.  However YARV wasn't smart enough to remove the dead code that pushes '2' onto the stack.  When Ludicrous compiles this, it gets confused because at the leave instruction the stack contains [ 1, 2 ] (remember that Ludicrous evaluates the stack at compile time).

I suspect this is a bug in the YARV optimizer, but it illustrates the case -- converting code written for a stack machine to run on a register machine is no trivial task.  I'm not sure yet how to handle this case.  All control paths (there is only one) do produce the same stack, but Ludicrous does not have a mechanism to detect that the second pushobject instruction is dead code and does not modify the stack.

Perhaps the best solution is to raise an exception and fall back on the interpreter for functions that do this.

