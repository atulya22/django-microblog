import React, {useState} from 'react'
import {ActionBTN} from './buttons'

export function ParentTweet(props) {
    const {tweet} = props
    return tweet.parent ? <Tweet isRetweet retweeter={props.retweeter} hideActions className={' '} tweet={tweet.parent}/> : null
  }
  
  export function Tweet(props) {
    const {tweet, didRetweet, hideActions, isRetweet, retweeter}  = props
    const [actionTweet, setActionTweet] = useState(props.tweet ? props.tweet : null)
    let  className = props.className ? props.className : 'col-10 mx-auto col-md-6'
    className = isRetweet === true ? `${className} p-2 border rounded` : className
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
      {isRetweet === true && <div className="mb-2"> <span className="small text-muted">Retweet by @{retweeter.username}</span></div>}
      <div className="d-flex">
        <div className="">
          <span className="mx-1 px-3 py-2 rounded cirlce bg-dark text-white">
          {tweet.user.username[0]}
          </span>
        </div>
      <div className='col-11'>
      <div>
        <p>
          {tweet.user.first_name}{" "}
          {tweet.user.last_name}{" "}
          @{tweet.user.username}{" "}
        </p>
        <p>{tweet.content}</p>
        <ParentTweet tweet={tweet} retweeter={tweet.user}/>
      </div>
       <div className='btn btn-group px-0'>
       {(actionTweet && hideActions !== true) &&  <React.Fragment>
            <ActionBTN tweet={actionTweet} didPerformAction={handlePerformAction}  action={likeAction} />
            <ActionBTN tweet={actionTweet} didPerformAction={handlePerformAction}  action={unlikeAction} />
            <ActionBTN tweet={actionTweet} didPerformAction={handlePerformAction}  action={retweetAction} />
            </React.Fragment> 
       }
        {isDetail === true ? null : <button className='btn btn-outline-primary btn-sm' onClick={handleLink}>View</button>}

      </div>
      </div>
    </div>
    </div>

  }