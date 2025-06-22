import formatTime from '@/util/formateTime';
import { useState, useEffect, useRef } from 'react';

/* const useTimer = () => {
  let initialMinutes = 2;
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);
  const [formatedTime, setFormatedTime] = useState(formatTime(secondsLeft));

  useEffect(() => {
    if (secondsLeft > 0) {
      const interval = setInterval(() => {
        setSecondsLeft(secondsLeft - 1);
        setFormatedTime(formatTime(secondsLeft - 1));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [secondsLeft]);

  return { secondsLeft, setSecondsLeft, formatedTime };
}; */

const useTimer = (initialMinutes: number = 2) => {
  const initialMinutesRef = useRef(initialMinutes);
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [showHours, setShowHours] = useState(false);
  const [countType, setCountType] = useState<'up' | 'down'>('down');

  // Update ref when initialMinutes changes
  useEffect(() => {
    initialMinutesRef.current = initialMinutes;
  }, [initialMinutes]);

  // Handle timer completion
  useEffect(() => {
    if (secondsLeft <= 0 && isRunning && countType === 'down') {
      setIsRunning(false);
    }
  }, [secondsLeft, isRunning, countType]);

  // Timer countdown logic
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSecondsLeft((prevSeconds) => {
        if (prevSeconds <= 0 && countType === 'down') {
          clearInterval(interval);
          return 0;
        }
        return countType === 'down' ? prevSeconds - 1 : prevSeconds + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, countType]);

  // Timer control functions
  const start = (v: number | undefined) => {
    if (v) {
      setSecondsLeft(v);
    }
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false);
  };

  const reset = (newInitialMinutes?: number) => {
    setIsRunning(false);
    const minutes = newInitialMinutes ?? initialMinutesRef.current;
    setSecondsLeft(minutes * 60);
  };

  return {
    secondsLeft,
    formatedTime: formatTime(secondsLeft, showHours),
    isRunning,
    setShowHours,
    start,
    stop,
    reset,
    setCountType,
    setSecondsLeft,
    countType,
  };
};

export default useTimer;
