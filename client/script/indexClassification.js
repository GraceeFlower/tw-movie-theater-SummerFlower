const movieMenu = document.getElementsByClassName('classification')[0];
const movieList = document.getElementsByClassName('movie-list')[0];
const pageInfo = document.getElementsByClassName('current-page')[0];
let [wholePage, currentPage] = [1, 1];

const top250 = 'top250';
let data;
let currentMovie;

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
  [wholePage, currentPage] = [1, 1];
  if (!event.target.className) {
    let type = event.target.innerHTML;
    movieList.innerHTML = '';
    currentMovie = [];
    data.forEach(item => {
      if ('全部' === type || item.genres.includes(type)) {currentMovie.push(item);}
    });
    separatePage(currentMovie);
  }
}

function loadMovieList(movie) {
  movie.forEach((element) => addMovieItem(element));
}

function addMovieItem(movie) {
  movieList.innerHTML += `
    <li>
      <div class="movie-cover"><image src='${movie.images.small}' alt='${movie.title}'/></div>
      <span class="movie-name">${movie.title}</span>
      <span class="movie-average">${movie.rating.average}</span>
    </li>`
}

function separatePage(currentMovie) {
  if (currentMovie.length > 14) {
    movieList.innerHTML = '';
    wholePage = Math.ceil(currentMovie.length / 14);
    pageInfo.innerHTML = `${currentPage}/${wholePage}`;
    formerBtn.innerHTML = 1 === currentPage ? '没有上一页了' : '上一页';
    latterBtn.innerHTML = wholePage === currentPage ? '没有下一页了' : '下一页';
    let pageList = currentMovie.slice((currentPage - 1) * 14, currentPage * 14);
    loadMovieList(pageList);
  } else {
    loadMovieList(currentMovie);
  }
}

const formerBtn = document.getElementById('former-page');
const latterBtn = document.getElementById('latter-page');

function changePage(isFormer) {
  if (wholePage > 1) {
    if (isFormer && currentPage > 1) {
      currentPage--;
      separatePage(currentMovie);
    } else if (!isFormer && currentPage < wholePage) {
      currentPage++;
      separatePage(currentMovie);
    }
  }
}