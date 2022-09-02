import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {ApiService}  from './js/api-service.js';
import SimpleLightbox from "simplelightbox";

const refs = {
    searchForm: document.querySelector('#search-form'),
    galleryContainer: document.querySelector('.gallery'), 
    loadMoreBtn: document.querySelector('.load-more') 
}

const apiService = new ApiService();
let gallery = new SimpleLightbox('.gallery',  {captions: true} );

refs.searchForm.addEventListener('submit', onSearch)
refs.loadMoreBtn.addEventListener('click', onLoadMore) 


function onSearch(e) {
    e.preventDefault();    

    apiService.query = e.currentTarget.elements.searchQuery.value;
    apiService.resetPage()
    console.log(apiService.query)

    apiService.getImageByQuery()
    .then(hits =>  { 
          
            
        if (hits.length === 0) {
        Notify.failure("We're sorry, but you've reached the end of search results.");                 
            
        } else {               
            renderCards(hits)               
        }}
    )
     
}

function onLoadMore() {
    apiService.getImageByQuery().then(hits => renderCards(hits))
}

function renderCards(hits) {
    const markup = hits
    .map(({ webformatURL, tags, likes, views, comments, downloads}) => {
       return `
       <div class="photo-card">
       <img src="${webformatURL}" alt="${tags}" loading="lazy" />
       <div class="info">
         <p class="info-item">
           <b>Likes</b> ${likes}
         </p>
         <p class="info-item">
           <b>Views</b>${views}
         </p>
         <p class="info-item">
           <b>Comments</b> ${comments}
         </p>
         <p class="info-item">
           <b>Downloads</b> ${downloads}
         </p>
       </div>
     </div>`
    })
    .join('')

    refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
} 

