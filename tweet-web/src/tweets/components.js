import React, {useEffect, useState} from 'react'
import {TweetsList} from './list'
import {TweetCreate} from './create'
import {apiTweetDetail} from './lookup'
import {FeedList} from './feed'

import {Tweet} from './detail'

export function FeedComponents(props) {

  const [newTweets, setNewTweets] = useState([])
  const canTweet = props.canTweet === "false" ? false : true

  const handleNewTweet = (newTweet) => {
    let tempNewTweets = [...newTweets]
    tempNewTweets.unshift(newTweet)
    setNewTweets(tempNewTweets)
  }

  return <div className={props.className}>
      {canTweet && <TweetCreate didTweet={handleNewTweet} className='col-12 mb-3'/>}
      <FeedList newTweets={newTweets} {...props}/>
  </div> 
}

export function TweetsComponents(props) {

    const [newTweets, setNewTweets] = useState([])
    const canTweet = props.canTweet === "false" ? false : true

    const handleNewTweet = (newTweet) => {
      let tempNewTweets = [...newTweets]
      tempNewTweets.unshift(newTweet)
      setNewTweets(tempNewTweets)
    }

    return <div className={props.className}>
        {canTweet && <TweetCreate didTweet={handleNewTweet} className='col-12 mb-3'/>}
        <TweetsList newTweets={newTweets} {...props}/>
    </div> 
}

export function TweetDetailComponent(props) {
  const {tweetId} = props
  const [didLookup, setDidLookUp] = useState(false)
  const [tweet, setTweet] = useState(null)

  const handleServerResponse = (response, status) => {
      if (status === 200) {
        setTweet(response)
      } else {
        alert("Error finding tweet")
      }
  }
  useEffect(()=>{

    if(didLookup === false){
      apiTweetDetail(tweetId, handleServerResponse)
      setDidLookUp(true)
    }
  }, [tweetId, didLookup, setDidLookUp])

  return tweet === null ? null : <Tweet tweet={tweet} className={props.className} />
}


