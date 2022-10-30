export async function ajax(props){
    let  {url, cbSuccess} = props;

    await fetch(url)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => cbSuccess(json))
    .catch(err => {
        let message = err.statusText || "Ocurrio un error";
        document.getElementById("post").innerHTML = `
            <div class="error">Error ${err.status}: ${message}</div>
        `;
        console.log(err);
        document.querySelector(".loader").style.display = "none";
    })
}