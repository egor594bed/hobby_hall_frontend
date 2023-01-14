import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import AdminOrderItem from './AdminOrderItem'

const AdminOrderList = () => {
    const [orderList, setOrderList] = useState(undefined)

    useEffect(() => {
        try {
            fetch('../api/order/getOrderList')
            .then(data => data.json())
            .then(json => setOrderList(json))
        } catch (error) {}

    }, [])

    // const test = orderList[0]
    // console.log(orderList[0])

    return (
        <div className='admin-order'>
            {orderList
                ?
                <AdminOrderItem data={orderList[0]}></AdminOrderItem>
                :
                <Loader></Loader>

            }
        </div>
    )
}

export default AdminOrderList
