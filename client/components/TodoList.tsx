import React, { useState , useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData, TextInput, TextInputSubmitEditingEventData, ScrollView, GestureResponderEvent, TouchableOpacity, Pressable, TextStyle } from 'react-native';
import * as api from '../api/index';
import Input from './Input';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Text, View } from './Themed';
import { Ionicons } from '@expo/vector-icons';
import EditList from './EditList';
import Editable from './Editable';
import { List, Todo } from '../api/index';
import TodoItem from './TodoItem';

export default function TodoList({ list, setListName }: { list: List, setListName: any }) {
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState<Todo[]>(list.items);
    const [menuOpen, setMenuOpen] = useState(false);
    const [listInfo, setListInfo] = useState<List>(list);
    if(!listInfo.colour){
        listInfo.colour='white';
    }

    function clearCompleted() {
        console.log('clearCompleted');
        api.deleteCompleted(listInfo._id)
            .then((response) => console.log(response.data))
        setData(data.filter(item => item.completed == false))
        setMenuOpen(false)
    }

    const deleteList = () => {
        api.deleteList(list._id)
            .then((response) => console.log(response.data))
        setMenuOpen(false)
    }

    const submitNew = (input:string) => {
        let newTodo = {description: input, completed: false};
        api.createTodo(list._id, newTodo)
            .then((response) => setData([...data, response.data]))
            .catch((error) => console.error(error))
    };

    const renameList = (input:string) => {
        setListInfo(prevState => ({
            ...prevState,
            title: input
        }))
        api.updateList(list._id, {title: input})
            .then((response) => console.log(response))
            .catch((error) => console.error(error));
        setListName(input);
    }

    const updateItem = (todo: Todo) => {
        let index:number = data.findIndex((item)=> item._id == todo._id);
        setData([
            ...data.slice(0,index),
            todo,
            ...data.slice(index+1)
        ])
    }

    const renameItem = (input:string, id:string) => {
        api.updateTodo(listInfo._id, id, {description: input})
            .then((response) => updateItem(response.data))
    }

    const changeColour = (input:string) => {
        list.colour = input;
        setListInfo(prevState => ({
                ...prevState,
                colour: input
            }))
        api.updateList(list._id, {colour: input})
            .then((response) => console.log(response))
            .catch((error) => console.error(error));
    }

    const closeMenuIfOpen = () => {
        setMenuOpen(false)
    }


    const handleCheckboxPress = (todo: Todo, checked?: boolean) => {
        if (checked == undefined){
            checked = false;
        }
        todo.completed = checked; 
        api.updateTodo(listInfo._id, todo._id, {completed: checked});   
    }

    useEffect(() => {
        /*api.getList(list._id)
            .then((response) => setData(response.data))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));*/
    }, []);

    return (
        <Pressable style={styles.container} onPress={closeMenuIfOpen}>
            <View style={styles.header}>
                <Editable style={[styles.title, {color: listInfo.colour}]} text={listInfo.title} handler={renameList} />
                <EditList listName={list._id} colour={listInfo.colour} open={menuOpen} setOpen={setMenuOpen} clearCompleted={clearCompleted} changeColour={changeColour} deleteList={deleteList}/>
            </View>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <ScrollView
                showsHorizontalScrollIndicator={false}
                >
                    {isLoading ? <ActivityIndicator/> : (
                        <FlatList
                            data={data}
                            extraData={listInfo.colour}
                            keyExtractor={({ _id }, index) => _id}
                            renderItem={({ item }) => (
                                <TodoItem item={item} colour={listInfo.colour} handleCheck={handleCheckboxPress} handleEdit={renameItem}></TodoItem>
                                )}
                        />
                    )}
                    <View style={styles.todoItem}>
                        <Ionicons name='add-outline' size={25} color={listInfo.colour} style={{padding:'3px'}}/>
                        <Input style={styles.input} handler={submitNew}/>
                    </View>
            </ScrollView>
        </Pressable>
  );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: '1%',
        zIndex: 1,
    },
    item: {
        color: 'white',
        fontSize: 15
    },
    checkbox: {
        padding: '3px',
    },
    listText: {
        
    },
    input: {
        fontSize: 16,
        color: "#757575",
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    icon: {
        paddingLeft: '5px',
    },
    editmenu: {
        position: 'absolute',
        border: '2px solid blue',
        padding: '3px',
        borderRadius: 10,
        right: '10px',
    },
    todoItem: {
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        paddingTop: '10px',
    },
});

export const checkboxText = (checked: boolean): TextStyle => {
    return {
      fontSize: 16,
      color: "#757575",
      textDecorationLine: checked ? "line-through" : "none",
      paddingLeft: '5px',
    };
  };


