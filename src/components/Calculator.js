import React, { Component } from "react";
import Buttons from "./Buttons";
import Output from "./Output";
import Formula from "./Formula";

export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: "0",
      previousValue: "0",
      formula: "",
      currentSign: "pos",
      lastClicked: ""
    };
    this.maxDigitWarning = this.maxDigitWarning.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.handleEvaluate = this.handleEvaluate.bind(this);
    this.reset = this.reset.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleNumbers = this.handleNumbers.bind(this);
  }

  maxDigitWarning() {
    this.setState({
      currentValue: "Met Max Digit Limit",
      previousValue: this.state.currentValue
    });
    setTimeout(() => {
      this.setState({
        currentValue: this.state.previousValue
      });
    }, 1000);
  }

  reset() {
    this.setState({
      currentValue: "0",
      previousValue: "0",
      formula: "",
      currentSign: "pos",
      lastClicked: "",
      evaluated: false
    });
  }

  handleOperators(e) {
    if (!this.state.currentValue.includes("Limit")) {
      const { value } = e.target;
      const { formula, previousValue, evaluated } = this.state;
      this.setState({
        currentValue: value,
        evaluated: false
      });
      if (evaluated) {
        this.setState({ formula: previousValue + value });
      } else if (!endsWithOperator.test(formula)) {
        this.setState({
          previousValue: formula,
          formula: formula + value
        });
      } else if (!endsWithNegativeOperator.test(formula)) {
        this.setState({
          formula:
            (endsWithNegativeOperator.test(formula + value)
              ? formula
              : previousValue) + value
        });
      } else if (value !== "-") {
        this.setState({
          formula: previousValue + value
        });
      }
    }
  }

  handleEvaluate() {
    if (!this.state.currentValue.includes("Limit")) {
      let { formula } = this.state;
      while (endsWithOperator.test(formula)) {
        formula = formula.slice(0, -1);
      }
      formula = formula.replace(/x/g, "*").replace(/-/g, "-");
      let result = Math.round(1000000000000 * eval(formula)) / 1000000000000;
      this.setState({
        currentValue: result.toString(),
        formula: formula.replace(/\*/g, "⋅").replace(/-/g, "‑") + "=" + result,
        previousValue: result,
        evaluated: true
      });
    }
  }

  handleNumbers(e) {
    if (!this.state.currentValue.includes("Limit")) {
      const { currentValue, formula, evaluated } = this.state;
      const { value } = e.target;
      this.setState({ evaluated: false });
      if (currentValue.length > 21) {
        this.maxDigitWarning();
      } else if (evaluated) {
        this.setState({
          currentValue: value,
          formula: value !== "0" ? value : ""
        });
      } else {
        this.setState({
          currentValue:
            currentValue === "0" || isOperator.test(currentValue)
              ? value
              : currentValue + value,
          formula:
            currentValue === "0" && value === "0"
              ? formula
              : /([^.0-9]0)$/.test(formula)
              ? formula.slice(0, -1) + value
              : formula + value
        });
      }
    }
  }

  handleDecimal() {
    const { currentValue, evaluated, formula } = this.state;
    if (evaluated === true) {
      this.setState({
        currentValue: "0.",
        formula: "0.",
        evaluated: false
      });
    } else if (!currentValue.includes(".") && !currentValue.includes("Limit")) {
      this.setState({ evaluated: false });
      if (currentValue.length > 21) {
        this.maxDigitWarning();
      } else if (
        endsWithOperator.test(formula) ||
        (currentValue === "0" && formula === "")
      ) {
        this.setState({
          currentValue: "0.",
          formula: formula + "0."
        });
      } else {
        this.setState({
          currentValue: formula.match(/(-?\d+\.?\d*)$/)[0] + ".",
          formula: formula + "."
        });
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="calculator">
          <Formula formula={this.state.formula.replace(/x/g, "⋅")} />
          <Output currentValue={this.state.currentValue} />
          <Buttons
            decimal={this.handleDecimal}
            operators={this.handleOperators}
            numbers={this.handleNumbers}
            reset={this.reset}
            evaluate={this.handleEvaluate}
          />
        </div>
      </React.Fragment>
    );
  }
}

const endsWithOperator = /[x+-/]$/,
  endsWithNegativeOperator = /[x/+]-$/,
  isOperator = /[x/+-]/;
