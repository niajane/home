import React, { useState , useEffect } from 'react';
import * as api from '../api/index';
import { List } from '../api/index';
import { ActivityIndicator, FlatList, NativeSyntheticEvent, StyleSheet, TextInput, TextInputChangeEventData } from 'react-native';
import TodoList from '../components/TodoList';
import Input from '../components/Input';
import { Text, View } from '../components/Themed';

export default function ListsOverview({ goToList }: { goToList: any }) {
  
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<List[]>([]);
  const [currentList, setCurrentList] =  useState('');
  const [updated, setUpdated] = useState(false);

  const viewList = (list: List) => {
    setCurrentList(list.title);
    goToList(list, renameList);
  }

  const addNewList = (input:string) => {
    let newList = {title: input};
    api.createList(newList)
      .then((response) => setData([...data, response.data]))
    //setData([...data, input]);
  }

  const renameList = (input:string) => {
    console.log('rename list called');
    setUpdated(true);
  }

  useEffect(() => {
    console.log("hello");
    //setData([...data, currentList]);
  }, [updated])

  useEffect(() => {
      console.log('use effect ran');
      api.getLists()
        .then((response) => setData(response.data))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
      setUpdated(false);
  }, [updated]);

  return (
      <View style={styles.container}>
          {isLoading ? <ActivityIndicator/> : (
              <FlatList
                  data={data}
                  keyExtractor={(item) => item._id}
                  renderItem ={({ item }) => (
                    <Text style={styles.text} onPress={() => viewList(item)}>{item.title}</Text>
                  )}
              />
          )}
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

