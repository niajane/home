import React, { useState , useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData, TextInput, TextInputSubmitEditingEventData, TextStyle, ViewStyle } from 'react-native';
import * as api from '../api/index';
import Input from './Input';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Text, View } from './Themed';
import { Ionicons } from '@expo/vector-icons';
import { CirclePicker, ColorResult } from 'react-color';

export default function EditList({ listName, colour, open, setOpen, clearCompleted, deleteList, changeColour }: { listName: string, colour:string, open: boolean, setOpen: any, clearCompleted: any, deleteList:any, changeColour:any }) {

    const handleChangeComplete = (color: ColorResult, event: React.ChangeEvent<HTMLInputElement>) => {
        changeColour(color.hex);
      };    

    return (
        <View>
            {open ?
                <Ionicons name='close-outline' size={23} color={colour} onPress={()=>setOpen(!open)}/>
                :<Ionicons name='chevron-down-outline' size={23} color={colour} onPress={()=>setOpen(!open)}/>
            }
            {open &&
             <View style={container(colour)}>
                <View style={styles.item}>
                    <Ionicons name='file-tray-outline' size={20} color={colour} onPress={() => clearCompleted()}/>
                    <Text style={styles.text} onPress={() => clearCompleted()}>Clear completed</Text>
                </View>
                <View style={styles.item}>
                    <Ionicons name='trash-outline' size={20} color={colour} onPress={() => deleteList()}/>
                    <Text style={styles.text} onPress={() => deleteList()}>Delete list</Text>
                </View>
                <View style={styles.colourPicker}>
                    <CirclePicker colors={["#f54b42","#4287f5","#9342f5","green", "#ffc484", "#00bcd4"]} width='150px' onChangeComplete={handleChangeComplete}></CirclePicker>
                </View>
            </View>
            }
           
        </View>
  );
}

const styles = StyleSheet.create({
    item: {
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        padding: '2px',
    },
    text: {
        paddingLeft: '2px'
    },
    colourPicker: {
        alignContent: 'center'
    }
});

export const container = (colour: string): ViewStyle => {
    return {
        position: 'absolute',
        borderColor: colour,
        borderWidth: 1,
        padding: '3px', 
        borderRadius: 10,
        top: '30px'
    };
  };
