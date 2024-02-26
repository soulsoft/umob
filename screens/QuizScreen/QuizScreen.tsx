import { useAppDispatch, useAppSelector } from "../../state/redux-hooks";
import React, { FC, useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import {
  FlatList,
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
import { findMaxMinDistance, getRandomNumber } from "../../config/utils";


const QuizScreen: FC = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const { userInfo, currentScore } = useAppSelector(state => state.user);
  const { provider1, provider2, provider3 } = useAppSelector(state => state.providers);
  const [key, setKey] = useState(0);
  const [maxDistance] = useState(findMaxMinDistance(provider1, true));
  const [minDistance] = useState(findMaxMinDistance(provider2, false));
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
      question: "How many Cykl Bikes Available in Wageningen city?",
      options: [
        { label: getRandomNumber(1, 400), isCorrect: false },
        { label: getRandomNumber(1, 400), isCorrect: false },
        { label: provider2.length.toString(), isCorrect: true },
        { label: getRandomNumber(1, 400), isCorrect: false }
      ]
    },
    {
      id: 2,
      question: "Who is the biggest mobility provider in Netherland ?",
      options: [
        { label: "Cykl", isCorrect: false },
        { label: "Donkey", isCorrect: false },
        { label: "Ridecheck", isCorrect: true }
      ]
    }, {
      id: 3,
      question: "What is the maximum distance between Ridecheck mobility provider bikes in the Netherlands?",
      options: [
        { label: "20 meters", isCorrect: false },
        { label: "4 km", isCorrect: false },
        { label: maxDistance?.Result.toFixed(0) + "KM", isCorrect: true }
      ]
    }, {
      id: 4,
      question: "What is the minimum distance between Donkey mobility provider bikes in the Netherlands?",
      options: [
        { label: "1Km", isCorrect: true },
        { label: "50m", isCorrect: false },
        { label: minDistance?.Result, isCorrect: true }
      ]
    }, {
      id: 5,
      question: "How many Bikes present on the map?",
      options: [
        { label: "2000", isCorrect: false },
        { label: "1350", isCorrect: false },
        { label: provider2.length + provider3.length, isCorrect: true }
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
      <View style={styles.topScreenStyle}>
        {!start && <><Image source={QuizIllustration} style={styles.illustrationStyle} />
          <Text style={styles.infoTextStyle}>Please take a
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
          duration={60}
          size={80}
          colors={["#DAFC5A", "#DAFC5A", "#a35c00", "#A30000"]}
          colorsTime={[45, 35, 15, 0]}>
          {({ remainingTime }) => <Text style={{ color: "white" }}>{remainingTime}</Text>}
        </CountdownCircleTimer>
          <Text style={styles.scoreText}> Points : <Text
            style={{ color: currentScore >= 0 ? "#DAFC5A" : "#A30000" }}>{currentScore}
          </Text>!</Text></>}
      </View>
      {!start && <View style={styles.ctaContainerStyle}>
        <UmobButton text={"Start the Quiz"} onPressButton={() => {
          dispatch(updateCurrentAnswer([]));
          dispatch(updateCurrentScore(0));
          setStart(true);
        }} />
      </View>}
      <View style={styles.quizContainer}>
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
          ) : (<FlatList
            style={{ marginTop: 30 }}
            data={questions}
            renderItem={({ item }) => (
              <MultipleChoice
                showAnswer={showAnswer}
                key={item.id}
                questionData={item}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={<View style={{ marginTop: 40 }} />}
            ListFooterComponent={showAnswer && <UmobButton text={"Restart Quiz"} onPressButton={restartQuiz} />}
          />)}</View>}

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topScreenStyle: {
    alignSelf: "stretch",
    backgroundColor: "#0A0C16",
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 20
  },
  ctaContainerStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  infoTextStyle: {
    color: "#ffffff",
    marginHorizontal: 10,
    textAlign: "center",
    marginTop: 10
  },
  illustrationStyle: {
    height: 150,
    width: 200,
    alignSelf: "center"
  },
  scoreText: {
    color: "white",
    fontWeight: "bold",
    marginTop: 20,
    fontSize: 18
  },
  quizContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    alignSelf: "stretch",
    paddingHorizontal: 40
  },
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
