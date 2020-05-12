const url = new URL('http:/localhost:8080/order')
url.searchParams.set('lastName', localStorage.getItem('lastName'))

fetch(url, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
})
    .then(response => response.json())
    .then(data => {
        if(data.status === 200) {
            renderPrice(data.order.cost)
        }
    })

const renderPrice = price => {
    const priceHtml = document.querySelector('#price')
    priceHtml.innerText = `Сумма: ${price} грн (О точной цене вас оповестит администратор!)`
}

const finishOrder = () => {
    const clearStorage = document.querySelector('#clearStorage')
    clearStorage.addEventListener('click', () => {
        localStorage.clear()
    })
}

finishOrder()