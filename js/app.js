// category nav 
const loadCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url);
    const data = await res.json();
    showCategory(data.data.news_category);
}

const showCategory = (newsCategory) => {
    const categoriesWrapper = document.getElementById('content-container');

    // console.log(newsCategory);
    newsCategory.forEach(category => {
        const categoryTab = document.createElement('div');
        categoryTab.classList.add('col', 'text-center', 'category');
        categoryTab.innerHTML = `
           <p class="rounded px-2 mb-0 text-nowrap category-nav" onclick="loadNewaContent(${category.category_id})">${category.category_name}</p>
       `
        categoriesWrapper.appendChild(categoryTab);

    });
}


const loadNewaContent = async (id = 8) => {
    toggleSpinner(true);
    const url2 = `https://openapi.programming-hero.com/api/news/category/0${id}`;
    const res = await fetch(url2);
    const data = await res.json();
    showNewsContent(data.data);
};

const showNewsContent = (contents) => {
    const newsContainer = document.getElementById('news-wrspper');
    newsContainer.innerHTML = '';

    const newsCount = contents.length;
    const newsCountContainer = document.getElementById('count-message-container');
    if (newsCount === 0) {
        newsCountContainer.innerHTML = `
       <h4>No News Found</h4>
       `
    }
    else {
        newsCountContainer.innerHTML = `
       <h4>${newsCount} News Found</h4>
       `
    }

    contents.sort((a, b) => b.total_view > a.total_view ? 1 : b.total_view < a.total_view ? -1 : 0);

    contents.forEach(content => {
        // console.log(content);

        const card = document.createElement('div');
        card.classList.add('col', 'mb-3');
        card.innerHTML = `

            <div class="row g-0 border rounded shadow p-2">
                <div class="col-md-4 pe-0 pe-md-2">
                    <img src="${content.thumbnail_url}" class="w-100 img-fluid rounded-start" alt="image">
                </div>

                <div class="col-md-8">
                    <div class="card-body d-flex flex-column justify-content-between h-100">
                        <div>
                            <h5 class="card-title pb-3">${content.title}</h5>
                            <p class="card-text">${content.details.slice(0, 150)}...</p>
                        </div>
                        
                        <div class="row">
                            <div class="col-5 pb-2 pb-lg-0 pe-0">
                                <div class="d-flex align-items-center">
                                    <div class="image flex-shrink-0 me-2">
                                        <img class="avatar" src="${content.author.img}" alt="image">
                                    </div>
                                    <div class="details">
                                        <p class="m-0">${content.author.name ? content.author.name : 'Name not found'}</p>
                                        <p class="m-0">${content.author.published_date ? content.author.published_date.slice(0, 10) : 'Date not found'}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4 text-start">
                                <p class="text-success m-0">Views: ${content.total_view ? content.total_view : 'No data Found'}</p>
                                <p class="text-success m-0">Ratings : ${content.rating.number}</p>
                            </div>
                            <div class="col-3 text-start pt-2">
                                <button class="btn btn-success" onclick="loadNewsDetails('${content._id}')" data-bs-toggle="modal" data-bs-target="#exampleModal">More</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
        newsContainer.appendChild(card);
    })

    toggleSpinner(false);
}


const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('display-loading');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

const loadNewsDetails = async (news_id) => {
    const url3 = `https://openapi.programming-hero.com/api/news/${news_id}`;
    const res = await fetch(url3);
    const data = await res.json();
    displayNewsDetails(data.data[0])
}

const displayNewsDetails = (newsDetails) => {
    const newsDetailContainer = document.getElementById('display-container');


    // console.log(newsDetails);
    newsDetailContainer.innerHTML = `
        <div class="image">
            <img class="image-fluid w-100" src="${newsDetails.image_url}" alt="image">
        </div>
        <div class="text pt-2">
            <h2>${newsDetails.title}</h2>
            <p>${newsDetails.details}</p>
        </div>
    `
}

loadNewaContent();
loadCategory();