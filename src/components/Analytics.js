import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Analytics = () => {
  const [stats, setStats] = useState({ totalEntries: 0, commonTags: [] });

  useEffect(() => {
    const fetchEntries = async () => {
      const querySnapshot = await getDocs(collection(db, 'entries'));
      const entriesData = querySnapshot.docs.map((doc) => doc.data());

      const tags = entriesData.flatMap((entry) => entry.tags || []);
      const tagCount = tags.reduce((acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
      }, {});

      const commonTags = Object.entries(tagCount)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([tag]) => tag);

      setStats({ totalEntries: entriesData.length, commonTags });
    };

    fetchEntries();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl mb-4">Analytics</h2>
      <p>Total Entries: {stats.totalEntries}</p>
      <h3 className="text-xl mt-4">Most Common Tags:</h3>
      <ul>
        {stats.commonTags.map((tag) => (
          <li key={tag} className="mt-2">{tag}</li>
        ))}
      </ul>
    </div>
  );
};

export default Analytics;