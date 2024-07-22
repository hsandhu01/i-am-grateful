import React, { useState } from 'react';
import { auth, storage } from '../firebase';
import { updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const UserProfile = () => {
  const [displayName, setDisplayName] = useState(auth.currentUser.displayName || '');
  const [profilePic, setProfilePic] = useState(null);
  const [photoURL, setPhotoURL] = useState(auth.currentUser.photoURL || '');

  const handleSave = async () => {
    if (profilePic) {
      const storageRef = ref(storage, `profilePics/${auth.currentUser.uid}`);
      const uploadTask = uploadBytesResumable(storageRef, profilePic);

      uploadTask.on(
        'state_changed',
        null,
        (error) => {
          console.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(auth.currentUser, { displayName, photoURL: downloadURL });
            setPhotoURL(downloadURL);
          });
        }
      );
    } else {
      await updateProfile(auth.currentUser, { displayName });
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setProfilePic(e.target.files[0]);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl mb-4">Edit Profile</h2>
      <div className="mb-4">
        <label className="block mb-2">Display Name:</label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Profile Picture:</label>
        <input type="file" onChange={handleFileChange} />
      </div>
      <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded">Save</button>
      {photoURL && <img src={photoURL} alt="Profile" className="mt-4" />}
    </div>
  );
};

export default UserProfile;