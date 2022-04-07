import React, { useState, useEffect, useRef } from "react"
import useWordGame from "./hooks/useWordGame"
import './styles.css'
import { FaKeyboard } from "react-icons/fa"

// 1. check if words are correct
// 2. count correct words
// 3. set time buttons
// 4. 10 words show, when all are good, next 10 (.asign?)
// 5. change collor of correct word


function App() {
    const {
        textBoxRef,
        handleChange,
        text,
        isTimeRunning,
        timeRemaining,
        startGame,
        wordCount,
        displayedWords,
        wordsMixer,
        generateRandomWord,
        writtenWordsArr,
        enterRef
    } = useWordGame(10)


    return (
        <div >
            <h1 className="title">Fast Typing Game</h1>
            <FaKeyboard size={60} />
            {wordCount > 2 && !isTimeRunning ? <h1>Wow! You can rewrite: {wordCount * 6} words/min</h1> : <h1>How fast do you type?</h1>}
            <div className="container">
                <textarea

                    value={isTimeRunning ? displayedWords : "Here words will be displayed"}
                    disabled={!isTimeRunning}
                />

                <textarea
                    ref={textBoxRef}
                    onChange={handleChange}
                    value={isTimeRunning ? text : "Press ENTER and rewrite text from box above as fast as you can!"}
                    disabled={!isTimeRunning}
                />
            </div>
            <h4>Time remaining: {timeRemaining}</h4>
            <h1>Correct words count: {wordCount}</h1>
            <button
                onClick={startGame}
                disabled={isTimeRunning}
                ref={enterRef}
            >
                {wordCount > 2 && !isTimeRunning ? "Try again" : "Start"}
            </button>


        </div>
    )
}

export default App
