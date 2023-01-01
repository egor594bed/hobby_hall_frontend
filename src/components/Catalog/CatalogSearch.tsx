import React, { useState } from 'react'
import { memo } from 'react';

const CatalogSearch = memo(() => {

    const [value, setValue] = useState('');

    return (
        <div className='catalog__search'>
            <input
            className='catalog__search-input'
            type="text"
            onChange={(e) => setValue(e.target.value)}
            placeholder="Поиск"
            />
        </div>
    )
})

export default CatalogSearch
