import React, { useContext } from 'react'
import { ToastContext } from '../../../context/Toast.context'

import MyToast from './MyToast'
import cl from './MyToast.module.scss'

const MyToastContainer = () => {
    const {toastList} = useContext(ToastContext)
    console.log(toastList)

    return (
        <div className={cl.MyToastContainer}>
            {
                toastList.map((elem) => {
                    return <MyToast key={elem.id} type={elem.type} message={elem.message}/>
                })
            }
        </div>
    )
}

export default MyToastContainer
