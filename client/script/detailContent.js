let thisURL = document.URL;
let getIdFromURL = thisURL.split("?")[1];
// let movieDetailPageId = getIdFromURL.split("=")[1];
//暂时使用固定PageID
let movieDetailPageId= 26942674;
let movieDetailData ;
ajax({
  url: BASIC_URL + '/v2/movie/subject/' + movieDetailPageId,
  method: 'GET',
  success: function (responseText) {
    movieDetailData = responseText;
    console.log(movieDetailData);//试验data数据格式
  }
})