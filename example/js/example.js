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

  $('input[name=search]').preempt({
    query: function (term, callback) {
      callback(
        names
          .filter(function (name) {
            return name.toUpperCase().indexOf(term.toUpperCase()) !== -1
          })
          .map(function (name) {
            return { text: name, link: '#/' + name }
          })
      )
    }
  })

}())