let header = document.getElementsByTagName("header")[0];

loadSearchData();

function isContain(searchContent) {
  for (let item in data) {
    if (searchContent === data[item].title) {
      return data[item].id;
    }
  }
  return -1;
}

let topSearchInput = document.getElementsByClassName("top-search-input")[0];
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

function addSuggestMovieItem(movieID) {
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
});

function judgeAverage(average) {
  return average.toString().length === 1 ? `${average}.0` : average;
}