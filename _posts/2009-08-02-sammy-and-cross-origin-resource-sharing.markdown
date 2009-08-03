---
layout: post
title: Sammy and Cross-Origin Resource Sharing
author: Jesse Hallett
excerpt: |
  At our July meeting Scott Becker gave us a presentation on a wonderful tool
  called [Sammy][].  Sammy is a framework inspired by the Ruby framework,
  [Sinatra][], for structuring web applications on the client side.  It works
  on the idea that a rich application can have many different virtual pages
  in a single browser page.  Sammy maps each virtual page to a URL using the
  fragment portion of the URL do distinguish between different virtual pages
  in the browser page.  For example, `example.com/app/#/main` and
  `example.com/app/#/subpage` could represent two different virtual pages, or
  'actions'.
  
  [Sammy]: http://code.quirkey.com/sammy/
  [Sinatra]: http://www.sinatrarb.com/
---

### Sammy

At our July meeting Scott Becker gave us a presentation on a wonderful tool
called [Sammy][].  Sammy is a framework inspired by the Ruby framework,
[Sinatra][], for structuring web applications on the client side.  It works
on the idea that a rich application can have many different virtual pages
in a single browser page.  Sammy maps each virtual page to a URL using the
fragment portion of the URL do distinguish between different virtual pages
in the browser page.  For example, `example.com/app/#/main` and
`example.com/app/#/subpage` could represent two different virtual pages, or
'actions'.

[Sammy]: http://code.quirkey.com/sammy/
[Sinatra]: http://www.sinatrarb.com/

To use Sammy, you register a series of routes with a callback attached to
each route.  Routes can be literal strings, regular expressions, or paths
with named parameters.  Whenever the browser address changes Sammy
automatically scans through the list of routes looking for the first one
that matches the new page address.  When it finds the match Sammy runs the
associated callback.

{% highlight js %}
var app = $.sammy(function() { with(this) {

    get('#/', function() { with(this) {
        $('#main').text('Welcome!');
    }});

    get('#/say-my-name/:name', function() { with(this) {
        $('#main').text('Hello, ' + params['name']);
    }});

    get('#/pastries/votes', function() { with(this) {
	$('#main').text('Please vote for the pastry you want at the next meeting.');
    }});

}});

$(document).ready(function() {
    app.run('#/');
}
{% endhighlight %}

Mapping URL fragments to different areas of the application means that your
users can create bookmarks that go directly to those areas.  It also means
that the browser back and forward buttons will work as expected even when
everything is technically running in a single page.

Sammy can intercept form posts, allowing your application to easily the
data submitted without actually sending it to the server.  When checking
for a route match, Sammy checks the form's submit method against the method
used to register each route.

{% highlight js %}
var app = $.sammy(function() { with(this) {

    ...

    post('#/pastries/votes', function() { with(this) {
        if (params.pastry_type == 'Glazed Donuts') {
            $('#main').text('Excellent choice!');
        } else {
            $('#main').text('Well, we\'ll see.');
        }
        return false
    }});

}});
{% endhighlight %}

Sammy even includes support for a templating system.  Templates are hosted
on the server as separate files.  After a template is loaded once it is
cached in the browser so that subsequent renderings of the same template
will not produce more than one HTTP request.

Here is an example of templating in action from Scott's slides:

{% highlight js %}
var app = $.sammy(function() { with(this) {
    element_selector = '#main';

    get('#/tasks/:id', function() { with(this) {
        this.task = db.collection('tasks').get(params['id']).json();
        this.partial('/templates/task_details.html.erb');
    }});

}});
{% endhighlight %}

Here is what the corresponding template looks like:

{% highlight html+erb %}
<div id="task_<%= task.__id__ %>">
  <h3><%= task.entry %></h3>
</div>
{% endhighlight %}

As you can see, templates can come in [ERB][] format where dynamic data is
injected on the client side when the template is rendered.  Usually ERB
embeds Ruby code in a template.  But in Sammy's case it embeds JavaScript
code instead.  Templates can also be plain HTML if you prefer.

[ERB]: http://www.ruby-doc.org/stdlib/libdoc/erb/rdoc/

The slides from Scott's talk are online on [Scott's blog][].

