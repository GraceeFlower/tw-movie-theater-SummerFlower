let thisURL = document.URL;
let getIdFromURL = thisURL.split("?")[1];
let movieDetailPageId = getIdFromURL.split("=")[1];

console.log(movieDetailPageId);