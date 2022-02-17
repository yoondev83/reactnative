import React from "react";
import {TextInput, StyleSheet} from "react-native";

const Input = props =>{ // {...props}를 아래와 같이 적어주면 모든 props를 받아 해당 컴포넌트에 추가해준다. => Forwarding your props to the component you are using in your custom component.
    return <TextInput {...props} style={{...styles.input, ...props.style}}/>
};

const styles = StyleSheet.create({
    input:{
        height: 30,
        borderBottomColor: "grey",
        borderBottomWidth: 1,
        marginVertical: 10,
    }
});

export default Input;