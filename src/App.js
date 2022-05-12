import { useReducer } from 'react';
import './App.css';
import DigitButton from './components/DigitButton';
import OperationButton from './components/OperationButton';

export const ACTIONS = {
  CHOOSE_OPERATION: 'choose-operation',
  ADD_DIGIT: 'add-digit',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
}
const reducer = (state, {type, payload}) => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if(state.overwright) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwright: false
        }
      }
      if(state.currentOperand === '0' && payload.digit === '0') {
        return state
      }
      if(payload.digit === '.' && state.currentOperand?.includes('.')) {
        return state
      }
      if(payload.digit === '.' && state.currentOperand == null) {
        return {
          ...state,
          currentOperand: '0.'
        }
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`,
      }
    case ACTIONS.CHOOSE_OPERATION:
      if(state.currentOperand == null && state.prevOperand == null) {
        return state
      }
      if(state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation
        }
      }
      if(state.prevOperand == null) {
        return {
          ...state,
          operation: payload.operation === 'x' ? '*' : payload.operation,
          prevOperand: state.currentOperand,
          currentOperand: null,
        }
      }
      return state
    case ACTIONS.EVALUATE: 
      if(state.prevOperand == null || state.currentOperand == null || state.operation == null) {
        return state
      }
      return {
        ...state,
        prevOperand: null,
        operation: null,
        overwright: true,
        currentOperand: evaluate(state)
      }
    case ACTIONS.CLEAR:
      return {}
    case ACTIONS.DELETE_DIGIT:
      if(state.overwright) {
        return {
          ...state,
          overwright: false,
          currentOperand: null
        }
      }
      if(state.currentOperand == null) {
        return state
      }
      if(state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null
        }
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }
    default:
      return state
  }
}

function evaluate({prevOperand, currentOperand, operation}) {
  const perv = parseFloat(prevOperand)
  const curr = parseFloat(currentOperand)
  if(isNaN(perv) || isNaN(curr)) return ''
  let computation = ''
  switch (operation) {
    case '+':
      computation = perv + curr
      break;
    case '-':
      computation = perv - curr
      break;
    case 'x':
      computation = perv * curr
      break;
    case '/':
      computation = perv / curr
      break;
    case '%':
      computation = perv % curr
      break;
    default:
      return ''
  }
  return computation.toString()
}

const INTIGER_FORMATER = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0
})

function formatOperand(operand) {
  if(operand == null) return
  const [integer, decimal] = operand.split('.')
  if(decimal == null) {
    return INTIGER_FORMATER.format(integer)
  }
  return `${INTIGER_FORMATER.format(integer)}.${decimal}`
}

function App() {
  const [{prevOperand, currentOperand, operation}, dispatch] = useReducer(reducer,{});
  return (
    <div className="App">
      <div className="calculator">
        <div className='grid-container'>
        <div className='result-container'>
            <div className='prev-operand'>{formatOperand(prevOperand)}{operation}</div>
            <div className='curr-operand'>{formatOperand(currentOperand)}</div>
        </div>
          <button className='grid-item cal clear' onClick={() => dispatch({type: ACTIONS.CLEAR})}>
            C
          </button>
          <OperationButton operation="%" dispatch={dispatch}/>
          <OperationButton operation="/" dispatch={dispatch}/>
          <OperationButton operation="x" dispatch={dispatch}/>
          <DigitButton digit="1" dispatch={dispatch}/>
          <DigitButton digit="2" dispatch={dispatch}/>
          <DigitButton digit="3" dispatch={dispatch}/>
          <OperationButton operation="+" dispatch={dispatch}/>
          <DigitButton digit="4" dispatch={dispatch}/>
          <DigitButton digit="5" dispatch={dispatch}/>
          <DigitButton digit="6" dispatch={dispatch}/>
          <OperationButton operation="-" dispatch={dispatch}/>
          <DigitButton digit="7" dispatch={dispatch}/>
          <DigitButton digit="8" dispatch={dispatch}/>
          <DigitButton digit="9" dispatch={dispatch}/>
          <button className='grid-item cal equal' onClick={() => dispatch({type: ACTIONS.EVALUATE})}>
          =
          </button>
          <button className='grid-item cal delete' onClick={() => dispatch({type: ACTIONS.DELETE_DIGIT})}>
            DEL
          </button>
          <DigitButton digit="0" dispatch={dispatch}/>
          <DigitButton digit="." dispatch={dispatch}/>
        </div>
    </div>
    </div>
  );
}

export default App;
