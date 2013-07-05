# min.js

A very small library based on https://github.com/remy/min.js, but with added features I use most. I don't want to add to the existing min.js, because it is meant to be smaller than what I've created.

Like https://github.com/remy/min.js, it is used for simple DOM querying and hooking event listeners. It also simplyfies some things like libraries do, but in a less cross-browser compatible, so smaller, way.

The first part below is copied directly from Remy's min.js readme file (https://github.com/remy/min.js/blob/master/README.md)

## Query elements

```js
var links = $('p:first-child a');
```

If there is more than one link, the return value is `NodeList`, if there's only a single match, you have an `Element` object. So you need to have an idea of what to expect if you want to modify the DOM.

## Events

### Bind events

```js
$('p:first-child a').on('click', function (event) {
  event.preventDefault();
  // do something else
});
```

Note: the `on` and `trigger` methods are on both `Element` objects and `NodeList` objects, which also means this affects the `document` node, so `document.on(type, callback)` will also work.

### Custom events

```js
$('a').on('foo', function () {
  // foo was fired
});

$('a:first-child').trigger('foo');
```

### Arbitrary events / pubsub

```js
$.on('foo', function () {
  // foo was fired, but doesn't require a selector
});
```

## Looping

```js
$('p').forEach(function (el) {
  console.log(el.innerHTML);
});
```

## Chaining events

```js
$('a').on('foo', bar).on('click', doclick).trigger('foobar');
```

Also when a single element is matched, you have access to it:

```js
$('a').href = '/some-place.html';
```

## Silent failing

Like jQuery, this tiny library silently fails when it doesn't match any elements. As you might expect.

## Added features

The following is added to the original min.js

### Multiple event binding

```js
$('img').on('click load', function (event) {
  event.preventDefault();
  // do something
});
```

Spaces seperate different events to bind the same function.

### Getting computed sizes
```js
$('#someElement').getWidth();

$('#someElement').getFullWidth();

$('#someElement').getHeight();

$('#someElement').getFullHeight();
```

Works on single `Element`s only. `getWidth` and `getHeight` returns the computed width or height as a `Float`. `getFullWidth` and `getFullHeight` returns the computed width, including margins.

When used on a `NodeList`, `0` will be returned.

### AJAX

```js
$.ajax('http://url-to-get');

$.ajax({
    type: 'GET',
    url: 'http://url-to-get',
    data: 'querystring=to-pass'
    complete: function () {
        //callback!
    }
});
```
