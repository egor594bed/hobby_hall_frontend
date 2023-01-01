import React, {useEffect, useState} from 'react'
import { useHttp } from '../../hooks/http.hook';
import MyButton from '../UI/MyButton/MyButton';
import MyInput from '../UI/MyInput/MyInput';

const AdminAdd = () => {
    const {request} = useHttp()
    const [catalogList, setCatalogList] = useState([])
    const [activeCategory, setActiveCategory] = useState('')
    const [activeSubCategory, setSubActiveCategory] = useState('')

    useEffect(() => {
        async function getCatalog() {
            const data = await request('/api/catalog/getCategory', 'GET')
            .then(data => setCatalogList(data.catalog))
            console.log(data)
        }
        getCatalog()
    }, [])

    function setNewStates(id) {
        setSubActiveCategory('')
        setActiveCategory(id)
    }
    
    function addNewProduct(e) {
        e.preventDefault()
        let formData = new FormData()
        formData.append('name', document.getElementById('name').value)
        formData.append('description', document.getElementById('description').value)
        formData.append('price', document.getElementById('price').value)
        formData.append('article', document.getElementById('article').value)
        formData.append('img', document.getElementById('img').files[0])
        formData.append('quantity', document.getElementById('quantity').value)
        formData.append('subCategory', activeSubCategory)

        try {
            fetch('/api/catalog/setProduct', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(json => console.log(json))
        } catch (error) {
            console.log(error)
        }

    }
    
    // console.log(document.getElementById('imgSrc').files[0])
    return (
        <div className='admin__display'>
            <p>Категория</p>
            <select name='category' onChange={e => setNewStates(e.target.value)}>
            {
                catalogList.map((elem) => {
                    return <option key={elem._id} value={elem._id}>{elem.name}</option>
                })
            }
            </select>
            <p>Подкатегория</p>
            <select name="subCategory" onChange={e => setSubActiveCategory(e.target.value)}>
            {(activeCategory)
                ?
                catalogList.map ((elem) => {
                    if(elem._id == activeCategory) {
                        return elem.subCategories.map((elem) => {
                            return <option key={elem._id} value={elem._id}>{elem.name}</option>
                        })
                    }
                })
                :
                <option disabled>Выберите категорию</option>
            }
            </select>

            <form encType='multipart/form-data' style={{width:"300px", marginTop:"30px"}}>
                <MyInput placeholder="Наименование" id="name" type="text"></MyInput>
                <MyInput placeholder="Описание" id="description" type="text"></MyInput>
                <MyInput placeholder="Цена" id="price" type="text"></MyInput>
                <MyInput placeholder="Артикул" id="article" type="text"></MyInput>
                <MyInput id="img" type="file" accept="image/png, image/jpeg"></MyInput>
                <MyInput placeholder="Количество товара" id="quantity" type="text"></MyInput>
                <MyButton style={{marginTop:"10px"}} onClick={addNewProduct} disabled={!activeSubCategory}>Добавить</MyButton>
            </form>

        </div>
    )
}

export default AdminAdd
