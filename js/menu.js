fetch('http:/localhost:8080/menus')
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        if(data.status === 200) {
            renderMenu(data.menu)
            renderMenuInfo(data.menu)
            
        }
        return data
    })

function renderMenu(menu) {
    let doc = new DOMParser()
    const ulList = document.querySelector('.nav-pills')
    for(let i = 0; i < menu.length; i++) {
        const li = `
        <li class="nav-item"> 
            <a class="btn-main btn-trans" id="nav-${menu[i]._id}" data-toggle="pill" href="#content-${menu[i]._id}" role="tab" aria-controls="content-${menu[i]._id}" aria-selected="true"> ${menu[i].name} </a>
        </li>`
        const docLi = doc.parseFromString(li, 'text/html');
        ulList.appendChild(docLi.body.firstChild)
    }
}


function renderMenuInfo(menu) {
    let doc = new DOMParser()
    const tabMenu = document.querySelector('.tab-content')
    for(let i = 0; i < menu.length; i++) {
        const divMenu = `
        <div class="tab-pane fade show ${ i === 0 ? "active" : "" }" id="content-${menu[i]._id}" role="tabpanel" aria-labelledby="nav-${menu[i]._id}">
            <div class="row justify-content-between"> 
                <div class="tab-image">
                    <img  src="img/food-menu-img1.png" alt="">
                </div>
                <div class="tab-menu">
                    <h3>${menu[i].name}</h3>

                    <div class="dishes-list edit-form-wraper">
                    
                        <ul>
                            ${
                                menu[i].dishes.map( function(dish) {
                                return `
                                    <li>
                                        <div class="row justify-content-between align-items-center">
                                            <div class="food-name-block">
                                                <img class='food-menu-img' src="img/chef-icon.svg" alt="">
                                                <span>${dish.name}</span>
                                            </div>
                                            
                                            <div class="cost-block">
                                                <span class="cost">${dish.cost}</span>
                                                <span>грн/за чел.</span>
                                                <i class="fas fa-info-circle"></i>
                                            </div>
                                        </div>
                                    </li>
                                `
                            } ).join(' ')}
                        </ul>    
                    </div>
                </div>
            </div>
        </div>
        `
        // ${renderDishes(menu[i].dishes)}
        const docLi = doc.parseFromString(divMenu, 'text/html');
        tabMenu.appendChild(docLi.body.firstChild)
    }
}