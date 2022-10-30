export function ContactForm(){
    const d = document,
        $form = d.createElement("form"),
        $styles = d.getElementById("dynamic-styles");

        $form.id = "form-validacion";

        $styles.innerHTML = `
            #form-validacion{
                width: 50%;
                margin: auto;
            }
            #form-validacion textarea{
                resize: none;
                width: 100%;
                padding: 10px;
            }
            #form-validacion input[type="submit"]{
                width: 50%;
                margin: auto;
                display: block;
                cursor: pointer;
                padding: 10px;
            }
            #form-validacion legend{
                text-align: center;
                font-size: 24px;
                font-weight: bold;
            }
            #form-validacion [required]{
                --color-invalid:red;
                --color-valid:green;
                display:block;
                width: 100%;
                padding: 10px;
                margin:10px 0px;
                transition: 0.3s all;
                border:2px solid gray;
            }
            #form-validacion [required]:valid{
                border:3px solid var(--color-valid);
            }
            /* #form-validacion [required]:invalid{
                border:3px solid var(--color-invalid);
            } */
            .span-form-error {
                display: block;
                width: 100%;
                background-color: #fb2020;
                padding: 10px;
                margin-top: -10px;
                text-align: center;
                color: white;
                transition: opacity 1s;
            }
            .none{
                display: none;
                opacity: 0;
            }
            .is-active{
                display: block;
                opacity: 1;
            }
            svg {
                stroke: black;
            }
            .form-loader {
                text-align: center;
            }
            .form-response {
                text-align: center;
                font-size: 24px;
                font-weight: bold;
            }
        `;

        $form.innerHTML = `
            <legend>Envianos un Mensaje</legend>
            <input type="text" name="name" placeholder="Escribe tu nombre" pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\\s]+$" 
            title="Escribe un nombre valido" required>
            <input type="email" name="correo" placeholder="Escribe tu correo" pattern="^[a-z0-9]+(\\.[_a-z0-9]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,15})$" 
            title="Escribe un correo valido" required>
            <input type="text" name="asunto" placeholder="Escribe un asunto" 
            title="Escribe un asunto" required>
            <textarea name="mensaje" cols="30" rows="10" data-pattern="^.{1,255}$"
            title="El mensaje no puede contener mas de 255 caracteres" required></textarea>
            <input type="submit" value="Enviar">
            <div class="form-loader none">
                <svg width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="#fff"> <g fill="none" fill-rule="evenodd" stroke-width="2"> <circle cx="22" cy="22" r="1"> <animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"/> <animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"/> </circle> <circle cx="22" cy="22" r="1"> <animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"/> <animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"/> </circle> </g></svg>
            </div>
            <div class="form-response none">
                <p>El formulario ha sido enviado</p>
            </div>   
        `;

        function sendForm(){
                const $inputs = d.querySelectorAll('#form-validacion [required]');
                
                $inputs.forEach(input =>{
                    let $span = d.createElement('span');
                    $span.id = input.name;
                    $span.textContent = input.title;
                    $span.classList.add('span-form-error', 'none');
                    input.insertAdjacentElement('afterend', $span);

                    d.addEventListener('keyup', e =>{
                        if(e.target.matches('#form-validacion [required]')){

                            let pattern = input.pattern || input.dataset.pattern;                    
                            
                            if(pattern && input.value!== ''){
                                let regex = new RegExp(pattern);
                                return !regex.exec(input.value)
                                ?d.getElementById(input.name).classList.add('is-active')
                                :d.getElementById(input.name).classList.remove('is-active')
                            }
                            if(!pattern){
                                return input.value === ''
                                ?d.getElementById(input.name).classList.add('is-active')
                                :d.getElementById(input.name).classList.remove('is-active')
                            }
                        }
                    });
                });

                d.addEventListener('submit',e =>{
                    e.preventDefault();

                    const $loader = d.querySelector('.form-loader'),
                        $response = d.querySelector('.form-response');


                    $loader.classList.remove('none');

                    fetch('https://formsubmit.co/ajax/haroldmejias@gmail.com',{
                        method: 'POST',
                        body: new FormData(e.target)
                    })
                        .then(res => res.ok ? res.json() : Promise.reject(res))
                        .then(json => {
                            console.log(json);
                            $loader.classList.add('none');
                            $response.innerHTML = `<p>${json.message}</p>`;
                            $response.classList.remove('none');
                            $form.reset();
                        })
                        .catch( err =>{
                                let message = err.statusText || 'ocurrio un error al enviar el mensaje';
                                $response.innerHTML = `Error ${err.status}: ${message}`;
                            }
                        )
                        .finally(
                            setTimeout(() => { 
                                $response.classList.add('none');
                                $response.innerHTML = '';
                            }, 3000)
                        )

                    // $loader.classList.remove('none');
                    // setTimeout(() => {
                    //     $loader.classList.add('none');
                    //     $response.classList.remove('none');

                    //     setTimeout(() => { $response.classList.add('none') }, 3000);
                    // }, 3000);
                });
        }

        sendForm();


    return $form;
}