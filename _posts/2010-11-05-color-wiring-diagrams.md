---
layout: post
status: publish
published: true
title: Color wiring diagrams
author:
  display_name: cout
  login: cout
  email: curlypaul924@gmail.com
  url: ''
author_login: cout
author_email: curlypaul924@gmail.com
wordpress_id: 34
wordpress_url: http://nonstandard-output.rubystuff.org/?p=34
date: '2010-11-05 21:09:27 -0400'
date_gmt: '2010-11-06 02:09:27 -0400'
categories:
- Uncategorized
tags:
- wiring diagram
- postscript
comments: []
---
Whenever I look at a car wiring diagram, I tend to get cross-eyed.  The entire thing is usually black-and-white with labels to indicate wire color.  When I see a loose wire in the engine bay, it often takes as much as twenty minutes to figure out where in the diagram that wire is located.

But what if the diagrams were in color?  Would that not make it easier to locate the wire?

My first stab at this was to sit down with some colored pencils and start coloring away.  This actually turns out to be quite relaxing (as one friend pointed out, it's like kindergarten for adults).  It's not a good way to share the diagrams with others, though, and it's time-consuming to recolor them if they get lost or damaged.  (in my case, I left my binder of 1989 plymouth voyager turbo wiring diagrams on the top my my minivan while driving down a rural highway at 80mph).

This is why we invented computers.  Some people may tell you it had to do with codebreaking or physical simulations or the internet, but the real reason they were invented was so we could have our wiring diagrams in color.

Step 1: Download wiring diagrams from here: [http://www.oldschoolhotrodder.com/modules.php?name=Downloads&cid=2](http://http://www.oldschoolhotrodder.com/modules.php?name=Downloads&cid=2)

Step 2: Load the pdf into acrobat and print it to a ps file

Step 3: Convert the entire ps file to a series of pgm (greyscale) images.  The greyscale takes a little more processing time, but the text labels turn out a bit nicer this way.

```
gs -sDEVICE=pgm -r300x300 -dNOPAUSE -sOutputFile=page%03d.pgm wiring.ps
```


this will convert every page of the ps file to a file called pageXXX.pgm at a resolution of 300dpi.  It should be possible to instead use a bitmap (black and white) at a higher resolution, but I got better results with less processing time using greyscale.

I also tried using greyscale at a higher resolution (600dpi), but this yielded worse quality.  Presumably this is because the resolution of the image exceeded the resolution of my input file.

Step 4: I considered writing a script for this step, but it turns out someone's already done all the hard work of vectorizing the pgm input file.  Enter [potrace](http://potrace.sourceforge.net/).  It takes a bitmap as input and produces a vectorized output in xfig, svg, or a variety of other formats.  Beautiful!

I'll start with one page for now:

```
potrace -b xfig -o page001.xfig page001.pgm
```


Coloring it is as easy as loading it up into skencil:

<img src="http://nonstandard-output.rubystuff.org/wp-content/uploads/2010/11/Screenshot-page001.xfig-Skencil-300x266.png" alt="Screenshot-page001.xfig - Skencil" title="Screenshot-page001.xfig - Skencil" width="300" height="266" class="alignnone size-medium wp-image-37" />

First I select the objects and then ungroup (in the Arrange menu).  To color an object, click on it, and select the color.    The image above highlights one small problem:  potrace decided that the wires that connect in a single dot are a single object.  That makes colorizing them a bit trickier.

Two options from here: 1. find a better drawing tool that will let me manually split the polygon, or 2. figure out what options to pass to potrace or autotrace to generate separate objects in the first place.

