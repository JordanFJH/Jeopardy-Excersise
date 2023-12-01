import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {
  const [data, setData] = useState(null);
  const [question, setQuestion] = useState("")
  const [score, setScore] = useState(0);


  async function randomAnswer() {

    try {
      const answer = await fetch("https://jservice.io/api/random")
      const data = await answer.json();
      setData(data);

      setQuestion("")
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleReveal() {
    data && setQuestion(data[0].question);
  }

  function handleIncrease() {
    data && setScore(score + data[0].value);
  }

  function handleDecrease() {
    data && setScore(score - data[0].value);
  }

  function handleReset() {
    setScore(0);
  }



  return (
    <div className='game-box'>
      <h1>Welcome to Jeopardy</h1>
      <h3 className='score'>Score: {score}</h3>
      <div className='score-change'>
        <button onClick={handleIncrease}>Increase</button>
        <button onClick={handleDecrease}>Decrease</button>
        <button onClick={handleReset}>Reset</button>
      </div>

      <h2>Let's Play</h2>
      <br />
      <button onClick={randomAnswer}>Random Answer</button>
      {data &&
        <div>
          <h2><span style={{color: "yellow"}}>Category: </span>{data[0].category.title}</h2>
          <h3><span style={{color: "yellow"}}>Points: </span>{data[0].value}</h3>
          <h3><span style={{color: "yellow"}}>Answer: </span>{data[0].answer}</h3>
        </div>}
      <br /> <br />
      <button onClick={handleReveal}>Reveal Question</button>
      <p style={{fontSize: "1.5em"}}>{question}</p>
    </div>
  )
}

export default App
