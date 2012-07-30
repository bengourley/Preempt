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
var defaults = { limit: 5 }

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

  this.setup()

  this.input.on('keyup', _.bind(this.handleKeyUp, this))
  this.input.on('keydown', _.bind(this.handleKeyDown, this))

}


/**
 * Render the root element and position
 * it beneath the input element it has been
 * positioned on
 */
Preempt.prototype.setup = function () {
  this.input.attr('autocomplete', 'off')
  this.root = $('<div/>').addClass('preempt-root')
  this.container = $('<div/>').addClass('preempt-result-list')
  this.root.css(
    { left: this.input.offset().left
    , width: this.input.outerWidth()
    , top: this.input.offset().top + this.input.outerHeight()
    })
  this.root.append(this.container)
  $('body').append(this.root)
  this.clear()
}

/**
 * Handle a keyup event on the input. Special cases
 * for escape, up/down arrows and return.
 */
Preempt.prototype.handleKeyUp = function (e) {
  if (e.keyCode === 27) {
    // Escape key, clear the result list
    this.clear()
  } else if (e.keyCode === 38 || e.keyCode === 40) {

    this.container.find('.preempt-result').removeClass('cursor')

    // Arrow keys, move the cursor

    if (e.keyCode === 40) {
      // Down
      this.cursor = !this.cursor
        ? this.container.find('.preempt-result').first()
        : this.cursor.next()
      if (!this.cursor.length) {
        this.cursor = this.container.find('.preempt-result').last()
      }
    }

    if (e.keyCode === 38) {
      // Up
      this.cursor = !this.cursor
        ? this.container.find('.preempt-result').last()
        : this.cursor.prev()
      if (!this.cursor.length) {
        this.cursor = this.container.find('.preempt-result').first()
      }
    }

    this.cursor.addClass('cursor')

  } else if (e.keyCode === 13 && this.cursor.length) {

    // Go to the link of the item under the cursor
    document.location.href = this.cursor.attr('href')

  } else {

    // Let the keypress populate the input field
    // and get the new result set
    this.getResults(_.bind(function (results) {
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
  if (e.keyCode === 13 && this.cursor) {
    e.preventDefault()
  }
  if (e.keyCode === 38 || e.keyCode === 40) {
    e.preventDefault()
  }
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

Preempt.prototype.render = function () {
  this.container.show()
  this.container.empty()
  if (this.results.length) {
    _.each(this.results, function (result, i) {
      if (i >= this.options.limit) return
      this.container.append(
        $('<a/>')
          .attr('href', result.link)
          .text(result.text)
          .addClass('preempt-result')
      )
    }, this)
  } else {
    this.clear()
  }
}

/**
 * Wrap it up as a jQuery plugin
 */
$.fn.preempt = function (options) {
  this.each(function () {
    return new Preempt($(this), options)
  })
  return this
}

})()