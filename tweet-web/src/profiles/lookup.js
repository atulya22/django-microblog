import {backendLookup} from '../lookup'


export const apiProfileDetail = function(username, callback) {
    backendLookup('GET', `/profile/${username}`, callback)  
}

export const apiProfileFollowToggle = function(username, action, callback) {
    console.log("Error")
    console.log(`/profile/${username}/follow/`)
    const data = {action:`${action && action}`.toLowerCase()}
    backendLookup('POST', `/profile/${username}/follow/`, callback, data)  
}
