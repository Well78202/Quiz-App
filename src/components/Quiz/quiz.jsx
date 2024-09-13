import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './quiz.module.css';  // استيراد CSS Module

export default function Quiz() {
  const { state } = useLocation(); 
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://opentdb.com/api.php?amount=${state.numberOfQuestions}&category=${state.category}&difficulty=${state.difficulty}&type=multiple`
        );
        const data = await response.json();
        setQuestions(data.results);
        setLoading(false);
      } catch (error) {
        setError("Failed to load questions");
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [state]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (questions.length === 0) {
    return <p>No questions found!</p>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const shuffledAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer]
    .sort(() => Math.random() - 0.5);

  const handleAnswerClick = (answer) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(answer);
      setIsCorrect(answer === currentQuestion.correct_answer);
      setShowAnswer(true);
    }
  };

  const handleNextQuestion = () => {
    if (isCorrect === false) {
      setSelectedAnswer(null);
      setShowAnswer(false);
      return;
    }

    if (isCorrect === true) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setShowAnswer(false);
      } else {
        alert("Quiz Completed!");
      }
    }
  };

  return (
    <div className={styles.quizContainer}>
      <div className={styles.questionContainer}>
        <h2>{currentQuestion.question}</h2>
      </div>
      <ul className={styles.answerList}>
        {shuffledAnswers.map((answer, index) => (
          <li 
            key={index}
            onClick={() => handleAnswerClick(answer)}
            className={
              selectedAnswer === answer 
                ? isCorrect === null 
                  ? styles.selected 
                  : isCorrect 
                    ? `${styles.selected} ${styles.correct}` 
                    : `${styles.selected} ${styles.wrong}` 
                : ''
            }
          >
            {answer}
          </li>
        ))}
      </ul>
      {showAnswer && (
        <div className={styles.feedback}>
          {isCorrect === false 
            ? `Wrong Answer. The correct answer is: ${currentQuestion.correct_answer}` 
            : "Correct Answer!"}
        </div>
      )}
      <button onClick={handleNextQuestion} disabled={selectedAnswer === null}>
        {isCorrect === false ? 'Try Again' : 'Next Question'}
      </button>
    </div>
  );
}
