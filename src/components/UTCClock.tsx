import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const UTCClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatUTCTime = (date: Date) => {
    const utcDate = new Date(date.getTime() + (date.getTimezoneOffset() * 60000));
    
    const year = utcDate.getFullYear();
    const month = String(utcDate.getMonth() + 1).padStart(2, '0');
    const day = String(utcDate.getDate()).padStart(2, '0');
    const hours = String(utcDate.getHours()).padStart(2, '0');
    const minutes = String(utcDate.getMinutes()).padStart(2, '0');
    const seconds = String(utcDate.getSeconds()).padStart(2, '0');

    return {
      date: `${year}-${month}-${day}`,
      time: `${hours}:${minutes}:${seconds}`,
      full: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    };
  };

  const utcTime = formatUTCTime(currentTime);

  return (
    <div className="text-right text-sm">
      <div className="flex items-center justify-end space-x-1 font-medium">
        <Clock className="h-4 w-4 text-blue-200" />
        <span>UTC: {utcTime.full}</span>
      </div>
      <div className="text-blue-200 text-xs">Flight Safety First</div>
    </div>
  );
};

export default UTCClock;