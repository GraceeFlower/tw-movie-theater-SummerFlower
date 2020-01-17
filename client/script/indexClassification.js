const movieMenu = document.getElementsByClassName('classification')[0];
const movieList = document.getElementsByClassName('movie-list')[0];
const pageInfo = document.getElementsByClassName('current-page')[0];
let [wholePage, currentPage] = [1, 1];
let currentMovie;

function loadItems() {
  ajax({
    url: BASIC_URL + '/v2/movie/' + top250 + '?start=0&count=100',
    method: 'GET',
    success: function (responseText) {
      data = responseText.subjects;
      loadMovieMenu(data);
    }
  })
}
loadItems();

function loadMovieMenu(data) {
  const movieClass = [...new Set(data.reduce((pre, cur) => pre.concat(cur.genres), []))];
  movieMenu.innerHTML = movieClass.reduce((allType, item) => 
    allType += `<span>${item}</span>`,`<span>全部</span>`);
  let randomList = Math.floor(Math.random() * (data.length - 10));
  loadMovieList(data.slice(randomList, randomList + 10));
}

movieMenu.addEventListener('click', renderChosenMovie, true);

function renderChosenMovie(event) {
  [wholePage, currentPage] = [1, 1];
  if (!event.target.className) {
    let type = event.target.innerHTML;
    movieList.innerHTML = '';
    currentMovie = [];
    data.forEach(item => {
      if ('全部' === type || item.genres.includes(type)) { currentMovie.push(item); }
    });
    separatePage(currentMovie);
  }
}

function loadMovieList(movie) {
  movie.forEach((element) => addMovieItem(element));
}

function addMovieItem(movie) {
  movieList.innerHTML += `
    <li id='${movie.id}'>
      <div class="movie-cover"><img src='${movie.images.small}' alt='${movie.title}'/></div>
      <span class="movie-name">${movie.title}</span>
      <span class="movie-average">${judgeAverage(movie.rating.average)}</span>
    </li>`
}

movieList.addEventListener("click", function (event) {
  let target = event.target;
  if ('movie-list' !== target.className) {
    if ("movie-cover" === target.parentNode.className) {
      window.location.href = "./movieDetails.html?id=" + target.parentNode.parentNode.id;
    } else if ("movie-list" === target.parentNode.className) {
      window.location.href = "./movieDetails.html?id=" + target.id;
    } else {
      window.location.href = "./movieDetails.html?id=" + target.parentNode.id;
    }
  }
})

function separatePage(currentMovie) {
  if (currentMovie.length > 10) {
    movieList.innerHTML = '';
    wholePage = Math.ceil(currentMovie.length / 10);
    let pageList = currentMovie.slice((currentPage - 1) * 10, currentPage * 10);
    loadMovieList(pageList);
  } else {
    loadMovieList(currentMovie);
  }
  reloadPageBar();
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
  reloadPageBar();
}

const viewMore = document.getElementsByClassName('view-more')[0];

function reloadPageBar() {
  viewMore.style.display = 'flex';
  pageInfo.innerHTML = `${currentPage}/${wholePage}`;
  formerBtn.innerHTML = 1 === currentPage ? '没有上一页了' : '上一页';
  latterBtn.innerHTML = wholePage === currentPage ? '没有下一页了' : '下一页';
}

