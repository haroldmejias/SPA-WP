import { App } from "./App.js";
import { infinite_scroll } from "./helpers/infinite_scroll.js";
import wp_api from "./helpers/wp_api.js";


document.addEventListener("DOMContentLoaded", ()=>{
    App();
    infinite_scroll();
});
window.addEventListener("hashchange", ()=>{
    App();
    wp_api.page = 1;
});