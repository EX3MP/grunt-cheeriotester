/*
 * grunt-dom-munger
 * https://github.com/cgross/grunt-dom-munger
 *
 * Copyright (c) 2013 Chris Gross
 * Licensed under the MIT license.
 */
'use strict';

var path = require('path');
var fs = require('fs');
var cheerio = require('cheerio');
var toArray = function(value) {
    return (Array.isArray(value)) ? value : [value];
}

module.exports = function(grunt) {
    var processFile = function(f, dest, options, $) {
        var errors = [];
        grunt.log.subhead('Processing ' + f.cyan);

        options.tests.forEach(function(opt) {
            if (!opt.selector) {
                grunt.log.error('Read config missing selector options');
            }
            var $select = $(opt.selector);
            if ($select.length <= 0) {
                var msg = opt.selector + ' not found in ' + f;
                if(!opt.optional) {
                    errors.push(msg);
                    grunt.log.error(msg);
                    return false;
                }
                grunt.log.writeln('Warning: '.yellow+msg.yellow);
                return true;

            }
            $(opt.selector).map(function(i, elem) {
                var msg = '';
                if (opt.max && opt.max < i) {
                    msg = opt.selector + (opt.attr ? ' with ' + opt.attr : '') + ' to many items in ' + f;
                    if (opt.optional) {
                        grunt.log.writeln('Warning: '.yellow+msg.yellow);
                    } else {
                        errors.push(msg);
                        grunt.log.error(msg);
                    }
                    return false;
                }
                if (opt.attr == 'content') {
                    return true;
                }
                if (!$(elem).attr(opt.attr)) {
                    msg = opt.selector + opt.attr + ' not found in ' + f;
                    if (opt.optional) {
                        grunt.log.writeln('Warning: '.yellow+msg.yellow);
                    } else {
                        errors.push(msg);
                        grunt.log.error(msg);
                    }
                    return false;
                }
                return true;
            });
        });
        return errors;
    };

    grunt.registerMultiTask('cheeriotester', 'Read and tests html.', function() {
        var options = this.options({
            tests: [
                // <meta charset="utf-8">
                {
                    'selector': 'meta[charset]',
                    'max': 1
                },
                // <link rel="icon" href="favicon.ico">
                {
                    'selector': 'link[rel=icon]',
                    'attr': 'href',
                    'max': 1
                },
                // <meta name="description" content="">
                {
                    'selector': 'meta[name=description]',
                    'attr': 'content',
                    'max': 1
                },

                // <meta name="keywords" content="">
                {
                    'selector': 'meta[name=keywords]',
                    'attr': 'content',
                    'max': 1
                },

                // <meta name='robots' content='index,follow'/>
                {
                    'selector': 'meta[name=robots]',
                    'attr': 'content',
                    'max': 1
                },
                // <meta name='revisit-after' content='2 days'/>
                {
                    'selector': 'meta[name=revisit-after]',
                    'attr': 'content',
                    'max': 1
                },
                // <meta name="image" content="" />
                {
                    'selector': 'meta[name=image]',
                    'attr': 'content',
                    'max': 1,
                    'optional': true
                },

                // <meta property="og:site_name" content="" />
                {
                    'selector': 'meta[property="og:site_name"]',
                    'attr': 'content',
                    'max': 1,
                    'optional': true
                },
                // <meta property="og:title" content="" />
                {
                    'selector': 'meta[property="og:title"]',
                    'attr': 'content',
                    'max': 1,
                    'optional': true
                },
                // <meta property="og:url" content="" />
                {
                    'selector': 'meta[property="og:url"]',
                    'attr': 'content',
                    'max': 1,
                    'optional': true
                },
                // <meta property="og:description" content="" />
                {
                    'selector': 'meta[property="og:description"]',
                    'attr': 'content',
                    'max': 1,
                    'optional': true
                },
                // <meta property="og:type" content="" />
                {
                    'selector': 'meta[property="og:type"]',
                    'attr': 'content',
                    'max': 1,
                    'optional': true
                },
                // <meta property="og:image" content="" />
                {
                    'selector': 'meta[property="og:image"]',
                    'attr': 'content',
                    'max': 1,
                    'optional': true
                },
                //  <meta name="twitter:card" content="" />
                {
                    'selector': 'meta[name="twitter:card"]',
                    'attr': 'content',
                    'max': 1,
                    'optional': true
                },
                //  <meta name="twitter:site" content="@" />
                {
                    'selector': 'meta[name="twitter:site"]',
                    'attr': 'content',
                    'max': 1,
                    'optional': true
                },
                //  <meta name="twitter:title" content="" />
                {
                    'selector': 'meta[name="twitter:title"]',
                    'attr': 'content',
                    'max': 1,
                    'optional': true
                },
                //  <meta name="twitter:url" content="" />
                {
                    'selector': 'meta[name="twitter:url"]',
                    'attr': 'content',
                    'max': 1,
                    'optional': true
                },
                //  <meta name="twitter:description" content="" />
                {
                    'selector': 'meta[name="twitter:description"]',
                    'attr': 'content',
                    'max': 1,
                    'optional': true
                },
                //  <meta name="twitter:image" content="" />
                {
                    'selector': 'meta[name="twitter:image"]',
                    'attr': 'content',
                    'max': 1,
                    'optional': true
                },
                //  <title></title>
                {
                    'selector': 'title',
                    'max': 1
                },
                //  <h1></h1>
                {
                    'selector': 'h1',
                    'max': 1
                },
                //  <meta name="viewport" content="width=device-width, minimal=ui" />
                {
                    'selector': 'meta[name=viewport]',
                    'attr': 'content',
                    'max': 1
                },
                //  <meta name="theme-color" content="" />
                {
                    'selector': 'meta[name="theme-color"]',
                    'attr': 'content',
                    'max': 1,
                    'optional': true
                }
            ]
        });
        var done = this.async();
        var errors = [];

        if (this.filesSrc.length > 1 && this.data.dest) {
            grunt.log.error('Dest cannot be specified with multiple src files.');
            done(false);
        }

        if (options.tests.length <= 0) {
            grunt.log.error('No Tests.');
            done(false);
        }

        this.files.forEach(function(f) {

            var dest = f.dest;

            f.src.filter(function(filepath) {
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).forEach(function(f) {

                var srcContents = grunt.file.read(f);
                var $ = cheerio.load(srcContents, {
                    lowerCaseAttributeNames: false
                });
                var error = processFile(f, dest, options, $);
                errors = errors.concat(error);
            });
        });
        done((errors.length <= 0 ? true : false));
    });
};
