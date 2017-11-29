const movieDB = [
  {
    status: true,
    movie: 'Star Wars',
    rating: '5 stars'
  },
  {
    status: false,
    movie: 'Justice League',
    rating: '3 stars'
  },
  {
    status: true,
    movie: 'Hulk',
    rating: '1 star'
  }
]

movieDB.forEach(function(i) {
  let intro = 'You have ';
  if (i.status) {
    intro += 'watched ';
  }
  else {
    intro += 'not watched ';
  }
  intro += '"' + i.movie + '" - ' + i.rating;

  console.log(intro);
})
