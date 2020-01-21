const header = document.getElementsByTagName("header")[0];
let BASIC_URL = 'http://127.0.0.1:8888';
const top250 = 'top250';

let thisURL = document.URL;
let getIdFromURL = thisURL.split("?")[1];
let movieDetailPageId = getIdFromURL.split("=")[1];
let movieDetailData;
let data;

ajax({
  url: BASIC_URL + '/v2/movie/subject/' + movieDetailPageId,
  method: 'GET',
  success: function (responseText) {
    movieDetailData = responseText;
    renderMovieDetail(responseText);
  }
})


loadItems();

function loadItems() {
  ajax({
    url: BASIC_URL + '/v2/movie/' + top250,
    method: 'GET',
    success: function (responseText) {
      data = responseText.subjects;
      findSimilarArray()
    }
  })
}

let relatedMovie = [];
function findSimilarArray() {
  const nowMovieGenres = movieDetailData.genres;
  let type = nowMovieGenres[0];
  data.forEach(item => {
    if (item.genres.includes(type) && item.id !== movieDetailPageId) { relatedMovie.push(item); }
  });
  renderSimilarMovie();
}

function isContain(searchContent) {
  for (let item in data) {
    if (searchContent === data[item].title) {
      return data[item].id;
    }
  }
  return -1;
}

const topSearchInput = document.getElementsByClassName("top-search-input")[0];
function searchOperate() {
  let searchContent = topSearchInput.value;
  let searchMovieId = isContain(searchContent);
  if (-1 === searchMovieId) {
    window.location.href = `./movieNotFound.html?searchContent=${searchContent}`;
  } else {
    movieDetailPageId = searchMovieId;
    window.location.href = `./movieDetails.html?id=${movieDetailPageId}`;
  }
}

let recommendSearchArray = [];
const searchSuggest = document.getElementsByClassName("search-suggest")[0];
const searchSuggestList = document.getElementsByClassName("search-suggest-list")[0];

topSearchInput.addEventListener("input", function (event) {
  let searchContent = event.target.value;
  recommendSearchArray = isABitContain(searchContent);
  setSuggestMoviePullDown();
});

function isABitContain(searchContent) {
  let containThisMovieArray = [];
  if (searchContent) {
    data.forEach(item => {
      if (item.title.includes(searchContent)) {
        containThisMovieArray.push(item.id);
      }
    });
  }
  return containThisMovieArray;
}

function setSuggestMoviePullDown() {
  searchSuggest.style.height = "auto";
  searchSuggestList.innerHTML = "";
  addSuggestMovieItem();
  if (recommendSearchArray.length > 5) {
    searchSuggest.style.height = "400px";
    searchSuggest.style.overflow = "auto";
  }
}

function addSuggestMovieItem() {
  searchSuggestList.innerHTML = recommendSearchArray.reduce((pre, cur) => {
    let suggestMovieData = data.filter(item => (cur === item.id))[0];
    return pre += `
    <li class="suggest-item" id='${suggestMovieData.id}'>
      <img class="suggest-item-img" src='${suggestMovieData.images.small}' />
      <span class="suggest-item-name">${suggestMovieData.title}</span>
      <span class="suggest-item-rating">${judgeAverage(suggestMovieData.rating.average)}</span>
    </li>`
  }, '');
}

searchSuggest.addEventListener("click", function (event) {
  let target = event.target;
  if ("suggest-item" === target.className) {
    window.location.href = `./movieDetails.html?id=${target.id}`;
  } else {
    window.location.href = `./movieDetails.html?id=${target.parentNode.id}`;
  }
})

function judgeAverage(average) {
  return average.toString().length === 1 ? `${average}.0` : average;
}