class Validator {

    constructor() {
        this.validations = [
            'data-required',
            'data-min-length',
            'data-max-length',
            
        ]
    }

    validate(form) {

        let currentValidations = document.querySelectorAll('form .error-validation');

        if(currentValidations.length > 0) {
            this.cleanValidations(currentValidations);
        }
        
        let inputs = form.getElementsByTagName('input');

        let inputsArray = [...inputs];

        inputsArray.forEach(function(input) {
            
            for(let i = 0; this.validations.length > i; i++) {
                if (input.getAttribute(this.validations[i]) != null) {
                    
                    let method = this.validations[i].replace('data-', '').replace('-', '');

                    let value = input.getAttribute(this.validations[i]);

                    this[method](input, value);
                }
            }

        }, this);
    }


    minlength(input, minValue) {
    
        let inputlength = input.value.length;

        let errorMessage = 'O campo precisa ter menos que ${maxValue} caracteres';

        if(inputlength > maxValue) {
            this.printMessage(input, errorMessage);
        }

    }

    maxlength(input, maxValue) {
        let inputlength = input.value.length;

        let errorMessage = 'O campo precisa ter pelo menos ${minValue} caracteres';

        if(inputlength < minValue) {
            this.printMessage(input, errorMessage);
        }
    }

    printMessage(input, msg) {

        let errorsQty = input.parentNode.querySelector('.error-validation');

        if(errorsQty === null) {

            let template = document.querySelector('.error-validation').cloneNode(true);
    
            template.textContent = msg;

            let inputParent = input.parentNode;

            template.classList.remove('template');

            inputParent.appendChild(template);

        }
    }

    required(input) {

        let inputValue = input.value;
        
        if(inputValue ==='') {
            let errorMessage = 'Este campo é obrigatório';

            this.printMessage(input, errorMessage);
        }
    }

    cleanValidations(validations) {
        validations.forEach(el => el.remove());
    }

}

let form = document.getElementById("form");
let submit = document.getElementById("ok-button");

let validator = new Validator();

submit.addEventListener('click', function(e) {

    e.preventDefault();

    validator.validate(form);

});