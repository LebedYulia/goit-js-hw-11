import axios from "axios";

const KEY = '29641497-e95f803aba10936f30ac1e55f';
const baseURL = 'https://pixabay.com/api/';


export function getImageByQuery(searchQuery) {
    const params = {
        key: KEY,
        q: searchQuery,
        image_type:  "photo",
        orientation:  "horizontal",
        safesearch: "true",
        page: 1,
        per_page: 40,  
    }

    return  axios.get(baseURL, {params})
                 .then(response => response.data);
}