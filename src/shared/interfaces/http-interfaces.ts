export interface IResponse<T> {
    response?: T,
    errors?:{
        [prop: string]: string;
    };
}
