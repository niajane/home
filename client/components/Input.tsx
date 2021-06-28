import React, { useState } from 'react';
import { StyleSheet, NativeSyntheticEvent, TextInputChangeEventData, TextInput, StyleProp, TextStyle } from 'react-native';


export default function Input({ handler, style }: { handler: any, style:StyleProp<TextStyle> }) {
    const [addNewInput, setAddNewInput] = useState('');

    const addNew = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setAddNewInput(event.nativeEvent.text);
    };

    const submitNew = () => {
        handler(addNewInput);
        setAddNewInput('');
    };


    return (
        <TextInput
            value={addNewInput}
            style={style}
            onChange={addNew}
            onSubmitEditing={submitNew}
            placeholder="add new"
        />
  );
}

