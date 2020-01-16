let BASIC_URL = 'http://127.0.0.1:8888';
const movieMenu = document.getElementsByClassName('classification')[0];

const top250 = 'top250';
let data;

function loadItems() {
  ajax({
    url: BASIC_URL + '/v2/movie/' + top250 + '?start=0&count=10',
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
