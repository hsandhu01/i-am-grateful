import React, { useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const UserProfile = () => {
  const [displayName, setDisplayName] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [message, setMessage] = useState(null);

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      try {
        let photoURL = user.photoURL;

        if (profilePicture) {
          const storage = getStorage();
          const storageRef = ref(storage, `profilePictures/${user.uid}/${profilePicture.name}`);
          await uploadBytes(storageRef, profilePicture);
          photoURL = await getDownloadURL(storageRef);
        }

        await updateProfile(user, {
          displayName,
          photoURL,
        });

        setMessage('Profile updated successfully!');
      } catch (error) {
        setMessage(`Error updating profile: ${error.message}`);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold">Edit Profile</h1>
      <form onSubmit={handleSave} className="mt-4">
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
          <input type="file" onChange={handleProfilePictureChange} className="border p-2 w-full" />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Save
        </button>
        {message && <p className="mt-4">{message}</p>}
      </form>
    </div>
  );
};

export default UserProfile;