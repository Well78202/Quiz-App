import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [category, setCategory] = useState("9");
  const [difficulty, setDifficulty] = useState("easy");
  const [numberOfQuestions, setNumberOfQuestions] = useState(1);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    if (!numberOfQuestions || numberOfQuestions < 1 || numberOfQuestions > 40) {
      setError("Please enter a valid number of questions between 1 and 40.");
      return;
    }
    setError("");
    console.log("Starting quiz with settings:", {
      category,
      difficulty,
      numberOfQuestions,
    });
    navigate('/quiz', { state: { category, difficulty, numberOfQuestions } });
  };

  return (
    <section className='p-2' id="quiz-app">
      <div id="app-setting" className="bg-info p-2">
        <div id="app-title">
          <h1>welcome to <span id="title-span">Quiz app</span></h1>
          <h3 className="lead">please choose your quiz settings</h3>
        </div>
        <div className="p-4">
          <div className="form-group">
            <label htmlFor="category" className="text-spec p-1">Category</label>
            <select 
              id="category" 
              className="form-control" 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="9">General Knowledge</option>
              <option value="20">Mythology</option>
              <option value="24">Politics</option>
              <option value="25">Art</option>
              <option value="21">Sports</option>
              <option value="18">Science: Computers</option>
            </select>
          </div>
          <div className="form-group mt-3">
            <label htmlFor="difficulty" className="text-spec">Difficulty</label>
            <div className="form-check">
              <label className="form-check-label">
                <input 
                  type="radio" 
                  className="form-check-input" 
                  name="difficulty" 
                  value="easy"
                  checked={difficulty === "easy"}
                  onChange={() => setDifficulty("easy")}
                />
                Easy
              </label>
            </div>
            <div className="form-check">
              <label className="form-check-label">
                <input 
                  type="radio" 
                  className="form-check-input" 
                  name="difficulty" 
                  value="medium"
                  checked={difficulty === "medium"}
                  onChange={() => setDifficulty("medium")}
                />
                Medium
              </label>
            </div>
            <div className="form-check">
              <label className="form-check-label">
                <input 
                  type="radio" 
                  className="form-check-input" 
                  name="difficulty" 
                  value="hard"
                  checked={difficulty === "hard"}
                  onChange={() => setDifficulty("hard")}
                />
                Hard
              </label>
            </div>
          </div>
          <div className="form-group mt-3">
            <input 
              type="number" 
              className="form-control" 
              id="numberOfQuestions" 
              placeholder="Number Of questions" 
              value={numberOfQuestions}
              onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
              min="1" 
              max="40" 
              required 
            />
          </div>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
          <button 
            id="startBtn" 
            className="btn btn-outline-light float-end py-2 px-4 bg-spec rounded-pill my-4"
            onClick={handleStartQuiz}
          >
            Start
          </button>
        </div>
      </div>
    </section>
  );
}
