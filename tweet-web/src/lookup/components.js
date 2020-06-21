function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export function backendLookup(method, endpoint, callback, data) {
  let jsonData;

  if (data){
    jsonData = JSON.stringify(data)
  }
  const url = `https://tuly-microblog.herokuapp.com/api${endpoint}`
  const xhr = new XMLHttpRequest()
  xhr.responseType ='json'
  xhr.open(method, url)
  const csrftoken = getCookie('csrftoken')
  xhr.setRequestHeader("Content-Type", "application/json")

  if (csrftoken && method === 'POST') {
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
    xhr.setRequestHeader("X-CSRFTOKEN", csrftoken)

  }
  xhr.onload = function(e) {
    if (xhr.status === 403) {
      console.log("error", e)
      const detail = xhr.response.detail
      if (detail === "Authentication credentials were not provided.") {
        if (window.location.href.indexOf("login") === -1)
          window.location.href = "/login?showLoginRequired=true"
      }
    }
    callback(xhr.response, xhr.status)
  }
  xhr.onerror = function(e) {
    callback({"message": "There was an error"}, 400)
  }
  xhr.send(jsonData)
}