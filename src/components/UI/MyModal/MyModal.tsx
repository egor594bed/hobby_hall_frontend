import React, { FC } from 'react'
import classes from './MyModal.module.scss'

interface IMyModal {
    visible: boolean
    children: React.ReactNode
    setVisible: (visible: boolean) => void
}

const MyModal: FC<IMyModal> = (props) => {

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
