(function () {

  var names =
  [ 'Taylor Rouillard'
  , 'Aline Courter'
  , 'Rene Viens'
  , 'Dana Marinez'
  , 'Simone Belden'
  , 'Merrilee Mazur'
  , 'Phil Yearta'
  , 'Inga Whitaker'
  , 'Larhonda Savard'
  , 'Wilbur Audia'
  , 'Constance Maier'
  , 'Lyle Deschenes'
  , 'Frankie Bad'
  , 'Sharie Veneziano'
  , 'Marlyn Ciccone'
  , 'Arvilla Kirshner'
  , 'Sade Simas'
  , 'Larraine Cottle'
  , 'Dona Lipton'
  , 'Hilario Goodenough'
  ]

  var template = $('#result-template').html()

  var p = new window.Preempt($('input[name=search]'),
    { query: function (term, callback) {
        callback(
          names
            .filter(function (name) {
              return name.toUpperCase().indexOf(term.toUpperCase()) !== -1
            })
            .map(function (name) {
              return { href: '#/' + name, text: name }
            })
        )
      }
    , $root: $('.container.preempt')
    , template: _.template($('#result-template').html())
    , onClick: function(el) {
        el.toggleClass('selected')
      }
    , clear: function() {
        $(document).off('click.preempt')
        this.root.off('click')
      }
    }
  )
  p.init()

}())