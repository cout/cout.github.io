---
title: Easy SAE to Metric socket size conversion
---

I've discovered a neat shortcut for quickly converting between metric and SAE socket sizes in my head.  Programmers should find this easy, because it relies on powers of two.

Why is this useful?  Sometimes it useful to use a socket size that's close rather than an exact match.  Consider, for example: a battery terminal is usually a 1&frasl;2" socket, but what if you're on the side of the road and you only have metric sockets on hand?  Grab a 13mm and it will be a close enough fit.  Or what if your 13mm bolt head is rusted?  Chances are it's not a 13mm head any more, and a 1&frasl;2" socket will be a tighter fit.

Usually conversion is done by approximating 25.4mm per inch, but that's messy math to do in your head.  But there's a much easier way, if you know your powers of two: there are _approximately_ 256 millimeters in 10 inches.

Consider the 1&frasl;2" battery terminal.  If there are 256mm/10in, then there are 128mm/in, or 12.8mm per inch.  So a 13mm socket will be ~.2mm larger than the bolt head.

I find going the other way a little trickier, but not too bad.  For the 13mm socket, I remember that 1mm is 10*1/256in, so 13mm is 130&frasl;256".  The closest power of two to 130 is 128, and 128&frasl;256" is 1&frasl;2".  So a 13mm socket is 2&frasl;256" bigger than a 1&frasl;2".

Here's a full conversion table for common socket types:

| SAE         | Metric |     | Metric | SAE                       |
| ----------- | ------ | --- | ------ | ------------------------- |
| 1&frasl;8   | 3.2mm  |     | 8mm    | 5&frasl;16                |
| 3&frasl;16  | 4.8mm  |     | 9mm    | 11&frasl;32 - 3&frasl;8   |
| 1&frasl;4   | 6.4mm  |     | 10mm   | 3&frasl;8 - 13&frasl;32   |
| 5&frasl;16  | 8mm    |     | 11mm   | 13&frasl;32 - 7&frasl;16  |
| 3&frasl;8   | 9.6mm  |     | 12mm   | 15&frasl;32               |
| 7&frasl;16  | 11.2mm |     | 13mm   | 1&frasl;2 - 17&frasl;32   |
| 1&frasl;2   | 12.8mm |     | 14mm   | 17&frasl;32 - 9&frasl;16  |
| 9&frasl;16  | 14.4mm |     | 15mm   | 9&frasl;16 - 19&frasl;32  |
| 5&frasl;8   | 16mm   |     | 16mm   | 5&frasl;8                 |
| 11&frasl;16 | 17.6mm |     | 17mm   | 21&frasl;32 - 11&frasl;16 |
| 3&frasl;4   | 19.2mm |     | 18mm   | 11&frasl;16 - 23&frasl;32 |
| 13&frasl;16 | 20.8mm |     | 19mm   | 23&frasl;32 - 3&frasl;4   |
| 7&frasl;8   | 22.4mm |     | 21mm   | 13&frasl;16 - 27&frasl;32 |
| 15&frasl;16 | 24mm   |     | 23mm   | 7&frasl;8 - 15&frasl;16   |
| 1           | 25.6mm |     | 25mm   | 15&frasl;16 - 1           |
