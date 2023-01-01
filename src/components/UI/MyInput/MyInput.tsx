import React, { memo } from 'react'
import classes from './MyInput.module.scss'

const MyInput = memo((props) => {


  return (
    <input className={classes.MyInput} placeholder={props.placeholder} type={props.type} id={props.id} {...props} required>
      
    </input>
  )
})

export default MyInput
