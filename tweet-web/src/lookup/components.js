
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

function lookup(method, endpoint, callback, data) {
  let jsonData;

  if (data){
    jsonData = JSON.stringify(data)
  }
  const url = `http://localhost:8000/api${endpoint}`
  const xhr = new XMLHttpRequest()
  xhr.responseType ='json'
  xhr.open(method, url)
  const csrftoken = getCookie('csrftoken')
  xhr.setRequestHeader("Content-Type", "application/json")

  if (csrftoken && method === 'POST') {
    console.log("Has token")
    // xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest")
    // xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
    // xhr.setRequestHeader("X-CSRFTOKEN", csrftoken)

  }
  xhr.onload = function() {
    console.log("Lookup")
    callback(xhr.response, xhr.status)
  }
  xhr.onerror = function(e) {
    callback({"message": "There was an error"}, 400)
  }
  xhr.send(jsonData)
}

export function createTweet(newTweet, callback) {
  lookup("POST", "/tweets/create/", callback, {content: newTweet})

}

export const loadTweets = function(callback) {
    lookup('GET', '/tweets/', callback)  
  }