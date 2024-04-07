export function cutDescription(txt: string, charNum: number = 50) {
    if (txt.length > charNum) {
        return txt.slice(0, charNum + 1) + " ...";
    } else {
        return txt;
    }
}

const title = /^[a-zA-Z].{3,9}$/;
const description = /^[a-zA-Z].{3,200}$/;
const imgURL = /^(http|https):\/\/.+\..+$/;
const price = /^[1-9][0-9]*$/;

export function titleValidation(value: string) {
    return title.test(value);
}
export function descriptionValidation(value: string) {
    return description.test(value);
}
export function imageURLValidation(value: string) {
    return imgURL.test(value);
}
export function priceValidation(value: string) {
    return price.test(value);
}
