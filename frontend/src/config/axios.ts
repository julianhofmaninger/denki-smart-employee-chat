import axios, { AxiosRequestTransformer } from "axios";
import { dateTransformer } from "../utils/functions/date-transformer";

export const axiosInstance = axios.create({
    transformRequest: [dateTransformer, ...(axios.defaults.transformRequest as AxiosRequestTransformer[])],
})