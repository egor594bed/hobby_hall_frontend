import React from 'react'
import {Link} from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { toBasket } from '../../utils/toBasket'
import MyButton from '../UI/MyButton/MyButton'

const CatalogItem = ({data}) => {
    const [onBasket, setOnBasket] = useState(false)

    function addToBasket(e) {
        e.preventDefault();
        toBasket(e.target.dataset.id)
        setOnBasket(!onBasket)
    }

    useEffect(() => {
        if(localStorage.getItem('basket')) {
            let basketStr = localStorage.getItem('basket')
            let basketArr = JSON.parse(basketStr)
    
            for (let i = 0; i < basketArr.length; i++) {
                if(basketArr[i][0] === data._id) {
                    setOnBasket(true)
                    break
                }
            }
        }
    }, [])




    return (
        <Link to={`product/${data._id}`}>
            <div className='catalog__item' id={data._id}>
                <div className='catalog__item-wrapper'>
                    <img className='catalog__item-img' src={(data.imgName) ?require(`../../img/${data.imgName}`) : require('../../img/nophoto.jpeg')}></img>
                    <div className='catalog__item-text'>
                        <h2 className='catalog__item-title'>{data.name}</h2>
                        <p className="catalog__item-description">{`${data.description}`}</p>
                    </div>
                    <div className='catalog__item-wrapper-bottom'>
                        <h4 className="catalog__item-price">{`${data.price} р.`}</h4>
                        <MyButton
                        onClick={addToBasket}
                        data-id={data._id}
                        style={{width: '50%'}}
                        >{(onBasket) ? 'Удалить' : 'В корзину'}</MyButton>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CatalogItem
