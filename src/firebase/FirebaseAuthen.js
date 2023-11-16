import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
// import { auth } from "./firebaseconfig";
const auth = getAuth();
const FirebaseAuthen = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [userInfo, setUserInfo] = useState("");
  onAuthStateChanged(auth, (currentUser) => {
    setUserInfo(currentUser);
  });

  const handelInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  //   console.log(values);

  const handleCreateUser = async (e) => {
    e.preventDefault();

    console.log("auth", auth);

    // createUserWithEmailAndPassword(auth, values.email, values.password)
    //   .then((userCredential) => {
    //     // Signed up
    //     const user = userCredential.user;
    //     console.log("user register", user);
    //     // ...
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // ..

    //     console.log("error", errorCode + " " + errorMessage);
    //   });

    await createUserWithEmailAndPassword(auth, values.email, values.password);

    console.log("create user successfully");
  };

  const handelSingout = () => {
    signOut(auth);
  };

  return (
    <div className="w-full max-w-[500px] mx-auto  bg-white shadow-lg p-5 mb-10">
      <form onSubmit={handleCreateUser}>
        <input
          type="email"
          className="p-3 rounded border border-gray-200 w-full mb-5 outline-none focus:border-blue-500"
          placeholder="Enter your email"
          name="email"
          onChange={handelInputChange}
        />
        <input
          type="password"
          className="p-3 rounded border border-gray-200 w-full mb-5 outline-none focus:border-blue-500"
          placeholder="Enter your password"
          name="password"
          onChange={handelInputChange}
        />

        <button
          type="submit"
          className="p-3 bg-green-500 text-white text-sm font-medium w-full rounded-lg"
        >
          SingUp
        </button>
      </form>
      <div className="mt-10 flex items-center gap-x-5">
        <span>{userInfo?.email}</span>
        <button
          className="p-3 bg-purple-500 text-white text-sm font-medium rounded-lg"
          onClick={handelSingout}
        >
          SignOut
        </button>
      </div>
    </div>
  );
};

export default FirebaseAuthen;
