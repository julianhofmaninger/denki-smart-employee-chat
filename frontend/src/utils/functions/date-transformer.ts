import moment from "moment";

export const dateTransformer = (data: any): any => {
    if (data instanceof Date) {
        return moment(data).format('YYYY-MM-DD');
    }
    if (Array.isArray(data)) {
        return data.map(dateTransformer)
    }
    if (typeof data === 'object' && data !== null) {
        return Object.fromEntries(Object.entries(data).map(([key, value]) => [key, dateTransformer(value)]))
    }
    return data
}
