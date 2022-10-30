import { PostCard } from "../components/PostCard.js";
import { PostSearch } from "../components/PostSearch.js";
import { ajax } from "./ajax.js";
import wp_api from "./wp_api.js";

export async function infinite_scroll(){
    const d = document,
    w = window;

    let query = localStorage.getItem("wpSearch"),
    apiUrl,
    Component;
    
    w.addEventListener("scroll", async (e) =>{
        let {scrollTop, scrollHeight, clientHeight} = d.documentElement;
        let {hash} = w.location;

        
        if (scrollTop + clientHeight >= scrollHeight){
            wp_api.page ++;

            if(!hash || hash === "#/"){
                apiUrl = `${wp_api.POSTS}&page=${wp_api.page}`;
                Component = PostCard;
            }else if(hash.includes("#/search")){
                apiUrl = `${wp_api.SEARCH}${query}&page=${wp_api.page}`;
                Component = PostSearch;
            }else{
                return false;
            }
            
            d.querySelector(".loader").style.display = "block";
            
            await ajax({
                url: apiUrl,
                cbSuccess: (posts)=>{
                    console.log(posts);
                    let html = "";
                    posts.forEach(post => html += Component(post));
                    d.querySelector("#main").insertAdjacentHTML("beforeend", html);
                    d.querySelector(".loader").style.display = "none";
                }
            });

        }
    });
}