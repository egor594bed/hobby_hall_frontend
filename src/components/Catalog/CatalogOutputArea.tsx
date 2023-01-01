import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useHttp } from '../../hooks/http.hook'
import Loader from '../Loader/Loader'
import CatalogItem from './CatalogItem'
import CatalogPromoSlider from './CatalogPromoSlider'

const CatalogOutputArea = (props) => {
    const {loading, error, request} = useHttp()
    const [activeGoodsList, setActiveGoodsList] = useState([])
    const params = useParams()

    useEffect(() => {
        if(!props.subCategoryId) return
        async function getGoods() {
            const data = request(`/api/catalog/getGoodsFromId?id=${props.subCategoryId}`)
            .then(data => {
                setActiveGoodsList(data.activeCategoryGoods)
            })
            console.log(data)
        }
        getGoods()
    }, [props.subCategoryId])

    if(loading) {
        return (
        <div className='catalog__outputArea' style={{display: "block"}}>
            <Loader></Loader>
        </div>
        )
    }else if(params.id) {
        return (
            <div className='catalog__outputArea' style={{ display: "block"}}>
                <Outlet></Outlet>
            </div>
        )
    }

    return (
        <div className='catalog__outputArea' style={{ display: (activeGoodsList[0]) ? "" : "block", padding: (activeGoodsList[0]) ? "" : "0"}}>
            {(activeGoodsList[0])
                ?
                activeGoodsList.map((elem) => {
                    return <CatalogItem data={elem} key={elem._id}></CatalogItem>
                })
                :
                <CatalogPromoSlider/>
            }
            
        </div>
    )
}

export default CatalogOutputArea
