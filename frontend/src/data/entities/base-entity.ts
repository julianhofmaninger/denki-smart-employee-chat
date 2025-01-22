export interface BaseEntity {
    Id: string;
    CreatedBy: string;
    CreatedAt: Date;
    ModifiedBy: string | null;
    ModifiedAt: Date | null;
    Deleted: boolean;
    DeletionDate: Date | null;
}