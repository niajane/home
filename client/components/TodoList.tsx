import React, { useState , useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData, TextInput, TextInputSubmitEditingEventData, ScrollView, GestureResponderEvent, TouchableOpacity, Pressable } from 'react-native';
import * as api from '../api/index';
import Input from './Input';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Text, View } from './Themed';
import { Ionicons } from '@expo/vector-icons';
import EditList from './EditList';

export default function TodoList({ listName }: { listName: string }) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<any[]>([]);
    const [menuOpen, setMenuOpen] = useState(false);

    function clearCompleted() {
        api.deleteCompleted(listName)
            .then((response) => console.log(response.data))
        setData(data.filter(item => item.completed == false))
        setMenuOpen(false)
    }

    const deleteList = () => {
        api.deleteList(listName)
            .then((response) => console.log(response.data))
        //navigate back to list view, refresh
        setMenuOpen(false)
    }

    const submitNew = (input:string) => {
        let newTodo = {description: input, list: listName, completed: false};
        api.createTodo(newTodo)
            .then((response) => setData([...data, response.data]))
            .catch((error) => console.error(error))
    };

    const renameList = () => {}

    const closeMenuIfOpen = () => {
        setMenuOpen(false)
    }

    useEffect(() => {
        api.getList(listName)
            .then((response) => setData(response.data))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <Pressable style={styles.container} onPress={closeMenuIfOpen}>
            <View style={styles.header}>
                <Text style={styles.title}>{listName}</Text>
                <EditList listName={listName} open={menuOpen} setOpen={setMenuOpen} clearCompleted={clearCompleted} renameList={renameList} deleteList={deleteList}/>
            </View>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <ScrollView
                showsHorizontalScrollIndicator={false}
                >
                    {isLoading ? <ActivityIndicator/> : (
                        <FlatList
                            data={data.filter(item => item.hasOwnProperty("description"))}
                            keyExtractor={({ _id }, index) => _id}
                            renderItem={({ item }) => (
                                <BouncyCheckbox style={styles.checkbox} text={item.description} isChecked={item.completed} onPress={(isChecked?: boolean) => {item.completed = isChecked; handleCheckboxPress(item._id, isChecked)}}/>
                            )}
                        />
                    )}
                    <Input style={styles.input} handler={submitNew}/>
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
    },
    item: {
        color: 'white',
        fontSize: 15
    },
    checkbox: {
        marginBottom: '10%',
        padding: '3px',
    },
    listText: {
        
    },
    input: {
        fontSize: 16,
        color: 'white',
        marginLeft: '10px',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
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
});



function handleCheckboxPress(id: string, checked?: boolean) {
    if (checked == undefined){
        checked = false;
    }    
    api.toggleTodo(id, checked);
}