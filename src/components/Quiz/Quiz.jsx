// the quiz
import React, { useState, useRef } from 'react';
import './Quiz.css';
import { data } from '../../assets/data';

const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(data[index]);
  let [lock, setLock] = useState(false);
  let [result, setResult] = useState(false);
  let [score, setScore] = useState(0); // Add state for score

  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);

  let option_array = [option1, option2, option3, option4];

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add('correct');
        setScore(score + 1); // Increment the score on correct answer
      } else {
        e.target.classList.add('wrong');
        option_array[question.ans - 1].current.classList.add('correct');
      }
      setLock(true);
    }
  };

  const next = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        return;
      }
      setIndex(index + 1);
      setQuestion(data[index + 1]);
      setLock(false);
      option_array.forEach((option) => {
        option.current.classList.remove('wrong');
        option.current.classList.remove('correct');
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setLock(false);
    setResult(false);
    setScore(0); // Reset the score
    option_array.forEach((option) => {
      option.current.classList.remove('wrong');
      option.current.classList.remove('correct');
    });
  };

  return (
    <div className='container'>
      <h1>Quiz App</h1>
      <hr />
      {result ? (
        <>
          <h2>Your Scored {score} out of {data.length}</h2>
          <button onClick={reset}>Reset</button>
        </>
      ) : (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <div className='box'>
            <ul>
              <li ref={option1} onClick={(e) => checkAns(e, 1)}>
                {question.option1}
              </li>
              <li ref={option2} onClick={(e) => checkAns(e, 2)}>
                {question.option2}
              </li>
            </ul>
            <ul>
              <li ref={option3} onClick={(e) => checkAns(e, 3)}>
                {question.option3}
              </li>
              <li ref={option4} onClick={(e) => checkAns(e, 4)}>
                {question.option4}
              </li>
            </ul>
          </div>
          <button onClick={next}>Next</button>
          <div className='index'>
            {index + 1} of {data.length} questions
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;