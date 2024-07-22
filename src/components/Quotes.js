import React, { useState, useEffect } from 'react';

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    // Fetch quotes from an API or a static list
    const fetchQuotes = async () => {
      const response = await fetch('https://api.quotable.io/quotes');
      const data = await response.json();
      setQuotes(data.results);
    };

    fetchQuotes();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl mb-4">Inspirational Quotes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quotes.map((quote) => (
          <div key={quote._id} className="bg-gray-100 p-4 rounded shadow">
            <blockquote className="italic">"{quote.content}"</blockquote>
            <cite className="block text-right mt-2">- {quote.author}</cite>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quotes;
