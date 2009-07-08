---
layout: post
title: PDXjs June Meeting Recap - Agile JavaScript Testing
excerpt: |
  Our June meeting was the first meeting at [Kongregate][].  This meeting was
  more free-form than most.  But Scott Becker talked more about behavior-driven
  development in JavaScript. He brought up a lot of tools that he hadn't covered
  in his previous talk.
  
  [Kongregate]: http://www.kongregate.com/
  
  [Slides from Scott's talk][1] are online. Scott also drew up this list of links
  to various tools that are useful for testing JavaScript.
  
  [1]: http://www.slideshare.net/joydivider/agile-javascript-testing
---

Our June meeting was the first meeting at [Kongregate][].  This meeting was
more free-form than most.  But Scott Becker talked more about behavior-driven
development in JavaScript. He brought up a lot of tools that he hadn't covered
in his previous talk.

[Kongregate]: http://www.kongregate.com/

[Slides from Scott's talk][1] are online. Scott also drew up this list of links
to various tools that are useful for testing JavaScript.

[1]: http://www.slideshare.net/joydivider/agile-javascript-testing

### Stuff Mentioned in Presentation ###

 - [Screw.Unit](http://github.com/nkallen/screw-unit/tree/master) - BDD
   framework for JS, RSpec-like

 - [Smoke](http://github.com/andykent/smoke/tree/master) - mocking and stubbing
   framework, RSpec-like

 - [Blue Ridge](http://github.com/relevance/blue-ridge/tree/master) - Rails
   plugin - tie in JS tests with the rest of your rails tests.  Bundles
Screw.Unit, Smoke, and env.js.

 - [Rhino](http://www.mozilla.org/rhino/) - JavaScript interpreter written in
   Java

 - [env.js](http://ejohn.org/blog/bringing-the-browser-to-the-server/) -
   JavaScript-based DOM implementation.  Useful for automating tests.

 - [js-test-driver](http://code.google.com/p/js-test-driver/) - parallel
   cross-browser JS test server

### Further possible exploration for JS / Browser level testing ###

 - [JSpec](http://visionmedia.github.com/jspec/) - another BDD framework like
   Screw.Unit, with cleaner syntax

 - [JSocka](http://github.com/gisikw/jsocka/tree/master) - mocking and
   stubbing, mocha-like

 - [Selenium](http://seleniumhq.org/) - browser-driven automated testing;
   complaints about brittleness of tests

 - [Windmill](http://www.getwindmill.com/) - browser-driven automated testing

 - [Watir](http://wtr.rubyforge.org/) - browser-driven automated testing

 - [Johnson](http://tenderlovemaking.com/2009/04/05/testing-javascript-outside-the-browser/)
   - Headless browser, uses ruby to load your html and execute your javascript.
     But I'm not sure how flexible / full featured this is.

 - [Celerity](http://celerity.rubyforge.org/) - JRuby interface to HtmlUnit, a
   Java-based headless browser with JavaScript support

 - [Culerity](http://github.com/langalex/culerity/tree/master) - A bridge
   between Cucumber and Celerity. Basically re-implementing the webrat helpers
to drive Celerity.

 - [Webrat](http://groups.google.com/group/webrat/browse_thread/thread/1db11de39945e3a7
) - Selenium driver

 - [FireUnit](http://fireunit.org/) - JavaScript Unit Testing Extension for Firebug

 - [TestSwarm](http://testswarm.com/) - Distributed Continuous Integration for
   JavaScript
