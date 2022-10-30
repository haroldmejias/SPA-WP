export function PostCard(props){
    const { title, _embedded, date, slug, id } = props,
    image = _embedded["wp:featuredmedia"] ? _embedded["wp:featuredmedia"][0].source_url : "app/assets/loader.svg",
    FormatDate = new Date(date).toLocaleDateString();

    document.addEventListener("click", (e) => {
        if (!e.target.matches(".post-card a")) return false;
        localStorage.setItem("wpIdPost", e.target.dataset.id);
    })

    return `
        <article class="post-card">
            <img src="${image}" alt="${title.rendered}"/>
            <h2>${title.rendered}</h2>
            <p>
                <time datetime="${date}">${FormatDate}</time>
                <a href="#/${slug}" data-id="${id}">Ver Publicacion</a>
            </p>
        </article>
    `;
}