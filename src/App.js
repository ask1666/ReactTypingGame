import React, { useState } from "react";
import "./App.css";

function App() {
  const [sentence, setSentence] = useState(0);
  const [welcomeText, setWelcomeText] = useState(0);
  const [inputSentence, setInputSentence] = useState(0);
  const [score, setScore] = useState(0);
  const [ended, setEnded] = useState(0);
  const [timer, setTimer] = useState(0);

  const sentences = [
    "He was disappointed when he found the beach to be so sandy and the sun so sunny.",
    "The external scars tell only part of the story.",
    "Beach-combing replaced wine tasting as his new obsession.",
    "There are no heroes in a punk rock band.",
    "Happiness can be found in the depths of chocolate pudding.",
    "A suit of armor provides excellent sun protection on hot days.",
    "She was amazed by the large chunks of ice washing up on the beach.",
    "She was disgusted he couldn’t tell the difference between lemonade and limeade.",
    "Erin accidentally created a new universe.",
    "Andy loved to sleep on a bed of nails.",
    "Buried deep in the snow, he hoped his batteries were fresh in his avalanche beacon.",
    "Mary plays the piano.",
    "The wake behind the boat told of the past while the open sea for told life in the unknown future.",
    "Going from child, to childish, to childlike is only a matter of time.",
    "This is a Japanese doll.",
    "The teens wondered what was kept in the red shed on the far edge of the school grounds.",
    "When she didn’t like a guy who was trying to pick her up, she started using sign language.",
    "Dan took the deep dive down the rabbit hole.",
    "The lyrics of the song sounded like fingernails on a chalkboard.",
  ];

  const generateSentence = (e) => {
    e.preventDefault();
    if (ended) {
      setEnded(false);
      setScore(0);
      setTimer(60);
      setInputSentence("");
    }
    setWelcomeText(true);
    getScore();
    setInputSentence("");
    setSentence(sentences[Math.floor(Math.random() * sentences.length)]);
  };

  const getScore = () => {
    if (inputSentence.length > 0) {
      let inputWordArray = inputSentence.split(" ");
      let wordArray = sentence.split(" ");
      let result = 0;
      wordArray.forEach((e) => {
        inputWordArray.forEach((e2) => {
          if (e === e2) result++;
        });
      });
      setScore(score + result);
    }
  };

  const getSentence = () => {
    if (ended) {
      return (
        <h1 className="text-white pb-16 text-2xl text-center">
          Well done! You got {score} words correct! Click the button to try
          again!
        </h1>
      );
    } else if (!welcomeText) {
      if (timer < 60) {
        setTimer(60);
        setInputSentence("");
      }
      return (
        <>
          <h1 className="text-white pb-16 text-2xl text-center">
            Time left: {timer}
          </h1>
          <h1 className="text-white pb-16 text-2xl text-center">
            Words typed: {score}
          </h1>
          <h1 className="text-white pb-16 text-2xl text-center">
            Click the button to start!
          </h1>
        </>
      );
    } else {
      if (timer !== 0) {
        setTimeout(() => setTimer(timer - 1), 1000);
      } else {
        setEnded(true);
        clearTimeout();
        setInputSentence("");
        setWelcomeText(false);
      }
      return (
        <>
          <h1 className="text-white pb-16 text-2xl text-center">
            Time left: {timer}
          </h1>
          <h1 className="text-white pb-16 text-2xl text-center">
            Words typed: {score}
          </h1>
          <h1 className="text-white pb-16 text-2xl text-center">{sentence}</h1>
        </>
      );
    }
  };

  const handleChange = (event) => {
    setInputSentence(event.target.value);
  };

  return (
    <div className="App w-full h-screen flex flex-col justify-center">
      {getSentence()}
      <form
        className="flex items-center flex-col w-full"
        onSubmit={generateSentence}
      >
        <input
          className="bg-gray-400 mb-4 block w-8/12 h-8 placeholder-gray-600"
          onChange={handleChange}
          placeholder="Type your phrase here..."
          value={inputSentence}
          maxLength={sentence.length}
        />
        <button
          className="bg-orange-400 w-32 text-black p-2 rounded font-bold block"
          type="submit"
        >
          Button
        </button>
      </form>
    </div>
  );
}

export default App;
