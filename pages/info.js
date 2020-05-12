$(document).ready(function() {
    $('#telephone').mask("+38(999) 999-9999");
})

function getInfo () {
    
    const lastName = document.querySelector('#surname')
    const firstName = document.querySelector('#name')
    const phone = document.querySelector('#telephone')

    const btn = document.querySelector('#addInfo')

    btn.addEventListener('click', function () {
        
        localStorage.setItem("lastName", lastName.value)

        const url = new URL('http:/localhost:8080/order/create')
        url.searchParams.set('lastName', localStorage.getItem('lastName'))
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                first_name: firstName.value,
                last_name: lastName.value,
                telephone: phone.value
            })
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

getInfo()