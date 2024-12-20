const questions = [
    {
        question: "Разрешает ли Google подключать новые шрифты пользователям?",
        optionA: "никому не разрешает",
        optionB: "разрешает всем",
        optionC: "не разрешает англоязычным",
        optionD: "не разрешает русскоязычным",
        correctOption: "optionD"
    },

    {
        question: "Чтобы убрать сноску, нужно удалять:",
        optionA: "поле внизу страницы",
        optionB: "ее номер",
        optionC: "текст сноски",
        optionD: "документ целиком",
        correctOption: "optionB"
    },

    {
        question: "Она запоминает нужное вам место и создаёт на него ссылку",
        optionA: "Точка",
        optionB: "Таблица",
        optionC: "Сноска",
        optionD: "Закладка",
        correctOption: "optionD"
    },

    {
        question: "Функционал Google Таблиц позволяет работать только ... одновременно",
        optionA: "в открытых таблицах",
        optionB: "в одной таблице",
		optionC: "в двух таблицах",
        optionD: "в трех таблицах",
        correctOption: "optionB"
    },

    {
        question: "Производит поиск по первому столбцу диапазона и возвращает значение из найденной ячейки",
        optionA: "ПСД",
        optionB: "ЕР",
        optionC: "ЛДПР",
        optionD: "ВПР",
        correctOption: "optionD"
    },

    {
        question: "Возвращает среднее значение диапазона на основании заданных Вами критериев",
        optionA: "СРЗНАЧЕСЛИМН",
        optionB: "СРЗНАЧ",
        optionC: "ЗНАЧСРЕСЛИМН",
        optionD: "СРЗНАЧЕСЛИВК",
        correctOption: "optionA"
    },

    {
        question: " Для того, чтобы открыть информационный объект для совместного редактирования необходимо воспользоваться кнопкой ...",
        optionA: "Доступность",
        optionB: "Совместное редактирование",
        optionC: "Совместный доступ",
        optionD: "Совместный объект",
        correctOption: "optionC"
    },

    {
        question: "Для того, чтобы просмотреть результаты опроса в Гугл Формах, необходимо выбрать",
        optionA: " Ответы → Сводка ответов",
        optionB: " Результаты → Сводка ответов",
        optionC: " Ответы → Результаты",
        optionD: " Ответы → Итоги",
        correctOption: "optionA"
    },

    {
        question: "Создать блог в среде Google можно с спомощью сервиса:",
        optionA: "Презентации",
        optionB: "Формы",
        optionC: "Sheets",
        optionD: "Blogger",
        correctOption: "optionD"
    },

    {
        question: "Создать сайт в среде Google можно с спомощью сервиса:",
        optionA: "GoogleПрезентации",
        optionB: "Google Blogger",
        optionC: "Google Sheets",
        optionD: "Google Sites",
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