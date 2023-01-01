import React from 'react'
import { memo } from 'react'
import cl from './MyCounter.module.scss'

const MyCounter = memo((props) => {

    function increase() {
        props.setCounter(props.counter + 1)
    }

    function decrease() {
        props.setCounter(props.counter - 1)
    }


    return (
        <div className={cl.MyCounterWrapper}>
            <button className={cl.MyCounterButton} onClick={decrease}>-</button>
            <input className={cl.MyCounterInput} onChange={(e) => props.setCounter(e.target.value)} type='number' value={props.counter}></input>
            <button className={cl.MyCounterButton} onClick={increase}>+</button>
        </div>
    )
})

export default MyCounter
