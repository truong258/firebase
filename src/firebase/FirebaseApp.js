import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
  onSnapshotsInSync,
  serverTimestamp,
  updateDoc,
  where,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebaseconfig";

const FirebaseApp = () => {
  const colRef = collection(db, "posts");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [postId, setPostId] = useState("");
  const [posts, setPosts] = useState([]);
  const [titleUpdate, setTitleUpdate] = useState("");
  const [authorUpdate, setAuthorUpdate] = useState("");
  console.log(colRef);
  useEffect(() => {
    // getDocs(colRef)
    //   .then((snapshot) => {
    //     //   console.log("snapshot", snapshot);
    //     let posts = [];
    //     snapshot.docs.forEach((doc) => {
    //       posts.push({
    //         id: doc.id,
    //         ...doc.data(),
    //       });
    //     });
    //     setPosts(posts);
    //     console.log("post", posts);
    //   })
    //   .catch((error) => {
    //     console.log("error", error);
    //   });
    //2. update real time
    onSnapshot(colRef, (snapshot) => {
      let posts = [];
      snapshot.docs.forEach((doc) => {
        posts.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(posts);
    });
  }, []);

  const handelAddPost = (e) => {
    e.preventDefault();
    addDoc(colRef, {
      title,
      author,
      createAt: serverTimestamp(),
    })
      .then(() => {
        console.log("submit success");
      })
      .catch((e) => {
        console.log("error", e);
      });
  };

  const handelRemovePost = async (e) => {
    e.preventDefault();
    const colRefDelete = doc(db, "posts", postId);
    await deleteDoc(colRefDelete);
    console.log("sucess");
  };
  const handelUpdatePost = async (e) => {
    e.preventDefault();
    const colRefUpdate = doc(db, "posts", postId);
    await updateDoc(colRefUpdate, {
      title: titleUpdate,
      author: authorUpdate,
    });
  };

  useEffect(() => {
    const q = query(colRef, limit(2));
    onSnapshot(q, (snapshot) => {
      let posts = [];
      snapshot.docs.forEach((doc) => {
        posts.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      console.log("post limit", posts);
    });
  }, []);

  useEffect(() => {
    const querywhere = query(colRef, where("author", "==", "coffee"));
    onSnapshot(querywhere, (snapshot) => {
      let postwhere = [];
      snapshot.docs.forEach((doc) => {
        postwhere.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      console.log("query where", postwhere);
    });
  }, []);

  return (
    <div className="p-10">
      <div className="w-full max-w-[500px] mx-auto  bg-white shadow-lg p-5 mb-10">
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
      <div className="w-full max-w-[500px] mx-auto  bg-white shadow-lg p-5 mb-10">
        <form onSubmit={handelRemovePost}>
          <input
            type="text"
            className="p-3 rounded border border-gray-200 w-full mb-5 outline-none focus:border-blue-500"
            placeholder="Enter id"
            name="postId"
            onChange={(e) => setPostId(e.target.value)}
          />

          <button
            type="submit"
            className="p-3 bg-red-500 text-white text-sm font-medium w-full rounded-lg"
          >
            Remove post
          </button>
        </form>
      </div>
      <div className="w-full max-w-[500px] mx-auto  bg-white shadow-lg p-5 mb-10">
        <form onSubmit={handelUpdatePost}>
          <input
            type="text"
            className="p-3 rounded border border-gray-200 w-full mb-5 outline-none focus:border-blue-500"
            placeholder="Enter id you want update"
            name="postId"
            onChange={(e) => setPostId(e.target.value)}
          />
          <input
            type="text"
            className="p-3 rounded border border-gray-200 w-full mb-5 outline-none focus:border-blue-500"
            placeholder="Enter title you want update"
            name="postId"
            onChange={(e) => setTitleUpdate(e.target.value)}
          />
          <input
            type="text"
            className="p-3 rounded border border-gray-200 w-full mb-5 outline-none focus:border-blue-500"
            placeholder="Enter author you want update"
            name="postId"
            onChange={(e) => setAuthorUpdate(e.target.value)}
          />

          <button
            type="submit"
            className="p-3 bg-green-500 text-white text-sm font-medium w-full rounded-lg"
          >
            Update post
          </button>
        </form>
      </div>
      <div className="w-full max-w-[500px] mx-auto  bg-white shadow-lg p-5 mb-10">
        {posts.length > 0 &&
          posts.map((item) => (
            <div key={item.title}>
              <div>
                {item.title}-{item.author}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FirebaseApp;
