import React, {useState} from 'react';
import './styles/calculator.css'

const Calculator = () => {
    const [displayValue, setDisplayValue] = useState('0');
    const [operator, setOperator] = useState(null);
    const [result, setResult] = useState(0);
    const [showResult, setShowResult] = useState(false);
    
    const handleButtonClick = (value) => {
        if (displayValue.length < 10) {
            if (displayValue === '0') {
                if (value !== '.') {
                    setDisplayValue((value.toString()));
                } else {
                    setDisplayValue(`0${value.toString()}`)
                }
            }else {
                setDisplayValue((prevDisplayValue) => prevDisplayValue + value.toString());
            }
            setShowResult(false);
        } 
    };  

    const handleClearButton = (value) =>{
        switch(value) {
            case 'del':
                if (displayValue.length === 1) {
                    setDisplayValue('0');
                }else {
                    if (!(displayValue === '0')) {
                        setDisplayValue((prevDisplayValue) => prevDisplayValue.slice(0, -1));
                    }
                }
                break;
            case 'C':
                setDisplayValue('0');
                setResult(0);
                setShowResult(false);
                setOperator(null)
                break;
            case 'CE':
                setDisplayValue('0');
                setShowResult(false);
                break;
            default:
                break;
        }
    }
    
    const handleOperatorButton = (value) => {
        if (!(displayValue === '0')) {
            if (operator === null) {
                setOperator(value);
                setResult(parseFloat(displayValue));
                setDisplayValue('0');
            } else {
                setOperator(value);
                switch (operator) {
                    case '+':
                        setResult((prevResult) => prevResult += parseFloat(displayValue));
                        break;
                    case '-':
                        setResult((prevResult) => prevResult -= parseFloat(displayValue));
                        break;
                    case 'x': 
                        setResult((prevResult) => prevResult *= parseFloat(displayValue));
                        break;
                    case '/':
                        setResult((prevResult) => prevResult = prevResult / parseFloat(displayValue));
                        break;
                    default:
                        break;
                }
                setDisplayValue('0');
            }
        }
    };

    const handleEqualButton = () => {
        if (operator !== null) {
            switch (operator) {
                case '+':
                    setResult(result + parseFloat(displayValue));
                    break;
                case '-':
                    setResult(result - parseFloat(displayValue));
                    break;
                case 'x':
                    setResult(result * parseFloat(displayValue));
                    break;
                case '/':
                    setResult(result / parseFloat(displayValue));
                    break;
                default:
                    break;
            }
            setOperator(null);
            setShowResult(true);
            setDisplayValue('0');
        }
    };

    return(
        <div>
        <div className='calculator'>
            <div className='display'>
                { operator !== null ? 
                (showResult ? <div className='result'>{result}</div> : <div className='process'>{`${result} ${operator}`}</div>)
                :
                ''
                }
                {!showResult ? 
                <div className='display-value'>{displayValue}</div>
                :
                <div className='result'>{result}</div>
                }
            </div>
            <div className='button-row'>
                <button className='action-keys' onClick = {() => handleClearButton('CE')} >CE</button>
                <button className='action-keys' onClick = {() => handleClearButton('C')} >C</button>
                <button className='action-keys' onClick = {() => handleClearButton('del')} >del</button>
                <button className='operator' onClick = {() => handleOperatorButton('/')}>/</button>
            </div>
            <div className='button-row'>
                <button onClick = {() => handleButtonClick(7)} >7</button>
                <button onClick = {() => handleButtonClick(8)} >8</button>
                <button onClick = {() => handleButtonClick(9)} >9</button>
                <button className='operator' onClick = {() => handleOperatorButton('x')}>x</button>
            </div>
            <div className='button-row'>
                <button onClick = {() => handleButtonClick(4)} >4</button>
                <button onClick = {() => handleButtonClick(5)} >5</button>
                <button onClick = {() => handleButtonClick(6)} >6</button>
                <button className='operator' onClick = {() => handleOperatorButton('-')}>-</button>
            </div>
            <div className='button-row'>
                <button onClick = {() => handleButtonClick(1)} >1</button>
                <button onClick = {() => handleButtonClick(2)} >2</button>
                <button onClick = {() => handleButtonClick(3)} >3</button>
                <button className='operator' onClick = {() => handleOperatorButton('+')} >+</button>
            </div>
            <div className='button-row'>
                <button onClick = {() => handleButtonClick('.')} >,</button>
                <button onClick = {() => handleButtonClick(0)}>0</button>
                <button className='equal' onClick={() => handleEqualButton('=')}>=</button>
            </div>            
        </div>
        </div>
    );
}
export default Calculator;