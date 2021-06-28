import React, { useState , useEffect } from 'react';
import * as api from '../api/index';
import { ActivityIndicator, FlatList, NativeSyntheticEvent, StyleSheet, TextInput, TextInputChangeEventData } from 'react-native';
import TodoList from '../components/TodoList';
import Input from '../components/Input';
import { Text, View } from '../components/Themed';

export default function ListsOverview({ goToList }: { goToList: any }) {
  
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);

  const addNewList = (input:string) => {
    let newTodo = {list: input};
    api.createTodo(newTodo);
    setData([...data, input]);
  }

  useEffect(() => {
      api.getListNames()
        .then((response) => setData(response.data))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
  }, []);

  return (
      <View style={styles.container}>
          {isLoading ? <ActivityIndicator/> : (
              <FlatList
                  data={data}
                  keyExtractor={(index) => index}
                  renderItem={(item) => (
                    <Text style={styles.text} onPress={() => goToList(item.item)}>{item.item}</Text>
                  )}
              />
          )}
            <Text style={styles.text}>Hello</Text>
            <Input style={styles.input} handler={addNewList}/>
      </View>
);
}

const styles = StyleSheet.create({
  container: {
    marginLeft: '10%',
    //flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  input: {
    color: 'white',
    fontSize: 20,
  },
  text: {
      fontSize: 20,
      padding: '3px'
  }
});

