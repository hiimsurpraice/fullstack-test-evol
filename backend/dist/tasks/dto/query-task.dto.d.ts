export declare enum SortOrder {
    ASC = "ASC",
    DESC = "DESC"
}
export declare enum SortBy {
    CREATED_AT = "createdAt",
    DUE_DATE = "dueDate",
    TITLE = "title"
}
export declare class QueryTaskDto {
    completed?: boolean;
    tags?: string[];
    search?: string;
    sortBy?: SortBy;
    sortOrder?: SortOrder;
    limit?: number;
    offset?: number;
}
