/**
 * preemt.js
 * ==========
 * https://github.com/bengourley/ticker
 * Licenced under the New BSD License
*/

(function() {

/**
 * Default settings
 */
var defaults =
  { limit: 5
  , template: _.template('<li class="preempt-result"><%=text%></li>')
  , header: null
  , footer: null
  }

/**
 * Constructor for Preempt objects
 */
function Preempt(element, options) {

  // Calling Preempt without new is ok...
  if (!(this instanceof Preempt)) return new Preempt(options)

  this.input = element
  this.cursor = null
  this.results = []

  // Merge options and defaults
  this.options = _.extend({}, defaults, options)

}

Preempt.prototype.init = function () {
  this.setup()
  this.input.on('keyup', _.bind(this.handleKeyUp, this))
  this.input.on('keydown', _.bind(this.handleKeyDown, this))
  this.input.on('blur', _.bind(this.clear, this))
}

/**
 * Render the root element and position
 * it beneath the input element it has been
 * positioned on
 */
Preempt.prototype.setup = function () {
  this.input.attr('autocomplete', 'off')
  this.container = $('<div/>').addClass('preempt-result-container')
  this.resultsEl = $('<ul/>').addClass('preempt-result-list')
  this.input.after(this.container)
  this.container.css(
    { top: this.input.position().top +
           this.input.outerHeight(true)
    })
  this.clear()
  if (this.options.header) this.container.append(this.options.header)
  this.container.append(this.resultsEl)
  if (this.options.footer) this.container.append(this.options.footer)
}

/**
 * Handle a keyup event on the input. Special cases
 * for escape, up/down arrows and return.
 */
Preempt.prototype.handleKeyUp = function (e) {
  if (e.keyCode === 27) {
    // Escape key, clear the result list
    this.clear()
  } else if (this.results.length && (e.keyCode === 38 || e.keyCode === 40)) {

    var resultEls = this.resultsEl.children()

    if (this.hasCursor()) {
      // Clear previous cursor if it exists
      resultEls.eq(this.cursor).removeClass('cursor')
    }

    // Arrow keys, move the cursor

    if (e.keyCode === 40) {
      // Down
      if (this.hasCursor()) {
        this.cursor = this.cursor === resultEls.length - 1
          ? this.cursor
          : this.cursor + 1
      } else {
        this.cursor = 0
      }
    }

    if (e.keyCode === 38) {
      // Up
      if (this.hasCursor()) {
        this.cursor = this.cursor === 0
          ? this.cursor
          : this.cursor - 1
      } else {
        this.cursor = resultEls.length - 1
      }
    }

    resultEls.eq(this.cursor).addClass('cursor')

  } else if (this.results.length && e.keyCode === 13 && this.hasCursor()) {

    // Go to the link of the item under the cursor
    document.location.href = this.results[this.cursor].href

  } else {

    // Let the keypress populate the input field
    // and get the new result set
    this.input.addClass('loading')
    this.getResults(_.bind(function (results) {
      this.input.removeClass('loading')
      this.cursor = null
      this.results = results
      this.render()
    }, this))

  }
}

/**
 * Handle a keydown event on the input. Prevent
 * enter submitting the form in some cases, and
 * prevent arrows affecting the form input
 */
Preempt.prototype.handleKeyDown = function (e) {
  if (e.keyCode === 13 && this.hasCursor()) {
    e.preventDefault()
  }
  if (e.keyCode === 38 || e.keyCode === 40) {
    e.preventDefault()
  }
}

/*
 * Check if the cursor has a numeric value.
 */
Preempt.prototype.hasCursor = function (e) {
  return typeof this.cursor === 'number'
}

/*
 * Get results from the given query function
 * (except if the input is empty). Query is async
 * so `callback` is called with the result
 */
Preempt.prototype.getResults = function (callback) {
  if (this.input.val() === '') {
    return callback([])
  }
  this.options.query(this.input.val(), _.bind(function (results) {
    callback(results)
  }, this))
}

/*
 * Clear the result set and remove the
 * cursor. Also hide it from view.
 */
Preempt.prototype.clear = function () {
  this.results = []
  this.cursor = null
  this.container.hide()
}

/*
 * Render the list of results
 * if it's not empty.
 */
Preempt.prototype.render = function () {
  this.resultsEl.empty()
  this.container.hide()
  if (this.results.length) {
    _.each(this.results, function (result, i) {
      if (i >= this.options.limit) return
      this.resultsEl.append(this.options.template(result.data))
    }, this)
    this.container.show()
  }
}

if (window.module && window.require) {
  module('Preempt', function (module) {
    module.exports = Preempt
  })
} else {
  window.Preempt = Preempt
}

})()