import {useEffect, useState} from 'react'
import Header from './Header'
import Questions from './Questions'
import Information from './Information'
import Failure from './Failure'
import LoaderSpinner from './LoaderSpinner'

const Assessment = () => {
  const [questionsData, setQuestionsData] = useState([])
  const [isFetched, setIsFetched] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [questionNo, setQuestionNo] = useState(1)
  const [selectedOptions, setSelectedOptions] = useState([])

  useEffect(() => {
    const url = 'https://apis.ccbp.in/assess/questions'
    const options = {
      method: 'GET',
    }
    const getData = async () => {
      try {
        const response = await fetch(url, options)
        const data = await response.json()

        if (response.ok) {
          setQuestionsData(data.questions)
          setIsFetched(true)
        } else {
          setIsFetched(false)
        }
      } catch (error) {
        setIsFetched(false)
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false) // Always set loading to false after fetching
      }
    }
    getData()
  }, [])

  if (isLoading) {
    return <LoaderSpinner />
  }

  if (!isFetched || questionsData.length === 0) {
    return <Failure />
  }

  return (
    <>
      <Header />
      <section className="flex w-full h-[90vh] p-4 bg-[#FAFBFE]">
        <Questions
          questions={questionsData}
          question={questionsData[questionNo - 1]}
          questionNo={questionNo}
          setQuestionNo={setQuestionNo}
          setSelectedOptions={setSelectedOptions}
          selectedOptions={selectedOptions}
        />
        <Information
          questions={questionsData}
          questionNo={questionNo}
          setQuestionNo={setQuestionNo}
          selectedOptions={selectedOptions}
        />
      </section>
    </>
  )
}

export default Assessment
