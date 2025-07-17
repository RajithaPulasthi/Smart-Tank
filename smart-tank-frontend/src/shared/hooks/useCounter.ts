import { useEffect, useState } from 'react';

export const useCounter = (end: number, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const incrementTime = duration / end;
    const counter = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(counter);
    }, incrementTime);

    return () => clearInterval(counter);
  }, [end, duration]);

  return count;
};
