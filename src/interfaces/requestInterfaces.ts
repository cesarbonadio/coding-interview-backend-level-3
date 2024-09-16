export interface ItemPayload {
    id?: number; 
    name?: string;
    price?: number;
}

export interface ServiceResponse<T = any> {
    status: string;
    message: string;
    data: T;
}