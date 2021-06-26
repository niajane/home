import React, { useState , useEffect } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from 'react-native';
import * as api from '../api/index';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { AxiosResponse } from 'axios';
import { TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';

//get list to remain even if empty

export default function TodoList({ listName }: { listName: string }) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<any[]>([]);

    function clearCompleted(listName: string) {
        //oh shit
        api.deleteCompleted(listName)
            .then((response) => console.log(response.data))
        console.log(data);
        setData(data.filter(item => item.completed == false))
        console.log(data);
    }

    useEffect(() => {
        console.log('yes')
        api.getList(listName)
            .then((response) => setData(response.data))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <View>
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
    }
});



function handleCheckboxPress(id: string, checked?: boolean) {
    if (checked == undefined){
        checked = false;
    }    
    api.toggleTodo(id, checked);
}