import axios from 'axios';
import { AxiosResponse } from 'axios';

const url : string = process.env.DB_URL ==null ? "" : process.env.DB_URL.replace(';','');
console.log(url);

interface Todo {
        _id: string;
        description: string;
        list: string;
        completed: boolean;
}

axios.defaults.baseURL = ``;
console.log(url.replace(';',''));
export const createTodo = (todo: Todo) : Promise<AxiosResponse> => axios.post(url, todo);
export const getTodos = () : Promise<AxiosResponse> => axios.get(url);
export const updateTodo = (id: string, todo: Todo) : Promise<AxiosResponse> => axios.patch(`${url}/${id}`, todo);
export const deleteTodo = (id: string) : Promise<AxiosResponse> => axios.delete(`${url}/${id}`);
