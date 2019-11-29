import React, { Component } from 'react'
import './App.css';

const Default = { operand1: "", operand2: "", op: "", mode: 1, field: "0"};

const css = { margin: 5 }

export default class Calculatrice extends Component {
    constructor(props) {
        super(props);
        this.state = Default;
    }
    
    edit = (e) => {
        let content;
    
        e.preventDefault();
        if (this.state.mode === 3) { 
            content = e.target.value;
            this.setState({...this.state, operand1: content, operand2: "", field: content, mode: 1}, console.log("1 " + this.state));
        } else if (this.state.mode === 1) {
            content = (this.state.operand1 === "") ? e.target.value : this.state.operand1 + e.target.value;
            this.setState({...this.state, operand1: content, field: content}, console.log(this.state));
        } else if (this.state.mode === 2) { 
            content = (this.state.operand2 === "") ? e.target.value : this.state.operand2 + e.target.value;
            this.setState({...this.state, operand2: content, field: `${this.state.operand1} ${this.state.op} ${content}`}, console.log("3 " + this.state));            
         }
    }

    operation = (e) => {
        let op;

        e.preventDefault();
        if (this.state.mode === 2) { 
            return ;
        }
        if (e.target.value === "+") {
            op = "+";
        } else if (e.target.value === "-") {
            op = "-";
        } else if (e.target.value === "*") { 
            op = "*";
        } else { 
            op = "/";
        }
        this.setState({...this.state, op: op, mode: 2, field: this.state.operand1 + " " + op});
    }
    
    calcul = (e) => {
        let result;
        
        e.preventDefault();
        if (this.state.op === "+") {
            result = parseInt(this.state.operand1) + parseInt(this.state.operand2);
        } else if (this.state.op === "-") {
            result = parseInt(this.state.operand1) - parseInt(this.state.operand2);
        } else if (this.state.op === "*") { 
            result = parseInt(this.state.operand1) * parseInt(this.state.operand2);
        } else { 
            result = parseInt(this.state.operand1) / parseInt(this.state.operand2);
        }
        this.setState({...Default,  field: result, operand1: result, operand2: "", mode: 3});
    }

    reset = (e) => {
        e.preventDefault();
        this.setState(Default);
    }
    
  render() {
    console.log(this.state);

      return (
        <div>
            <div>{this.state.field}</div>
            <div className="wrapper-calculatrice">
                <button className="black" value="0" onClick={(e) => {this.edit(e)}}>0</button>
                <button className="black" value="1" onClick={(e) => {this.edit(e)}}>1</button>
                <button className="black" value="2" onClick={(e) => {this.edit(e)}}>2</button>
                <button className="black" value="3" onClick={(e) => {this.edit(e)}}>3</button>
                <button className="black" value="4" onClick={(e) => {this.edit(e)}}>4</button>
                <button className="black" value="5" onClick={(e) => {this.edit(e)}}>5</button>
                <button className="black" value="6" onClick={(e) => {this.edit(e)}}>6</button>
                <button className="black" value="7" onClick={(e) => {this.edit(e)}}>7</button>
                <button className="black" value="8" onClick={(e) => {this.edit(e)}}>8</button>
                <button className="black" value="9" onClick={(e) => {this.edit(e)}}>9</button>
                <button className="yellow" value="-" onClick={(e) => {this.operation(e)}}>-</button>
                <button className="yellow" value="+" onClick={(e) => {this.operation(e)}}>+</button>
                <button className="yellow" value="*" onClick={(e) => {this.operation(e)}}>*</button>
                <button className="yellow" value="/" onClick={(e) => {this.operation(e)}}>/</button>
                <button className="red" onClick={(e) => {this.calcul(e)}}>=</button>
                <button className="red" onClick={(e) => {this.reset(e)}}>CE</button>
            </div>
        </div>
        );
  }
}
