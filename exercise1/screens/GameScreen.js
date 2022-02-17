import React, {useEffect, useRef, useState} from "react";
import {View, StyleSheet, Text, Alert, ScrollView, Dimensions} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import NumberContainer from "../components/NumberContainer";
import DefaultStyles from "../constants/default-styles";
import BodyText from "../components/BodyText";
import * as ScreenOrientation from 'expo-screen-orientation';
const generateRandomBetween = (min, max, exclude) =>{
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if(rndNum === exclude) return generateRandomBetween(min, max, exclude);
    else return rndNum;
};

const renderListItem = (value, numOfRound) => (
    <View key={value} style={styles.listItem}>
        <BodyText>#{numOfRound}</BodyText>
        <BodyText>{value}</BodyText>
    </View>
);

const GameScreen = props => {
    // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT); //화면 고정
    ScreenOrientation.a
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    const {userChoice, onGameOver} = props;
    useEffect(() => {
        if (currentGuess === userChoice){
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if ( (direction === "lower" && currentGuess < props.userChoice) || (direction === "greater" && currentGuess > props.userChoice) ){
            Alert.alert("Don\'t lie!", "You know that this is wrong...", [{text: "sorry", style: "cancel"}]);
            return;
        }
        if (direction === "lower"){
            currentHigh.current = currentGuess;
        }else{
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses]);
    };
    return(
        <ScrollView>
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </Card>
            <View style={styles.listContainer} >
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView>
            </View>
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    buttonContainer:{
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: Dimensions.get("window").height / 600 ? 20 : 5,
        width: 400,
        maxWidth: "95%",
    },
    listContainer:{
        width: Dimensions.get("window").width > 350 ? "60%" : "80%",
        flex: 1
    },
    list:{
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    listItem:{
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    }
});

export default GameScreen;