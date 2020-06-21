import React from 'react'
import {apiTweetCreate} from './lookup'
import { createPortal } from 'react-dom'

export function TweetCreate(props) {
  const textAreaRef = React.createRef()
  const {didTweet} = props

    const handleServerResponse = (response, status) => {
      // Service response handler
      if (status === 201) {
        didTweet(response)
      } else if (status === 403){
        console.log(response)
        alert("Please login to post a message")
      } else {
        alert("An error has occured")
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
            <form onSubmit={handleSubmit}>
                <textarea  ref={textAreaRef} required={true} className='form-control'>
                </textarea>
                <button type='submit' className='btn btn-primary my-3'> Tweet Now</button>
            </form>
        </div>
}


