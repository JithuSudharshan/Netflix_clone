import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyA66tNrZPNI_ihzvVru_U7FvaslduQc3ZQ",
  authDomain: "netflix-clone-277dc.firebaseapp.com",
  projectId: "netflix-clone-277dc",
  storageBucket: "netflix-clone-277dc.firebasestorage.app",
  messagingSenderId: "895198490591",
  appId: "1:895198490591:web:3f1aaf8d35eb96c16f1e6a",
  measurementId: "G-GF4KRDQV3P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = res.user;
    await addDoc(collection(db,"user"), {
      u_id: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};
const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};
export{
    auth,
    db,
    signup,
    login,
    logout
}
