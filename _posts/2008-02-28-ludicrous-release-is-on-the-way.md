---
title: Ludicrous release is on the way
wordpress_id: 8
wordpress_url: urn:uuid:a358e269-cc00-4f48-9bb1-9d8dd2b9838c
date: '2008-02-28 23:31:00 -0500'
date_gmt: '2008-02-29 04:31:00 -0500'
categories:
- ludicrous
- ruby
tags: []
comments:
- id: 2
  author: roger
  author_email: ''
  author_url: ''
  date: '2008-12-23 12:34:45 -0500'
  date_gmt: '2008-12-23 17:34:45 -0500'
  content: gem available?
- id: 47
  author: Risi
  author_email: hcpy1lbvw@yahoo.com
  author_url: http://www.facebook.com/profile.php?id=100003458722742
  date: '2014-08-18 13:49:00 -0400'
  date_gmt: '2014-08-18 18:49:00 -0400'
  content: Thank you Brian, I am new to ClickBank so I am looking from which way I
    sholud be starting my business and which products to target. I tried to download
    your spreadsheet data but it's in .xlsx extension? Does that work under Office
    2007? I've got Office 2003, will check it out later. At the moment, I am trying
    to collect as much info I can regarding Affiliate marketing so I can earn some
    good revenue from it.
---
A number of months ago I began working on a [just-in-time compiler](http://rubystuff.org/ludicrous) for Ruby 1.8.  What started as an experiment is actually now a reality &#8211; Ludicrous is now an executable that can run ruby scripts just like MRI!

Based on some ideas Charles Nutter mentioned on his blog regarding JRuby, Ludicrous works by installing stubs for every method in a given class that jit-compile the methods when they are called.  If a method can&#8217;t be jit-compiled, the stub is removed and Ludicrous reverts back to the interpreter version of the method.

Ludicrous-compiled methods and MRI-interpreted methods can thus live safely together inside the same interpreter.  This has allowed Ludicrous to grow incrementally, since it was able to run all of Test::Unit from day one.

Benchmarks show it to be on par or better than YARV:

```
cout@bean:~/ludicrous/sample$ ruby simple_benchmark.rb
                           user     system      total        real
Ackermann function     0.600000   0.020000   0.620000 (  0.645012)
Array access           3.590000   0.010000   3.600000 (  3.648332)
Fibonacci numbers      1.030000   0.020000   1.050000 (  1.089943)
GCD (iterative)        2.440000   0.110000   2.550000 (  2.593122)
GCD (recursive)        0.820000   0.040000   0.860000 (  0.889390)
Hash access I          1.400000   0.050000   1.450000 (  1.452047)
Hash access II         2.990000   0.050000   3.040000 (  3.152132)
Lists                  0.880000   0.000000   0.880000 (  0.912412)
Nested loop            4.700000   0.010000   4.710000 (  5.104556)
Sieve of Eratosthenes  5.660000   0.040000   5.700000 (  6.328717)
Word Frequency         0.690000   0.020000   0.710000 (  0.779878)
cout@bean:~/ludicrous/sample$ ruby1.9 simple_benchmark.rb
                           user     system      total        real
Ackermann function     0.640000   0.000000   0.640000 (  0.691521)
Array access           3.280000   0.000000   3.280000 (  3.394318)
Fibonacci numbers      0.290000   0.000000   0.290000 (  0.528554)
GCD (iterative)        0.620000   0.010000   0.630000 (  0.660089)
GCD (recursive)        0.210000   0.000000   0.210000 (  0.238961)
Hash access I          2.320000   0.040000   2.360000 (  2.416732)
Hash access II         4.180000   0.010000   4.190000 (  4.312941)
Lists                  0.560000   0.000000   0.560000 (  0.558828)
Nested loop            2.580000   0.000000   2.580000 (  2.660648)
Sieve of Eratosthenes  5.590000   0.050000   5.640000 (  5.751475)
Word Frequency         1.170000   0.000000   1.170000 (  1.200573)
cout@bean:~/ludicrous/sample$ ruby -I../lib -I../ext simple_benchmark.rb --jit --skip=sieve
Compiling nested_loop
Compiling ack
Compiling gcd_recur
Compiling hash_access_II
Compiling array_access
Compiling lists
Compiling word_frequency
Compiling fib
Compiling hash_access_I
Compiling gcd_iter
                        user     system      total        real
Ackermann function  0.200000   0.000000   0.200000 (  0.210097)
Array access        1.860000   0.030000   1.890000 (  1.919088)
Fibonacci numbers   0.210000   0.000000   0.210000 (  0.212081)
GCD (iterative)     0.060000   0.000000   0.060000 (  0.059266)
GCD (recursive)     0.140000   0.000000   0.140000 (  0.142387)
Hash access I       1.260000   0.000000   1.260000 (  1.321544)
Hash access II      1.700000   0.010000   1.710000 (  1.765920)
Lists               0.870000   0.000000   0.870000 (  0.868467)
Nested loop         2.900000   0.010000   2.910000 (  2.995473)
Word Frequency      0.650000   0.000000   0.650000 (  0.646185)
```

Ludicrous performs clearly better in most of the benchmarks here.  Most impressive is the iterative GCD benchmark; Ludicrous executes the function 11 times faster than YARV and almost 44 times faster than 1.8!  The tests where it doesn&#8217;t do as well are ones that make heavy use of blocks, because Ludicrous can&#8217;t do block inlining like YARV does.

To be fair, Ludicrous doesn&#8217;t implement a lot of features that would slow it down, such as event callbacks (used for profiling), bignums, and checking for redefinition of primitive arithmetic methods (such as mathn.rb does).  It does try to avoid certain optimizations that YARV does not do, to keep the performance comparisons sensible.

Ludicrous&#8217;s performance is not at the expense of correctness, either; it passes all of the bfts tests and most of the tests that come with Ruby 1.8 (there are some pesky tests in particular that it is impossible for Ludicrous to pass without patching the interpreter).

Expect a gem to be released within the next few weeks as I iron out a few more kinks.

