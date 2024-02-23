import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAppDispatch, useAppSelector } from "../../state/redux-hooks";
import { updateCurrentAnswer, updateCurrentScore } from "../../state/reducers/user";

const MultipleChoice = ({ showAnswer, questionData }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { currentScore, currentAnswer } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();


  const toggleOption = (optionLabel, isCorrect) => {
    const isSelected = selectedOptions.includes(optionLabel);
    if (!isSelected) {
      dispatch(updateCurrentAnswer([...currentAnswer, optionLabel]));
      setSelectedOptions([...selectedOptions, optionLabel]);
      if (isCorrect) {
        dispatch(updateCurrentScore(currentScore + 50));
      } else {
        dispatch(updateCurrentScore(currentScore - 20));
      }
    }
  };

  const isOptionCorrect = (optionLabel) => {
    return questionData.options.find(option => option.label === optionLabel)?.isCorrect || false;
  };

  const renderOption = (option, index) => {
    const isSelected = showAnswer ? currentAnswer?.includes(option.label) : selectedOptions.includes(option.label);
    const isCorrect = isOptionCorrect(option.label);
    const shouldUnderline = showAnswer && !isCorrect;
    return (
      <TouchableOpacity
        key={index}
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 15 }}
        onPress={() => toggleOption(option.label, option.isCorrect)}
        disabled={showAnswer}
      >
        <View
          style={{
            width: 24,
            height: 24,
            borderRadius: 4,
            borderWidth: 2,
            borderColor: "black",
            marginRight: 10,
            justifyContent: "center",
            alignItems: "center"
          }}
        >{isSelected && (
          <View
            style={{
              width: 12,
              height: 12,
              borderColor: "black",
              borderWidth: 0.5,
              backgroundColor: "#DAFC5A"
            }}
          />
        )}
        </View>
        {!showAnswer && <Text style={{
          textDecorationLine: shouldUnderline ? "line-through" : "none",
          color: "black"
        }}>
          {option.label}
        </Text>}
        {showAnswer && <Text style={{
          textDecorationLine: shouldUnderline ? "line-through" : "none",
          color: shouldUnderline ? "red" : "green"
        }}>
          {option.label}
        </Text>}
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Text style={{ marginBottom: 10, fontSize: 18 }}>{questionData.question}</Text>
      {questionData.options.map((option, index) => renderOption(option, index))}
    </View>
  );
};

const styles = StyleSheet.create({
  showAnswerButton: {
    color: "blue",
    textDecorationLine: "underline",
    marginTop: 10
  }
});

export default MultipleChoice;
