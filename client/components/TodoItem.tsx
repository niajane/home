import React, { useState } from 'react';
import { useEffect } from 'react';
import { Keyboard, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData, TextInput, StyleProp, TextStyle, Pressable } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Todo } from '../api';
import { Text, View } from '../components/Themed';
import Editable from './Editable';

export default function TodoItem({ colour, item, handleCheck, handleEdit }: { colour:string, item: Todo, handleCheck: any, handleEdit: any}) {

    const [isChecked, setChecked] = useState(item.completed);

    const handleCheckboxPress = () => {}
    const renameItem = (input: string) => {
        handleEdit(input, item._id)
    }

    return (
        <View style={styles.todoItem}>
            <BouncyCheckbox style={styles.checkbox} fillColor={colour} iconStyle={{ borderColor: colour }} disableText={true} isChecked={item.completed} onPress={(isChecked?: boolean) => {setChecked(Boolean(isChecked)); handleCheck}}/>
            <Editable style={checkboxText(isChecked)} text={item.description} handler={renameItem}/>
        </View>
  );
}


const styles = StyleSheet.create({
    checkbox: {
        padding: '3px',
    },
    todoItem: {
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        paddingTop: '10px',
    },
});

export const checkboxText = (checked: boolean): TextStyle => {
    return {
      fontSize: 16,
      color: "white",
      textDecorationLine: checked ? "line-through" : "none",
      paddingLeft: '5px',
    };
  };



