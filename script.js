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
    console.log(id)
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        .then(res => res.json())
        .then(data => displaySingleCatagoryNews(data.data))
}

let displaySingleCatagoryNews = (siglr) => {

}

loadedAllCatagoryNews();


