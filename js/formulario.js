const form = document.getElementById('usu-form');
const submitButton = document.getElementById('boton');

let timeout = null;

let errors = {
    nombre: true,
    email: true,
    password: true,
};

const mailformatRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;



/* selecionar inputs*/ 
document.querySelectorAll('caja').forEach((box) => {
    const boxInput = box.querySelector('input');

    boxInput.addEventListener('keydown', (event) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            console.log(`Input ${boxInput.nombre} value: `, boxInput.value);

            validacion(box, boxInput);
        }, 300);
    });
});

validacion = (box, boxInput) => {
     //validacion si el input viene vacio
        if (boxInput.value == '') {
            showError(true, box, boxInput)
        }else {
            showError(false, box, boxInput)
        }
        

        if(boxInput.name == 'email') {
           if(!boxInput.value.match(mailformatRegex)){
                showError(true, box, boxInput);
            }else {
                showError(false, box, boxInput); 
            }
        }

        if(boxInput.name == 'password') {
            if(!boxInput.value.length <= 6){
                 showError(true, box, boxInput);
             }else {
                 showError(false, box, boxInput); 
             }
         }

        submitController(); 
    };


showError = (check, box, boxInput)  => {
    if (check) {
            box.classList.remove('form-success');
            box.classList.add('form-error');
            errors[boxInput.nombre] = true;
        }else {
            box.classList.remove('form-error');
            box.classList.add('form-success');
            errors[boxInput.nombre] = false;
    }
};

submitController = () => {
    console.log(errors);
    if (errors.nombre || errors.email || errors.password) {
        submitButton.toggleAttribute('disable', true);
    }else {
        submitButton.toggleAttribute('disable', false); 
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log([...formData]);
    for (let [key, value] of formData.entries()){
        console.log(`${key}: ${value}`);
    }
});