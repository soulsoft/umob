import {useAppDispatch, useAppSelector} from '../../state/redux-hooks';
import React, { FC, useEffect, useState } from "react";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import type {PropsWithChildren} from 'react';
import {
  Button, Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { QuizIllustration } from "../../config/images";
import UmobButton from "../../components/UmobButton";



const questions = [
  {
    id: 1,
    question: 'What is the number of bikes in Street X?',
    options: ['10', '20', '30', '40'],
    correctAnswer: '30',
  },
  {
    id: 2,
    question: 'Is Provider Y the biggest provider in City Z?',
    options: ['True', 'False'],
    correctAnswer: 'True',
  },
  {
    id: 3,
    question: 'What is the longest distance between bikes?',
    options: ['100 meters', '200 meters', '300 meters', '400 meters'],
    correctAnswer: '400 meters',
  },
  {
    id: 4,
    question: 'What is the shortest distance between bikes?',
    options: ['10 meters', '20 meters', '30 meters', '40 meters'],
    correctAnswer: '10 meters',
  },
  {
    id: 5,
    question: 'What is the biggest provider in City A?',
    options: ['Provider X', 'Provider Y', 'Provider Z', 'Provider W'],
    correctAnswer: 'Provider Z',
  },
  {
    id: 6,
    question: 'What is the smallest provider in City B?',
    options: ['Provider X', 'Provider Y', 'Provider Z', 'Provider W'],
    correctAnswer: 'Provider X',
  },
  {
    id: 7,
    question: 'How many bikes does Provider X have?',
    options: ['50', '100', '150', '200'],
    correctAnswer: '150',
  },
  {
    id: 8,
    question: 'What is the total number of bikes in City C?',
    options: ['500', '1000', '1500', '2000'],
    correctAnswer: '1000',
  },
  {
    id: 9,
    question: 'Is there any bike available in Street Y?',
    options: ['Yes', 'No'],
    correctAnswer: 'No',
  },
  {
    id: 10,
    question: 'What is the average distance between bikes in City D?',
    options: ['50 meters', '75 meters', '100 meters', '125 meters'],
    correctAnswer: '75 meters',
  },
  {
    id: 11,
    question: 'Which provider has the most bikes?',
    options: ['Provider X', 'Provider Y', 'Provider Z', 'Provider W'],
    correctAnswer: 'Provider W',
  },
  {
    id: 12,
    question:
      'What is the percentage of bikes available in City E compared to City F?',
    options: ['25%', '50%', '75%', '100%'],
    correctAnswer: '50%',
  },
];

const QuizScreen: FC = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const {userInfo} = useAppSelector(state => state.user);
  useEffect(() => {}, []);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [start, setStart] = useState(false);

  useEffect(() => {
    let timer = undefined;
    if (timeLeft === 0) {
      setShowResult(true);
    } else if (start===true){
       timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearInterval(timer);
    }

  }, [timeLeft, start]);

  const handleAnswer = (selectedAnswer) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 50);
    } else {
      setScore(score - 20);
    }
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setTimeLeft(60);
  };

  return (

        <View style={styles.container}>
          <View style={{ alignSelf: 'stretch',backgroundColor: '#0A0C16', borderBottomLeftRadius: 70, borderBottomRightRadius: 70, justifyContent: 'flex-end',alignItems: 'center', padding: 20,}}>
            {!start && <><Image source={QuizIllustration} style={{height:150, width:200, alignSelf: 'center'}} />
            <Text style={{color: '#ffffff', marginHorizontal:10,textAlign: 'center', marginTop: 10}}>Please take a moment to explore the map and familiarize yourself with the locations and details this will help you answer the quiz questions more confidently. When you're ready, start the quiz and test your knowledge!</Text></>}
            {start && <><CountdownCircleTimer
                isPlaying
                duration={60}
                size={80}
                colors={['#DAFC5A', '#DAFC5A', '#a35c00', '#A30000']}
                colorsTime={[45, 35, 15, 0]}
              >
                {({ remainingTime }) => <Text style={{color: 'white'}}>{remainingTime}</Text>}
              </CountdownCircleTimer>
              <Text style={{ color: 'white', fontWeight: 'bold', marginTop:20, fontSize: 18}}> Points : <Text style={{color: score >= 0 ? '#DAFC5A': '#A30000'}}>{score} </Text>!</Text></>}

          </View>
          {!start &&  <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
            {/*<Button title={'Start the Quiz'} key={'start'} onPress={()=>{*/}
            {/*  setStart(true);*/}
            {/*}} />*/}
            <UmobButton  text={'Start the Quiz'} onPressButton={()=>{
              setStart(true);
            }}/>
          </View>}
          <View style={{flex:1, alignItems: 'center', justifyContent: 'center',backgroundColor: '#ffffff', alignSelf: 'stretch', paddingHorizontal:40}}>
          {start && <View>
          {showResult ? (
            <View>
              <Text style={{fontSize: 30,textAlign: 'center'}}>Quiz completed!</Text>
              <Text style={{fontSize: 30,textAlign: 'center', marginBottom:30}}>{score > 0? 'You won :)': 'You loose :('}</Text>
              {/*<Button title="Restart Quiz" onPress={restartQuiz} />*/}
              <UmobButton text={"Restart Quiz"} onPressButton={restartQuiz}/>
            </View>
          ) : (
            <View style={{alignItems: 'center'}}>
              <Text style={{marginVertical:20, fontSize: 20}}>{questions[currentQuestionIndex].question}</Text>
              {questions[currentQuestionIndex].options.map(option => (
                <UmobButton text={option} onPressButton={() => handleAnswer(option)}/>
              ))}
            </View>
          )}</View>}

          </View>
        </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  container: {
    flex:1,
    backgroundColor: '#FDFDFD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    marginBottom: 10,
    color: 'white',
    alignSelf: 'center'
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default QuizScreen;
