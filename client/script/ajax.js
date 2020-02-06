let movieDetailData;
let data;

window.ajax = function (options) {
  const ajaxData = {
    url: options.url || "",
    method: options.method.toLocaleUpperCase() || "",
    headers: options.headers || {},
    data: options.data || null,
    success: options.success || function (result) { },
    fail: options.fail || function (error) { }
  }
  let xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
  };
  xhr.open(ajaxData.method, ajaxData.url, true);
  if (ajaxData.method === 'POST' || ajaxData.method === 'PUT') {
    xhr.setRequestHeader('content-type', 'application/json');
    ajaxData.data = JSON.stringify(ajaxData.data);
  }
  xhr.onerror = () => ajaxData.fail(xhr.status);
  xhr.onload = () => ajaxData.success(JSON.parse(xhr.responseText));
  xhr.send(ajaxData.data);
};