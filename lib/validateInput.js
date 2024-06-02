export function validateTitle(value) {
    return value.length === 0 || value.length > 30 ? false : true;

}


export function validateDescription(value) {
    return value.length === 0 ? false : true;

}