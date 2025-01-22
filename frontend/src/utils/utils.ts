export function ScrollToTop(x:number, y:number) {
    window.scrollTo(x, y);
}

export function Exits(input: any){
    return input !== null && input !== undefined;
}
export function IsExistingString(input: number | string | undefined | null){
    if(Exits(input)){
        return String(input);
    }
    else{
        return "";
    }
}
export function getDateAsString(date: Date | null | undefined) {
    if (date === null || date === undefined) return "";
    const tempDate = new Date(date);
    const day = tempDate.getDate();
    const month = tempDate.getMonth() + 1;
    const year = tempDate.getFullYear();
    return (day < 10 ? "0" : "") + day + "." + (month < 10 ? "0" : "") + month + "." + year;
}