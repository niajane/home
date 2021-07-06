import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import TodoList from '../components/TodoList';
import { TabOneParamList } from '../types';
import { RouteProp } from '@react-navigation/core';

type ListsRouteProp = RouteProp<TabOneParamList, 'ListViewScreen'>;
type ListsNavigationProp = StackNavigationProp<TabOneParamList, 'ListViewScreen'>;
type Props = {
  route: ListsRouteProp;
  navigation: ListsNavigationProp;
}

export default function ListViewScreen({ route, navigation }: Props) {
  
    const { list, setListName } = route.params;

    return (
        <TodoList list={list} setListName={setListName}/>
    );
}