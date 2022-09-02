import axios from "axios";


export class ApiService 
   {constructor() {
        this.searchQuery = "";
        this.baseURL = 'https://pixabay.com/api/';
        this.key = '29641497-e95f803aba10936f30ac1e55f';
        this.page = 1;
        }

        getImageByQuery() {
            const params = {
                key: this.key,
                q: this.searchQuery,
                image_type:  "photo",
                orientation:  "horizontal",
                safesearch: "true",
                page: this.page,
                per_page: 40,  
            }

        return  axios.get(this.baseURL, {params})
                    .then(response => response.data)
                    .then(data => {
                        this.page += 1;
                        console.log(data.hits)
                        return data.hits});
        }

        get query() {
            return this.searchQuery;
        }

        set query(newQuery){
            this.searchQuery = newQuery;

        }

        resetPage() {
            this.page = 1;
        }
}