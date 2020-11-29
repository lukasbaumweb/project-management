import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBj6l2AXCJcBJiwEDGZSz27myliPFjuIVk',
  authDomain: 'project-management-15b9d.firebaseapp.com',
  databaseURL: 'https://project-management-15b9d.firebaseio.com',
  projectId: 'project-management-15b9d',
  storageBucket: 'project-management-15b9d.appspot.com',
  messagingSenderId: '1011835631663',
  appId: '1:1011835631663:web:e3b74d40454bbb0fb8aeda',
  measurementId: 'G-B04K87GW6H',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

const fire = { auth, firestore, firebaseApp };
export default fire;
