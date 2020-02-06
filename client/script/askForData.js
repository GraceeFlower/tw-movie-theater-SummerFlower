let BASIC_URL = 'http://127.0.0.1:8888';
const top250 = 'top250';

let thisURL = document.URL;
let getIdFromURL = thisURL.split("?")[1];
let movieDetailPageId;

function findMovieId() {
  if (getIdFromURL) {
    movieDetailPageId = getIdFromURL.split("=")[1];
  }
}
findMovieId();

function loadItems() {
  ajax({
    url: BASIC_URL + '/v2/movie/' + top250 + '?start=0&count=100',
    method: 'GET',
    success: function (responseText) {
      data = responseText.subjects;
      loadMovieMenu(data);
    }
  });
}

function loadSearchData() {
  ajax({
    url: BASIC_URL + '/v2/movie/' + top250,
    method: 'GET',
    success: function (responseText) {
      data = responseText.subjects;
    }
  });
}

function loadDetailSearchData() {
  ajax({
    url: BASIC_URL + '/v2/movie/' + top250,
    method: 'GET',
    success: function (responseText) {
      data = responseText.subjects;
      findSimilarArray();
    }
  });
}

function loadDetailData() {
  ajax({
    url: BASIC_URL + '/v2/movie/subject/' + movieDetailPageId,
    method: 'GET',
    success: function (responseText) {
      movieDetailData = responseText;
      renderMovieDetail(responseText);
    }
  });
}