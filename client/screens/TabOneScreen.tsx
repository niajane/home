import React, { useState , useEffect } from 'react';
import * as api from '../api/index';
import { ActivityIndicator, FlatList, NativeSyntheticEvent, StyleSheet, TextInput, TextInputChangeEventData } from 'react-native';

import TodoList from '../components/TodoList';
import { Text, View } from '../components/Themed';

export default function TabOneScreen() {
  
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [currentList, setCurrentList] = useState('');
  const [addNewInput, setAddNewInput] = useState('');

  const addNew = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setAddNewInput(event.nativeEvent.text)
  };
  const submitNew = () => {
    let data = {description: addNewInput, list: currentList, completed: false};
    setAddNewInput('');
    api.createTodo(data);
  }

  useEffect(() => {
    if (!currentList) {
      api.getListNames()
        .then((response) => setData(response.data))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
    else {
      api.getList(currentList)
        .then((response) => setData(response.data))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }
     
  }, []);

  if (currentList) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{currentList}</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <TodoList listName={currentList}/>
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
  return (
      <View style={styles.container}>
          {isLoading ? <ActivityIndicator/> : (
              <FlatList
                  data={data}
                  keyExtractor={(index) => index}
                  renderItem={(item) => (
                      <Text onPress={() => setCurrentList(item.item)}>{item.item}</Text>
                  )}
              />
          )}
      </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    color: 'white',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

