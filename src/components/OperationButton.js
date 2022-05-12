import React from 'react'
import { ACTIONS } from '../App'

export default function OperationButton({operation, dispatch}) {
  return (
    <button className='grid-item cal' onClick={() => dispatch({type: ACTIONS.CHOOSE_OPERATION, payload: {operation}})}>
        {operation}
    </button>
  )
}
