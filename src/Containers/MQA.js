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
}
componentDidMount() {
    fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
    .then(res => res.json())
    .then(response => {
        let {index} = this.state
        this.setState({
            api: response
        })
        this.answer_key()
    })
}
answer_key = () => {
    let {question, answers, api, index} = this.state
    if(index !== api.results.length)
        {
            question = 'Q' + index + '. ' + api.results[index].question
            this.setState({
                question: question
            })
            answers = api.results[index].incorrect_answers + ',' + api.results[index].correct_answer
            answers = answers.split(',')
            this.setState({
                answers: this.shuffle(answers)
            })
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
    let {checked, api, score} = this.state
    if(checked)
    {
        api.results.map((value,i) => {
            if(checked === value.correct_answer && checked !== '')
            {
                this.setState({
                    score: score + 1
                })
            }
        })
        this.setState({
            index: this.state.index + 1,
            checked: ''
        })
        this.answer_key()
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
    this.componentDidMount()
}
  render() {
    console.log(this.state)
    let {question, answers, api, index, score} = this.state
    if(api !== '') {
        if(index !== api.results.length)
        {
            return (
                <div>
                    <div className="mqa">
                        <h2 dangerouslySetInnerHTML={{__html: question}} />
                        <div className="answers">{ answers !== '' ? this.ans() : null }</div>
                        <button onClick={this.next.bind(this)}>Next</button>
                    </div>
                </div>
            )
        }
        else
        {
            return (
                <div className="result right">
                    <span>Congrats, you have completed the game. Your score is {score}</span> 
                    <button onClick={this.reset.bind(this)}>Try again</button>
                </div>
            )
        }
    }
    else {
        return 'Loading...'
    }
  }
}

export default MQA