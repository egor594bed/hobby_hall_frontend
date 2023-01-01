import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useHttp } from '../../hooks/http.hook';

const CatalogCategories = (props) => {
    const {request} = useHttp()
    const [catalogList, setCatalogList] = useState([])
    let [active, setActive] = useState(null);

    function isActiveCategory (id) {
        if(active === id) {
            setActive(false)
        }else {
            setActive(id)
        }
    }

    useEffect(() => {
        async function getCatalog() {
            const data = await request('/api/catalog/getCategory', 'GET')
            console.log(data)

            setCatalogList(data.catalog)
        }
        getCatalog()
    }, [])

    return (
        <>
        <div className='catalog__categories'>
            <div className='catalog__categories-title'>Категории</div>
            <div className='catalog__categories-wrapper'>
            {catalogList.map((elem) => {
                return (
                    <>
                        <div className={(active === elem._id) ? 'catalog__categories-subcategories active-category' : 'catalog__categories-subcategories'}
                        id={elem._id}
                        key={elem._id}
                        onClick={(e) => isActiveCategory(e.target.id)}>
                            {elem.name}
                        </div>
                        <div className='catalog__categories-subcategories-wrapper'>
                            <ul>
                                {elem.subCategories.map((elem) => {
                                    return (
                                    <ol id={elem._id} key={elem._id} onClick={(e) => props.getGoodsId(e.target.id)}>
                                        {elem.name}
                                    </ol>
                                    )
                                })}
                            </ul>
                        </div>
                    </>
                )
            })}
            </div>
        </div>
        </>
    )
}

export default CatalogCategories
