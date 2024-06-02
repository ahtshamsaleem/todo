export function validateTitle(value) {
    return value.length === 0 || value.length > 30 ? false : true;

}


export function validateDescription(value) {
    return value.length === 0 ? false : true;

}

export function validateEmail(value) {
    const regPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regPattern.test(value);

}

export function validatePass(value) {
    const regPattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return regPattern.test(value);

}

export function validateName(value) {
    return value.length > 6 ? true : false;

}