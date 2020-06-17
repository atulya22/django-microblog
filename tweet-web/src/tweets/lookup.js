import {backendLookup} from '../lookup'

export const apiTweetCreate = function (newTweet, callback) {
    backendLookup("POST", "/tweets/create/", callback, {content: newTweet})
  }

export const apiTweetAction = function(tweetId, action, callback) {
    const data = {id: tweetId, action: action}
    backendLookup('POST', '/tweets/action/', callback, data)   
}
  
export const apiTweetList = function(callback) {
    backendLookup('GET', '/tweets/', callback)  
}

