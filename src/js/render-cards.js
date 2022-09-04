export function renderCards(hits) {
    const markup = hits
    .map(({ webformatURL, tags, likes, views, comments, downloads, largeImageURL }) => {
       return `
       <a class="gallery__link" href="${largeImageURL}" >
            <div class="gallery__item">      
                <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
       
                <div class="info">
                    <p class="info-item"><b>Likes</b> ${likes}
                    </p>
                    <p class="info-item"><b>Views</b>${views}
                    </p>
                    <p class="info-item"><b>Comments</b> ${comments}
                    </p>
                    <p class="info-item"><b>Downloads</b> ${downloads}
                    </p>
                </div>
            </div>
      </a>`
    })
    .join('')  
    
    return markup;
} 
