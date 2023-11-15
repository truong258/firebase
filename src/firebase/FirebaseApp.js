import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebaseconfig";

const FirebaseApp = () => {
  const colRef = collection(db, "posts");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  console.log(colRef);
  useEffect(() => {
    getDocs(colRef)
      .then((snapshot) => {
        //   console.log("snapshot", snapshot);
        let posts = [];
        snapshot.docs.forEach((doc) => {
          posts.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        console.log("post", posts);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const handelAddPost = (e) => {
    e.preventDefault();
    addDoc(colRef, {
      title,
      author,
    })
      .then(() => {
        console.log("submit success");
      })
      .catch((e) => {
        console.log("error", e);
      });
  };

  return (
    <div className="p-10">
      <div className="w-full max-w-[500px] mx-auto  bg-white shadow-lg p-5 ">
        <form onSubmit={handelAddPost}>
          <input
            type="text"
            className="p-3 rounded border border-gray-200 w-full mb-5 outline-none focus:border-blue-500"
            placeholder="Enter title"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="p-3 rounded border border-gray-200 w-full mb-5 outline-none focus:border-blue-500"
            placeholder="Enter author"
            name="author"
            onChange={(e) => setAuthor(e.target.value)}
          />
          <button
            type="submit"
            className="p-3 bg-blue-500 text-white text-sm font-medium w-full rounded-lg"
          >
            Add post
          </button>
        </form>
      </div>
    </div>
  );
};

export default FirebaseApp;