[Scott's blog]: http://synthesis.sbecker.net/articles/2009/07/22/all-about-sammy


### Cross-Origin Resource Sharing

Jesse Hallett talked about Cross-Origin Resource Sharing.  This is the term
for an emerging standard for making cross-site Ajax requests natively,
without the need for a proxy.

The recent crop of browsers allow cross-site XMLHttpRequests under certain
conditions.  Previous implementations of XMLHttpRequest did not allow
cross-site requests to reduce the risks associated with [cross-site request
forgery][CSRF] and [cross-site scripting][XSS] attacks.  In order to allow
cross-site XHR without making web servers vulnerable to cross-site attacks,
the [W3C Access Control specification][] defines a protocol for web servers
to speciffy cross-origin security policies. 

[CSRF]: http://en.wikipedia.org/wiki/Cross-site_request_forgery
[XSS]: http://en.wikipedia.org/wiki/Cross-site_scripting
[W3C Access Control specification]: http://dev.w3.org/2006/waf/access-control/

When the browser sends a basic cross-site XHR request, it includes an
`Origin` header specifying the host, port, and protocol that the request
originated from.  A compliant server will include an
`Access-Control-Allow-Origin` header in the HTTP response.  The content of
the response header may be a wildcard, `*`, if the server accepts requests
from any origin for that URL and request method.  Or the header may give a
whitelist of origins that are specifically allowed.  Upon receiving the
response the browser checks the `Access-Control-Allow-Origin` header and if
the origin of the request does not match the server's policy, then the
browser blocks the response.

This simple exchange is used for GET requests and POST requests with
content types of application/x-www-form-urlencoded, multipart/form-data,
and text/plain.  It is also required that requests not include any custom
HTTP headers.  Those are any headers that start with 'X-'.  For XHR
requests that do not meet these criteria a somewhat more complicated
'preflight' request is made to determine if a cross-site request is
allowed.  The browser sends an OPTIONS request to the server specifying the
request method, content-type, and custom headers that are about to be sent.
The server responds with access control headers specifying which request
methods, content types, and custom request headers are allowed.  If the
server's policy is compatible with the XHR request, then the browser sends
the real request.

If a web server is hosting content on a given URL that is reasonably safe
to server cross-site, then the maintainers of the web server may choose a
liberal access policy.  On the other hand content on a URL that would be
dangerous to serve cross-site, such as content that is protected by cookie
authentication, would be better protected by denying cross-site requests.

The Access Control protocol takes the approach of a conservative default.
If the server does not include an `Access-Control-Allow-Origin` header in
its responses then the browser assumes that cross-site requests are not
allowed.

The latest release of jQuery does not support cross-site requests.  Other
libraries will probably have similar problems.  But there is [an example
online][CORS example] demonstrating how to perform a cross-site request
through the native DOM API.

[CORS example]: http://gist.github.com/152418

There are thorough explanations of CORS from the [Mozilla Developer
Center][CORS on MDC] and [hacks.mozilla.org][CORS on hacks].

[CORS on MDC]: https://developer.mozilla.org/En/HTTP_Access_Control
[CORS on hacks]: http://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/

Firefox 3.5, Safari 4, and Google Chrome 2 implement CORS.  Internet
Explorer 8 has partial support; but uses [a different API][CORS in IE]
instead of extending XMLHttpRequest.  It is unclear at this point when
Opera will incorporate the standard.

[CORS in IE]: http://msdn.microsoft.com/en-us/library/cc288060%28VS.85%29.aspx

Hopefully someday all browsers will support CORS.  In the meantime we need
fallbacks for the browsers that don't.  For that Jesse recommends
[flXHR][], which is a client-side proxy implemented in Flash.  Instead of
using a server-side proxy, requests made in the browser are directed to an
invisible Flash movie.  The Flash code makes the actual HTTP request and
proxies the response back to your JavaScript code.

[flXHR]: http://flxhr.flensed.com/

There are several advantages to using flXHR over other methods for getting
around the [same origin policy][].  It is easier to run a client-side proxy
than it is to maintain a server-side proxy on every domain you want to make
cross-site requests from.  Unlike [JSONP][] and [CSSHttpRequest][] which can only
make GET requests, flXHR can make any type of request.  Unline JSONP, flXHR
does not require your application to blindly execute the response from
another domain.  And flXHR requires much less server-side setup than
CSSHttpRequest does.

[same origin policy]: http://en.wikipedia.org/wiki/Same_origin_policy
[JSONP]: http://bob.pythonmac.org/archives/2005/12/05/remote-json-jsonp/
[CSSHttpRequest]: http://nb.io/hacks/csshttprequest

For the sake of security Flash respects server-side access policies when
making cross-site requests in much the same way that CORS works.  So to use
flXHR you will need to set up an access policy on any servers you want to
make requests to.  But instead of declaring policy in HTTP headers you will
need to serve a special crossdomain.xml document.

There are flXHR plugins available for several JavaScript frameworks -
including [one for jQuery][flXHR plugin].  The plugin makes use of another
jQuery plugin called [XHR][jQuery XHR] which provides a registry for
pluggable backends for HTTP requests.  To make requests through flXHR you
will need to pass a `transport` parameter to jQuery's ajax methods.

[flXHR plugin]: http://flxhr.flensed.com/jquery.php
[jQuery XHR]: http://plugins.jquery.com/project/XHR

{% highlight js %}
jQuery.ajax({
    url:'...',
    transport:'flXHRproxy',
    // ...
});
{% endhighlight %}

Someday soon it would be nice to see a plugin that will transparently make
requests using CORS on browsers with the necessary support, and that will
fall back to flXHR or something similar in other browsers.


### Server-Side JavaScript and Graphics

We spent some time talking about server-side JavaScript for implementing
web applications.  It would be really great if somebody could give a talk
on this subject at an upcoming meeting.  But what we know so far is that
the new kind on the block is [Joyent's Smart Platform][].  In addition to
running JavaScript the smart platform automatically handles scaling and
provisioning.  And the platform is [open source][joyent on Github]; so you
can run it on your own machines.

[Joyent's Smart Platform]: http://www.joyent.com/products/joyent-smart-platform/
[joyent on Github]: http://github.com/joyent

There is a standardization going on to make server-side JavaScript code as
interoperable as possible.  The project behind that is called [ServerJS][].
There seem to be several implementations in the works already.

[ServerJS]: https://wiki.mozilla.org/ServerJS

Mike Leach brought up another server-side framework called [Jaxer][] that
allows you to mix server and client logic in a single code base.

[Jaxer]: http://ejohn.org/blog/server-side-javascript-with-jaxer/

We also had a discussion of the tools out there for rendering charts and
graphics.  Some of the names mentioned were [RaphaelJS][] and
[ProcessingJS][] for graphics; and [Bluff][] and [Flot][] for graphs and
plots.

[RaphaelJS]: http://raphaeljs.com/
[ProcessingJS]: http://processingjs.org/
[Bluff]: http://bluff.jcoglan.com/
[Flot]: http://code.google.com/p/flot/
