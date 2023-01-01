import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useHttp } from '../../hooks/http.hook'
import { toBasket } from '../../utils/toBasket'
import Loader from '../Loader/Loader'
import MyButton from '../UI/MyButton/MyButton'

const CatalogDetailingItem = () => {
    const params = useParams()
    const [product, setProduct] = useState({})
    const [onBasket, setOnBasket] = useState(false)
    const {request, loading} = useHttp()
    function noop() {}

    useEffect(() => {
        async function getProduct() {
            await request(`/api/catalog/getProduct?id=${params.id}`)
            .then((data) => setProduct(data.product))
        }
        getProduct()
    }, [])

    function addToBasket(e) {
        toBasket(e.target.dataset.id)
        setOnBasket(!onBasket)
    }

    useEffect(() => {
        
        if(localStorage.getItem('basket')) {
            let basketStr = localStorage.getItem('basket')
            let basketArr = JSON.parse(basketStr)
    
            for (let i = 0; i < basketArr.length; i++) {
                if(basketArr[i][0] === product._id) {
                    setOnBasket(true)
                    break
                }
            }
        }
    }, [product])

    if(loading) {
        return <Loader></Loader>
    }

    return (
        <div className='catalog__detail'>
            <Link to='../'>Назад</Link>
            <div className='catalog__detail-top'>
                <img className='catalog__detail-top-img' src={require(`../../img/${(product.imgName) ? product.imgName : 'nophoto.jpeg'}`)} alt='photo'></img>
                <div className='catalog__detail-top-side'>
                    <p className='catalog__detail-top-side-title'>{product.name}</p>
                    <p className='catalog__detail-top-side-article'>{product.article}</p>
                    <div className='catalog__detail-top-side-wrapper'>
                        <p className='catalog__detail-top-side-price'>{product.price} р.</p>
                        <MyButton
                        data-id={product._id}
                        onClick={addToBasket}
                        style={{width: '60%'}}
                        >{(onBasket) ? 'Удалить' : 'Добавить в корзину'}</MyButton>
                    </div>
                    <Link to='../../basket'><MyButton
                    onClick={noop}
                    style={{width: '100%'}}
                    >Перейти в корзину</MyButton></Link>
                </div>
            </div>
            <div className='catalog__detail-description'>
                    <p className='catalog__detail-description-text'>{(product.description) ? product.description : 'Нет описания'}</p>
            </div>
        </div>
    )
}

export default CatalogDetailingItem
