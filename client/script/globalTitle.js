let header = document.getElementsByTagName("header")[0];
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