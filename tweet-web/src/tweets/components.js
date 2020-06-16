import React, {useEffect, useState} from 'react'
import {loadTweets} from '../lookup'

export function ActionBTN(props) {
    const {tweet, action} = props
    const className = props.className ? props.className : 'btn btn-primary btn-sm'
  
    return action.type === 'like' ? <button className={className}> {tweet.likes} Likes </button> : null
  }
  
  
  export function Tweet(props) {
    const {tweet} = props
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6'
    const action = {type: "like"}
    return <div className = {className}>
      <p>{tweet.id} - {tweet.content}</p>
      <div className='btn btn-group'>
        <ActionBTN tweet={tweet} action={action} />
      </div>
    </div>
  }

  
 export function TweetsList(props) {
    const [tweets, setTweets] = useState([{content: 12443}])
  
    useEffect(() => {
      //perform lookup
      const myCallBack  = (response, status) => {
        if (status === 200) {
          setTweets(response)
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