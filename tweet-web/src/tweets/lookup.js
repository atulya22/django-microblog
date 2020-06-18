import {backendLookup} from '../lookup'

export const apiTweetCreate = function (newTweet, callback) {
    backendLookup("POST", "/tweets/create/", callback, {content: newTweet})
  }

export const apiTweetAction = function(tweetId, action, callback) {
    const data = {id: tweetId, action: action}
    backendLookup('POST', '/tweets/action/', callback, data)   
}
  
export const apiTweetList = function(username, callback, nextUrl) {
    let endpoint = "/tweets"
    if (username) {
        endpoint = `/tweets/?username=${username}`
    }
    if (nextUrl != null && nextUrl !== undefined) {
        endpoint = nextUrl.replace("http://localhost:8000/api", "")
    }
    backendLookup('GET', endpoint, callback)  
}

export const apiTweetDetail = function(tweet_id, callback) {
    backendLookup('GET', `/tweets/${tweet_id}`, callback)  
}
