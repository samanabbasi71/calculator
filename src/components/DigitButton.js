import React from 'react'
import { ACTIONS } from '../App'

export default function DigitButton({digit, dispatch}) {
  return (
    <button className='grid-item numbers' onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, payload: {digit}})}>
        {digit}
    </button>
  )
}
