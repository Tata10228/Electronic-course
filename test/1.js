const questions = [
    {
        question: "Что представляет из себя сервис Гугл Документы?",
        optionA: "Поиск и хранение информации",
        optionB: "Облачное хранилище для файлов",
        optionC: "Браузер для документоведов",
        optionD: "Онлайн-офис для создания и редактирования документов",
        correctOption: "optionD"
    },

    {
        question: "Когда появился сервис Гугл Документы",
        optionA: "2012 году",
        optionB: "2006 году",
        optionC: "2018 году",
        optionD: "2021 году",
        correctOption: "optionB"
    },

    {
        question: "Что нельзя делать в сервисе Гугл Документы?",
        optionA: "Создавать таблицы",
        optionB: "Писать текст",
        optionC: "Делать презентации",
        optionD: "Рисовать",
        correctOption: "optionD"
    },

    {
        question: "Можно ли открыть доступ к документу, созданному с помощью данной платформы?",
        optionA: "Нет, нельзя",
        optionB: "Да, можно",
		optionC: "Если только для своих родственников",
        optionD: "Если только для друзей",
        correctOption: "optionB"
    },

    {
        question: "Нужно ли сохранять файл, созданный с помощью данной платформы?",
        optionA: "Да, обязательно, ведь он пропадёт!",
        optionB: "Если он противоречит законодательству",
        optionC: "Если он музыкальный",
        optionD: "Нет, он сохраняется автоматически",
        correctOption: "optionD"
    },

    {
        question: "Куда сохраняются файлы, сделанные с помощью данной платформы?",
        optionA: "В папку Google Drive",
        optionB: "На привязанную к аккаунту почту",
        optionC: "Напрямую на компьютер",
        optionD: "Напрямую на флешку",
        correctOption: "optionA"
    },

    {
        question: "Можно ли использовать сервис Гугл Документы бесплатно?",
        optionA: "Нет, нельзя",
        optionB: "Только родственникам Билла Гейтса",
        optionC: "Да, можно",
        optionD: "Только с ноутбука",
        correctOption: "optionC"
    },

    {
        question: "Обязательно ли иметь почту Google, чтобы пользоваться данным сервисом?",
        optionA: "Да, обязательно",
        optionB: "Нет, не обязательно",
        optionC: "Обязательно только неработающим",
        optionD: "Необязательно, по желанию",
        correctOption: "optionA"
    },

    {
        question: "Google Фото бесплатно предлагает 15 ГБ в облачном хранилище. Они не расходуются, если вы:",
        optionA: "Загружаете ролики в 4K",
        optionB: "Загружаете со смартфона под управлением iOS",
        optionC: "Загружаете фильмы со Стивеном Сигалом",
        optionD: "Загружаете до 16 мегапикселей и в 1080p",
        correctOption: "optionD"
    },

    {
        question: "Академия Google — специализированный поисковик по научным публикациям. Как думаете, какой у этого сервиса лозунг?",
        optionA: "Верьте, что непонятное можно понять",
        optionB: "Право учёного — свобода",
        optionC: "Ум, честь и совесть эпохи",
        optionD: "Стоя на плечах гигантов",
        correctOption: "optionD"
    }   

]


let shuffledQuestions = [] //empty array to hold shuffled selected questions

function handleQuestions() { 
    //function to shuffle and push 10 questions to shuffledQuestions array
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1
let playerScore = 0  
let wrongAttempt = 0 
let indexNumber = 0

// function for displaying next question in the array to dom
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })
   
    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}



//called when the next button is called
function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    //delays next question displaying for a second
    setTimeout(() => {
        if (indexNumber <= 9) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // condition check for player remark and remark color
    if (playerScore <= 3) {
        remark = "Плохой результат, продолжай практиковаться"
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Средний результат, ты можешь добиться большего"
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Отлично, продолжайте в том же духе"
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

//closes score modal and resets game
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}