// --------------loadedAllCatagoryNews--------------
let loadedAllCatagoryNews = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayAllCatagoryNews(data.data.news_category))
}

let displayAllCatagoryNews = (allCatagory) => {
    let allCatagoryName = document.getElementById('catagory-container');
    allCatagory.forEach(catagory => {
        let singleCountryName = document.createElement('div')
        singleCountryName.innerHTML = `
            <a onclick="loadedSingleCatagoryDetails(${catagory.category_id})"  class="fs-5 text-decoration-none text-dark fw-bold" href="#">${catagory.category_name}</a>
            `
        allCatagoryName.appendChild(singleCountryName)
    });


}
let loadedSingleCatagoryDetails = (id) => {
    // console.log(id)
    fetch(`https://openapi.programming-hero.com/api/news/category/0${id}`)
        .then(res => res.json())
        .then(data => displaySingleCatagoryNews(data.data))
}

let displaySingleCatagoryNews = (singleCatagoryNews) => {
    let perNewsContainer = document.getElementById('per-news');
    perNewsContainer.innerHTML = '';
    console.log(singleCatagoryNews)
    singleCatagoryNews.forEach(info => {
        console.log(info)
        let div = document.createElement('div');
        div.classList.add('col-md-6',);
        div.innerHTML = `
        <div class="card mb-3" style="max-width: auto;">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${info.image_url}" class="img-fluid h-100  rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${info.title}</h5>
                    <p class="card-text">${info.details.slice(0, 200)}...</p>
                </div>
            </div>
        </div>
    </div>
   
        `
        perNewsContainer.appendChild(div)
    });

}

loadedAllCatagoryNews();


