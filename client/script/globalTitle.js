let header = document.getElementsByTagName("header")[0];
let BASIC_URL = 'http://127.0.0.1:8888';
let movieId = '26942674';

const top250 = 'top250';
let data;

function loadItems(){
  ajax({
    url: BASIC_URL + '/v2/movie/' + top250,
    method:'GET',
    success:function (responseText){
      data = responseText;
      console.log(data);
    }
  })
}
loadItems();

header.addEventListener("click", function(event){
  let target = event.target;
  switch (target.className){
    case("top-logo-icon"):
    window.location.href="./index.html"
    break;
    case("top-logo-name"):
    window.location.href="./index.html"
    break;
  }
})

