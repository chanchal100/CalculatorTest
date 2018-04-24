import React, { Component } from 'react';
import {
    View,
    Text,
    AppRegistry
} from 'react-native';

import Style from './Style';
import InputButton from './InputButton';


const inputButtons = [
    [1, 2, 3, '/'],
    [4, 5, 6, '*'],
    [7, 8, 9, '-'],
    [0, '=', '+'],
    ['c', 'clear']
];

class CalculatorTest extends Component {

    constructor(props) {
        super(props);

        this.initialVal = {
            previousInputValue: 0,
            inputValue: 0,
            selectedSymbol: null
        };

        this.state = this.initialVal;
    }

    render() {
        return (
            <View style={Style.rootContainer}>
                <View style={Style.displayContainer}>
                    <Text style={Style.displayText}>{this.state.inputValue}</Text>
                </View>
                <View style={Style.inputContainer}>
                    {this.renderInputButtons()}
                </View>
            </View>
        );
    }

    renderInputButtons() {

        let views = inputButtons.map((row, idx) => {
            let inputRow = row.map((buttonVal, columnIdx) => {
                return <InputButton
                            value={buttonVal}
                            highlight={this.state.selectedSymbol === buttonVal}
                            onPress={this.onInputButtonPressed.bind(this, buttonVal)}
                            key={'butt-' + columnIdx} />;
            });

            return <View style={Style.inputRow} key={'row-' + idx}>{inputRow}</View>;
        });

        return views;
    }

    onInputButtonPressed(input) {
        switch (typeof input) {
            case 'number':
                return this.handleNumberInput(input);
            default:
                return this.handleStringInput(input);
        }
    }

    handleNumberInput(num) {
        let inputValue = (this.state.inputValue * 10) + num;
        this.setState({
            inputValue: inputValue
        });
    }

    handleStringInput(str) {
        switch (str) {
            case '/':
            case '*':
            case '+':
            case '-':
                this.setState({
                    selectedSymbol: str,
                    previousInputValue: this.state.inputValue,
                    inputValue: 0
                });
                break;

            case '=':
                let symbol = this.state.selectedSymbol,
                    inputValue = this.state.inputValue,
                    previousInputValue = this.state.previousInputValue;
                   
                    let myobj = { f_input: previousInputValue,l_input:inputValue};
                    let f_input = 'f_input';
                    let l_input = 'l_input';
                    if(symbol == '+'){
                        this.setState({
                            previousInputValue: 0,
                            inputValue: myobj[f_input] + myobj[l_input],
                            selectedSymbol: null
                        });
                    }else if(symbol == '-'){
                        this.setState({
                            previousInputValue: 0,
                            inputValue: myobj[f_input] - myobj[l_input],
                            selectedSymbol: null
                        });
                    }else if(symbol == '*'){
                        this.setState({
                            previousInputValue: 0,
                            inputValue: myobj[f_input] * myobj[l_input],
                            selectedSymbol: null
                        });
                    }else if(symbol == '/'){
                        this.setState({
                            previousInputValue: 0,
                            inputValue: myobj[f_input] / myobj[l_input],
                            selectedSymbol: null
                        });
                    }else{
                        return;
                    }
                    
                break;

            case 'clear':
                this.setState(this.initialVal);
                    break;

            case 'c':
                this.setState({inputValue: 0});
                break;

        }
    }

}

AppRegistry.registerComponent('CalculatorTest', () => CalculatorTest);
