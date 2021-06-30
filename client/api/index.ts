import axios from 'axios';
import { AxiosResponse } from 'axios';

const url : string = process.env.DB_URL ==null ? "" : process.env.DB_URL.replace(';','');

interface Todo {
        _id: string;
        description: string;
        list: string;
        completed: boolean;
}

axios.defaults.baseURL = ``;
console.log(url.replace(';',''));
export const createTodoFromStrings = (_id: string, description: string, list:string, completed:boolean) => {
        let newTodo = {description: description, list: list, completed: completed};
        axios.post(url, newTodo);
}
export const createTodo = (todo: Object) : Promise<AxiosResponse> => axios.post(url, todo);
export const getTodos = () : Promise<AxiosResponse> => axios.get(url);
export const updateTodo = (id: string, todo: Todo) : Promise<AxiosResponse> => axios.patch(`${url}/${id}`, todo);
export const deleteTodo = (id: string) : Promise<AxiosResponse> => axios.delete(`${url}/${id}`);
export const deleteCompleted = (list: string) : Promise<AxiosResponse> => axios.delete(`${url}/completed/${list}`);
export const getList = (list: string) : Promise<AxiosResponse> => axios.get(`${url}/list/${list}`);
export const getListNames = () : Promise<AxiosResponse> => axios.get(`${url}/listNames`);
export const toggleTodo = (id: string, checked: boolean) : Promise<AxiosResponse> => axios.patch(`${url}/${id}`, { completed: checked});
export const deleteList = (list: string) : Promise<AxiosResponse> => axios.delete(`${url}/list/${list}`);
export const renameList = (list: string, newName: string) : Promise<AxiosResponse> => axios.patch(`${url}/renameList/${list}`, {newName: newName});
