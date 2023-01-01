import React, {useCallback, useState, } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CatalogCategories from '../components/Catalog/CatalogCategories'
import CatalogOutputArea from '../components/Catalog/CatalogOutputArea'
import CatalogSearch from '../components/Catalog/CatalogSearch'

const Catalog = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [subCategoryId, setSubCategoryId] = useState('')
    const getGoodsId = useCallback((id) => {
        if(params.id) navigate(-1)
        setSubCategoryId(id)
    })

    return (
        <div className='catalog container'>
            <CatalogCategories getGoodsId={getGoodsId}></CatalogCategories>
            <div className='catalog__rigth'>
                <CatalogSearch></CatalogSearch>
                <CatalogOutputArea subCategoryId={subCategoryId}></CatalogOutputArea>
            </div>
        </div>
    )
}

export default Catalog
