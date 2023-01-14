import React, { FC } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useHttp } from '../../hooks/http.hook'
import { IProduct } from '../../types/ICatalog'
import Loader from '../Loader/Loader'
import CatalogItem from './CatalogItem'
import CatalogPromoSlider from './CatalogPromoSlider'


interface ICatalogOutputArea {
    activeGoodsList: IProduct[]
    loading: boolean
}

const CatalogOutputArea: FC<ICatalogOutputArea> = ({activeGoodsList, loading}) => {

    const params = useParams()



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
                    return <CatalogItem {...elem} key={elem._id}></CatalogItem>
                })
                :
                <CatalogPromoSlider/>
            }
            
        </div>
    )
}

export default CatalogOutputArea
