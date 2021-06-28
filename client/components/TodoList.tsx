import React, { useState , useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData, TextInput, TextInputSubmitEditingEventData } from 'react-native';
import * as api from '../api/index';
import Input from './Input';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Text, View } from './Themed';

export default function TodoList({ listName }: { listName: string }) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<any[]>([]);

    function clearCompleted(listName: string) {
        api.deleteCompleted(listName)
            .then((response) => console.log(response.data))
        setData(data.filter(item => item.completed == false))
    }

    const submitNew = (input:string) => {
        let newTodo = {description: input, list: listName, completed: false};
        api.createTodo(newTodo)
            .then((response) => setData([...data, response.data]))
            .catch((error) => console.error(error))
    };

    useEffect(() => {
        api.getList(listName)
            .then((response) => setData(response.data))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{listName}</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <button onClick={() => clearCompleted(listName)}>Clear completed</button>
            {isLoading ? <ActivityIndicator/> : (
                <FlatList
                    data={data.filter(item => item.hasOwnProperty("description"))}
                    keyExtractor={({ _id }, index) => _id}
                    renderItem={({ item }) => (
                        <BouncyCheckbox style={styles.checkbox} text={item.description} isChecked={item.completed} onPress={(isChecked?: boolean) => {item.completed = isChecked; handleCheckboxPress(item._id, isChecked)}}/>
                    )}
                />
            )}
            <Input handler={submitNew}/>
        </View>
  );
}

const styles = StyleSheet.create({
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
        //flex: 1,
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
});



function handleCheckboxPress(id: string, checked?: boolean) {
    if (checked == undefined){
        checked = false;
    }    
    api.toggleTodo(id, checked);
}