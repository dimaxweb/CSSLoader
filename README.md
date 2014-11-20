#  CssLoader  (css!)  -   RequireJs  plugin 
RequireJs plugin for reliably loading and waiting for css files.

##Inspiration
There is a need for a well tested and reliable plugin for loading css resources using RequireJs.

The main issue with loading and waiting for css files, is actually not “loading” (I found only IE 31 stylesheet limit problematic,described below) but “waiting” for when the stylesheet is downloaded and available in the DOM. This is further described [here](http://requirejs.org/docs/faq-advanced.html#css) and [here](https://github.com/jrburke/requirejs/issues/154).

### Approach
After looking at existing plugins and approaches I came to conclusion that in order to address “waiting” issue the following things needed to be addressed first:
1. Reliably understand if browser support “load” event on “link” element.
2. Reliably understand if style sheet is applied on DOM when native “load” event doesn't provided by browser.

The plugin logic also contains the workaround for [IE 31 stylesheet limit](http://blogs.msdn.com/b/ieinternals/archive/2011/05/14/internet-explorer-stylesheet-rule-selector-import-sheet-limit-maximum.aspx).

Because there are a lot of caveats in different browsers each approach used in plugin is tested thoroughly.
There are [Qunit](http://qunitjs.com/) unit tests available which can be [found here](https://github.com/dimaxweb/CSSLoader/tree/master/test).

## Getting Started
Download the [production version][min] or the [development version][max].
[min]: https://github.com/dimaxweb/CSSLoader/tree/master/dist/css.js
[max]: https://github.com/dimaxweb/CSSLoader/tree/master/src/css.js

## Usage
You can specify a `.css ` file resource as a requirejs dependency by using below `css!` syntax. Note that it works completely similar to require.js's 'standard' `text!` [loader plugin](http://requirejs.org/docs/api.html#plugins):

require.config({
    // baseUrl: 'Scripts',  <-- baseUrl had to be commented out because the .css file is located at 'Content/bootstrap.css' (and not 'Scripts/Content/bootstrap.css').
    paths: {
        "jquery": "Scripts/jquery-1.11.1.min",
        "bootstrap": "Scripts/bootstrap.min",
        "bootbox": "Scripts/bootbox.min",
		...
        "css": "Scripts/css.min"
    },
    shim: {
        "bootstrap": { "deps": ['jquery'] }
    }
});

require(['jquery', 'bootstrap', 'bootbox', 'css!Content/bootstrap.css'], function($,bootstrap,bootbox) {
	bootbox.confirm(..  // The confirm is shown with the correct layout!
	...
});

##Compatability
Tested on :
IE7,IE8,IE9,
Firebox: 10.0.2,
Chrome:21.0,
Opera:12.02,
Safari:5.17

##Credits
[Understanding if an event is supported on an element](http://perfectionkills.com/detecting-event-support-without-browser-sniffing).
* Worth to add that I first came to that approach when walking through the jQuery code.

[Get identification when css is applied to DOM](http://yearofmoo.com/2011/03/cross-browser-stylesheet-preloading).


##TODO:
Check that stylesheet not only applied to DOM but also that rules are applied on stylesheets loaded from another domain.

Handle the css files with @import directives.

Support for [Requirejs optimizer](https://github.com/jrburke/r.js).

## License
Licensed under the MIT, GPL licenses.


## Contributing
In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

### Important notes
Please don't edit files in the `dist` subdirectory as they are generated via grunt. You'll find source code in the `src` subdirectory!

While grunt can run the included unit tests via PhantomJS, this shouldn't be considered a substitute for the real thing. Please be sure to test the `test/*.html` unit test file(s) in _actual_ browsers.

### Installing grunt
_This assumes you have [node.js](http://nodejs.org/) and [npm](http://npmjs.org/) installed already._

1. Test that grunt is installed globally by running `grunt --version` at the command-line.
1. If grunt isn't installed globally, run `npm install -g grunt` to install the latest version. _You may need to run `sudo npm install -g grunt`._
1. From the root directory of this project, run `npm install` to install the project's dependencies.

### Installing PhantomJS

In order for the qunit task to work properly, [PhantomJS](http://www.phantomjs.org/) must be installed and in the system PATH (if you can run "phantomjs" at the command line, this task should work).

Unfortunately, PhantomJS cannot be installed automatically via npm or grunt, so you need to install it yourself. There are a number of ways to install PhantomJS.

* [PhantomJS and Mac OS X](http://ariya.ofilabs.com/2012/02/phantomjs-and-mac-os-x.html)
* [PhantomJS Installation](http://code.google.com/p/phantomjs/wiki/Installation) (PhantomJS wiki)

Note that the `phantomjs` executable needs to be in the system `PATH` for grunt to see it.

* [How to set the path and environment variables in Windows](http://www.computerhope.com/issues/ch000549.htm)
* [Where does $PATH get set in OS X 10.6 Snow Leopard?](http://superuser.com/questions/69130/where-does-path-get-set-in-os-x-10-6-snow-leopard)
* [How do I change the PATH variable in Linux](https://www.google.com/search?q=How+do+I+change+the+PATH+variable+in+Linux)
