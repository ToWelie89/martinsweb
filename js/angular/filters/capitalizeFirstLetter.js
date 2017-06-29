export function CapitalizeFirstLetter() {
    return (input) => {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    };
}