---
title: Ludicrous on YARV
wordpress_id: 7
wordpress_url: urn:uuid:aa8f2b33-cda8-4b31-950b-f6c29593a849
date: '2008-05-30 18:01:00 -0400'
date_gmt: '2008-05-30 23:01:00 -0400'
categories:
- ludicrous
- ruby
tags: []
---
Last night I was tinkering with Ludicrous and I decided to see how hard it would be to get it to run on YARV.  After modifying the extension to compile against ruby 1.9, it turned out to be only a handful of lines of code to compile a simple method in YARV:

```ruby
class Foo
  def foo
    return 42
  end

  go_plaid
end

puts Foo.new.foo #=> 42
```

The primary difference between methods on 1.8 and methods on YARV is that methods in 1.8 are represented by SCOPE nodes that hold a reference to that method&#8217;s AST, while YARV methods are represented by a METHOD node that holds a reference to that method&#8217;s instruction sequence.  The code for compiling METHOD nodes and SCOPE nodes is remarkably similar, the primary difference lying in the code that compiles the instruction sequence:

```ruby
class VM
  class Instruction
    class PUTOBJECT
      def ludicrous_compile(function, env)
        value = function.const(JIT::Type::OBJECT, self.operands[0])
        env.push(value)
      end
    end

    class LEAVE
      def ludicrous_compile(function, env)
        retval = env.pop
        function.insn_return(retval)
      end
    end
  end
end
```

Currently the stack is a simple Ruby array, which is probably going to run slower than YARV bytecode, but it shouldn&#8217;t be difficult to use a more highly optimized stack (perhaps the system stack).

