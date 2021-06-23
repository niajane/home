import React, { useState , useEffect } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import * as api from '../api/index';
import { AxiosResponse } from 'axios';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';

export default function TodoList() {
    console.log('hello');
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<any[]>([]);


    /**useEffect(() => {
        console.log('use effect');
        const result = async () => {
            try {
                console.log('trying');
                const response = await api.getTodos();
                setData(response.data);
                console.log(response.data);
            } catch(error) {
                console.log(error);
            }
        };
        result();
    });**/

    useEffect(() => {
        api.getTodos()
            //.then((response) => console.log(response.data[0]._id))
            .then((response) => setData(response.data))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <View>
                {isLoading ? <ActivityIndicator/> : (
                    <FlatList
                        data={data}
                        keyExtractor={({ _id }, index) => _id}
                        renderItem={({ item }) => (
                            <Text style={{color: "white"}}>{item.description}</Text>
                        )}
                    />
                )}
        </View>
  );
}