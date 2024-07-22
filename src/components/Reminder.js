import React, { useState, useEffect } from 'react';

const Reminder = () => {
  const [time, setTime] = useState('');
  const [isSet, setIsSet] = useState(false);

  useEffect(() => {
    const storedTime = localStorage.getItem('reminderTime');
    if (storedTime) {
      setTime(storedTime);
      setIsSet(true);
      scheduleReminder(storedTime);
    }

    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then((permission) => {
        if (permission !== 'granted') {
          alert('You need to enable notifications to receive reminders.');
        }
      });
    }
  }, []); // Add scheduleReminder to the dependency array if needed

  const scheduleReminder = (time) => {
    const [hours, minutes] = time.split(':');
    const now = new Date();
    const reminderTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0, 0);

    if (reminderTime < now) {
      reminderTime.setDate(reminderTime.getDate() + 1);
    }

    const timeout = reminderTime - now;
    setTimeout(() => {
      new Notification('Time to add your gratitude entry!');
      scheduleReminder(time);
    }, timeout);
  };

  const handleSetReminder = () => {
    localStorage.setItem('reminderTime', time);
    setIsSet(true);
    scheduleReminder(time);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl mb-4">Set Daily Reminder</h2>
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button onClick={handleSetReminder} className="bg-blue-500 text-white p-2 rounded">
        Set Reminder
      </button>
      {isSet && <p>Reminder set for {time} daily</p>}
    </div>
  );
};

export default Reminder;