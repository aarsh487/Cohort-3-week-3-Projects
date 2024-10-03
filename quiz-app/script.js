import { quizData } from "./data.js"

let currentQuestionIndex = 0

const quizContainer = document.createElement('div')
quizContainer.setAttribute('id', 'quiz')

const nextButton = document.createElement('button')
nextButton.setAttribute('id', 'next')
nextButton.innerText = 'Next'

const prevButton = document.createElement('button')
prevButton.setAttribute('id', 'prev')
prevButton.setAttribute('class', 'hidden')
prevButton.innerText = 'Previous'


const resultContainer = document.createElement('div')
resultContainer.setAttribute('id', 'result')
resultContainer.setAttribute('class', 'hidden')
// resultButton.innerText = 'Result'

function loadQuiz(){
    quizContainer.innerHTML = quizData.map((quizitem, index) => {
       return `<div class = "question ${index === 0 ? 'active' : ''}">
            <h2>${quizitem.question}</h2>
            <label>
                <input type = "radio" name = "question${index}" value = "${quizitem.a}">${quizitem.a}
            </label>
            <label>
                <input type = "radio" name = "question${index}" value = "${quizitem.b}">${quizitem.b}
            </label>
            <label>
                <input type = "radio" name = "question${index}" value = "${quizitem.c}">${quizitem.c}
            </label>
            <label>
                <input type = "radio" name = "question${index}" value = "${quizitem.d}">${quizitem.d}
            </label>
        </div>`
        
    }).join('')
}

function showQuestion(index){
    const questions = document.querySelectorAll('.question')
    questions.forEach((question, i) => {
        question.classList.remove('active')
        if(i=== index){
            question.classList.add('active')
        }
    })
    prevButton.classList.toggle('hidden', index === 0)
    nextButton.innerText = index == questions.length - 1 ? 'submit' : 'Next'
}

nextButton.addEventListener('click', () => {
    const questions = document.querySelectorAll('.question')
    if(currentQuestionIndex < questions.length - 1){
        currentQuestionIndex++
        showQuestion(currentQuestionIndex)
    }
    else{
        showResult()
    }
})

prevButton.addEventListener('click', () => {
    if(currentQuestionIndex > 0){
        currentQuestionIndex--
        showQuestion(currentQuestionIndex)
    }

})

function calculateScore(){
    let score = 0
    quizData.forEach((quizitem, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`)
        if(selectedOption && selectedOption.value === quizitem[quizitem.correct]){
            score++
        }
    
    })
    return score

}

function showResult(){
    const score = calculateScore()
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}`
    resultContainer.classList.remove('hidden')
    quizContainer.classList.add('hidden')
    prevButton.classList.add('hidden')
    nextButton.classList.add('hidden')

}


const parentEL = document.querySelector('.quiz-container')
parentEL.appendChild(quizContainer)
parentEL.appendChild(nextButton)
parentEL.appendChild(prevButton)
parentEL.appendChild(resultContainer)

loadQuiz()
showQuestion(currentQuestionIndex)