import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {ApiService}  from './js/api-service.js';
// import SimpleLightbox from 'simplelightbox';
// import "simplelightbox/dist/simple-lightbox.min.css";
import {renderCards} from './js/render-cards.js';

const refs = {
    searchForm: document.querySelector('#search-form'),
    galleryContainer: document.querySelector('.gallery'), 
    loadMoreBtn: document.querySelector('.load-more') 
}

const apiService = new ApiService();


refs.searchForm.addEventListener('submit', onSearch)
refs.loadMoreBtn.addEventListener('click', onLoadMore) 


function onSearch(e) {
    e.preventDefault();    

    apiService.query = e.currentTarget.elements.searchQuery.value.trim();
    apiService.resetPage()
    console.log(apiService.query)

    if (apiService.query === '') {
        return
      }

    apiService.getImageByQuery()
    .then(data =>  {
        refs.galleryContainer.innerHTML = '';
           
        if (data.total === 0) {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.");                 
            
        } else {               
          refs.galleryContainer.insertAdjacentHTML('beforeend', renderCards(data.hits)); 
          Notify.success(`Hooray! We found ${data.total} images.`) 
          refs.loadMoreBtn.classList.remove('is-hidden') 
          
          if (data.hits.length < 40 || data.total < 40) {
            refs.loadMoreBtn.classList.add('is-hidden');
            Notify.info("We're sorry, but you've reached the end of search results.");
          }
          
        }
    
       }
    )     
}

function onLoadMore() {
    apiService.getImageByQuery().then(data =>  refs.galleryContainer.insertAdjacentHTML('beforeend', renderCards(data.hits)))
}


