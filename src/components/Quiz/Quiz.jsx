import React, { useState, useRef } from 'react';
import './quiz.css';
import { data } from '../../assets/data';

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [result, setResult] = useState(false);
  const [score, setScore] = useState(0); // Add state for score

  const options = Array.from({ length: 4 }, (_, i) => useRef(null));

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add('correct');
        setScore((prevScore) => prevScore + 1); // Increment the score on correct answer
      } else {
        e.target.classList.add('wrong');
        options[question.ans - 1].current.classList.add('correct');
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
      options.forEach((option) => {
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
    options.forEach((option) => {
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
          <button className='reset' onClick={reset}>
            Reset
          </button>
        </>
      ) : (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <div className='box'>
            <ul>
              {options.map((option, i) => (
                <li key={i} ref={option} onClick={(e) => checkAns(e, i + 1)}>
                  {question[`option${i + 1}`]}
                </li>
              ))}
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