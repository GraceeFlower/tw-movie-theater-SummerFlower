let header = document.getElementsByTagName("header")[0];
let BASIC_URL = 'http://127.0.0.1:8888';

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
  if (-1 === searchMovieId) {
    window.location.href = "./movieNotFound.html?searchContent=" + searchContent;
  } else {
    movieDetailPageId = searchMovieId;
    window.location.href = "./movieDetails.html?id=" + movieDetailPageId;
  }
}

//对于输入框的事件监听函数，可以得到包含该字符的所有电影的ID，并存入recommendSearchArray数组
//调用了isABitContain函数，用于判断是否又包含目前内容为名字的电影，并返回数组
let recommendSearchArray = [];
topSearchInput.addEventListener("input", function(event){
  let searchContent = event.target.value;
  recommendSearchArray = isABitContain(searchContent);
})

function isABitContain(searchContent) {
  let containThisMovieArray = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].title.indexOf(searchContent)>=0) {
      containThisMovieArray.push(data[i].id);
    }
  }
  return containThisMovieArray;
}


let searchSuggest=document.getElementsByClassName("search-suggest")[0];
let searchSuggestList=document.getElementsByClassName("search-suggest-list")[0];

//为input框增加下拉框，内部显示之前得到的模糊数据
//其中触发条件是点击input框
//特别的，设置了下拉框格式，如果太长则用overflow，否则就按照个数限制长度
topSearchInput.addEventListener("click", function(event){
  if(recommendSearchArray!==[]){
    searchSuggest.style.display = "block";
    searchSuggest.style.height = "auto";
    searchSuggestList.innerHTML ="";
    for(let j=0;j<recommendSearchArray.length;j++){
      addSuggestMovieItem(recommendSearchArray[j]);
    }
    if(recommendSearchArray.length>5){
      searchSuggest.style.height = "400px";
      searchSuggest.style.overflow = "auto";
    }
  }
  
})

function addSuggestMovieItem(movieID) {
  let suggestMovieData={};
  for (let i = 0; i < data.length; i++) {
    if (movieID === data[i].id) {
      suggestMovieData=data[i];
    }
  }
  searchSuggestList.innerHTML += `
    <li class="suggest-item" id='${suggestMovieData.id}'>
      <image class="suggest-item-img" src='${suggestMovieData.images.small}' >
      <span class="suggest-item-name">${suggestMovieData.title}</span>
      <span class="suggest-item-rating">${suggestMovieData.rating.average}</span>
    </li>`
}

searchSuggest.addEventListener("click", function(event){
  let target = event.target;
  console.log(target);
  if ("suggest-item" === target.className) {
    window.location.href = "./movieDetails.html?id=" + target.id;
  }  else {
    window.location.href = "./movieDetails.html?id=" + target.parentNode.id;
  }
}) 