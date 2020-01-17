let header = document.getElementsByTagName("header")[0];
let BASIC_URL = 'http://127.0.0.1:8888';
const top250 = 'top250';
let data;

loadItems();

function loadItems() {
  ajax({
    url: BASIC_URL + '/v2/movie/' + top250,
    method: 'GET',
    success: function (responseText) {
      data = responseText.subjects;
    }
  })
}

function isContain(searchContent) {
  for (let i = 0; i < data.length; i++) {
    if (searchContent === data[i].title) {
      return data[i].id;
    }
  }
  return -1;
}

let topSearchInput = document.getElementsByClassName("top-search-input")[0];
function searchOperate() {
  let searchContent = topSearchInput.value;
  let searchMovieId = isContain(searchContent);
  if (-1 === searchMovieId) {
    window.location.href = "./movieNotFound.html?searchContent=" + searchContent;
  } else {
    movieDetailPageId = searchMovieId;
    window.location.href = "./movieDetails.html?id=" + movieDetailPageId;
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
    for (let i = 0; i < data.length; i++) {
      if (data[i].title.indexOf(searchContent) >= 0) {
        containThisMovieArray.push(data[i].id);
      }
    }
  }
  return containThisMovieArray;
}

function setSuggestMoviePullDown() {
  searchSuggest.style.height = "auto";
  searchSuggestList.innerHTML = "";
  for (let j = 0; j < recommendSearchArray.length; j++) {
    addSuggestMovieItem(recommendSearchArray[j]);
  }
  if (recommendSearchArray.length > 5) {
    searchSuggest.style.height = "400px";
    searchSuggest.style.overflow = "auto";
  }
}

function addSuggestMovieItem(movieID) {
  let suggestMovieData={};
  for (let i = 0; i < data.length; i++) {
    if (movieID === data[i].id) {
      suggestMovieData=data[i];
    }
  }
  searchSuggestList.innerHTML += `
    <li class="suggest-item" id='${suggestMovieData.id}'>
      <div class="suggest-item-img"><img src='${suggestMovieData.images.small}' /></div>
      <span class="suggest-item-name">${suggestMovieData.title}</span>
      <span class="suggest-item-rating">${judgeAverage(suggestMovieData.rating.average)}</span>
    </li>`
}

searchSuggest.addEventListener("click", function(event){
  let target = event.target;
  if ("suggest-item" === target.className) {
    window.location.href = "./movieDetails.html?id=" + target.id;
  } else {
    window.location.href = "./movieDetails.html?id=" + target.parentNode.id;
  }
}); 

function judgeAverage(average) {
  return average.toString().length === 1 ? `${average}.0` : average;
}