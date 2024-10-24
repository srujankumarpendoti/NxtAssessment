/* eslint-disable react/prop-types */
import {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'

const Information = ({
  questions,
  questionNo,
  setQuestionNo,
  selectedOptions,
}) => {
  const history = useHistory()

  const answerCount = selectedOptions.length
  const unAnswerCount = questions.length - answerCount

  const [time, setTime] = useState(600)

  useEffect(() => {
    let intervalId
    if (time > 0) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime - 1)
      }, 1000)
    }
    if (time === 0) {
      clearInterval(intervalId)

      history.push('/results', {time: 0, selectedOptions})
    }
    return () => clearInterval(intervalId)
  }, [time])
  const formatTime = seconds => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor(seconds / 60)
    const secondsRemaining = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secondsRemaining.toString().padStart(2, '0')}`
  }

  const handleSubmit = () => {
    history.push('/results', {time, timeGiven: 600, selectedOptions})
  }

  return (
    <div className="flex flex-col w-2/5 h-full">
      <div className="flex justify-between w-full bg-[#475987] p-4 text-[#F8FAFC] mb-2 rounded">
        <p className=" text-lg font-normal">Time Left</p>
        <p className="text-2xl font-medium ">{formatTime(time)}</p>
      </div>

      <div className="flex flex-col justify-between items-start bg-white h-full  p-4">
        <div>
          <div className="flex justify-between items-center ">
            <div className="flex items-center">
              <p className="flex justify-center items-center bg-[#7C599F] w-8 h-8 p-4 rounded-full text-[#F8FAFC] mr-2">
                {answerCount}
              </p>
              <p className="text-[#496387] text-sm">Answered Questions</p>
            </div>
            <div className="flex items-center">
              <p className="flex justify-center items-center bg-transparent w-8 h-8 p-4 rounded-full text-[#64748B] border mr-2">
                {unAnswerCount}
              </p>
              <p className="text-[#496387] text-sm">Unanswered Questions</p>
            </div>
          </div>
          <hr className="my-4" />
          <div className="">
            <h1 className="text-[#164687] font-medium my-2">
              Questions ({questions.length})
            </h1>
            <ul className="flex flex-wrap gap-2">
              {questions.map((each, index) => (
                <li>
                  <button
                    type="button"
                    className={`flex  justify-center items-center bg-[#FAFBFE] w-8 h-8 border rounded text-[#64748B] cursor-pointer
                   ${
                     selectedOptions.find(
                       answer => answer.questionNo === index + 1,
                     ) && 'bg-[#7C599F26] border border-[#7C599F]'
                   } ${
                      questionNo === index + 1 &&
                      'border border-[#60A5FA] bg-[#EFF6FF]'
                    }`}
                    onClick={() => setQuestionNo(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* <Link to="/results" state={{time, timeGiven: 600}}> */}
        <button
          type="button"
          onClick={handleSubmit}
          //   onClick={() => navigate('/results', {state: {time, timeGiven: 600}})}
          className="self-center w-full m-4 py-2 text-[#164687] text-base border border-[#164687] rounded"
        >
          Submit Assessment
        </button>
        {/* </Link> */}
      </div>
    </div>
  )
}

export default Information
