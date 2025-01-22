export type ErrorData = {
    isInvalid?: boolean;
    text?: string;
}
export const defaultErrorData: ErrorData = {
    isInvalid: false,
    text: ""
}
export function newErrorData(isInvalid?: boolean, text?: string): ErrorData{
    return {isInvalid: isInvalid, text: text} as ErrorData;
}