import api from "../helpers/wp_api.js";
import { ajax } from "../helpers/ajax.js";
import { PostCard } from "../components/PostCard.js";
import { Post } from "./Post.js";
import { PostSearch } from "./PostSearch.js";
import { ContactForm } from "./ContactForm.js";

export async function Router(){
    const d = document,
    w = window,
    { hash } = location,
    $main = d.getElementById("main");

    if (!hash || hash === "#/"){
        await ajax({
            url: api.POSTS,
            cbSuccess: (posts) =>{
                // console.log(posts);
                let html = "";
                posts.forEach(el => html += PostCard(el));
                d.querySelector("#main").innerHTML = html;
            }
        });
    }else if(hash.includes("#/search")){
        let query = localStorage.getItem("wpSearch");

        if(!query){
            d.querySelector(".loader").style.display = "none";
            return false;
        } 
            
        await ajax({
            url: `${api.SEARCH}${query}`,
            cbSuccess: (search) =>{
                let html = "";

                if(search.length === 0 ){
                    console.log("No result");
                    html = `
                        <p class="error">
                            No existen resultados para <mark>${query}</mark>
                        </p>
                    `;
                }else{
                    search.forEach(post => html += PostSearch(post))
                }
                $main.innerHTML = html;
            }
        });
    }else if(hash === "#/contact"){
        // $main.innerHTML = `<h2>Seccion Contacto</h2>`;
        $main.appendChild(ContactForm());
    }else{
        await ajax({
            url: `${api.POST}/${localStorage.getItem("wpIdPost")}`,
            cbSuccess: (post) =>{
                console.log(post);
                $main.innerHTML = Post(post);
            }
        });
    }
    
    d.querySelector(".loader").style.display = "none";
}