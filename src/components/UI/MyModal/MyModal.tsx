import React from 'react'
import classes from './MyModal.module.scss'

const MyModal = (props) => {

    const rootClasses = [classes.MyModal];

    if (props.visible) {
        rootClasses.push(classes.active)
    }
    return (
        <div className={rootClasses.join(' ')} onClick={() => props.setVisible(!props.visible)}>
            <div className={classes.MyModalWindow} onClick={(e) => e.stopPropagation()}>
                {props.children}
            </div>
        </div>
    )
}

export default MyModal
