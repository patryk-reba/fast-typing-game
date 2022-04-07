import { useState, useEffect, useRef } from "react"
import wordlist from "../wordlist"


function useWordGame(startingTime = 10) {
    const [text, setText] = useState("")
    const [timeRemaining, setTimeRemaining] = useState(startingTime)
    const [isTimeRunning, setIsTimeRunning] = useState(false)
    const [wordCount, setWordCount] = useState(0)
    const [displayedWords, setDisplayedWords] = useState("") //moje
    const textBoxRef = useRef(null)

    function handleChange(e) {
        const { value } = e.target
        setText(value)
    }
    const writtenWordsArr = text.split(" ")

    function calculateWordCount(text) {
        const wordsArr = text.trim().split(" ")
        const displayArr = displayedWords.trim().split(" ")
        // const newArr = wordsArr.filter(word => word === displayedWords)
        let newArr = wordsArr.filter(word => {
            for (let i = 0; i < displayArr.length; i++) {
                if (word === displayArr[i]) {
                    return word
                }
            }
        })
        // for (let i = 0; i < displayArr.length; i++) {
        //     if (wordsArr[i] == displayArr[i]) {
        //         return newArr.push(displayArr[i])
        //     }
        // }

        console.log(displayArr)
        console.log(wordsArr)
        console.log(newArr)
        return newArr.length
    }

    function startGame() {
        setIsTimeRunning(true)
        setTimeRemaining(startingTime)
        setText("")
        textBoxRef.current.disabled = false
        textBoxRef.current.focus()
        wordsMixer(words)
        setWordCount(0)
    }

    function endGame() {
        setIsTimeRunning(false)
        setWordCount(calculateWordCount(text))
    }

    useEffect(() => {
        if (isTimeRunning && timeRemaining > 0) {
            setTimeout(() => {
                setTimeRemaining(time => time - 1)
            }, 1000)
        } else if (timeRemaining === 0) {
            endGame()
        }
        calculateWordCount(text)
    }, [timeRemaining, isTimeRunning])


    //   MOJE ************************************************
    const words = wordlist.split(' ')

    function generateRandomWord(arr) {
        let randomNumber = Math.floor(Math.random() * arr.length)
        let randomWord = words[randomNumber]
        return randomWord
    }

    function wordsMixer(arr) {
        setDisplayedWords(prevWords => {
            prevWords = new Array(40).fill(0).map(() => generateRandomWord(words))
            // prevWords = [...prevWords]
            // prevWords.push(rand(words), rand(words),rand(words),rand(words),rand(words))
            let prevWordsSpace = prevWords.join(" ")
            return prevWordsSpace
        })

    }




    return { textBoxRef, handleChange, text, isTimeRunning, timeRemaining, startGame, wordCount, displayedWords, wordsMixer, generateRandomWord, writtenWordsArr }
}

export default useWordGame
