import React, { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}> {text} </button>
);

const AvgDisplay = ({ good, bad, neutral }) => {
  return (
    <tr>
      <td>average</td>
      <td>{(good - bad) / (good + neutral + bad)}</td>
    </tr>
  );
};

const PositiveDisplay = ({ good, bad, neutral }) => {
  return (
    <tr>
      <td>positive</td>
      <td>{(good / (good + neutral + bad)) * 100} %</td>
    </tr>
  );
};

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistic text={"good"} value={props.good} />
          <Statistic text={"neutral"} value={props.neutral} />
          <Statistic text={"bad"} value={props.bad} />
          <AvgDisplay
            good={props.good}
            bad={props.bad}
            neutral={props.neutral}
          />
          <PositiveDisplay
            good={props.good}
            bad={props.bad}
            neutral={props.neutral}
          />
        </tbody>
      </table>
    </div>
  );
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
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
