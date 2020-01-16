let BASIC_URL = 'http://127.0.0.1:8888';
const movieMenu = document.getElementsByClassName('classification')[0];

const top250 = 'top250';
let data;

function loadItems() {
  ajax({
    url: BASIC_URL + '/v2/movie/' + top250 + '?start=0&count=10',
    method: 'GET',
    success: function (responseText) {
      data = responseText.subjects;
      loadMovieMenu(data);
      console.log(data[0].title);//试验data数据格式
      console.log(data[1]);
    }
  })
}
loadItems();

function loadMovieMenu(data) {
  const movieClass = new Set(data.reduce((pre, cur) => pre.concat(cur.genres), []));
  movieClass.forEach(item => {
    movieMenu.innerHTML += `<span>${item}</span>`;
  });
  loadMovieList(data);
}

movieMenu.addEventListener('click', renderChosenMovie, true);

function renderChosenMovie(event) {
  if (!event.target.className) {
    let type = event.target.innerHTML;
    movieList.innerHTML = '';
    data.forEach(item => {
      if ('全部' === type || item.genres.includes(type)) {
        addMovieItem(item);
      }
    });
  }
}

const movieList = document.getElementsByClassName('movie-list')[0];

function loadMovieList(data) {
  data.forEach((element) => addMovieItem(element));
}

function addMovieItem(movie) {
  movieList.innerHTML += `
    <li>
      <div class="movie-cover"><image src='${movie.images.small}' alt='${movie.title}'/></div>
      <span class="movie-name">${movie.title}</span>
      <span class="movie-average">${movie.rating.average}</span>
    </li>`
}

function separatePage() {
  if (movieList.children.length > 14) {
    
  }
}