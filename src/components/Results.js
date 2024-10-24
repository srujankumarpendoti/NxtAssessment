import {Link, useLocation} from 'react-router-dom'
import {useEffect, useState} from 'react'

import Header from './Header'

const Results = () => {
  const [score, setScore] = useState(0)
  const {state} = useLocation()
  const {time, timeGiven, selectedOptions} = state

  useEffect(() => {
    console.log(selectedOptions)
    const count = selectedOptions.filter(each => each.isCorrect === 'true')
    setScore(count.length)
  }, [])

  const timeTaken = timeGiven - time

  const formatTime = seconds => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor(seconds / 60)
    const secondsRemaining = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secondsRemaining.toString().padStart(2, '0')}`
  }

  return (
    <>
      <Header />
      <section className="w-full flex justify-center items-center bg-[#FAFBFE] p-20">
        <div className="flex flex-col justify-center items-center bg-white w-full p-8">
          {time > 0 && (
            <>
              <img
                src="https://res.cloudinary.com/dr8jg61z3/image/upload/v1728741449/NXT%20Assess/Asset_2_1_lsln7l.png"
                alt="submit"
                className="w-80 mb-4"
              />
              <h1 className="text-[#334155] text-2xl font-medium my-4 text-center">
                Congrats! You completed the assessment
              </h1>
              <div className="flex items-center my-4">
                <p className="text-[#334155] text-lg font-medium mr-2 ">
                  Time Taken:
                </p>
                <p className="text-[#164687] text-2xl font-medium">
                  {formatTime(timeTaken)}
                </p>
              </div>
            </>
          )}
          {time === 0 && (
            <>
              <img
                src="https://res.cloudinary.com/dr8jg61z3/image/upload/v1728753743/NXT%20Assess/calender_1_1_fgdow1.png"
                alt="time up"
                className="w-80 mb-4"
              />
              <h1 className="text-[#334155] text-4xl font-medium my-4 text-center">
                Time is up!
              </h1>
              <p className="text-[#64748B] text-base mr-2 text-center">
                You did not complete the assessment within the time.
              </p>
            </>
          )}

          <div className="flex items-center">
            <p className="text-[#164687] text-2xl font-medium mr-2">
              Your Score:
            </p>
            <p className="text-[#164687] text-5xl font-bold">{score}</p>
          </div>
          <Link to="/assessment">
            <button
              type="button"
              className="bg-[#164687] text-white rounded text-sm font-medium py-2 px-4 my-8"
            >
              Reattempt
            </button>
          </Link>
        </div>
      </section>
    </>
  )
}

export default Results
