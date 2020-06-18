import {backendLookup} from '../lookup'


export const apiProfileDetail = function(username, callback) {
    backendLookup('GET', `/profile/${username}`, callback)  
}
