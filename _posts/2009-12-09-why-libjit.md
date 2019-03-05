---
title: Why libjit?
wordpress_id: 5
wordpress_url: urn:uuid:eff11f7e-1a4a-4e59-9461-0c60005c0474
date: '2009-12-09 07:40:00 -0500'
date_gmt: '2009-12-09 12:40:00 -0500'
categories:
- ludicrous
- ruby
- jit
- libjit
- llvm
- compiler
tags: []
---
One question I&#8217;ve been asked quite a bit over the last two years is why I decided to use libjit for Ludcirous.  Evan Phoenix had considered it for Rubinius a long time ago but rejected it partly because of the license.  When I started Ludicrous, I decided to use libjit in _spite_ of the GPL license (the license has since been changed to LGPL).

First of all, why is the GPL (v2) license problematic for a JIT compiler?  Any JIT compiler using libjit must link with it, and any program run under this JIT compiler therefore ends up dynamically linking with libjit in the end.  This puts the user in a precarious grey area in terms of the GPL (particularly since at the time the code had to be modified to run under Ludicrous).  As I said, libjit is now under the LGPL (GPL plus an exception would have been sufficient as well), so this is no longer an issue.

Yet I picked libjit in spite of this because I felt it was the best tool for the job at the time.  I evaluated a number of other alternatives:

* **GNU Lightning** - much of the library is implemented with macros, making it difficult to use programmatically.  It would be virtually impossible to wrap this library as a ruby module without some heavy hacking.  It also requires the user to do his own register allocation, which isn&#8217;t something I was interested in figuring out.
* **DynASM** - this is the &#8220;dynamic assembler&#8221; used by LuaJIT.  It&#8217;s supposed to be very fast and lightweight.  It&#8217;s basically a lua script that preprocesses your C source code, looking for platform-independant asm and replacing it with C calls to generate that asm at runtime.  I didn&#8217;t look too closely at this because of its dependency on lua. 
* **LLVM** - somewhat heavyweight, much more than a JIT, but interesting because of its power.  However, at the time I could not make heads or tails of their documentation, much less build a simple prototype that adds two numbers.  I get the impression this has been addressed now (judging from the number of compilers using LLVM these days), but I&#8217;ve never looked back at LLVM.
* **NekoVM** - had a working JIT for about two years before I started Ludicrous.  Looks lightweight.  I wasn&#8217;t interested, though, in compiling to a different VM; I wanted Ludicrous-compiled code to run under MRI (giving me full access to all the C extensions that are available).
* **Nanojit** - I believe this was available at the time, but was too new to interest me.
* **Libjit** - small, lightweight, but most importantly, well documented.  It&#8217;s a register-based VM that emits code as functions are called, making it easy to wrap as a ruby extension.  It does physical register allocation for me; I just pretend I have an infinite number of registers and let libjit do the work.  I read through the tutorials in less than half an hour and had a prototype of ruby-libjit running the same afternoon.  After that, as they say, it&#8217;s all history.
