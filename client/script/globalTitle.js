let header = document.getElementsByTagName("header")[0];
let BASIC_URL = 'http://127.0.0.1:8888';
let movieId = '26942674';

const top250 = 'top250';
let data;

function loadItems() {
  ajax({
    url: BASIC_URL + '/v2/movie/' + top250,
    method: 'GET',
    success: function (responseText) {
      data = responseText.subjects;
      console.log(data[0].title);//试验data数据格式
      console.log(data[1]);
    }
  })
}
loadItems();

//isContain函数用于查找搜索框所写电影名是否在top250的前100的影片库内
//其中searchContent是传入参数，代表传入搜索框内容
// 返回值若在影片库内，返回影片ID 若不在影片库内，返回-1
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
  alert(searchMovieId);
  if (-1 === searchMovieId) {
    alert("mei");
    window.location.href = "./index.html";
  } else {
    alert(searchMovieId);
    window.location.href = "./index.html";
  }
}

header.addEventListener("click", function (event) {
  let target = event.target;
  switch (target.className) {
    case ("top-logo-icon"):
      window.location.href = "./index.html";
      break;
    case ("top-logo-name"):
      window.location.href = "./index.html";
      break;
    case ("top-search-button"):
      searchOperate();
      break;
  }
})
