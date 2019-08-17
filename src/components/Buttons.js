import React from "react";

const Buttons = ({ reset, operators, numbers, decimal, evaluate }) => {
  return (
    <React.Fragment>
      <button
        className="jumbo"
        id="clear"
        onClick={reset}
        style={{ background: "#f07f23" }}
        value="C"
      >
        C
      </button>
      <button
        id="divide"
        onClick={operators}
        style={{ background: "#666" }}
        value="/"
      >
        /
      </button>
      <button
        id="multiply"
        onClick={operators}
        style={{ background: "#666" }}
        value="x"
      >
        x
      </button>
      <button id="seven" onClick={numbers} value="7">
        7
      </button>
      <button id="eight" onClick={numbers} value="8">
        8
      </button>
      <button id="nine" onClick={numbers} value="9">
        9
      </button>
      <button
        id="add"
        onClick={operators}
        style={{ background: "#666" }}
        value="+"
      >
        +
      </button>
      <button id="four" onClick={numbers} value="4">
        4
      </button>
      <button id="five" onClick={numbers} value="5">
        5
      </button>
      <button id="six" onClick={numbers} value="6">
        6
      </button>
      <button
        id="subtract"
        onClick={operators}
        style={{ background: "#666" }}
        value="-"
      >
        -
      </button>
      <button id="one" onClick={numbers} value="1">
        1
      </button>
      <button id="two" onClick={numbers} value="2">
        2
      </button>
      <button id="three" onClick={numbers} value="3">
        3
      </button>
      <button className="jumbo" id="zero" onClick={numbers} value="0">
        0
      </button>
      <button id="decimal" onClick={decimal} value=".">
        .
      </button>
      <button
        id="equals"
        onClick={evaluate}
        style={{
          background: "#03cef1",
          position: "absolute",
          height: 130,
          bottom: 6
        }}
        value="="
      >
        =
      </button>
    </React.Fragment>
  );
};

export default Buttons;
