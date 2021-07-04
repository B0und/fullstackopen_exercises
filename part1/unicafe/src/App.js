import React, { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}> {text} </button>
);

const AvgDisplay = ({ good, bad, neutral }) => {
  return <p> average {(good - bad) / (good + neutral + bad)} </p>;
};

const PositiveDisplay = ({ good, bad, neutral }) => {
  return <p> positive {(good / (good + neutral + bad)) * 100} %</p>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text={"good"} />
      <Button handleClick={handleNeutral} text={"neutral"} />
      <Button handleClick={handleBad} text={"bad"} />
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <AvgDisplay good={good} bad={bad} neutral={neutral} />
      <PositiveDisplay good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
