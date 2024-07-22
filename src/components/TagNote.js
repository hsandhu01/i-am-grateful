import React, { useState } from 'react';

const TagNote = ({ note, onSave }) => {
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTag = () => {
    if (input) {
      setTags([...tags, input]);
      setInput('');
    }
  };

  const handleSave = () => {
    onSave(tags);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl mb-4">Tag Your Note</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 w-full mb-2"
        placeholder="Enter a tag"
      />
      <button onClick={handleAddTag} className="bg-blue-500 text-white p-2 rounded">
        Add Tag
      </button>
      <div className="mt-2 flex flex-wrap">
        {tags.map((tag, index) => (
          <span key={index} className="bg-gray-200 p-1 mr-2 mb-2 rounded">
            {tag}
          </span>
        ))}
      </div>
      <button onClick={handleSave} className="bg-green-500 text-white p-2 rounded mt-2">
        Save Tags
      </button>
    </div>
  );
};

export default TagNote;