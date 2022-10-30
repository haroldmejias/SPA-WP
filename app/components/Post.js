export function Post(props){
    let { title, date, content } = props,
    FormatDate = new Date(date).toLocaleDateString();
    return `
        <section id="single-post">
            <aside>
                <h2>${title.rendered}</h2>
                <time datetime="${date}">${FormatDate}</time>
            </aside>
            <hr>
            <article>${content.rendered}</article>
        </section>
    `;
}