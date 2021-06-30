import React, { useState } from 'react';
import { useEffect } from 'react';
import { Keyboard, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData, TextInput, StyleProp, TextStyle, Pressable } from 'react-native';
import { Text, View } from '../components/Themed';

export default function Editable({ style, text, handler }: { style:StyleProp<TextStyle>, text: string, handler: any}) {
    const [editing, setEditing] = useState(false);
    const [currentText, onChangeText] = useState(text);
    useEffect(() => {
        console.log(editing);
    })

    const submitEdit = () => {
        setEditing(false);
        handler(currentText);
    }

    return (
        <Pressable onLongPress={()=>setEditing(true)}>
            {editing ? <TextInput autoFocus={true} value={currentText} style={style} onBlur={()=> {submitEdit()}} onEndEditing={() => {submitEdit()}} onSubmitEditing={() => {submitEdit()}} onChangeText={onChangeText}/>
            : <Text style={style}>{currentText}</Text>
            }          
        </Pressable>
  );
}



