export const loadTweets = function(callback) {
    const method = 'GET'
    const url = "http://localhost:8000/api/tweets/"
    const responseType = 'json'
    const xhr = new XMLHttpRequest()
    xhr.responseType = responseType
    xhr.open(method, url)
    xhr.onload = function() {
      callback(xhr.response, xhr.status)
    }
    xhr.onerror = function(e) {
      console.log(e)
      callback({"message": "There was an error"}, 400)
    }
    xhr.send()
  
  }