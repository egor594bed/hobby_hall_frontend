import React, { memo } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import MyCounter from '../UI/MyCounter/MyCounter'

const BasketItem = memo(({data, deleteProduct, changeTotal}) => {
    const [counter, setCounter] = useState(data.total || 1)

    function checkCounter(value) {
        if(value === "") {
            setCounter(1)
        }
        else if (value < 1) return
        else if (value > 100) return
        else {
            setCounter(Number(value))
        }
    }

    useEffect(() => {
        let basketStr = localStorage.getItem('basket')
        let basketArr = JSON.parse(basketStr)

        for (let i = 0; i < basketArr.length; i++) {
            if (basketArr[i][0] == data._id) {
                setCounter(basketArr[i][1])
                break
            } 
        }
    }, [])

    useEffect(() => {
        if(counter >= 1) {
            changeTotal(data._id, counter)
        }
    }, [counter])


    return (
        <div className='basket__item'>
            <button data-id={data._id} onClick={e => deleteProduct(e.target.dataset.id)} className='basket__item-delete'>X</button>
            <img className='basket__item-img' src={require(`../../img/${(data.imgName) ? data.imgName : 'nophoto.jpeg'}`)}></img>
            <p className='basket__item-name'>{data.name}</p>
            <div className='basket__item-price-wrapper'>
                <p>{data.price} p.</p>
                <MyCounter setCounter={checkCounter} counter={counter}></MyCounter>
                <p>{data.price * counter} p.</p>
            </div>
        </div>
    )
})

export default BasketItem
