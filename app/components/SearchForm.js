export function SearchForm(){
    const $form = document.createElement("form"),
    $input = document.createElement("input");
    $form.classList.add("form-search");
    $input.name = "search";
    $input.type = "search"
    $input.autocomplete = "off";
    $input.placeholder = "Buscar...";
    
    $form.appendChild($input);

    document.addEventListener("submit", e =>{
        if(!e.target.matches(".form-search")) return false;
        e.preventDefault();
        localStorage.setItem("wpSearch", e.target.search.value);
        location.hash = `#/search?search=${e.target.search.value}`;
    });

    let query = localStorage.getItem("wpSearch");
    if(query){
        $input.value = query;
    }

    document.addEventListener("search", e =>{
        if (!e.target === $input) return false;
        if(!e.target.value) localStorage.removeItem("wpSearch");
    });



    return $form;
}