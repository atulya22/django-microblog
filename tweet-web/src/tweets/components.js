import React, {useEffect, useState} from 'react'
import {apiTweetList, apiTweetCreate} from './lookup'

export function TweetsComponents(props) {


    const textAreaRef = React.createRef()

    const [newTweets, setNewTweets] = useState([])

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
        <div className='col-12 mb-3'>
            <form onSubmit={handleSubmit}>
                <textarea  ref={textAreaRef} required={true} className='form-control'>
                </textarea>
                <button type='submit' className='btn btn-primary my-3'> Tweet Now</button>
            </form>
        </div>
        <TweetsList newTweets={newTweets}/>
    </div> 
}

export function ActionBTN(props) {
    const {tweet, action} = props 
    const [likes, setLikes] = useState(tweet.likes ? tweet.likes : 0)
    const [userLike, setuserLike] = useState(tweet.userLike === true ? true : false)

    const className = props.className ? props.className : 'btn btn-primary btn-sm'
    const actionDisplay = action.display ? action.display : 'Action'
    const handleClick = (event) => {
        event.preventDefault()
        console.log(action.type)
        if(action.type === 'like') {
            if(userLike === true) {
                setLikes(likes - 1)
                setuserLike(!userLike)
            } else {
                setLikes(likes + 1)
                setuserLike(true)
            }
        }
    }

    const display = action.type === 'like' ? `${likes} ${actionDisplay}` : actionDisplay

    return <button className={className} onClick={handleClick}> {display} </button>
  }
  
  
  export function Tweet(props) {
    const {tweet} = props
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6'
    const likeAction = {type: "like", display:"Likes"}
    const unlikeAction = {type: "unlike", display:"Unlikes"}
    const retweetAction = {type: "retweet", display:"Retweet"}


    return <div className = {className}>
      <p>{tweet.id} - {tweet.content}</p>
      <div className='btn btn-group'>
        <ActionBTN tweet={tweet} action={likeAction} />
        <ActionBTN tweet={tweet} action={unlikeAction} />
        <ActionBTN tweet={tweet} action={retweetAction} />

      </div>
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
        apiTweetList(handleTweetListResponse)
    }
    }, [tweetsInit, tweetsDidSet, setTweetsDidSet])
  
    return tweets.map((item, index)=>  {
      return <Tweet tweet={item} className="my-5 py-5 border bg-white text-dark" key={`${index}--{item.id}`}/>
    })
  
  }