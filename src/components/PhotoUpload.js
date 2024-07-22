import React, { useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const PhotoUpload = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      const storageRef = ref(storage, `photos/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          setError(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrl(downloadURL);
          });
        }
      );
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl mb-4">Upload a Photo</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} className="bg-blue-500 text-white p-2 rounded mt-2">
        Upload
      </button>
      {progress > 0 && <p>Upload Progress: {progress}%</p>}
      {url && (
        <div>
          <p>Uploaded Photo:</p>
          <img src={url} alt="Uploaded" className="mt-2" />
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;