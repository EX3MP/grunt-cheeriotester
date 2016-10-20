# grunt-cheeriotester

Small existence tester for html Elements.

## Grunt config

```
{
  cheeriotester: {
    files: [
      'tests/index.html',
      'tests/fail.html'
    ]
  }
}
```

## default tests

```
{
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
}
```
