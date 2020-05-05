function select () {
    console.log('select')
    $('#type-event').niceSelect();
}
  
function datepickerMine () {
    $('.datepicker-here').datepicker({
        autoClose:true
      });
}


fetch('http:/localhost:8080/menus')
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        if(data.status === 200) {
            renderSelect(data.menu)
            select()           
        }
    })
    .then( () => getEventInfo())


function renderSelect(menu) {
    console.log('renderSelect')
    const select = document.querySelector('#type-event')
    menu.forEach( item => {
        const option = document.createElement('option')
        option.value = item._id
        option.innerHTML = item.name
        
        select.appendChild(option)        
    })
}

function fetchMenu(id) {

    const url = new URL('http:/localhost:8080/menu')
    url.searchParams.set('id', id)

    fetch(url)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            if(data.status === 200) {
                renderMenu(data.menu)
            }
        })

    
}

function renderMenu(menu) {

    console.log(menu)
    let doc = new DOMParser()
    const formRight = document.querySelector('.form-right')

    if(formRight.children.length > 0) {
        formRight.innerHTML = ''
    }  

    const menuString = `
        <div>
            <h3>${menu.name}</h3>
            <div class="menu-dish-list edit-form-wraper">
                <ul>
                    ${
                        menu.dishes.map( function(dish) {
                            return `
                                <li>
                                    <div class="row justify-content-between align-items-center">
                                        <div class="food-name-block">
                                            
                                            <span>${dish.name}</span>
                                        </div>
                                        
                                        <div class="cost-block">
                                            <span class="cost">${dish.cost} грн</span>
                                        </div>
                                    </div>
                                </li>
                            `
                    } ).join(' ')}
                </ul>    
            </div>
        </div>
    `

    const docMenu = doc.parseFromString(menuString, 'text/html');
    formRight.appendChild(docMenu.body.firstChild)
}

function getEventInfo () {
    console.log('getEventInfo')

    const time = document.querySelector('#time')
    const date = document.querySelector('#date-event')
    const current = document.querySelector('.current')
    const options = document.querySelectorAll('li.option')

    if(current.innerText) {
        options.forEach( option => {
            if(option.innerText === current.innerText) {
                fetchMenu(option.dataset.value)
            }
        })
        
    }

    options.forEach(option => option.addEventListener('click', (e) => fetchMenu(e.target.dataset.value)))

    const countPeople = document.querySelector('#count-people')

    const btn = document.querySelector('#addEventInfo')
   
    btn.addEventListener('click', function (e) {
        const body = {
            date: date.value,
            time: time.value,
            count_peoples: countPeople.value,
        }
   
        const url = new URL('http:/localhost:8080/order/create')
        url.searchParams.set('lastName', localStorage.getItem('lastName'))
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(body)
        })
            .then(function(response) {
                return response.json()
            })
            .then(function(data) {
                if(data.status === 200) {
                    console.log(data)
                }
            })
    })

}
datepickerMine()
