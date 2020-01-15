/**
options = {
  url: "",
  method: "",
  headers: {}, 
  data: "",
  success: function(result) {},  // 请求成功后调用此方法
  fail: function(error) {}    // 请求失败或出错后调用此方法
}
**/


window.ajax = function (options) {
  const ajaxData = {
    url: options.url || "",
    method: options.method.toLocaleUpperCase() || "",
    headers: options.headers || {},
    data: options.data || null,
    success: options.success || function (result) { },  // 请求成功后调用此方法
    fail: options.fail || function (error) { }    // 请求失败或出错后调用此方法
  }
  var xhr = null;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObjcet('Microsoft.XMLHTTP');
  };
  xhr.open(ajaxData.method,ajaxData.url,true);
  if(ajaxData.method==='POST'||ajaxData.method==='PUT'){
    xhr.setRequestHeader('content-type', 'application/json');
    ajaxData.data= JSON.stringify(ajaxData.data);
  }
  xhr.onerror=()=>{
    ajaxData.fail(xhr.stutas);
  }
  xhr.onload=()=>{
    ajaxData.success(JSON.parse(xhr.responseText));
  }
  xhr.send(ajaxData.data);
};



