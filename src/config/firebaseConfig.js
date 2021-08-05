import firebase from 'firebase/app'
import "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyBv7ouJ7y9dGulq179Qhi0NfOM-_pFIoIY",
  authDomain: "pharma-supply-chain.firebaseapp.com",
  databaseURL: "https://pharma-supply-chain-default-rtdb.asia-southeast1.firebasedatabase.app"
};

firebase.initializeApp(firebaseConfig);
const databaseRef = firebase.database().ref();
export const allTransactionRef = databaseRef.child("allTransactions");

export default firebase;