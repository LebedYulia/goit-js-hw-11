import axios from "axios";
const baseURL = 'https://pixabay.com/api/';
const KEY = '29641497-e95f803aba10936f30ac1e55f';

export class ApiService 
   {constructor() {
        this.searchQuery = "";        
        this.page = 1;
        this.per_page = 40;
        }

    async getImageByQuery() {
            const params = {
                key: KEY,
                q: this.searchQuery,
                image_type:  "photo",
                orientation:  "horizontal",
                safesearch: "true",
                page: this.page,
                per_page: this.per_page,  
            }

        
            const response = await axios.get(baseURL, {params});
            const data = await response.data
                this.page += 1;
                console.log(data)
                return data            
        
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