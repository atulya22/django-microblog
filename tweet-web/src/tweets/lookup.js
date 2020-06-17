import {backendLookup} from '../lookup'

export const apiTweetCreate = function (newTweet, callback) {
    backendLookup("POST", "/tweets/create/", callback, {content: newTweet})
  }
  
export const apiTweetList = function(callback) {
    backendLookup('GET', '/tweets/', callback)  
}