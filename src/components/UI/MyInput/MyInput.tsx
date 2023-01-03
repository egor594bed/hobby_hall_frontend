import React, { FC, memo } from 'react'
import classes from './MyInput.module.scss'

interface MyInputProps {
  name?:string
  placeholder?: string
  type: string
  id: string
  accept?: string 
}


const MyInput: FC<MyInputProps> = memo(({...props}) => {


  return (
    <input className={classes.MyInput} {...props} required>
      
    </input>
  )
})

export default MyInput
