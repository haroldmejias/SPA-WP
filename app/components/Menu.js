export function Menu(){
    const $nav = document.createElement("nav");
    $nav.classList.add("menu");
    $nav.innerHTML = `
        <a href="#/">Home</a>
        <span>-</span>
        <a href="#/search">Busqueda</a>
        <span>-</span>
        <a href="#/contact">Contacto</a>
    `;

    return $nav;
}