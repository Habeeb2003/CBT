let startPressed = false;
    let submitPressed = false
    let mystartStop = document.getElementById("startStop")
    let minDisp = document.getElementById('Min')
    let secDisp = document.getElementById('Sec')
    minDisp.innerHTML= "1"
    secDisp.innerHTML = "00"
    let secPerMinute = "59"
    let myScore = document.getElementById('score')
    let myScoreSect = document.getElementById('scoreSect')
    let d = 0
    myScore.innerHTML = d
    let quesNum = document.getElementById('quesNumber')
    let display= document.getElementById('quesDiv')
    let radDiv = document.getElementById('rad')
    let check= document.querySelector('#round')
    let op1Arr =["sunday igbowo",'naira marley','bubu', "Buhari"]
    let op2Arr=['femi otedola','habeeb dangote','aliko dangote','temi dangote']
    let op3Arr=['TheBigDaddy','Quadi','noob','temi dangote']
    let op4Arr=['Mr. Henshaw', 'Mr. Timi', 'Mr. Tzee', 'Mrs. Wunmi']
    let op5Arr=['Mr. Timi', 'Mr. Tzee', 'Mrs. Wunmi', 'Mr. Henshaw']
    let op6Arr=['Mr. Tzee', 'Mrs. Wunmi', 'Mr. Henshaw', 'Mr. Timi']
    let allQues =["Who is the president of nigeria?",'Who owns dangote group of companies?',
    'Who is Africa/s Largest Entertainer?', 'Who is SQI JavaScript Teacher?',
    'Who is SQI HTML and CSS teacher?', 'Who is SQI UI/UX design teacher?']
    let questions=[{ques: allQues[0], options: op1Arr, answer: "Buhari", choosedAns: ""},
     {ques: allQues[1], options: op2Arr, answer: "aliko dangote", choosedAns: ""},
     {ques: allQues[2], options: op3Arr, answer: "TheBigDaddy", choosedAns: ""},
     {ques: allQues[3], options: op4Arr, answer: "Mr. Tzee", choosedAns: ""},
     {ques: allQues[4], options: op5Arr, answer: "Mr. Henshaw", choosedAns: ""},
     {ques: allQues[5], options: op6Arr, answer: "Mr. Timi", choosedAns: ""},
     ]
    let quesNo = 0
    let quesAnswered = 0
    let isNextPressed = false
    let localStorageStored
    let checkAnswerPressed = false
    let a, b, myset;
    let p = 0; 
    let totalQue    
    if (localStorage.getItem('checkIfLocalStored')) {
        let myquesData = localStorage.getItem('myQuestion')
        let abb = JSON.parse(myquesData)
        questions = abb
    }
    function showQues(params) {
        totalQue = questions.length      
        // if (submitPressed == true) {
        //     return
        // }
        if (startPressed == false) {
            return
        }
        if (quesAnswered == totalQue && params == "Next") {
            return
        }
        if (quesAnswered == 1 && params == "Prev") {
            return
        }
        if (params == "Prev")        
        {
            Prev();
        }
        if (params == "Next") {
            Next();
        }
        if (quesAnswered == 1) {
            document.getElementById('prev').style.display = 'none'
        }
        else{
            document.getElementById('prev').style.display = 'inline'
        }
        if (quesAnswered == totalQue) {
            document.getElementById('next').style.display = 'none'
        }
        else{
            document.getElementById('next').style.display = 'inline'
        }
    }
    function Next() { 
        rad.innerHTML =""
        a = questions[quesNo]
        display.innerHTML = a.ques
        b = a.options
        for (let i = 0; i < b.length  ; i++) {
                let dd =`<input type="radio" name="round" value="${a.options[i]}">${a.options[i]}<br>`
            rad.innerHTML += dd
        }
        let ccc = document.querySelectorAll('input[type=radio]')
        ccc.forEach(element => {
            if (element.value == a.choosedAns) {
                element.checked = true
            }
            addEventListener('change', storeAns)
        });
        quesAnswered++
        quesNum.innerHTML = "Question " + quesAnswered + " of " + totalQue
        quesNo++
        if (checkAnswerPressed) {
            checkAnswer()
        }
    }
    function Prev() {
        quesNo-=1
        rad.innerHTML =""
        a = questions[quesNo-1]
        display.innerHTML = a.ques
        b = a.options
        for (let i = 0; i < b.length  ; i++) {
            let dd =`<input type="radio" name="round" value="${a.options[i]}">${a.options[i]}<br>`
            rad.innerHTML += dd
        }
        let ccc = document.querySelectorAll('input[type=radio]')
        ccc.forEach(element => {
            if (element.value == a.choosedAns) {
                element.checked = true
            }
            addEventListener('change', storeAns)
        });
        quesAnswered--
        quesNum.innerHTML = "Question " + quesAnswered + " of " + totalQue
        if (checkAnswerPressed) {
            checkAnswer()
        }   
    }
    function storeAns(event) {
        if (submitPressed == true) {
            event.target.checked = false
        }
        a.choosedAns = event.target.value;
    }
    function submit(params) {
        if (params == "start") {
            startPressed = true
            showQues("Next")
            mystartStop.innerHTML = "submit"
            secDisp.innerHTML = "00"
            myset = setInterval(() => {
                secDisp.innerHTML -= 1
                if (secDisp.innerHTML == -1) {
                    minDisp.innerHTML -= 1
                    secDisp.innerHTML = secPerMinute 
                }
                if (minDisp.innerHTML == "0" && secDisp.innerHTML == "0") {
                    clearInterval(myset)
                    submit("submit")
                }
            }, 1000);
        }
        else if (params == "submit") {
            myScoreSect.style.display = "flex"
            submitPressed = true;
            clearInterval(myset)
            questions.forEach(element => {
            if (element.choosedAns == element.answer) {
                d ++
                myScore.innerHTML = "You scored " + d + " out of " + totalQue
            }
            else{
                myScore.innerHTML = "You scored " + d + " out of " + totalQue
            }
        });
        quesNo = 0
        quesAnswered = 0
        }
        else if (params == "Done") {
            location.reload()
        }
    }
    function Push() {
        let myTextInput = document.querySelectorAll('input[type=text]')
        let newObject = {ques: "", options: [], answer: "", choosedAns: "",
        }
        for (let i = 0; i < myTextInput.length; i++) {
            let myTextInputIndex = myTextInput[i]
            if (i == 0) 
                newObject.ques = myTextInputIndex.value
            else if (i <=4) {
                newObject.options.push(myTextInputIndex.value) 
            }
            else if (i <= 5) {
                newObject.answer = myTextInputIndex.value
            }
            else if (i <= 6) {
                newObject.choosedAns = myTextInputIndex.value
            }
        }
        questions.push(newObject)
        myTextInput.forEach(element => {
         element.value = ""   
        });
        localStorage.setItem('myQuestion', JSON.stringify(questions))
        localStorageStored = true
        localStorage.setItem('checkIfLocalStored', JSON.stringify(localStorageStored)) 
    }
    function checkAnswer() {
        checkAnswerPressed = true
        myScoreSect.style.display = 'none'
        if (p==0) {
            document.getElementById('prev').style.display = 'none'
            document.getElementById('next').style.display = 'inline'
            mystartStop.innerHTML = "Done"
            p++
            Next()
        }
        let radios = document.querySelectorAll('input[type=radio]')
        for (let i = 0; i < radios.length; i++) {
            let og = radios[i]
            if (a.choosedAns != a.answer) {
                if (og.value == a.answer) {
                    radios.forEach(element => {
                        if (element.value == og.value) {
                            element.style.outline = '2px solid green'
                        }
                        if (element.value == a.choosedAns) {
                            element.style.outline = '2px solid red'
                        }
                    });
                }
            }
            else{
                radios.forEach(element => {
                    if (element.value == a.answer) {
                        element.style.outline = '2px solid green'
                    }
                });
            }
            
        }
        
    }