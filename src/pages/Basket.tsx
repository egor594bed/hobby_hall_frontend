import React, { useContext, useMemo } from 'react'
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
import { IProduct } from '../types/ICatalog'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/Auth.context'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import { ToastContext } from '../context/Toast.context'

interface IOrderProperty {
    current?: {
        delivery: 'none' | number
        payment: 'none' | number
    }
}

const Basket = () => {
    const {isAuthenticated} = useContext(AuthContext)
    const {setToast} = useContext(ToastContext)
    const {request, loading, error} = useHttp()
    const [update, setUpdate] = useState(false)
    const [checked, setCheked] = useState<boolean>(true)
    const [updateTotal, setUpdateTotal] = useState(false)
    const [buttonActive, setButtonActive] = useState<boolean>(false)
    const [basketArr, setBasketArr] = useState<IProduct[]>([])
    const [total, setTotal] = useState(0)
    const orderProperty: IOrderProperty = useRef()

    useEffect(() => {
        const basketStr = localStorage.getItem('basket') as string
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
            setTotal(prev => prev + (basketArr[i].total! * basketArr[i].price))
        }
        setUpdateTotal(false)
    }, [updateTotal, basketArr])

    const deleteBasketItems = useCallback(() => {
        localStorage.removeItem('basket')
        setBasketArr([])
        setUpdate(true)
    }, [])

    const changeTotal = useCallback((id: string, counter: number) => {
        const storageBasketStr = localStorage.getItem('basket') as string
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

    //???????????????? ???????????????? ???? ??????????????????????????
    const deleteProductFromBasket = useCallback((id: string) => {
        toBasket(id)
        const newBasket = basketArr.filter((elem) => {
            if(elem._id !== id) return true
        })
        setBasketArr(newBasket)
    }, [basketArr])

    //?????????? ?????????????? ????????????????/????????????
    const changeDelivery = useCallback((id: 'none' | number) => {
        if(orderProperty.current != undefined) {
            orderProperty.current.delivery = id
            setUpdate(true)
        }
    }, [])
    const changePayment = useCallback((id: 'none' | number) => {
        if(orderProperty.current != undefined) {
            orderProperty.current.payment = id
            setUpdate(true)
        }
    }, [])

    //???????????????? ?????????????????? ???????????? 
    useEffect(() => {
        if(!update) return
        if (orderProperty.current?.delivery !== 'none' && orderProperty.current?.payment !== 'none' && checked && basketArr[0]) {
            setButtonActive(true)
            setUpdate(false)
        }else {
            setButtonActive(false)
            setUpdate(false)
        }
    }, [update, basketArr])

    // ?????????????????? ?????????? ?? ????
    const postNewOrder = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
        e.preventDefault()
        const userData = localStorage.getItem('userData') as string
        const userId = JSON.parse(userData).userId

        const data = () => {
            const locale = 'ru-ru';
            const d = new Date();

            const day = d.getDate();
            const month = d.toLocaleString(locale, { month: 'long' });
            const year = d.getFullYear();

            const time = d.toLocaleString(locale, { hour12: false, hour: 'numeric', minute: 'numeric'});

            return `${month} ${day}, ${year} @ ${time}`; // May 5, 2019 @ 23:41
        }

        const commentDiv = document.querySelector('.basket__comment-input') as HTMLInputElement
        const comment = commentDiv.value

        const form = {
            userId: userId,
            data: data(),
            basketArr: basketArr,
            deliveryId: orderProperty.current?.delivery,
            paymentId: orderProperty.current?.payment,
            comment: comment,
            state: '??????????'
        }
        
        request('api/order/newOrder', 'POST', {...form})
        .then(() => {
            localStorage.removeItem('basket')
            setBasketArr([])
            setToast({message: '?????????? ?????????????? ????????????????! ???? ?? ???????? ???????????????? ?? ?????????????????? ??????????! ?????????????? ???? ??????????????!', type: 'success', id: Date.now()})

        })

    }, [basketArr])

    return (
        <div className='basket container'>
            <h1 className='basket__title'>??????????????</h1>
            <div className='basket__item-list'>
                <div className='basket__item-list-header'>
                    <div className='basket__item-list-header-delete'></div>
                    <p>????????????????????????</p>
                    <div className='basket__item-price-wrapper'>
                        <p>????????</p>
                        <p>??????-????</p>
                        <p>????????</p>
                    </div>
                </div>
                {loading
                    ?
                    <Loader></Loader>
                    :
                    (basketArr.length > 0)
                        ?
                        <>
                        {basketArr.map((elem) => {
                            return <BasketItem data={elem} deleteProduct={deleteProductFromBasket} key={elem._id} changeTotal={changeTotal}></BasketItem>
                            })
                        }
                        <div className='basket__item-price-bottom-wrapper'>
                            <MyButton onClick={deleteBasketItems}>???????????????? ??????????????</MyButton>
                            <div className='basket__item-price-total'>
                                <p>?????????? ????????: <span>{total} ??.</span></p>
                            </div>
                        </div>

                        </>
                        :
                        <div className='basket__empty'>
                            <p>?? ?????????????? ??????????, ?????????????? ?? <Link to='../'>???????????????</Link></p>
                            <img src={require('../img/empty_basket.png')}></img>
                        </div>  
                }
            </div>
            {isAuthenticated
                ?
                <>
                <BasketDelivery changeDelivery={changeDelivery}></BasketDelivery>
                <BasketPayment changePayment={changePayment}></BasketPayment>
                <div className='basket__comment'>
                    <h2 className='basket__comment-title'>?????????????????????? ?? ????????????</h2>
                    <div className='basket__comment-wrapper'>
                        <p className='basket__comment-text'>???? ???????????? ???????????????? ?????????????????????? ?? ????????????, ???????? ?????? ????????????????????</p>
                        <textarea className='basket__comment-input' placeholder='?????????????? ???????? ??????????????????????'/>
                    </div>
                </div>
                <div className='basket__order'>
                    <div className='basket__order-checkbox-wrapper'>
                        <input type='checkbox' onClick={e => {
                            setUpdate(true)
                            setCheked(!checked)
                            }}
                            defaultChecked={checked}></input>
                        <label>???????????????? ?? ?????? ?????? ??????</label>
                    </div>
                    <MyButton style={{fontSize: '20px', fontWeight: '700'}} disabled={!buttonActive} onClick={postNewOrder}>???????????????? ??????????</MyButton>
                </div>
                </>
                :
                <div className='basket__auth'>
                    <p>?????? ???????????????????? ???????????? ???????????????????? ?????????? ?? ??????????????!</p>
                    <div className='basket__auth-wrapper'>
                        <div className='basket__auth-borders'>
                            <LoginForm></LoginForm>
                        </div>
                        <div className='basket__auth-borders'>
                            <RegisterForm></RegisterForm>
                        </div>
                    </div>
                </div>         
            }
        </div>
    )
}

export default Basket
