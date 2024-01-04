import React, { useState } from 'react';
import SignInForm from './SignInForm';
import Quiz from './Quiz';

const App = () => {
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const handleSignInComplete = () => {
    setIsQuizStarted(true);
  };

  return (
    <div>
      {isQuizStarted ? (
        <Quiz />
      ) : (
        <SignInForm onSignIn={handleSignInComplete} />
      )}
    </div>
  );
};

export default App;
// import React from 'react'
// import Quiz from './components/Quiz/Quiz'


// const App = () => {
//   return (
//     <>
//       <Quiz/>
//     </>
//   )
// }

// export default App
