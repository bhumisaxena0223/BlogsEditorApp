import firebase from 'firebase/app'
import 'firebase/auth'

// The configuration below is not sensitive data. You can serenely add your config here
const config = {
  apiKey: 'AIzaSyDgpiIMguPMiUvYS9T-BCYklml6-i3STNY',
  authDomain: 'blogging-highlight-content.firebaseapp.com',
  projectId: 'blogging-highlight-content',
  storageBucket: 'blogging-highlight-content.appspot.com',
  messagingSenderId: '1048150172080',
  appId: '1:1048150172080:web:c1eafe0a48c25392d17675'
}

firebase.initializeApp(config)
