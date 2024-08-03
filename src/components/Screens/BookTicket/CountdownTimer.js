import React, { useState, useEffect } from "react";

const CountdownTimer = ({ initialTime, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onTimeUp) onTimeUp(); // Gọi callback khi thời gian đạt đến 0
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, onTimeUp]);

  return (
    <div>
      <h1>Thời gian còn lại: {timeLeft} giây</h1>
    </div>
  );
};

export default CountdownTimer;
