import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail
} from "firebase/auth";

import axios from "axios";
import { app } from "../fairebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Firebase user
  const [userInfo, setUserInfo] = useState(null); // DB user
  const [loading, setLoading] = useState(true);

  // ✅ Update DB User Info in context & localStorage
  const updateUserInfo = (updatedInfo) => {
    setUserInfo(updatedInfo);
    localStorage.setItem("realestate-user", JSON.stringify(updatedInfo));
  };

  // ✅ Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("realestate-user");
    if (stored) {
      setUserInfo(JSON.parse(stored));
    }
  }, []);

  // 🔐 Create User
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // ✏️ Update Firebase display name & photo
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo
    });
  };

  // 🔐 Sign in
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // 🔐 Google Sign In
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // 🔓 Sign out
  const logOut = () => {
    setLoading(true);
    localStorage.removeItem("realestate-user");
    setUserInfo(null);
    return signOut(auth);
  };

  // 🔁 Reset password
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // 👀 Track Firebase Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        axios
          .post("https://real-estate-server-gamma.vercel.app/jwt", { email: currentUser.email })
          .then((res) => {
            localStorage.setItem("access-token", res.data.token);
            setLoading(false);
          });
      } else {
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,               // Firebase user
    userInfo,           // DB user object
    updateUserInfo,     // Function to update userInfo
    loading,
    createUser,
    signIn,
    googleLogin,
    updateUserProfile,
    logOut,
    resetPassword,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;




















// import { createContext, useEffect, useState } from "react";
// import {
//   GoogleAuthProvider,
//   createUserWithEmailAndPassword,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
// } from "firebase/auth";
// import axios from "axios";
// import { auth } from "../fairebase/firebase.config";

// export const AuthContext = createContext();

// const googleProvider = new GoogleAuthProvider();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // Firebase Auth user
//   const [loading, setLoading] = useState(true);

//   const [userInfo, setUserInfo] = useState(null); // DB user info (photo, name etc)

//   // 🔰 Step 1: Load userInfo from localStorage on first load
//   useEffect(() => {
//     const stored = localStorage.getItem("realestate-user");
//     if (stored) {
//       setUserInfo(JSON.parse(stored));
//     }
//   }, []);

//   // 🔰 Step 2: Update localStorage + State together
//   const updateUserInfo = (updatedInfo) => {
//     setUserInfo(updatedInfo);
//     localStorage.setItem("realestate-user", JSON.stringify(updatedInfo));
//   };

//   // Auth methods
//   const createUser = (email, password) => {
//     setLoading(true);
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   const login = (email, password) => {
//     setLoading(true);
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   const googleLogin = () => {
//     setLoading(true);
//     return signInWithPopup(auth, googleProvider);
//   };

//   const logout = () => {
//     setLoading(true);
//     localStorage.removeItem("realestate-user");
//     return signOut(auth);
//   };

//   // Firebase Auth listener
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
//       setUser(loggedUser);
//       setLoading(false);

//       if (loggedUser?.email) {
//         axios.post("https://real-estate-server-gamma.vercel.app/jwt", { email: loggedUser.email })
//           .then(res => {
//             localStorage.setItem("access-token", res.data.token);
//           });
//       } else {
//         localStorage.removeItem("access-token");
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const authInfo = {
//     user,
//     userInfo,
//     loading,
//     createUser,
//     login,
//     googleLogin,
//     logout,
//     updateUserInfo,
//   };

//   return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
// };

// export default AuthProvider;

// // // ✅ Custom Hook
// // export const useAuth = () => useContext(AuthContext);
