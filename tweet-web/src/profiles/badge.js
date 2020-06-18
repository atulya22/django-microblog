import React, {useState, useEffect} from 'react'
import {apiProfileDetail} from './lookup'

export function ProfileBadgeComponent(props) {
    const {username} = props

    const [didLookup, setDidLookUp] = useState(false)
    const [profile, setProfile] = useState(null)
  
    const handleServerResponse = (response, status) => {
        if (status === 200) {
          setProfile(response)
        }
    }
    useEffect(()=>{
  
      if(didLookup === false){
        apiProfileDetail(username, handleServerResponse)
        setDidLookUp(true)
      }
    }, [username, didLookup, setDidLookUp])
    return didLookup === false ? "Loading..." : profile ? <span>{profile.first_name}</span> : null
}