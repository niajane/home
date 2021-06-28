import React, { useState } from 'react';
import { StyleSheet, NativeSyntheticEvent, TextInputChangeEventData, TextInput } from 'react-native';


export default function Input({ handler }: { handler: any }) {
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
            style={styles.input}
            onChange={addNew}
            onSubmitEditing={submitNew}
            placeholder="add new"
        />
  );
}

const styles = StyleSheet.create({
    input: {
        fontSize: 16,
        color: 'white',
        marginLeft: '10px',
    },
});