export function toBasket(id) {
    const newProduct = [id, 1]

    if (localStorage.getItem('basket')) {
        let basketStr = localStorage.getItem('basket')
        let basketArr = JSON.parse(basketStr)

        let basketMap = new Map(basketArr)

        if (basketMap.has(id)) {
            basketMap.delete(id)
            let newBasketArr = []
            basketMap.forEach((value, key) => {
                newBasketArr.push([key, value])
            })
            localStorage.setItem('basket', JSON.stringify(newBasketArr))
        }else {
            localStorage.setItem('basket', JSON.stringify([...basketArr, newProduct]))
        }
    }else{
        localStorage.setItem('basket', JSON.stringify([newProduct]))
    }
}
