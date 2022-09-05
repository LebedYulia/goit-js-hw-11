import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {ApiService}  from './js/api-service.js';
import {renderCards} from './js/render-cards.js';

const refs = {
    searchForm: document.querySelector('#search-form'),
    galleryContainer: document.querySelector('.gallery'), 
    loadMoreBtn: document.querySelector('.load-more') 
}

const apiService = new ApiService();


refs.searchForm.addEventListener('submit', onSearch)
refs.loadMoreBtn.addEventListener('click', onLoadMore) 


async function onSearch(e) {
    e.preventDefault(); 
    refs.galleryContainer.innerHTML = '';   

    apiService.query = e.currentTarget.elements.searchQuery.value.trim();
    
    apiService.resetPage()
    
    if (apiService.query === '') {
        return
      }

    try {
        const data = await apiService.getImageByQuery();
          
         
        if (data.total === 0) {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.");                 
            
        } else {               
          refs.galleryContainer.insertAdjacentHTML('beforeend', renderCards(data.hits)); 
          Notify.success(`Hooray! We found ${data.total} images.`) 
          refs.loadMoreBtn.classList.remove('is-hidden') 

          if (data.hits.length < 40 || data.total < 40) {
            refs.loadMoreBtn.classList.add('is-hidden');           
          }                
        }    
      }
      catch(error) {console.log(error)} 
  
    }
        


async function onLoadMore() {
  try {
    const data = await apiService.getImageByQuery();  

    const totalPages = Math.ceil(data.total / apiService.per_page) + 1
    console.log(totalPages)
    console.log(apiService.page)

    refs.galleryContainer.insertAdjacentHTML('beforeend', renderCards(data.hits))

    if (apiService.page === totalPages) {
      console.log(apiService.page)
      refs.loadMoreBtn.classList.add('is-hidden');
      Notify.info("We're sorry, but you've reached the end of search results.")      
    } 
  }
  catch(error) {console.log(error)} 
  
}


