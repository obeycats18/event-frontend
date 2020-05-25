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

const renderModal = () => {


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
            if (data.status === 200) {
                const order = data.order
                console.log(order)
                let doc = new DOMParser()
                const modalBody = document.querySelector('.modal-body')
                if (modalBody.children.length > 0) {
                    modalBody.innerHTML = ''
                }

                let orderString = `
                   <ul class="order-detail-list">
                       <li> <b>Фамилия</b> ${order.last_name} </li>
                       <li> <b>Имя</b> ${order.first_name} </li>
                       <li> <b>Телефон</b> ${order.telephone} </li>
                       <li> <b>Дата</b> ${order.date} </li>
                       <li> <b>Тип мероприятия</b> ${order.typeEvent} </li>
                       <li> 
                        <b>Блюда</b>
                        <ul class="order-detail-list-menu">
                             ${order.editedDishes.map( dish => `<li>${dish.name}</li>`).join(' ')}
                        </ul>
                       </li>
                       <li> 
                        <b>Доп.услуги</b>
                        <ul class="order-detail-list-services">
                             ${order.services.map( service => `<li>${service.name}</li>`).join(' ')}
                        </ul>
                       </li>
                   </ul>
                `


                const docMenu = doc.parseFromString(orderString, 'text/html');
                modalBody.appendChild(docMenu.body.firstChild)
            }
        })
}
renderModal()
finishOrder()