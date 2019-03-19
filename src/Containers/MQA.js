import React from 'react'

const initialState = {
    api: '',
    question: '',
    answers: '',
    checked: '',
    result: ''
}
class MQA extends React.Component {
constructor() {
    super()
    this.state = initialState
}
componentDidMount() {
    let {question, answers, api} = this.state
    fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
    .then(res => res.json())
    .then(response => {
        api = response
        this.setState({
            api: response
        })
        api.results.map((value,i)=> {
            question = value.question
            this.setState({
                question: question
            })
            if(question = value.question)
            {
                answers = value.incorrect_answers + ',' + value.correct_answer
                answers = answers.split(',')
                this.setState({
                    answers: this.shuffle(answers)
                })
            }
        })
    })
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
checkAnswer = () => {
    let {checked, api} = this.state
    api.results.map((value,i) => {
        if(checked === value.correct_answer && checked !== '')
        {
            this.setState({
                result: 'right'
            })
        }
        else if(this.state.result !== 'wrong' && checked !== '')
        {
            this.setState({
                result: 'wrong'
            })
        }
    })
}
reset = () => {
    this.setState(initialState)
    this.componentDidMount()
}
checkbox = (e) => {
    this.setState({
        checked: e.currentTarget.value
    })
}
ans = () => {
    let {answers, checked} = this.state
    return(answers.map((value,i) => {
        return (<div className="answer">
                    <input
                    onChange={this.checkbox}
                    type="radio"
                    name={answers[i]}
                    value={answers[i]}
                    checked={checked === answers[i]}
                    />
                    <span dangerouslySetInnerHTML={{__html: answers[i]}} />
                </div>)
        })
    )
}
  render() {
    console.log(this.state)
    let {question, answers, api, result} = this.state
    if(api !== '' && !result) {
        return (
            <div>
                <div className="mqa">
                    <h2 dangerouslySetInnerHTML={{__html: question}} />
                    <div className="answers">{ answers !== '' ? this.ans() : null }</div>
                    <button onClick={this.checkAnswer.bind()}>Submit</button>
                    <button onClick={this.reset.bind()}>Reset</button>
                </div>
            </div>
        )
    }
    else if(result === 'right')
    {
        return (
            <div className="result correct">
                <span>Congrats, the answer is correct!</span> 
                <button onClick={this.reset.bind()}>Try again</button>
            </div>
        )
    }
    else if(result === 'wrong')
    {
        return (
            <div className="result wrong">
                <span>Sorry, the answer is incorrect</span> 
                <button onClick={this.reset.bind()}>Try again</button>
            </div>
        )

    }
    else {
        return 'Loading...'
    }
  }
}

export default MQA