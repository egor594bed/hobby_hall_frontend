import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import BasketItem from '../components/Basket/BasketItem'
import { useHttp } from '../hooks/http.hook'
import { toBasket } from '../utils/toBasket'
import Loader from '../components/Loader/Loader'
import { useCallback } from 'react'
import { useRef } from 'react'
import BasketDelivery from '../components/Basket/BasketDelivery'
import BasketPayment from '../components/Basket/BasketPayment'
import MyButton from '../components/UI/MyButton/MyButton'

const Basket = () => {
    const {request, loading, error} = useHttp()
    const [basketArr, setBasketArr] = useState([])
    const [total, setTotal] = useState(0)
    const [updateTotal, setUpdateTotal] = useState(false)
    const orderProperty = useRef()

    useEffect(() => {
        const basketStr = localStorage.getItem('basket')
        const basketArr = JSON.parse(basketStr)

        request('api/catalog/getBasketGoods', 'POST', basketArr)
        .then(data => {
            for (let i = 0; i < data.basketArr.length; i++) {
                const dataElem = data.basketArr[i]
                for (let j = 0; j < basketArr.length; j++) {
                    if(dataElem._id == basketArr[j][0]) {
                        dataElem.total = basketArr[j][1]
                    }
                }
            }
            setBasketArr(data.basketArr)
            setUpdateTotal(true)
        })

        orderProperty.current = {
            delivery: 'none',
            payment: 'none'
        }
        
    }, [])

    useEffect(() => {
        setTotal(0)
        for (let i = 0; i < basketArr.length; i++) {
            setTotal(prev => prev + (basketArr[i].total * basketArr[i].price))
        }
        setUpdateTotal(false)
    }, [updateTotal, basketArr])

    const changeTotal = useCallback((id, counter) => {
        const storageBasketStr = localStorage.getItem('basket')
        const storageBasketArr = JSON.parse(storageBasketStr)

        for (let i = 0; i < storageBasketArr.length; i++) {
            if (storageBasketArr[i][0] === id) {
                storageBasketArr[i][1] = counter
                break
            }
            
        }

        localStorage.setItem('basket', JSON.stringify(storageBasketArr))

        for (let i = 0; i < basketArr.length; i++) {
            if (basketArr[i]._id === id) {
                basketArr[i].total = counter
            }
        }
        setBasketArr(basketArr)
        setUpdateTotal(true)

    }, [basketArr])

    const deleteProductFromBasket = useCallback((id) => {
        toBasket(id)
        const newBasket = basketArr.filter((elem) => {
            if(elem._id !== id) return true
        })
        setBasketArr(newBasket)
    }, [basketArr])

    const postNewOrder = useCallback(() => {
        // ОТПРАВИТЬ ЗАКАЗ В БД
    }, [])

    return (
        <div className='basket container'>
            <h1 className='basket__title'>Корзина</h1>
            <div className='basket__item-list'>
                <div className='basket__item-list-header'>
                    <div className='basket__item-list-header-delete'></div>
                    <p>Наименование</p>
                    <div className='basket__item-price-wrapper'>
                        <p>Цена</p>
                        <p>Кол-во</p>
                        <p>Итог</p>
                    </div>
                </div>
                {loading
                    ?
                    <Loader></Loader>
                    :
                    (basketArr.length > 0)
                        ?
                        basketArr.map((elem) => {
                        return <BasketItem data={elem} deleteProduct={deleteProductFromBasket} key={elem._id} changeTotal={changeTotal}></BasketItem>
                        })
                        :
                        <p>В корзине пусто</p>
                }
                <div className='basket__item-price-total'>
                    <p>Общий итог: <span>{total} р.</span></p>
                </div>
            </div>
            <BasketDelivery></BasketDelivery>
            <BasketPayment></BasketPayment>
            <div className='basket__order'>
                <div className='basket__order-checkbox-wrapper'>
                    <input type='checkbox'></input>
                    <label>Согласен с бла бла бла</label>
                </div>
                <MyButton style={{fontSize: '20px', fontWeight: '700'}} onClick={postNewOrder}>Оформить заказ</MyButton>
            </div>
        </div>
    )
}

export default Basket
