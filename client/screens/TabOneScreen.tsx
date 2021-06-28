import React, { useState , useEffect } from 'react';
import * as api from '../api/index';
import { ActivityIndicator, FlatList, NativeSyntheticEvent, StyleSheet, TextInput, TextInputChangeEventData } from 'react-native';

import TodoList from '../components/TodoList';
import { Text, View } from '../components/Themed';

export default function TabOneScreen() {
  
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [currentList, setCurrentList] = useState('');

  useEffect(() => {
      api.getListNames()
        .then((response) => setData(response.data))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
  }, []);

  if (currentList) {
    return (
      <TodoList listName={currentList}/>
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

