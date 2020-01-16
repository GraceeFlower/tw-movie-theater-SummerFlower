let thisURL = document.URL;
let getIdFromURL = thisURL.split("?")[1];
let movieDetailPageId = getIdFromURL.split("=")[1];
let movieDetailData;
ajax({
  url: BASIC_URL + '/v2/movie/subject/' + movieDetailPageId,
  method: 'GET',
  success: function (responseText) {
    movieDetailData = responseText;
    // console.log(movieDetailData);//试验data数据格式
    // console.log(getMainActor(movieDetailData.casts));
    // console.log(getMovieStyle(movieDetailData.genres));
    renderMovieDetail(responseText);
  }
})

let movieTitleAndDate = document.getElementsByClassName("movie-title-and-date")[0];
let moviePoster = document.getElementsByClassName("movie-poster")[0];
let movieDetail = document.getElementsByClassName("movie-detail")[0];
let movieWatchLink = document.getElementsByClassName("movie-watch-link")[0];
let movieStoryIntro = document.getElementsByClassName("movie-story-intro")[0];
let movieReviews = document.getElementsByClassName("movie-reviews")[0];

// //需要的信息在数组内的一个元素的一个属性中[{a:1},{},{},{}]
// function getPeopleDetail(peopleList){
//   let returnContent=""
//   for(let i =0;i<peopleList.length;i++){
//     returnContent = returnActor+peopleList[i].name+",";
//   }
//   return returnContent.slice(0,-1);
// }
// //如果需要的信息直接在数组内的取出方法[a,b,c,d]
// function getNotpeopleDetail(notPeopleList){
//   return notPeopleList.join(",");
// }

const detailPage = document.getElementsByClassName('detail-page-content')[0];

function renderMovieDetail(movie) {
  detailPage.innerHTML = `
    <h1 class="movie-title-and-date">${movie.title}-${movie.original_title}(${movie.year})</h1>
    <div class="movie-poster-and-detail">
      <div class="movie-poster"><img src="${movie.images.small}" alt=""/></div>
      <div class="movie-detail">
        <div><span class="detail-name">导演：</span><span class="detail-text">${composeName(movie.directors)}</div>
        <div><span class="detail-name">主演：</span><span class="detail-text">${composeName(movie.casts)}</div>
        <div><span class="detail-name">类型：</span><span class="detail-text">${movie.genres.join(',')}</div>
        <div><span class="detail-name">制作国家/地区：</span><span class="detail-text">${movie.countries.join(',')}</div>
        <div><span class="detail-name">语言：</span><span class="detail-text">${movie.languages.join(',')}</div>
        <div><span class="detail-name">片长：</span><span class="detail-text">${movie.durations.join(',')}</div>
        <div><span class="detail-name">上映时间：</span><span class="detail-text">${movie.pubdates.join(',')}</div>
        <div><span class="detail-name">豆瓣评分：</span><span class="detail-text">${movie.rating.average}</div>
      </div>
    </div>
    <div class="movie-story-intro">
      <div class="item-title">剧情介绍</div>
      <p>${movie.summary}</p>
    </div>
    <div class="movie-reviews">
      <div class="item-title">豆瓣热评Top5</div>
      <div class="comment-list">${renderComment(movie.popular_reviews.slice(0, 5))}</div>
    </div>
  `
} 

function composeName(nameArr) {
  let res = [];
  nameArr.forEach(item => res.push(item.name));
  return res.join(',');
}

function renderComment(comment) {
  return comment.reduce((whole, item) => whole += `
  <div class="commenter-info">
    <img src="${item.author.avatar}" alt="${item.author.uid}" />
    <span class="commenter-name">${item.author.name}</span>
    <span class="comment-title">${item.title}</span>
    <div class="comment-text">${item.summary}</div>
  </div>`, '');
}