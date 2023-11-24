// Write your code here
import {Component} from 'react'

import './index.css'

const initialState = {
  isTimerRunning: false,
  timerElapsedSecond: 0,
  timerLimitInMinutes: 25,
}
class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)

    onDecreaseTimerLimitInMinutes = () => {
      const {timerLimitInMinutes} = this.state

      if (timerLimitInMinutes > 1) {
        this.setState(prevState => ({
          timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
        }))
      }
    }
    onIncreaseTimerLimitInMinutes = () => {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
      }))

      renderTimerLimitController = () => {
        const {timerLimitInMinutes, timerElapsedSecond} = this.state
        const isButtonDisabled = timerElapsedSecond > 0

        return (
          <div className="timer-limit-controller-container">
            <p className="limit-label">Set Timer limit</p>
            <div className="timer-limit-controller">
              <button
                className="limit-controller-button"
                disabled={isButtonDisabled}
                onClick={this.onDecreaseTimerLimitMinutes}
                type="button"
              >
                -
              </button>
              <div className="limit-label-and-value-container">
                <p className="limit-value">{timerLimitInMinutes}</p>
              </div>
              <button
                className="limit-controller-button"
                disabled={isButtonDisabled}
                onClick={this.onIncreaseTimerLimitMinutes}
                type="button"
              >
                +
              </button>
            </div>
          </div>
        )
      
    }
    onResetTimer = () => {
      this.clearTimerInterval()
      this.setState(initialState)
    }
    incrementTimeElapsedSeconds = () => {
      const {timerLimitInMinutes, timerElapsedSecond} = this.state
      const isTimerCompleted = timerElapsedSecond === timerLimitInMinutes * 60

      if (isTimerCompleted) {
        this.clearInterval()
        this.setState({isTimerRunning: false})
      } else {
        this.setState(prevState => ({
          timerElapsedSecond: prevState.timerElapsedSecond + 1,
        }))
      }
    }
    onStartOrPauseTimer = () => {
      const {
        isTimerRunning,
        timerElapsedSecond,
        timerLimitInMinutes,
      } = this.state
      const isTimerCompleted=timerElapsedSecond===timerLimitInMinutes*60
      if (isTimerCompleted) {
        this.setState({timerElapsedSecond: 0})
      }
      if (isTimerRunning) {
        this.clearTimerInterval()
      } else {
        this.intervalId = setInterval(this.incrementTimeElapsedSeconds, 1000)
      }
      this.setState(prevState => ({isTimeRunning: !prevState.isTimeRunning}))
    }

    renderTimerController = () => {
      const {isTimeRunning} = this.state
      const startOrPauseImageUrl = isTimeRunning
        ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
      const startOrPauseAltText = isTimeRunning ? 'pause-icon' : 'play-icon'

      return (
        <div className="timer-controller-container">
          <button
            className="timer-controller-btn"
            onClick={this.onStartOrPauseTimer}
            type="button"
          >
            <img
              alt={startOrPauseAltText}
              className="timer-controller-icon"
              src={startOrPauseImageUrl}
            />
            <p className="timer-controller-label">
              {isTimeRunning ? 'Pause' : 'Start'}
            </p>
          </button>
          <button
            className="timer-controller-btn"
            onClick={this.onResetTimer}
            type="button"
          >
            <img
              alt="reset-icon"
              className="timer-controller-icon"
              src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            />
            <p className="timer-controller-label">Reset</p>
          </button>
        </div>
      )
    }
    getElapsedSecondsInTimeFormat = () => {
      const {timerLimitInMinutes, timerElapsedSecond} = this.state
      const totalRemainingSeconds =
        timerLimitInMinutes * 60 - timerElapsedSecond
      const minutes = Math.floor(totalRemainingSeconds / 60)
      const seconds = Math.floor(totalRemainingSeconds % 60)
      const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
      const stringifiedSeconds = seconds > 9 ? minutes : `0${seconds}`

      return `${stringifiedMinutes}:${stringifiedSeconds}`
    }
    render()
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-display-container">
            <div className="elapsed-time-container">
              <h1 className="elapsed-time">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="timer-state">{labelText}</p>
            </div>
          </div>
          <div className="controls-container">
            {this.renderTimerController()} {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
} 
 export default DigitalTimer
