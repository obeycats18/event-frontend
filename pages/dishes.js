const url = new URL('http:/localhost:8080/menu')
url.searchParams.set('id', localStorage.getItem('menuId'))

let dishesLocal = []

fetch(url)
    .then(response => response.json())
    .then(data => {
        if(data.status === 200) {
            dishesLocal.push(...data.menu.dishes)
            renderDishes(data.menu.dishes)
        }
    })
    .then( () => addDishes())

    console.log(dishesLocal)

const editDishes = (currentDish) => {

    dishesLocal = dishesLocal.filter( dish => dish._id !== currentDish)

    renderDishes()

    const editDishesBtn = document.querySelector('#editDishes')
    editDishesBtn.addEventListener('click', () => sendDishes())    

} 

const addDishes = () => {
    const addDishesBtn = document.querySelector('#addDishes')
    addDishesBtn.addEventListener('click', () => {
        const modal = document.querySelector('#dishesModal')
        const modalBody = document.querySelector('.modal-body')
        if(modal && modalBody.children.length === 0 ) {
            fetch('http:/localhost:8080/dishes')
                .then(response => response.json())
                .then(data => {
                    if(data.status === 200) {
                        renderAllDishes(data.dishes)
                    }
                    return data.dishes
                })
                .then( dishes => {
                    const addDishesItem = document.querySelectorAll('#addDishesItem')
                    addDishesItem.forEach( item => {
                        item.addEventListener('click', e => {
                            pushDish(dishes, e.target.parentNode.parentNode.dataset.id)
                        })
                    })
                })
        }
    })
   
}

const pushDish = (dishes, currentDish) => {
    let dish = dishes.find( dish => dish._id === currentDish)
    dishesLocal.push(dish)
    renderDishes()
    $("#dishesModal").modal('hide')
    
}

const renderAllDishes = dishes => {
    const modalBody = document.querySelector('.modal-body')
    let doc = new DOMParser()
    
    dishes.forEach(dish => {
        const dishItemString = `
            <div class="edit-form-item" data-id="${dish._id}" id='addDishesItem' style="padding-bottom: 10px;">
                <div class="row justify-content-between">
                    <span class="name" style=" cursor: pointer;">${dish.name}</span>
                    <div class="cost-block">
                        <span class="cost">${dish.cost}</span>
                        <span>грн/за чел.</span>
                    </div>
                </div>
            </div>
        `

        const dishItemDoc = doc.parseFromString(dishItemString, 'text/html');
        modalBody.appendChild(dishItemDoc.body.firstChild)
    })
   
}

const sendDishes = () => {

    const url = new URL('http:/localhost:8080/order/create')
    url.searchParams.set('lastName', localStorage.getItem('lastName'))
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify( {editedDishes: dishesLocal})
    })
        .then(response => response.json())
        .then(data => {
            if(data.status === 200) {
                console.log(data)
            }
        })
}

const renderDishes = () => {
    const editFormWrapper = document.querySelector('.edit-form-wraper')
    let doc = new DOMParser()
    
    if(editFormWrapper.children.length > 0) {
        editFormWrapper.innerHTML = ''
    } 


    dishesLocal.forEach(dish => {
        const dishItemString = `
            <div class="edit-form-item " style="padding-right: 130px;">
                <div class="row justify-content-between">
                    <div> 
                        <img src="../img/chef-icon.svg" alt="" class="chef">
                        <span class="name">${dish.name}</span>
                    </div>
                    
                    <div class='row'>
                        <div class="cost-block">
                            <span class="cost">${dish.cost}</span>
                            <span>грн/за чел.</span>
                        </div>
                        <div class="trash">
                            <i id="trashBtn" data-id="${dish._id}" class="far fa-trash-alt"></i>
                            <span class="trash-tooltip">Удалить</span>
                        </div>
                    </div>
                </div>
            </div>
        `

        const dishItemDoc = doc.parseFromString(dishItemString, 'text/html');
        editFormWrapper.appendChild(dishItemDoc.body.firstChild)
        
    })

    const trashBtn = document.querySelectorAll('#trashBtn')
        trashBtn.forEach(trash => {
            trash.addEventListener('click', e => {
                const currentDish = e.target.dataset.id
                editDishes(currentDish)
            })
        })
}