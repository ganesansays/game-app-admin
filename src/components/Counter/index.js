import React from "react";
import ReactDOM from "react-dom";
import Countdown from "react-countdown-now";

// Random component
const Completionist = () => <span>&nbsp;</span>;

// Renderer callback with condition
const renderer = ({ seconds, completed }) => {
  if (completed) {
    // Render a complete state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <span>
        {seconds}
      </span>
    );
  }
};

const Counter = question => (
  <span>{(new Date(question.openTime)).toString()}></span>
)

export default Counter;