import React, {useState, useEffect} from 'react'
import {apiProfileDetail, apiProfileFollowToggle} from './lookup'

import {UserDisplay, UserPicture} from './components'
import {DisplayCount} from './utils'


function ProfileBadge(props) {
  const{user, didFollowToggle, profileLoading} = props
  let currentAction = (user && user.is_following) ? "Unfollow" : "Follow"
  currentAction = profileLoading ? "Loading..." : currentAction
  console.log(user)
  const handleFollowToggle = (event) => {
    event.preventDefault()
    console.log(event)
    if (didFollowToggle && !profileLoading) {
        didFollowToggle(currentAction)
    }
  }

return user ? 
      <div>
        <UserPicture user={user} hideLink />
         <p><UserDisplay user={user} includeFullName hideLink /> </p>
         <p><DisplayCount>{user.follower_count}</DisplayCount> {user.follower_count === 1 ? "follower" : "followers"}</p>
         <p>Following <DisplayCount>{user.following_count}</DisplayCount></p>
         <p>{user.location}</p>
         <p>{user.bio}</p>
         <button onClick={handleFollowToggle} className='btn btn-primary'>{currentAction}</button>
      </div> 
      : null
}

export function ProfileBadgeComponent(props) {
    const {username} = props

    const [didLookup, setDidLookUp] = useState(false)
    const [profile, setProfile] = useState(null)
    const [profileLoading, setProfileLoading] = useState(false)

  
    const handleServerResponse = (response, status) => {
        if (status === 200) {
          setProfile(response)
        }
    }
    useEffect(()=> {
  
      if(didLookup === false){
        apiProfileDetail(username, handleServerResponse)
        setDidLookUp(true)
      }
    }, [username, didLookup, setDidLookUp])

    const handleNewFollow = (currentAction) => {
      console.log(currentAction)
      apiProfileFollowToggle(username, currentAction, (response, status) => {
        console.log(response, status)
        if (status ===200) {
          setProfile(response)
        }
        setProfileLoading(false)

      })
      setProfileLoading(true)

    }
    return didLookup === false ? "Loading..." : profile ? <ProfileBadge user={profile} didFollowToggle={handleNewFollow} profileLoading={profileLoading}/> : null
}