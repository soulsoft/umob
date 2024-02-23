import { useAppDispatch, useAppSelector } from "../../state/redux-hooks";
import React, { FC, useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View
} from "react-native";

import { QuizIllustration } from "../../config/images";
import UmobButton from "../../components/UmobButton";
import MultipleChoice from "../../components/MultiChoiceButton";
import { updateCurrentAnswer, updateCurrentScore } from "../../state/reducers/user";


const QuizScreen: FC = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const { userInfo, currentScore } = useAppSelector(state => state.user);
  useEffect(() => {
  }, []);
  const isDarkMode = useColorScheme() === "dark";
  const [key, setKey] = useState(0);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [start, setStart] = useState(false);

  useEffect(() => {


  }, []);

  const questions = [
    {
      id: 1,
      question: "What is the number of bikes in Street X?",
      options: [
        { label: "10", isCorrect: false },
        { label: "20", isCorrect: false },
        { label: "30", isCorrect: true },
        { label: "40", isCorrect: false }
      ]
    },
    {
      id: 2,
      question: "Is Provider Y the biggest provider in City Z?",
      options: [
        { label: "True", isCorrect: true },
        { label: "False", isCorrect: false }
      ]
    }];

  const restartQuiz = () => {
    dispatch(updateCurrentAnswer([]));
    dispatch(updateCurrentScore(0));
    setKey(key + 1);
    setCurrentQuestionIndex(0);
    setShowResult(false);
    setShowAnswer(false);
  };

  const showAnswerFunction = () => {
    setShowAnswer(true);
    setShowResult(false);
  };


  return (<View style={styles.container}>
      <View style={{
        alignSelf: "stretch",
        backgroundColor: "#0A0C16",
        borderBottomLeftRadius: 70,
        borderBottomRightRadius: 70,
        justifyContent: "flex-end",
        alignItems: "center",
        padding: 20
      }}>
        {!start && <><Image source={QuizIllustration} style={{ height: 150, width: 200, alignSelf: "center" }} />
          <Text style={{ color: "#ffffff", marginHorizontal: 10, textAlign: "center", marginTop: 10 }}>Please take a
            moment to explore the map and familiarize yourself with the locations and details this will help you answer
            the quiz questions more confidently. When you're ready, start the quiz and test your knowledge!</Text></>}
        {start && <><CountdownCircleTimer
          key={key}
          onComplete={() => {
            setTimeLeft(0);
            setShowResult(true);
            return { shouldRepeat: true, delay: 1.5 };
          }}
          isPlaying={!showResult}
          duration={10}
          size={80}
          colors={["#DAFC5A", "#DAFC5A", "#a35c00", "#A30000"]}
          colorsTime={[45, 35, 15, 0]}
        >
          {({ remainingTime }) => <Text style={{ color: "white" }}>{remainingTime}</Text>}
        </CountdownCircleTimer>
          <Text style={{ color: "white", fontWeight: "bold", marginTop: 20, fontSize: 18 }}> Points : <Text
            style={{ color: currentScore >= 0 ? "#DAFC5A" : "#A30000" }}>{currentScore} </Text>!</Text></>}

      </View>
      {!start && <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <UmobButton text={"Start the Quiz"} onPressButton={() => {
          dispatch(updateCurrentAnswer([]));
          dispatch(updateCurrentScore(0));
          setStart(true);
        }} />
      </View>}
      <View style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        alignSelf: "stretch",
        paddingHorizontal: 40
      }}>
        {start && <View>
          {showResult ? (
            <View>
              <Text style={{ fontSize: 30, textAlign: "center" }}>Quiz completed!</Text>
              <Text style={{
                fontSize: 30,
                textAlign: "center",
                marginBottom: 30
              }}>{currentScore > 0 ? "You won :)" : "You lose :("}</Text>
              <UmobButton text={"Restart Quiz"} onPressButton={restartQuiz} />
              <UmobButton text={"Show answer"} onPressButton={showAnswerFunction} />
            </View>
          ) : (
            <ScrollView style={{ marginTop: 30 }}>
              <View style={{ marginTop: 40 }}>
                {questions.map(question => (
                  <MultipleChoice showAnswer={showAnswer} key={question.id} questionData={question} />
                ))}
              </View>
              {showAnswer && <UmobButton text={"Restart Quiz"} onPressButton={restartQuiz} />}
            </ScrollView>
          )}</View>}

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
    justifyContent: "center",
    alignItems: "center"
  },
  timer: {
    marginBottom: 10,
    color: "white",
    alignSelf: "center"
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600"
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400"
  },
  highlight: {
    fontWeight: "700"
  }
});

export default QuizScreen;
