import React, { useState , useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData, TextInput, TextInputSubmitEditingEventData } from 'react-native';
import * as api from '../api/index';
import Input from './Input';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Text, View } from './Themed';
import { Ionicons } from '@expo/vector-icons';
import { CirclePicker, ColorResult } from 'react-color';

export default function EditList({ listName, open, setOpen, clearCompleted, deleteList, changeColour }: { listName: string, open: boolean, setOpen: any, clearCompleted: any, deleteList:any, changeColour:any }) {

    const handleChangeComplete = (color: ColorResult, event: React.ChangeEvent<HTMLInputElement>) => {
        changeColour(color.hex);
      };    

    return (
        <View>
            <Ionicons name='ellipsis-horizontal-circle-outline' size={23} color='white' onPress={()=>setOpen(true)}/>
            {open &&
             <View style={styles.container}>
                <Text onPress={() => clearCompleted()}>Clear completed</Text>
                <Text onPress={() => deleteList()}>Delete list</Text>
                <CirclePicker colors={["#f54b42","#4287f5","#9342f5","green", "#ffc484", "#00bcd4"]} onChangeComplete={handleChangeComplete}></CirclePicker>
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
