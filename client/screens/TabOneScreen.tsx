import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import ListsOverview from '../components/ListsOverview';
import { TabOneParamList } from '../types';
import { RouteProp } from '@react-navigation/core';
import { List } from '../api';

type ListsRouteProp = RouteProp<TabOneParamList, 'ListViewScreen'>;
type ListsNavigationProp = StackNavigationProp<TabOneParamList, 'ListViewScreen'>;
type Props = {
  route: ListsRouteProp;
  navigation: ListsNavigationProp;
}

export default function TabOneScreen({ route, navigation }: Props) {
  
  const goToList = (listName: List, setListName: any) => (
    navigation.navigate('ListViewScreen', {list: listName, setListName: setListName})
  );

  return (
      <ListsOverview goToList={goToList}/>
  );
}


