import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View, Modal } from "react-native";

const GoalInput = (props) => {
    const [enteredGoal, setEnteredGoal] = useState("");
    const goalInputHandler = enteredText => {
        setEnteredGoal(enteredText);
      };
      const addGoalHandler = () =>{
        props.addGoalHandler(enteredGoal);
        setEnteredGoal("");
      };
    return(
        <Modal visible={props.visible} animationType="slide" >
            <View style={styles.inputContainer}>
                <TextInput placeholder="Course Goal" style={styles.input} onChangeText={goalInputHandler} value={enteredGoal} />
                {/* <Button title="ADD" onPress={() => props.addGoalHandler(enteredGoal)} /> */}

                <View style={styles.buttonContainer}>
                    <View style={styles.button} >
                        <Button title="CANCEL" onPress={props.onCancel} />
                    </View>
                    <View style={styles.button} >
                        <Button title="ADD" color="red" onPress={addGoalHandler} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    inputContainer:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    input:{
        borderBottomColor: "black", 
        borderWidth: 1, 
        padding:10, 
        width: "80%",
        marginBottom: 20,
      },
    buttonContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button:{
        width:"40%"
    }

});
export default GoalInput;