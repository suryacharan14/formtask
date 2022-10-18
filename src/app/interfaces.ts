export interface CloudForm{
    id: string,
    type: string,
    label: string,
    value?: string,
    validators?: CloudValidators
    options?: string[]
}

export interface CloudValidators{
    required?: boolean,
    minlength?: number,
    maxlength?: number,
    readonly?: boolean
}

export interface AppResponse{
    type: string,
    message?: any,
    error?: any,
    action?: string,
}