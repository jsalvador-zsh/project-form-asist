"use client";
import React, { useEffect, useState } from 'react';

const Countdown: React.FC = () => {
  // Fecha límite: 30 de noviembre
  const targetDate = new Date('2024-11-30T00:00:00').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="text-center px-6 py-12 bg-accent text-white">
      <div className="container mx-auto max-w-7xl flex justify-evenly space-x-12">
        <p className="font-light text-3xl md:text-5xl">{timeLeft.days} <span className="block capitalize text-base font-extralight">días</span></p>
        <p className="font-light text-3xl md:text-5xl">{timeLeft.hours} <span className="block capitalize text-base font-extralight">horas</span></p>
        <p className="font-light text-3xl md:text-5xl">{timeLeft.minutes} <span className="block capitalize text-base font-extralight">minutos</span></p>
        <p className="font-light text-3xl md:text-5xl">{timeLeft.seconds} <span className="block capitalize text-base font-extralight">segundos</span></p> 
      </div>
    </div>
  );
};

export default Countdown;
