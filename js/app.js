// category nav 
const loadCategory = () => {
   const url = `https://openapi.programming-hero.com/api/news/categories`;
   fetch(url)
       .then(res => res.json())
       .then(data => showCategory(data.data.news_category))
}

const showCategory = (newsCategory) => {
   const categoriesWrapper = document.getElementById('content-container');

   console.log(newsCategory);
   newsCategory.forEach(category => {
       const categoryTab = document.createElement('div');
       categoryTab.classList.add('col', 'text-center');
       categoryTab.innerHTML = `
           <p class="border rounded px-2 mb-0 text-nowrap category-nav" onclick="loadNewaContent(${category.category_id})">${category.category_name}</p>
       `
       categoriesWrapper.appendChild(categoryTab);
   });
}


const loadNewaContent = (id = 8) => {
   const url = `https://openapi.programming-hero.com/api/news/category/0${id}`
   fetch(url)
       .then(res => res.json())
       .then(data => showNewsContent(data.data))
};

const showNewsContent = (contents) => {
   const newsContainer = document.getElementById('news-wrspper');
   newsContainer.innerHTML = '';

   contents.forEach(content => {
       console.log(content);
       const card = document.createElement('div');
       card.classList.add('card','mb-3');
       card.innerHTML = `
           <div class="row g-0">
               <div class="col-md-4 mb-2">
                   <img src="${content.thumbnail_url}" class="img-fluid rounded-start" alt="image">
               </div>
               <div class="col-md-8">
                   <div class="card-body">
                       <h5 class="card-title">${content.title}</h5>
                       <p class="card-text">${content.details.slice(0, 300)}...</p>
                       <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                   </div>
               </div>
           </div>
       `
       newsContainer.appendChild(card);
   })
}

loadNewaContent();
loadCategory();