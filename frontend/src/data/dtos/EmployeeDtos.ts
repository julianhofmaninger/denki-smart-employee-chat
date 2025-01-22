import { deepObjectEqual } from "../../utils/functions/functions";

export interface GetEmployeeDto {
    Id: string,
    Username: string,
    Firstname: string,
    Lastname: string
}

export interface CreateEmployeeDto {

    Username: string,
    Firstname: string,
    Lastname: string
}

export interface ModifyEmployeeDto {
    Id: string,

    Username: string,
    Firstname: string,
    Lastname: string
}
export interface EmployeeData extends CreateEmployeeDto {
    Id?: string,
    toolId?: number; // Tool for frontend
}

export const compareGetEmployeeDto = (a: GetEmployeeDto, b: GetEmployeeDto | Record<string, any>): boolean => {
    b = parseGetEmployeeDto(b);
    return deepObjectEqual(a, b);
};
export function parseGetEmployeeDto(row: Record<string, any>): GetEmployeeDto {
    return {
        Id: row.Id,
        Username: row.Username,
        Firstname: row.Firstname,
        Lastname: row.Lastname
    };
}
export function parseCreateEmployeeDto(data: Record<string, any>): CreateEmployeeDto {
    return {
        Username: data.Username,
        Firstname: data.Firstname,
        Lastname: data.Lastname
    };
}
export function parseModifyEmployeeDto(data: Record<string, any>): ModifyEmployeeDto {
    return {
        Id: data.Id,
        Username: data.Username,
        Firstname: data.Firstname,
        Lastname: data.Lastname
    };
}