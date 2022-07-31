function Validator(options) {

    var selectorRules = {};

    function validate(inputElement, rule) {

        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        var errorMessage;

        var rules = selectorRules[rule.selector];

        for (var i = 0; i < rules.length; i++) {
            errorMessage = rules[i](inputElement.value);
            if (errorMessage) {
                break;
            }
        }

        if (errorMessage) {
            errorElement.innerHTML = errorMessage;
        }
        else {
            errorElement.innerText = '';
        }

        return !errorMessage;
    }

    var formElement = document.querySelector(options.form);
    if (formElement) {

        formElement.onsubmit = function (e) {
            e.preventDefault();

            var isFormValid = true;

            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);

                if (!isValid) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                formElement.submit();
            }

        }



        options.rules.forEach(function (rule) {

            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            }
            else {
                selectorRules[rule.selector] = [rule.test];
            }


            var inputElement = formElement.querySelector(rule.selector);
            if (inputElement) {
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                }

                inputElement.onInput = function () {
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                    errorElement.innerText = '';
                }
            }
        });
    }
}


Validator.isRequired = function (selector) {
    return {
        selector,
        test(value) {
            return value.trim() ? undefined : 'This field can not be empty.';
        }
    }
}



Validator.minLength = function (selector, min) {
    return {
        selector,
        test(value) {
            return value.length >= min ? undefined : `This field must be at least ${min} characters.`;
        }
    }
}

Validator.maxLength = function (selector, max) {
    return {
        selector,
        test(value) {
            return value.length <= max ? undefined : `This field must be maximum of ${max} characters.`;
        }
    }
}

Validator.isFullName = function (selector) {
    return {
        selector,
        test(value) {
            var regex = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]/;
            return regex.test(value.trim()) ? undefined : 'This field is invalid';
        }
    }
}




Validator.isEmail = function (selector) {
    return {
        selector,
        test(value) {
            var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(value.trim()) ? undefined : 'Email is invalid.';
        }
    }
}


Validator.isPhoneNumber = function (selector) {
    return {
        selector,
        test(value) {
            var regex = /((086|096|097|098|032|033|034|035|036|037|038|039|088|091|094|083|084|085|081|082|089|090|093|070|079|077|076|078|092|056|058)+([0-9]{7})\b)/g;
            return regex.test(value.trim()) ? undefined : 'Phone number is invalid.';
        }
    }
}



Validator.isPassword = function (selector) {
    return {
        selector,
        test(value) {
            var regex = /^[a-zA-Z0-9]+$/;
            return regex.test(value.trim()) ? undefined : 'Password is invalid.';
        }
    }
}




Validator.isPassRepeat = function (selector, getConfirmValue) {
    return {
        selector,
        test(value) {
            return value.trim() === getConfirmValue() ? undefined : `Confirm password does not match with password.`;
        }
    }
}



Validator({
    form: '#login-form',
    errorSelector: '.form-message',
    rules: [
        Validator.isRequired('#email'),
        Validator.isEmail('#email'),
        Validator.isRequired('#password'),
        Validator.minLength('#password', 6),
        Validator.maxLength('#password', 20),
    ]
});

Validator({
    form: '#signup-form',
    errorSelector: '.form-message',
    rules: [
        Validator.isRequired('#email'),
        Validator.isRequired('#password'),
        Validator.isRequired('#repeatpassword'),
        Validator.isRequired('#phonenumber'),
        Validator.isRequired('#fullname'),
        Validator.isFullName('#fullname'),
        Validator.minLength('#fullname', 3),
        Validator.maxLength('#fullname', 32),
        Validator.isEmail('#email'),
        Validator.isPhoneNumber('#phonenumber'),
        Validator.isPassword('#password'),
        Validator.minLength('#password', 6),
        Validator.maxLength('#password', 20),
        Validator.isPassRepeat('#repeatpassword', function () {
            return document.querySelector('#signup-form #password').value.trim();
        })
    ]
});





