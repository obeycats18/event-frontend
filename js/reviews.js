fetch('http:/localhost:8080/reviews')
    .then(response => response.json())
    .then(data => {
        if(data.status === 200) renderReviews(data.reviews)
    })
    .then(() => (
        $("#owl-reviews").owlCarousel({
            items:1, 
            nav:true,
            loop:true,
            dots: true,
            navText:[
              '<div class="review-arrow-left"><img src="img/Left.svg"></div>', 
              '<div class="review-arrow-right"><img src="img/Right.svg"></div>'
            ]
        })
    ))

const renderStart = rating => {
    let stars = []

    for(let i = 0; i < rating; i++) {
        stars.push(`<i class="fas fa-star"></i>`)
    }

    for(let i = rating; i < 5; i++) {
        stars.push(`<i class="far fa-star"></i>`)
    }
    
    
    return stars.join(' ')
}

const renderReviews = reviews => {
    const reviewsWrapper = document.querySelector('#owl-reviews')
    let doc = new DOMParser()
    reviews.forEach(review => {
        const reviewDiv = ` 
            <div class="review">
                <div class="review-owner">
                    <div class="photo-block"><img class="review-owner-photo" src="img/dog.jpg" alt=""></div>
                    <div class="review-owner-name">${review.first_name} ${review.last_name}</div>
                    <div class="review-owner-star">
                        ${renderStart(review.rating)}
                    </div>
                </div>
                <div class="review-text">
                    <img class="quote-left" src="img/Quotemarksleft.svg" alt="">
                    <p>${review.text}</p>
                    <img class="quote-right" src="img/Quotemarksright.svg" alt="">
                </div>
            </div>
        `

        const docReview = doc.parseFromString(reviewDiv, 'text/html');
        reviewsWrapper.appendChild(docReview.body.firstChild)
    })
}


const createReview = () => {
    const reviewModal = document.querySelector('#reviewModal');
    const firstName = reviewModal.querySelector('#first_name')
    const lastName = reviewModal.querySelector('#last_name')
    const reviewText = reviewModal.querySelector('#review_text')
    const btn = reviewModal.querySelector('#createReviewBtn')

    btn.addEventListener('click', () => {
        console.log(firstName.value, lastName.value, reviewText.value)

        fetch('http:/localhost:8080/reviews/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({first_name: firstName.value, last_name: lastName.value, text: reviewText.value, rating: 5})
        })
        .then( response => response.json() )
        .then( data => {
            if(data.status === 200) {
                $("#reviewModal").modal('hide')
                firstName.value = ""
                lastName.value = ""
                reviewText.value = ""
            }
        })
    })

} 

createReview()

