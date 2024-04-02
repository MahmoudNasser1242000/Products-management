export function cutDescription(txt: string, charNum: number = 50) {
    if (txt.length > charNum) {
        return txt.slice(0, charNum + 1) + " ..."
    } else {
        return txt
    }
}