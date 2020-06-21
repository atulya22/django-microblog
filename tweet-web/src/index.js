import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {FeedComponents, TweetsComponents, TweetDetailComponent} from './tweets'
import * as serviceWorker from './serviceWorker';
import {ProfileBadgeComponent} from './profiles'

const appEl = document.getElementById('root')

if (appEl) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    appEl
  );
}

const e = React.createElement

const tweetEl= document.getElementById('tweetme')

if (tweetEl) {
  ReactDOM.render(e(TweetsComponents, tweetEl.dataset),
    tweetEl
  );
}

const tweetFeedEl= document.getElementById('tweetme-feed')

if (tweetFeedEl) {
  ReactDOM.render(e(FeedComponents, tweetFeedEl.dataset),
  tweetFeedEl
  );
}

const tweetDetailElements = document.querySelectorAll('.tweetme-detail')

tweetDetailElements.forEach(container => {
  ReactDOM.render(e(TweetDetailComponent, container.dataset), container );
})

const userProfileBadgeElement = document.querySelectorAll('.tweetme-profile-badge')

userProfileBadgeElement.forEach(container => {
  ReactDOM.render(e(ProfileBadgeComponent, container.dataset), container );
})


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
