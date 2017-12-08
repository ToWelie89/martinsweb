// Check if string is numeric
const isNumeric = (num) => {
    return !isNaN(num)
}

const removeDuplicates = (array) => {
    const dups = [];
    const arr = array.filter((el) => {
        // If it is not a duplicate, return true
        if (dups.indexOf(el) === -1) {
            dups.push(el);
            return true;
        }
        return false;
    });
    return arr;
}


export {isNumeric, removeDuplicates};