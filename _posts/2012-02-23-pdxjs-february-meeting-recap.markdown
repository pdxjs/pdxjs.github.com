---
layout: post
title: PDXjs February 2012 Meeting Recap
author: Scott Becker
excerpt: |
  At our February meeting, we went over some ideas for improving the
  PDXjs website, Howard Leis Ship gave a talk on CoffeeScript,
  the upcoming CouchConf Portland, 7 Databases in 7 weeks,
  promise libraries, EventReactor, and analysis of the recently
  popular [Wat][] video.
  
  [Wat]: https://www.destroyallsoftware.com/talks/wat
---

At our February meeting, we went over some ideas for improving the
PDXjs website, Howard Leis Ship gave a talk on CoffeeScript,
the upcoming CouchConf Portland, 7 Databases in 7 weeks,
promise libraries, EventReactor, and analysis of the recently
popular [Wat][] video.

[Wat]: https://www.destroyallsoftware.com/talks/wat

### PDXjs.com wishlist

A wishlist of possible updates to this site:

- live editing for real-time meeting notes
- meeting times (currently presented via Calagator widget, that may need some fixing up)
- tomorrow's winning lottery numbers
- EtherPad Lite, implemented with node.js, could be used for meeting notes
- notes from meetings

### CoffeeScript

Howard Lewis Ship gave a talk on CoffeeScript

- try-finally is broken in IE7
- how does one debug CoffeeScript apps?

### CouchConf PDX

[CouchConf Portland][] is coming up on March 14, 2012.

[CouchConf Portland]: http://www.couchbase.com/couchconf-portland

### 7 Databases in 7 Weeks

The upcoming book, [7 Databases in 7 weeks][] was mentioned
as a good introduction to various NoSQL databases and the reasons for choosing one over another.

[7 Databases in 7 weeks]: http://pragprog.com/book/rwdata/seven-databases-in-seven-weeks

### Promises, Promises

What is the best promise library for Node.js?

- [futures.js][] was recommended
- [q][] is another option, with addons in [qq][]
- [async][] is another
- [oath][] is yet another
- [EventReactor][] is another nice tool for working with async code in node and in the browser
- stay tuned for a talk on promises at a future PDX.js meeting

[futures.js]: http://coolaj86.info/futures/
[q]: https://github.com/kriskowal/q
[qq]: https://github.com/kriskowal/qq
[async]: https://github.com/caolan/async
[oath]: http://alogicalparadox.com/oath/
[EventReactor]: https://github.com/observing/eventreactor

### Wat

Ryan Munro explained the JS segment from the [Wat][] - the destroy all software video.

- {} represents an empty block syntax
- Ryan demoed a trick for strengthening the js type system, setting the valueOf function for various JavaScript built-in types to undefined

[Wat]: https://www.destroyallsoftware.com/talks/wat

Other Weirdness

- ~ is bitwise "not". -~n can be used to increment a number n that may be undefined

### From after the meeting:

- [Thorax][] is a framework on top of Backbone
- [Node-Inspector][] could be really handy for debugging node.js apps.

[Thorax]: http://walmartlabs.github.com/thorax/
[Node-Inspector]: https://github.com/dannycoates/node-inspector
