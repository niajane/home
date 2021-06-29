import React, { useState , useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData, TextInput, TextInputSubmitEditingEventData } from 'react-native';
import * as api from '../api/index';
import Input from './Input';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Text, View } from './Themed';
import { Ionicons } from '@expo/vector-icons';

export default function EditList({ listName, open, setOpen, clearCompleted, deleteList, renameList }: { listName: string, open: boolean, setOpen: any, clearCompleted: any, deleteList:any, renameList:any }) {

    return (
        <View>
            <Ionicons name='ellipsis-horizontal-circle-outline' size={23} color='white' onPress={()=>setOpen(true)}/>
            {open &&
             <View style={styles.container}>
                <Text onPress={() => clearCompleted()}>Rename List</Text>
                <Text onPress={() => deleteList()}>Delete list</Text>
                <Text onPress={() => clearCompleted()}>Clear completed</Text>
            </View>
            }
           
        </View>
  );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        border: '2px solid blue',
        padding: '3px', 
        borderRadius: 10,
        right: '10px',
    },
});
