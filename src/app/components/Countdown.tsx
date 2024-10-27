// components/Countdown.js
import { useState, useEffect } from 'react';

function Countdown() {
  const targetDate = new Date('November 23, 2024 21:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center  text-white">
      <h1 className="text-4xl font-bold italic max-lg:p-2  ">The Countdown Has Begun</h1>
      <p className="text-xl mt-2 italic ">November 21-23, 2024</p>
      <div className="flex justify-center  gap-4 mt-4 text-lg">
        <div className="bg-red-600 p-4 max-lg:p-2 rounded-lg text-center">
          <p className="text-2xl  font-bold">{timeLeft.days}</p>
          <span className="text-sm">Days</span>
        </div>
        <div className="bg-red-600 p-4 max-lg:p-2 rounded-lg text-center">
          <p className="text-2xl font-bold">{timeLeft.hours}</p>
          <span className="text-sm">Hours</span>
        </div>
        <div className="bg-red-600 p-4  max-lg:p-2 rounded-lg text-center">
          <p className="text-2xl font-bold">{timeLeft.minutes}</p>
          <span className="text-sm">Minutes</span>
        </div>
        <div className="bg-red-600 p-4 max-lg:p-2 rounded-lg text-center">
          <p className="text-2xl font-bold">{timeLeft.seconds}</p>
          <span className="text-sm">Seconds</span>
        </div>
      </div>
    </div>
  );
}

export default Countdown;
