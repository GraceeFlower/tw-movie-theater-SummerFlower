let header = document.getElementsByTagName("header")[0];
let BASIC_URL = 'http://127.0.0.1:8888';
const movieMenu = document.getElementsByClassName('classification')[0];

//设置一个最大全局变量 所有页面都包含这个参数，只有详情页读取详情内容用这个参数
window.movieDetailPageId;

const top250 = 'top250';
let data;

function loadItems() {
  ajax({
    url: BASIC_URL + '/v2/movie/' + top250,
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

//searchContent函数在点击搜索时触发，用于查找搜索内容是否包含在数据库，并且进行对应跳转操作
//内部调用了isContain函数
//用了一个dom，即搜索框内输入的内容
//无返回值，直接跳到新的页面， ！！！但现在还需考虑得到的ID如何传递
let topSearchInput = document.getElementsByClassName("top-search-input")[0];
function searchOperate() {
  let searchContent = topSearchInput.value;
  let searchMovieId = isContain(searchContent);
  alert(searchMovieId);
  if (-1 === searchMovieId) {
    alert("mei");//检测方法，之后要跳转到404页面
    window.location.href = "./index.html";
  } else {
    alert(searchMovieId);//检测方法，之后要跳转到新的详情页面
    //设置一个最大全局变量 所有页面都包含这个参数，只有详情页读取详情内容用这个参数
    movieDetailPageId = searchMovieId;
    window.location.href = "./movieDetails.html?id="+movieDetailPageId;
  }
}

function loadMovieMenu(data) {
  const movieClass = new Set(data.reduce((pre, cur) => pre.concat(cur.genres), []));
  movieClass.forEach(item => {
    movieMenu.innerHTML += `<span>${item}</span>`;
  })
}