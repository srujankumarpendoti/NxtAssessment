import {useState, useEffect} from 'react'

/* eslint-disable react/prop-types */
const Questions = ({
  questions,
  question,
  questionNo,
  setQuestionNo,
  selectedOptions,
  setSelectedOptions,
}) => {
  const {options} = question
  const questionText = question.question_text
  const optionsType = question.options_type

  const [singleSelect, setSingleSelect] = useState('')

  const [selectedOptionId, setSelectionOptionId] = useState(null)

  const handleSelectedOption = (optionId, isCorrect) => {
    setSelectionOptionId(optionId)

    const existingAnswerIndex = selectedOptions.findIndex(
      answer => answer.questionNo === questionNo,
    )
    if (existingAnswerIndex !== -1) {
      const updatedAnswers = [...selectedOptions]
      updatedAnswers[existingAnswerIndex].optionId = optionId
      updatedAnswers[existingAnswerIndex].isCorrect = isCorrect
      setSelectedOptions(updatedAnswers)
    } else {
      setSelectedOptions([
        ...selectedOptions,
        {questionNo, optionId, isCorrect},
      ])
    }
  }

  useEffect(() => {
    const existingAnswer = selectedOptions.find(
      answer => answer.questionNo === questionNo,
    )
    if (existingAnswer) {
      setSelectionOptionId(existingAnswer.optionId)
      setSingleSelect(existingAnswer.optionId)
    } else if (optionsType === 'SINGLE_SELECT' && options.length > 0) {
      const firstOptionId = options[0].id
      setSingleSelect(firstOptionId)
      handleSelectedOption(firstOptionId, options[0].is_correct)
    } else {
      setSelectionOptionId(null)
      setSingleSelect('')
    }
  }, [questionNo, selectedOptions])

  const handleNextQuestion = () => {
    setQuestionNo(prevState => prevState + 1)
  }

  const handleSingleSelect = optionId => {
    const selectedOption = options.find(option => option.id === optionId)
    setSingleSelect(selectedOption.text)
    if (selectedOption) {
      const isCorrect = selectedOption.is_correct
      handleSelectedOption(optionId, isCorrect)
    }
  }

  const handleImageSelect = optionId => {
    const selectedOption = options.find(option => option.id === optionId)
    if (selectedOption) {
      const isCorrect = selectedOption.is_correct
      handleSelectedOption(optionId, isCorrect)
    }
  }

  const RenderOptions = () => {
    if (optionsType === 'DEFAULT') {
      return (
        <ul className="flex justify-between w-full flex-wrap gap-8">
          {options.map(option => (
            <li
              key={option.id}
              className={`flex-auto   text-xl rounded-md p-4 w-2/5 
              ${
                selectedOptionId === option.id
                  ? 'bg-[#5B6F94] text-[#F8FAFC]'
                  : 'bg-[#EBF3FF] text-[#334155]'
              } 
                `}
            >
              <button
                onClick={() =>
                  handleSelectedOption(option.id, option.is_correct)
                }
                type="button"
              >
                {option.text}
              </button>
            </li>
          ))}
        </ul>
      )
    }
    if (optionsType === 'IMAGE') {
      return (
        <ul className="flex justify-between w-full flex-wrap gap-8">
          {options.map(option => (
            <li
              key={option.id}
              onClick={() => handleImageSelect(option.id)}
              className={`flex-auto rounded-md w-2/5
                ${
                  selectedOptionId === option.id
                    ? 'border border-[#263868]'
                    : ''
                }
                `}
            >
              <img src={option.image_url} key={option.id} alt={option.text} />
            </li>
          ))}
        </ul>
      )
    }
    if (optionsType === 'SINGLE_SELECT') {
      return (
        <select
          onChange={event => handleSingleSelect(event.target.value)}
          value={singleSelect}
          className="border-3 rounded border-[#263868] p-2"
        >
          {options.map(option => (
            <option
              key={option.id}
              className={`flex-auto text-xl rounded-md p-4 w-2/5 
                ${
                  selectedOptionId === option.id
                    ? 'bg-[#ECF1FF] text-[#0967D2]'
                    : 'bg-white text-[#323F4B] '
                }
                `}
              value={option.id}
            >
              {option.text}
            </option>
          ))}
        </select>
      )
    }
    return null
  }

  return (
    <div
      data-testid="questionItem"
      className="flex flex-col justify-between w-3/5 p-8 bg-white"
    >
      <div>
        <p className=" text-[#164687] text-xl font-medium ">
          {questionNo}. {questionText}
        </p>
        <hr className="my-8" />
        <RenderOptions />
      </div>
      <div className="grid grid-cols-5 justify-items-end gap-2">
        {optionsType === 'SINGLE_SELECT' && (
          <p className="col-start-2 col-end-4 w-max flex justify-center items-center gap-1 bg-[#FEF3C7] px-4 py-0 rounded-xl text-center text-[#D97706] text-base font-medium">
            <img
              src="https://res.cloudinary.com/dr8jg61z3/image/upload/v1729772420/NXT%20Assess/Round_ezoyd5.png"
              alt="info"
            />
            First option is selected by default
          </p>
        )}
        {questionNo < questions.length && (
          <button
            type="button"
            onClick={handleNextQuestion}
            className="col-end-6 justify-items-end bg-[#164687] text-white rounded text-sm font-medium p-4 mt-4"
          >
            Next Question
          </button>
        )}
      </div>
    </div>
  )
}

export default Questions
