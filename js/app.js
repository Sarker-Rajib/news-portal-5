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
           <p class="border rounded mb-0 text-nowrap" onclick="loadNewaContent(${category.category_id})">${category.category_name}</p>
       `
       categoriesWrapper.appendChild(categoryTab);
   });
}

loadCategory();