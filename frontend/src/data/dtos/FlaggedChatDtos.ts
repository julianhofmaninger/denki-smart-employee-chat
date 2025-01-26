import { GetEmployeeDto } from "./EmployeeDtos";

export interface GetFlaggedChatDto {
    Id: string,
    ConflictPotential: number,
    SenstivieLeak: number,
    CriticalPhrases: string[],
    Employee: GetEmployeeDto,
    Employee2: GetEmployeeDto,
    CreatedAt: Date,
}

// export interface CreateMessageDto {
//     Text: string,
//     Read: boolean,
//     SenderId: string,
//     ReceiverId: string,
// }

// export interface ModifyMessageDto {
//     Id: string,
//     Text: string,
//     Read: boolean,
// }
// export interface MessageData extends CreateMessageDto {
//     Id?: string,
//     toolId?: number; // Tool for frontend
// }

// export const compareGetMessageDto = (a: GetMessageDto, b: GetMessageDto | Record<string, any>): boolean => {
//     b = parseGetMessageDto(b);
//     return deepObjectEqual(a, b);
// };
// export function parseGetMessageDto(row: Record<string, any>): GetMessageDto {
//     return {
//         Id: row.Id,
//         Text: row.Text,
//         Read: row.Read,
//         SenderId: row.SenderId,
//         ReceiverId: row.ReceiverId,
//     };
// }
// export function parseCreateMessageDto(data: Record<string, any>): CreateMessageDto {
//     return {
//         Text: data.Text,
//         Read: data.Read,
//         SenderId: data.SenderId,
//         ReceiverId: data.ReceiverId,
//     };
// }
// export function parseModifyMessageDto(data: Record<string, any>): ModifyMessageDto {
//     return {
//         Id: data.Id,
//         Text: data.Text,
//         Read: data.Read,
//     };
// }