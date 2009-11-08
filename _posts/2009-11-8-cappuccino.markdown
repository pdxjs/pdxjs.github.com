---
layout: post
title: Cappuccino
excerpt: |
  This month we had a great detailed talk on [Cappuccino][], given by Howard
  Lewis Ship.  Cappuccino is a JavaScript framework for creating rich graphical
  interfaces in the browser.  It is an effort by some former Apple engineers and
  is the flagship product of their company, [280 North][].  They essentially
  re-created OS X's [Cocoa][] library and adapted it to run on Objective-J, a
  dialect on top of JavaScript that is designed to be similar to Objective-C.
  The advantage of using Objective-J instead of pure JavaScript is that you can
  use the Cappuccino libraries with pretty much the same API that you would use
  when building native Cocoa apps.  Real live Cappuccino apps that you can try
  out are [280Slides][] by 280 North and [almost.at][], which is an independent
  effort.
  
  [Cappuccino]: http://cappuccino.org/
  [280 North]: http://280north.com/
  [Cocoa]: http://developer.apple.com/cocoa/
  [280Slides]: http://280slides.com/
  [almost.at]: http://almost.at/
---

This month we had a great detailed talk on [Cappuccino][], given by Howard
Lewis Ship.  Cappuccino is a JavaScript framework for creating rich graphical
interfaces in the browser.  It is an effort by some former Apple engineers and
is the flagship product of their company, [280 North][].  They essentially
re-created OS X's [Cocoa][] library and adapted it to run on Objective-J, a
dialect on top of JavaScript that is designed to be similar to Objective-C.
The advantage of using Objective-J instead of pure JavaScript is that you can
use the Cappuccino libraries with pretty much the same API that you would use
when building native Cocoa apps.  Real live Cappuccino apps that you can try
out are [280Slides][] by 280 North and [almost.at][], which is an independent
effort.

[Cappuccino]: http://cappuccino.org/
[280 North]: http://280north.com/
[Cocoa]: http://developer.apple.com/cocoa/
[280Slides]: http://280slides.com/
[almost.at]: http://almost.at/

One of the most impressive points that Howard brought up has to do with
Cappuccino's interoperability with Apple's Xcode IDE.  Xcode includes an
Interface Builder tool which acts as a powerful WYSIWYG interface for building
graphical interfaces.  Interface Builder outputs an XML description of your
design called a nib file.  Cappuccino includes a tool that can automatically
convert a nib file into its Cappuccino equivalent.  So you can design your
views in Interface Builder and run them in the web browser with Cappuccino in
the same way you would expect from a native Cocoa app.

So far Interface Builder is the only component of Xcode that Cappuccino
integrates with.  But the 280 North team is working on better IDE support in
the form of [Atlas][], their own IDE.  Atlas is intended to be a cross-platform
tool for building Cappuccino apps.  It also happens to be written in
Cappuccino.  The web site hints that Atlas may include an option to create
builds of Cappuccino-based web code that look and feel like desktop apps.  It
looks like 280 North is planning to use Atlas as their revenue stream since it
will be a paid app.  The Atlas Developer Beta Program will launch on November
15th.

[Atlas]: http://280atlas.com/

Cappuccino will be most comfortable to to programmers who have experience with
Objective-C and with Cocoa - or [NeXTSTEP][] which is what Cocoa is based on.
Howard mentioned that Cappuccino's documentation can be unhelpful and
incomplete.  But because Cappuccino is modeled so closely after Cocoa you can
generally use Cocoa reference materials instead, which are very complete.
Similarly, developing Cappuccino apps will be easiest for Mac users with access
to Xcode.

[NeXTSTEP]: http://en.wikipedia.org/wiki/NeXTSTEP

Objective-C was created as a way to bring some of the powerful features of
Smalltalk to C programming.  In the same way that Objective-C is a layer on top
of raw C code, Objective-J is a layer on top of JavaScript.  To use
Cappuccino's APIs your classes and methods will have to look like Objective-C
code.  But within your methods and in your support code you can use pure
JavaScript.  Objective-J compiles down to JavaScript when a Cappuccino app is
compiled.  Writing interfaces to Objective-J APIs from pure JavaScript takes a
little work but is possible.

Objective-J makes some deviations from Objective-C in addition to its
JavaScript foundation.  Objective-J has no header files: all of the
declarations you need are put straight into code files.  And though Objective-J
requires you to declare types in your method signatures and instance variables,
it does not actually perform any type checking.  One pitfall when coming from
Objective-C is to try to declare local variables with a specific type.  In fact
you are required to declare all local variables with JavaScript's native `var`
keyword.  There is also no syntactic distinction for pointers in Objective-J
because all non-primitive values are passed by reference in JavaScript.

The advantage of Cappuccino is that you can use it to build very powerful,
cross-browser, graphical interfaces quite easily.  And you get the advantages
of existing tools, like Xcode's Interface Builder plus proven technologies of
Cocoa and NeXTSTEP.  If you have experience with those technologies you have a
shot at a very smooth transition to building web applications.  And unlike Cocoa,
Cappuccino is completely [open source][].

[open source]: http://github.com/280north/cappuccino

The downsides are that Cappuccino's documentation is not great, as is mentioned
above.  Debugging can be painful because the compiler errors that you see will
often provide no information as to what the problem is - though Howard
recommends using Safari for the least painful debugging experience possible.
Because of its Mac roots Cappuccino development tends to be Mac-centric - at
least until Atlas is released.  Compiled Objective-J code does not appear to
be optimized for performance; so Cappuccino apps might not perform quite as
well as apps built on other frameworks.  And there are some aspects of web
programming that do not come up as much in desktop applications - in particular
background server communication.  Cocoa does not have much support for stuff
like that, so you will have to use other tools or build your own solution.

The slides from this talk are online on [Howard's blog][].  Howard's demo code
is also online on [Github][].

[Howard's blog]: http://tapestryjava.blogspot.com/2009/10/brew-up-rich-web-application-with.html
[Github]: http://github.com/hlship/nfjs-cappuccino

If you have questions about Cappuccino feel free to post comments here or to
send questions to our [mailing list][].

[mailing list]: http://groups.google.com/group/pdxjs
