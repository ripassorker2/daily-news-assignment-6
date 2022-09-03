// --------------loadedAllCatagoryNews--------------
let loadedAllCatagoryNews = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayAllCatagoryNews(data.data.news_category))
        .catch(error => console.log(error))
}

let displayAllCatagoryNews = (allCatagory) => {
    let allCatagoryName = document.getElementById('catagory-container');
    allCatagory.forEach(catagory => {
        let singleCatagoryName = document.createElement('div')
        singleCatagoryName.innerHTML = `
            <a onclick="loadedSingleCatagoryDetails(${catagory.category_id})"  class="fs-5 px-3 text-decoration-none text-primary fw-bold" href="#">${catagory.category_name}</a>
            `
        allCatagoryName.appendChild(singleCatagoryName)
    });
}


let loadedSingleCatagoryDetails = (id) => {
    toggleSpinner(true);
    fetch(`https://openapi.programming-hero.com/api/news/category/0${id}`)
        .then(res => res.json())
        .then(data => displaySingleCatagoryNews(data.data))
        .catch(error => console.log(error))

}



let displaySingleCatagoryNews = (singleCatagoryNews) => {
    // ----------------- short-----------------
    singleCatagoryNews.sort((a, b) => b.total_view - a.total_view)
    // --------------------added news amount-----------------/
    let newsAmount = document.getElementById('news-amount')
    newsAmount.innerText = singleCatagoryNews.length
    let perNewsContainer = document.getElementById('per-news');
    perNewsContainer.innerHTML = '';
    singleCatagoryNews.forEach(info => {
        let div = document.createElement('div');
        div.classList.add('col-md-12',);
        div.innerHTML = `
        <div class="card mb-3" style="max-width: auto;">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${info.image_url}" class="img-fluid h-100  rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title text-info fw-bold">${info.title}</h5>
                    <p class="card-text">${info.details.slice(0, 200)}...</p>
            </div>
            <div class="container d-flex justify-content-between pt-3 flex-flex-wrap card-footer">
                <div class="d-flex align-items-center ">
                    <img class="rounded-circle " style="height: 60px; width: 60px; " src="${info.author.img}" alt="">
                    <div class="ps-3">
                        <strong  class="ps-2" >${info.author.name ? info.author.name : 'No foound author name'}</strong>
                        <p  class="ps-2" >${info.author.published_date ? info.author.published_date : 'No faound date'}</p>
                    </div>
                </div>
                <div class="pt-3 fw-bold">
                    <p> <i class="fa-regular fa-eye"></i> ${info.total_view ? info.total_view : 'No viwes'}M</p>
                </div>
                <div class="pt-3 text-warning">
                    <p> <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star-half-stroke"></i></i><i class="fa-regular fa-star"></i></p>
                </div>
                <div class="pt-3 text-info">
                    <button onclick="loadedNewsDetails('${info._id}')" class="btn btn-info"  data-bs-toggle="modal" data-bs-target="#loadedNewsDetails" > <i class="fa-solid fa-arrow-right"></i></button>
            </div>
            </div>
            </div>
        </div>
    </div>
   
        `
        perNewsContainer.appendChild(div)

    });
    toggleSpinner(false)

}


let loadedNewsDetails = (id) => {
    fetch(`https://openapi.programming-hero.com/api/news/${id}`)
        .then(res => res.json())
        .then(data => displayNewsDetails(data.data))
        .catch(error => console.log(error))
}




let displayNewsDetails = (newsDetails) => {

    console.log(newsDetails)
    newsDetails.forEach(news_info => {
        console.log(news_info)
        let newsTitle = document.getElementById('loadedNewsDetailsLabel');
        newsTitle.innerText = `News title : ${news_info.title} `
        let modalBody = document.getElementById('modal-body')
        modalBody.innerHTML = `
                <img src="${news_info.image_url ? news_info.image_url : 'no bannar found'}"                  class="img-img-fluid w-100 pb-3" alt="">
                <h6>Author details :</h6>
                <img src="${news_info.author.img ? news_info.author.img : 'No author image found'}"          class="img-img-fluid rounded-circle"  style="height: 60px; width: 60px; alt= "">
                <p>Name : ${news_info.author.name ? news_info.author.name : 'No author name found'}</p>
                <p>Publish date : ${news_info.author.published_date ? news_info.author.published_date : 'No date  found'}</p>
                <p>Total views : ${news_info.total_view ? news_info.total_view : 'No views'}M</p>
                <p><strong>Description :</strong> ${news_info.details ? news_info.details : 'No details available'}M</p>
        `

    })


}


let toggleSpinner = (isLoading) => {
    let lodar = document.getElementById('lodar');
    if (isLoading) {
        lodar.classList.remove('d-none')
    }
    else {
        lodar.classList.add('d-none');
    }
}

loadedAllCatagoryNews();


