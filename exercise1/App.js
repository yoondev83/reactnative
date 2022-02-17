import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import * as Font from "expo-font";
import AppLoading from 'expo-app-loading';
import Header from './components/Header';
import GameOverScreen from './screens/GameOverScreen';
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  if(!dataLoaded){
    return <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} onError={err => console.log(err)} />;
  }

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);

  }
  const startGameHandler = selectNumber => {
    setUserNumber(selectNumber);
    setGuessRounds(0);
  }

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  }

  let content = <StartGameScreen onStartGame={startGameHandler} />;
  if (userNumber && guessRounds <= 0){
    content =       <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />;
  } else if(guessRounds > 0){
    content = <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onRestartHandler={configureNewGameHandler}/>;
  }
  return (
    <SafeAreaView style={styles.screen}>
      <Header title={"Guess A Number"}/>
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen:{
    flex: 1,
  }
});
