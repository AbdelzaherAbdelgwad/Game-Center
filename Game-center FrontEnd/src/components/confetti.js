import React, { useState } from 'react';
import Confetti from 'react-confetti';

const ConfettiButton = () => {
  const [showConfetti, setShowConfetti] = useState(false);

  const handleClick = () => {
    setShowConfetti(true);
     // Show confetti for 2 seconds
  };

  return (
    <div>
      {showConfetti && <Confetti />}
      <button onClick={handleClick}>Click me for Confetti!</button>
    </div>
  );
};

export default ConfettiButton;