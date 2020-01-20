// import something here
import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import VueFirestore from 'vue-firestore'

Vue.use(VueFirestore)
// "async" is optional
export default async ({ Vue }) => {
  // something to do
  const firebaseConfig = {
    apiKey: 'AIzaSyCK1p5sAExT8GPCT9j9rx4KIm0G77JzYQI',
    authDomain: 'tolis-rzip.firebaseapp.com',
    databaseURL: 'https://tolis-rzip.firebaseio.com',
    projectId: 'tolis-rzip',
    storageBucket: 'tolis-rzip.appspot.com',
    messagingSenderId: '712378943190',
    appId: '1:712378943190:web:385e5a4f914cd2ec89ab77',
    measurementId: 'G-48W4NP37CM'
  }

  firebase.initializeApp(firebaseConfig)
  // firebase.analytics()
  // var db = firebase.firestore()
  Vue.prototype.$firebase = firebase
}
