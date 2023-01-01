import React, { memo } from 'react'
import Loader from '../../Loader/Loader'
import cl from './MySelect.module.scss'

const MySelect = memo((props) => {

    // if(typeof(props.data) !== 'Array') return <Loader></Loader>


    return (
        <select className={cl.MySelect} onChange={e => props.onChange(e.target.value)}>
            <option value='none' defaultValue>--Выберите способ--</option>
            {
                props.data.map((elem) => {
                    return <option value={elem.id} key={elem.id}>{elem.name}</option>
                })
            }
        </select>
    )
})

export default MySelect
