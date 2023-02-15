**notclock.svg** is an interactive, real-time animation SVG based in a 6-generation bifurcated point (i.e., one point becomes 2 point, each of those point becomes 2 points, etc., 6 times).  This is the basic model used to describe “Tholonic Expansion”, which describe the models of nature and energy, and this SVG was initially designed to be a clock based on this concept, but that seemingly simple idea tuned out to be far more challenging than imagined, so that code turned into this, which is not a clock.

<img src="images/growth_15deg.jpg"/>

<img src="images/bothsides.png"/>

<img src="images/lightning-3.png"/>

It uses no external links and requires no internet connection.  All the data, such as the MP3 files of piano keys, are embedded into the file.  These files in constantly being updated, so what is stated here may not be exactly accurate at times.  This document is accurate to version 3.24.

The four main files are:

- `clock_1.svg`
  - The ‘main’ part of the SVG

- `clock_1_lib.js`
  - Functions and some vars

- `clock_1_listeners.js`
  - Event handlers

- `clock_1_merge.py`
  - Python script to merge the three files into one file called `notclock.svg`


The files have been broken up in three parts to make editing easier.

Because editors use the file extensions to know how to parse the data, editing a file as an SVG is a pain as I have yet to find an editor that properly parses SVG.  To get around this, symlink `clock_1.svg` to `clock_1.svg.js` 

The latest version of this file is usually [here](https://tholonia.com/Images/SVG/notclock.svg).

Here some interesting configs (live links)

[Basic Lines, fast](https://tholonia.com/Images/SVG/notclock.svg?c=10&i=0.234375&l=0&k=0&q=1&a1=1&a2=1&a3=1&a4=1&a5=1&a6=1&n=0&o=1&g=1&p=1&a=0)

[Basic Lines w/ polygons](https://tholonia.com/Images/SVG/notclock.svg?c=10&i=0.0146484375&l=0&k=0&q=1&a1=1&a2=1&a3=1&a4=1&a5=1&a6=1&n=1&o=1&g=1&p=1&a=0)

[Asymmetry](https://tholonia.com/Images/SVG/notclock.svg?c=1000&i=7.5&l=2&k=1&q=1&a1=0&a2=0&a3=1&a4=1&a5=1&a6=1&n=0&o=1&g=1&p=1&a=4)

[Balls only](https://tholonia.com/Images/SVG/notclock.svg?c=10&i=0.0146484375&l=5&k=0&q=0&n=5&o=1&g=1&p=16&a=0)

[Balls with Rays](https://tholonia.com/Images/SVG/notclock.svg?c=-2&i=0.003&l=2&k=1&a1=0&a2=0&a3=0&a4=0&a5=0&a6=0&n=1&o=0.04\)

[Connected Balls](https://tholonia.com/Images/SVG/notclock.svg?c=-2&i=0.003&l=2&k=1&a1=0&a2=0&a3=0&a4=0&a5=0&a6=0&n=1&o=0.04\)

Some screenshots

<img src="images/clock_balls.png"/>

<img src="images/clock_basic_lines_w_poly.png"/>

<img src="images/clock_multi1.png"/>

<img src="images/clock_multi2.png"/>

<img src="images/clock_multi3.png"/>

<img src="images/clock_polyballs.png"/>



