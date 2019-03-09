---
title: Easy SAE to Metric socket size conversion
---

I've discovered a neat shortcut for quickly converting between metric and SAE socket sizes in my head.  Programmers should find this easy, because it relies on powers of two.

Why is this useful?  Sometimes it useful to use a socket size that's close rather than an exact match.  Consider, for example: a battery terminal is usually a 1/2 inch socket, but what if you're on the side of the road and you only have metric sockets on hand?  Grab a 13mm and it will be a close enough fit.  Or what if your 13mm bolt head is rusted?  Chances are it's not a 13mm head any more, and a 1/2 socket will be a tighter fit.

Usually conversion is done by approximating 25.4mm per inch, but that's messy math to do in your head.  But there's a much easier way, if you know your powers of two: there are _approximately_ 256 millimeters in 10 inches.

Consider the 1/2 inch battery terminal.  If there are 256mm/10in, then there are 128mm/in, or 12.8mm per inch.  So a 13mm socket will be ~.2mm larger than the bolt head.

I find going the other way a little trickier, but not too bad.  For the 13mm socket, I remember that 1mm is 10*1/256in, so 13mm is 130/256in.  The closest power of two to 130 is 128, and 128/256in is 1/2in.  So a 13mm socket is 2/256in bigger than a 1/2in.

Here's a full conversion table for common socket types:

|SAE  |Metric||Metric|SAE|
|-----|------||------|---|
|1/8  |3.2mm |||
|3/16 |4.8mm |||
|1/4  |6.4mm |||
|5/16 |8mm   |||
|3/8  |9.6mm |||
|7/16 |11.2mm|||
|1/2  |12.8mm|||
|9/16 |14.4mm|||
|5/8  |16mm  |||
|11/16|17.6mm|||
|3/4  |19.2mm|||
|13/16|20.8mm|||
|7/8  |22.4mm|||
|15/16|24mm  |||
|1in  |25.6mm|||
