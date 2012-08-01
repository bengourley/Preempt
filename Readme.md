preempt-search
=======

A jQuery plugin to add pre-emptive searching to an input element. Pass in an
async function that takes a string and calls back with a list of suggested results.

The suggested results are then displayed in a list beneath the input, and can be
clicked or interacted with the keyboard.

*Browser Support*: IE6+, Chrome, Firefox, Safari

A demo can be found at: http://bengourley.github.com/preempt-search/example/

## Dependencies:

This module depends on jQuery (DOM, events and animation) and Underscore
(templates, utilites).

It is up to you to ensure these dependencies exist. In the example, these are
hotlinked from Google's CDN and GitHub. You should do something better in
production.

# Usage:

```js
$('input[name=search]').preempt({
  query: function (input, callback) { ... }
})
```

# API

## $(selector).preempt(options)

This is a jQuery plugin that will operate on the elements described by `selector`.
It should only be called on input[type='text'] elements.

`options`:

- `limit`: Optional. Limit the amount of results shown. Default: 5
- `query`: Required. A function with the signature `function (input, callback) {}`
which takes an `input` string, and calls back with a list of results. The results
should be an array of objects in the form: `{ text: 'Text to display', link: '/link.html'}`


// TODO

# Licence
Licenced under the [New BSD License](http://opensource.org/licenses/bsd-license.php)