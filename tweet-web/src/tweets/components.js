import React, {useEffect, useState} from 'react'
import {loadTweets} from '../lookup'

export function TweetsComponents(props) {


    const textAreaRef = React.createRef()

    const [newTweets, setNewTweets] = useState([])

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(event)
        console.log(textAreaRef.current.value)
        const newVal = textAreaRef.current.value 
        let tempNewTweets = [...newTweets]
        tempNewTweets.unshift({
            content: newVal,
            likes:0,
            id:newVal.id
        })
        setNewTweets(tempNewTweets)
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
        console.log("Here")
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

    console.log(props.newTweets)

    useEffect(()=>{
        let final = [...props.newTweets].concat(tweetsInit)
        if (final.length !== tweets.length){
            setTweets(final)
        }


    }, [props.newTweets, tweets, tweetsInit])
  
    useEffect(() => {
      //perform lookup
      const myCallBack  = (response, status) => {
        if (status === 200) {
            setTweetsInit(response)
        } else{
          alert("There was an error")
        }
      }
      loadTweets(myCallBack)
    }, [])
  
    return tweets.map((item, index)=>  {
      return <Tweet tweet={item} className="my-5 py-5 border bg-white text-dark" key={`${index}--{item.id}`}/>
    })
  
  }