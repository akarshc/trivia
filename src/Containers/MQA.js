import React from 'react'

const initialState = {
    api: '',
    question: '',
    answers: '',
    checked: '',
    index: 0,
    score: 0
}
class MQA extends React.Component {
constructor() {
    super()
    this.state = initialState
    this.next = this.next.bind(this)
    this.answer_key = this.answer_key.bind(this)
}
componentWillMount() {
    fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
    .then(res => res.json())
    .then(response => {
        this.setState({
            api: response
        })
        this.answer_key()
    })
}
answer_key = () => {
    let {question, answers, api, index} = this.state
    if(index < api.results.length)
    {
        let number = index + 1
        question = 'Q' + number + '. ' + api.results[index].question
        answers = api.results[index].incorrect_answers.concat(api.results[index].correct_answer)
        if(question !== this.state.question)
        {
            this.setState({
                question: question,
                answers: this.shuffle(answers)
            })
        }
    }
}
shuffle = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
    }
    return array;
}
next = () => {
    let {checked, api, score, index} = this.state
    let flag = 0
    if(checked)
    {
        api.results.map((value,i) => {
            if(checked === value.correct_answer)
            {
                score = score + 1
                flag = 1
            }
            else {
                flag = 1
            }
        })
    }
    if(flag)
    {
        this.setState({
            score: score,
            index: index + 1,
            checked: ''
        })
    }
}
ans = () => {
    let {answers} = this.state

    return(answers.map((value,i) => {
        const checkbox = () => {
            this.setState({
                checked: answers[i]
            })
        }
        return (<div className={this.state.checked === answers[i] ? 'answer selected' : 'answer'} onClick={checkbox.bind()}>
                    <span dangerouslySetInnerHTML={{__html: answers[i]}} />
                </div>)
        })
    )
}
reset = () => {
    this.setState(initialState)
    this.componentWillMount()
}
  render() {
    console.log(this.state)
    let {question, answers, api, index, score} = this.state
    if(api !== '') {
        this.next()
        this.answer_key()
        if(index !== api.results.length)
        {
            return (
                <div>
                    <div className="mqa">
                        <h2 dangerouslySetInnerHTML={{__html: question}} />
                        <div className="answers">{ answers !== '' ? this.ans() : null }</div>
                    </div>
                </div>
            )
        }
        else
        {
            return (
                <div className="result right">
                    <span>Congrats, you have completed the game. Your score is {score}</span> 
                    <div className="button_body">
                        <button onClick={this.reset.bind(this)}>Try again</button>
                    </div>
                </div>
            )
        }
    }
    else {
        return <div className="loading"><h1 className="title">trivia</h1></div>
    }
  }
}

export default MQA