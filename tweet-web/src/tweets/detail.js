import React, {useState} from 'react'
import {ActionBTN} from './buttons'

export function ParentTweet(props) {
    const {tweet} = props
    return tweet.parent ? <div className='row'>
      <div className='col-11 mx-auto p-3 border rounded'>
        <p className='mb-0 text-muted small'>Retweet</p>
        <Tweet hideActions className={' '} tweet={tweet.parent}/>
      </div> 
  </div> : null
  }
  
  export function Tweet(props) {
    const {tweet, didRetweet, hideActions}  = props
    const [actionTweet, setActionTweet] = useState(props.tweet ? props.tweet : null)
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6'
    const likeAction = {type: "like", display:"Likes"}
    const unlikeAction = {type: "unlike", display:"Unlikes"}
    const retweetAction = {type: "retweet", display:"Retweet"}

    const path = window.location.pathname
    var idRegex = /(?<tweetid>\d+)/
    const match = path.match(idRegex)
    const urlTweetId = match ? match.groups.tweetid : -1


    const isDetail = `${tweet.id}` === `${urlTweetId}`
  

    const handleLink = (event) => {
        event.preventDefault()
        window.location.href = `/${tweet.id}`
    }

    const handlePerformAction = (newActionTweet, status) => {
      if (status === 200) {
        setActionTweet(newActionTweet)
      } else if (status === 201) {
        if (didRetweet) {
          didRetweet(newActionTweet)
        }
      }
    }

    return <div className = {className}>
      <div>
        <p>{tweet.id} - {tweet.content}</p>
        <ParentTweet tweet={tweet} />
      </div>
       <div className='btn btn-group'>
       {(actionTweet && hideActions !== true) &&  <React.Fragment>
            <ActionBTN tweet={actionTweet} didPerformAction={handlePerformAction}  action={likeAction} />
            <ActionBTN tweet={actionTweet} didPerformAction={handlePerformAction}  action={unlikeAction} />
            <ActionBTN tweet={actionTweet} didPerformAction={handlePerformAction}  action={retweetAction} />
            </React.Fragment> 
       }
        {isDetail === true ? null : <button className='btn btn-outline-primary btn-sm' onClick={handleLink}>View</button>}

      </div>
    </div>
  }