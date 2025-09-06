const form = document.getElementById("registration-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const isRequiredValid = checkRequired([username, email, password, confirmPassword]);
    let isFormValid = isRequiredValid;

    if (isRequiredValid) {
        const isUserNameValid = checkLength(username, 3, 15);
        const isEmailValid = checkEmail(email);
        const isPasswordValid = checkLength(password, 6, 25);
        const isPasswordsMatch = checkPasswordsMatch(password, confirmPassword);

        isFormValid = isUserNameValid && isEmailValid && isPasswordValid && isPasswordsMatch;
    }

    if (isFormValid) {
        alert("Form submitted successfully!");
        form.reset();
        form.querySelectorAll('.form-group').forEach(group => group.className = 'form-group');
    }
});

function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${formatFieldInput(input)} must be at least ${min} characters`);
        return false;
    } else if (input.value.length > max) {
        showError(input, `${formatFieldInput(input)} must be less than ${max} characters`);
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}

function checkEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email.value.trim())) {
        showSuccess(email);
        return true;
    } else {
        showError(email, "Email is not valid");
        return false;
    }
}

function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, "Passwords do not match");
        return false;
    }
    showSuccess(input2);
    return true;
}

function checkRequired(inputArray) {
    let isValid =true;

    inputArray.forEach(input => {
        if (input.value.trim() === "") {
            showError(input, `${formatFieldInput(input)} is required`);
            isValid = false;
        } else {
            showSuccess(input);
        }
    });

    return isValid;
}

function formatFieldInput(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}


function showError(input, message) {
    const formgroup = input.parentElement;
    formgroup.className = "form-group error";
    const small = formgroup.querySelector("small");
    small.innerText = message;
}

function showSuccess(input) {
    const formgroup = input.parentElement;
    formgroup.className = "form-group success";
}

