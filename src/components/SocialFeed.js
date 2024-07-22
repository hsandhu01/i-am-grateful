import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const SocialFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      const postsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(postsData);
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl mb-4">Social Feed</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-gray-100 p-4 rounded shadow">
            <h3 className="text-xl">{post.user}</h3>
            <p className="mt-2">{post.content}</p>
            {post.imageURL && <img src={post.imageURL} alt="Post" className="mt-2" />}
            <div className="flex justify-between items-center mt-4">
              <button className="bg-blue-500 text-white p-2 rounded">Like</button>
              <button className="bg-blue-500 text-white p-2 rounded">Comment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialFeed;