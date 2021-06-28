import React, { useState , useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData, TextInput, TextInputSubmitEditingEventData } from 'react-native';
import * as api from '../api/index';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { AxiosResponse } from 'axios';
import { TouchableOpacity } from 'react-native';
import { Text, View } from './Themed';


import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';

//get list to remain even if empty

export default function TodoList({ listName }: { listName: string }) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<any[]>([]);
    const [addNewInput, setAddNewInput] = useState('');

    function clearCompleted(listName: string) {
        api.deleteCompleted(listName)
            .then((response) => console.log(response.data))
        setData(data.filter(item => item.completed == false))
    }

    const addNew = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setAddNewInput(event.nativeEvent.text);
    };

    const submitNew = () => {
        let newTodo = {description: addNewInput, list: listName, completed: false};
        setAddNewInput('');
        api.createTodo(newTodo)
            //.then((response) => console.log(response.data))
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
                    data={data}
                    keyExtractor={({ _id }, index) => _id}
                    renderItem={({ item }) => (
                        <BouncyCheckbox style={styles.checkbox} text={item.description} isChecked={item.completed} onPress={(isChecked?: boolean) => {item.completed = isChecked; handleCheckboxPress(item._id, isChecked)}}/>
                    )}
                />
            )}
            <TextInput
                value={addNewInput}
                style={styles.input}
                onChange={addNew}
                onSubmitEditing={submitNew}
                placeholder="add new"
            />
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
    },
    input: {
        color: 'white',
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