const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	direccion: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	nota: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = { 
    nombre: false,
    apellido: false,
    direccion: false,
    nota: false,
    email: false, 
    telefono: false
}

const validarFormulario = (e) => {

    switch (e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
        break;
        case "apellido":
            validarCampo(expresiones.apellido, e.target, 'apellido');
        break;
        case "direccion":
            validarCampo(expresiones.direccion, e.target, 'direccion');
        break;
        case "nota":
            validarCampo(expresiones.nota, e.target, 'nota');
        break;
        case "email":
            validarCampo(expresiones.email, e.target, 'email');
        break;
        case "telefono":
            validarCampo(expresiones.telefono, e.target, 'telefono');
        break;
    }
}


const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('colorRed');
		document.getElementById(`grupo__${campo}`).classList.add('colorGreen');
        document.querySelector(`#grupo-${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
		
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('colorRed');
		document.getElementById(`grupo__${campo}`).classList.remove('colorGreen');
		document.querySelector(`#grupo-${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
	}
};

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
})

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    
	if(campos.nombre && campos.apellido && campos.direccion && campos.nota && campos.email && campos.telefono){
		formulario.reset();

        document.getElementById(`grupo__nombre`).classList.remove('colorGreen');
        document.getElementById(`grupo__apellido`).classList.remove('colorGreen');
        document.getElementById(`grupo__direccion`).classList.remove('colorGreen');
        document.getElementById(`grupo__nota`).classList.remove('colorGreen');
        document.getElementById(`grupo__email`).classList.remove('colorGreen');
        document.getElementById(`grupo__telefono`).classList.remove('colorGreen');
		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		/* setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 10000); */

	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
        setTimeout(() => {
			document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
		}, 5000);

	}
});