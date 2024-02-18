// Se ejecuta una vez que todo el código HTML es descargado 
document.addEventListener('DOMContentLoaded', function(){

    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    console.log(email);

    // Seleccionar los elementos 
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const form = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');

    // Asignar eventos 
    inputEmail.addEventListener('blur', validarInput);
    inputAsunto.addEventListener('blur', validarInput);
    inputMensaje.addEventListener('blur', validarInput);

    // Funciones 
    function validarInput(e){
        if(e.target.value.trim() === ''){
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            // Resetea el objetoEmail 
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('El email no es válido', e.target.parentElement);
            // Resetea el objetoEmail 
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        // Limpiar la alerta 
        limpiarAlerta(e.target.parentElement);

        // Asignar los valores 
        email[e.target.name] = e.target.value.trim().toLowerCase();

        // Comprobar el objetoEmail
        comprobarEmail();
    }

    function mostrarAlerta(mensaje, referencia){
         // Limpiar la alerta
        limpiarAlerta(referencia);

        // Genera la alerta en HTML 
        const error = document.createElement('p');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'text-center',  'font-bold')
        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia){
         // Comprueba si ya existe una alerta 
         const alerta = referencia.querySelector('.bg-red-600');
         if(alerta){
             alerta.remove();
         }
    }

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail(){
        // Crea un arreglo con los valores del objeto, verifica si existe alguno vacío 
        if(Object.values(email).includes('')){
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
        } else {
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = false;
        }
    }

});