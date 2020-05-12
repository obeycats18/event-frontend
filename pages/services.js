fetch('http:/localhost:8080/services')
    .then(response => response.json())
    .then(data => {
        if(data.status === 200) {
            renderServices(data.services)
            sendServices()
        }
    })


const renderServices = services => {
    const servicesWrapper = document.querySelector('.addservice')
    const doc = new DOMParser()
    services.forEach(service => {
        const serviceDivString = ` 
            <label class="checkbox-container" data-id="${service._id}">${service.name}
                <input type="checkbox" id='checkbox-input'>
                <span class="checkmark"></span>
            </label>
        `

        const docServiceDiv = doc.parseFromString(serviceDivString, 'text/html');
        servicesWrapper.appendChild(docServiceDiv.body.firstChild)
    })
}

const sendServices = () => {
    const checkboxes = Array.from(document.querySelectorAll('#checkbox-input'))

    const btn = document.querySelector('#addServices')
    btn.addEventListener('click', () => {
        const checkedCheckboxes = checkboxes.filter( checkbox => checkbox.checked )
        const ids = checkedCheckboxes.map( checkbox => checkbox.parentNode.dataset.id)
        const url = new URL('http:/localhost:8080/order/create')
        url.searchParams.set('lastName', localStorage.getItem('lastName'))
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify( {services: ids})
        })
            .then(response => response.json())
            .then(data => {
                if(data.status === 200) {
                    console.log(data)
                }
            })

    } )
    
}