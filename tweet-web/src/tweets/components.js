import React, {useEffect, useState} from 'react'
import {apiTweetAction, apiTweetList, apiTweetCreate} from './lookup'

export function TweetsComponents(props) {
    console.log(props)
    const textAreaRef = React.createRef()
    const [newTweets, setNewTweets] = useState([])
    const canTweet = props.canTweet === "false" ? false : true

    const handleServerResponse = (response, status) => {
      // Service response handler
      let tempNewTweets = [...newTweets]
      if (status === 201) {
        tempNewTweets.unshift(response)
        setNewTweets(tempNewTweets)
      } else {
        console.log(response)
        alert("An error occured")
      }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const newVal = textAreaRef.current.value 
        // Perform backend request
        apiTweetCreate(newVal, handleServerResponse)
  
        textAreaRef.current.value = ''
    }

    return <div className={props.className}>
        {canTweet && <div className='col-12 mb-3'>
            <form onSubmit={handleSubmit}>
                <textarea  ref={textAreaRef} required={true} className='form-control'>
                </textarea>
                <button type='submit' className='btn btn-primary my-3'> Tweet Now</button>
            </form>
        </div>}
        <TweetsList newTweets={newTweets} {...props}/>
    </div> 
}

export function ActionBTN(props) {
    const {tweet, action, didPerformAction} = props 
    const likes = tweet.likes ? tweet.likes : 0

    const className = props.className ? props.className : 'btn btn-primary btn-sm'
    const actionDisplay = action.display ? action.display : 'Action'

    const handleServerResponse = (response, status) => {
      console.log(response)
      console.log(status)
      if ((status === 200 || status ===201) && didPerformAction) {
        didPerformAction(response, status)
      }
    }

    const handleClick = (event) => {
        event.preventDefault()
        apiTweetAction(tweet.id, action.type, handleServerResponse)
        console.log(action.type)
    }

    const display = action.type === 'like' ? `${likes} ${actionDisplay}` : actionDisplay

    return <button className={className} onClick={handleClick}> {display} </button>
  }
  
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
       {(actionTweet && hideActions !== true) && <div className='btn btn-group'>
        <ActionBTN tweet={actionTweet} didPerformAction={handlePerformAction}  action={likeAction} />
        <ActionBTN tweet={actionTweet} didPerformAction={handlePerformAction}  action={unlikeAction} />
        <ActionBTN tweet={actionTweet} didPerformAction={handlePerformAction}  action={retweetAction} />
      </div>
      }
    </div>
  }

  
 export function TweetsList(props) {
    const [tweetsInit, setTweetsInit] = useState([])
    const [tweets, setTweets] = useState([])
    const [tweetsDidSet, setTweetsDidSet] = useState(false)

    useEffect(()=>{
        let final = [...props.newTweets].concat(tweetsInit)
        if (final.length !== tweets.length){
            setTweets(final)
        }

    }, [props.newTweets, tweets, tweetsInit])
  
    useEffect(() => {
      //perform lookup
      if (tweetsDidSet === false) {
        const handleTweetListResponse  = (response, status) => {
          if (status === 200) {
              setTweetsInit(response)
              setTweetsDidSet(true)
          } else{
            alert("There was an error")
          }
        }
        apiTweetList(props.username, handleTweetListResponse)
    }
    }, [tweetsInit, tweetsDidSet, setTweetsDidSet, props.username])

    const handleDidRetweet = (newTweet) => {
      const updatedTweetsInit = [...tweetsInit]
      updatedTweetsInit.unshift(newTweet)
      setTweetsInit(updatedTweetsInit)

      const updateFinalTweets = [...tweets]
      updateFinalTweets.unshift(newTweet)
      setTweets(updateFinalTweets)
    }
  
    return tweets.map((item, index)=>  {
      return <Tweet 
      tweet={item} 
      didRetweet={handleDidRetweet}
      className="my-5 py-5 border bg-white text-dark" key={`${index}--{item.id}`}/>
    })
  
  }