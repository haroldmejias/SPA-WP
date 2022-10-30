import wp_api from "../helpers/wp_api.js";

export function Title(){
    const $h1 = document.createElement("h1");
    $h1.innerHTML = `<a target="_blanket" href="${wp_api.DOMAIN}">${wp_api.NAME.toLocaleUpperCase()}</a>`;
    return $h1;
}