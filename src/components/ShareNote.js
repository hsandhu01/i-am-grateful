import React from 'react';

const ShareNote = ({ note }) => {
  const shareViaEmail = () => {
    const subject = encodeURIComponent('I am grateful for...');
    const body = encodeURIComponent(note);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const shareViaTwitter = () => {
    const text = encodeURIComponent(`I am grateful for... ${note}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  return (
    <div className="flex space-x-4">
      <button onClick={shareViaEmail} className="bg-blue-500 text-white p-2 rounded">
        Share via Email
      </button>
      <button onClick={shareViaTwitter} className="bg-blue-500 text-white p-2 rounded">
        Share via Twitter
      </button>
    </div>
  );
};

export default ShareNote;
