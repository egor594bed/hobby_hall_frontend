import React, { FC, useState } from 'react'
import { IProduct } from '../../types/ICatalog'
import MyButton from '../UI/MyButton/MyButton'

interface IAdminOrderItemProps {
    data: IAdminOrderItem
}

interface IAdminOrderItem {
    _id: string
    user: IUser
    data: string
    productsArr: IProduct[]
    clientComment?: string
    comment: string
    deliveryId: string
    paymentId: string
    state: string
}

interface IUser {
    _id: string
    email: string
    name: string
    phone: string
}

const AdminOrderItem: FC<IAdminOrderItemProps> = ({data}) => {
    const [state, setState] = useState('white')
    return (
        <div className='admin-order__order-item' style={{backgroundColor: state}}>
            <div className='admin-order__order-personal-data'>
                <p>Имя: {data.user.name}</p>
                <p>Телефон: {data.user.phone}</p>
                <p>Почта: {data.user.email}</p>
            </div>
            <div className='admin-order__order-product-list'>
                <p>Список товаров:</p>
                {
                    data.productsArr.map((elem) => {
                        return (
                            <div className='admin-order__order-product-item'>
                                <p>{elem.name}</p>
                                <p>{elem.article}</p>
                                <p>{elem.total} шт.</p>
                            </div>
                        )
                    })
                }
            </div>
            <div className='admin-order__order-comments'>
                <div className='admin-order__order-comment'>
                    <p>Комментарий заказчика:</p>
                    <p>{data.clientComment || "Нет комментария"}</p>
                </div>
                <div className='admin-order__order-comment'>
                    <p>Комментарий к заказу:</p>
                    <textarea className='admin-order__order-comment-textarea'>{data.comment || ""}</textarea>
                </div>
            </div>
            <div className='admin-order__order-control'>
                <select className='admin-order__order-control-select' onChange={e => setState(e.target.value)}>
                    <option value='red'>Новый</option>
                    <option value='orange'>Ожидание</option>
                    <option value='blue'>Оплачен</option>
                    <option value='green'>Отправлен</option>
                    <option value='black'>Отмена</option>
                </select>
                <MyButton onClick={()=>{}}>Сохранить изменения</MyButton>
            </div>
            <p className='admin-order__order-id'>Id заказа: {data._id}</p>
        </div>
    )
}

export default AdminOrderItem
