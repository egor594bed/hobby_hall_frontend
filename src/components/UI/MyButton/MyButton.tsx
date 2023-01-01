import React, { memo } from 'react'
import classes from './MyButton.module.scss'

const MyButton = memo(({onClick, ...props}) => {
    return (
        <button className={classes.MyButton} onClick={e => onClick(e)} {...props}>
            {props.children}
        </button>
    )
})

export default MyButton
