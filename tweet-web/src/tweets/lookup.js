import {backendLookup} from '../lookup'

export const apiTweetCreate = function (newTweet, callback) {
    backendLookup("POST", "/tweets/create/", callback, {content: newTweet})
  }

export const apiTweetAction = function(tweetId, action, callback) {
    const data = {id: tweetId, action: action}
    backendLookup('POST', '/tweets/action/', callback, data)   
}
  
export const apiTweetList = function(username, callback) {
    let endpoint = "/tweets"
    if (username) {
        endpoint = `/tweets/?username=${username}`
    }
    backendLookup('GET', endpoint, callback)  
}

export const apiTweetDetail = function(tweet_id, callback) {
    backendLookup('GET', `/tweets/${tweet_id}`, callback)  
}
