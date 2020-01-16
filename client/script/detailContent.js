let thisURL = document.URL;
let getIdFromURL = thisURL.split("?")[1];
let movieDetailPageId = getIdFromURL.split("=")[1];
let movieDetailData;
ajax({
  url: BASIC_URL + '/v2/movie/subject/' + movieDetailPageId,
  method: 'GET',
  success: function (responseText) {
    movieDetailData = responseText;
    console.log(movieDetailData);//试验data数据格式
    console.log(getMainActor(movieDetailData.casts));
    console.log(getMovieStyle(movieDetailData.genres));
  }
})

let movieTitleAndDate = document.getElementsByClassName("movie-title-and-date")[0];
let moviePoster = document.getElementsByClassName("movie-poster")[0];
let movieDetail = document.getElementsByClassName("movie-detail")[0];
let movieWatchLink = document.getElementsByClassName("movie-watch-link")[0];
let movieStoryIntro = document.getElementsByClassName("movie-story-intro")[0];
let movieReviews = document.getElementsByClassName("movie-reviews")[0];

//需要的信息在数组内的一个元素的一个属性中[{a:1},{},{},{}]
function getPeopleDetail(peopleList){
  let returnContent=""
  for(let i =0;i<peopleList.length;i++){
    returnContent = returnActor+peopleList[i].name+",";
  }
  return returnContent.slice(0,-1);
}
//如果需要的信息直接在数组内的取出方法[a,b,c,d]
function getNotpeopleDetail(notPeopleList){
  return notPeopleList.join(",");
}
