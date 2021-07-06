import axios from 'axios';
import { AxiosResponse } from 'axios';

const url : string = process.env.DB_URL ==null ? "" : process.env.DB_URL.replace(';','').replace('todos','lists');
console.log(url);

export interface Todo {
        _id: string;
        description: string;
        completed: boolean;
}

export interface List {
        _id: string;
        title: string;
        colour: string;
        items: Array<Todo>;
}

axios.defaults.baseURL = ``;
console.log(url.replace(';',''));

export const createList = (list: Object) : Promise<AxiosResponse<List>> => axios.post(url, list);
export const getLists = () : Promise<AxiosResponse> => axios.get(url);
export const getListsOverview = () : Promise<AxiosResponse> => axios.get(`${url}/overview`);
export const getList = (id: string) : Promise<AxiosResponse> => axios.get(`${url}/${id}`);
export const updateList = (list_id: string, changes: Object) : Promise<AxiosResponse> => axios.patch(`${url}/${list_id}`, changes);
export const deleteList = (id: string) : Promise<AxiosResponse> => axios.delete(`${url}/${id}`);
export const deleteCompleted = (list: string) : Promise<AxiosResponse> => axios.delete(`${url}/completed/${list}`);
export const deleteTodo = (list_id: string, todo_id: string) : Promise<AxiosResponse> => axios.delete(`${url}/${list_id}/${todo_id}`);
export const updateTodo = (list_id: string, todo_id: string, changes: Object) : Promise<AxiosResponse> => axios.patch(`${url}/${list_id}/${todo_id}`, changes);
export const createTodo = (list_id: string, todo: Object) : Promise<AxiosResponse> => axios.post(`${url}/${list_id}`, todo);