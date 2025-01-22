import { GetEmployeeDto } from "./EmployeeDtos";

export interface PostLoginDto {
    Username: string;
    Password: string;
}

export interface GetTokenDto {
    AccessToken: string;
    RefreshToken: string;
    Role: string;
    Employee: GetEmployeeDto;
}