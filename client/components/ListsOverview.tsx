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
                    <Text onPress={() => goToList(item.item)}>{item.item}</Text>
                  )}
              />
          )}
          <Input handler={addNewList}/>
      </View>
);
}

const styles = StyleSheet.create({
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
  input: {
    color: 'white',
  }
});

