let nowSearchContent = "as";

// let topSearchInput = document.getElementsByClassName("top-search-input")[0];
let searchWhat = document.getElementsByClassName("search-what")[0];
let whatNotFound = document.getElementsByClassName("what-not-found")[0];

topSearchInput.value = nowSearchContent;
searchWhat.innerHTML = "搜索 " + nowSearchContent;
whatNotFound.innerHTML = '没有找到关于"' + nowSearchContent + '"的电影，请换个搜索词试试吧';