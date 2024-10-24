import {useRef, useState} from 'react'
import {Redirect, useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const username = useRef('')
  const password = useRef('')
  const jwtToken = Cookies.get('jwt_token')
  const [errMessage, setErrMessage] = useState('')
  const history = useHistory()
  const handleOnSubmit = async event => {
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {
      username: username.current.value,
      password: password.current.value,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.status === 200) {
      const jwtToken1 = data.jwt_token
      Cookies.set('jwt_token', jwtToken1, {expires: 30})
      history.replace('/')
      // navigate('/')
    } else {
      setErrMessage(data.error_msg)
    }
  }

  const handleChange = event => {
    setShowPassword(event.target.checked)
  }

  const passVisible = showPassword ? 'text' : 'password'

  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }
  return (
    <section className=" max-md:flex-none md:flex justify-center items-center min-h-screen bg-[#FAFBFE]">
      <div className="w-full h-screen bg-white md:h-2/5 md:w-2/5 p-8 flex flex-col justify-center items-center">
        <div className="w-full flex flex-col justify-center items-center  leading-none mb-5">
          <img
            src="https://res.cloudinary.com/dr8jg61z3/image/upload/v1728675202/NXT%20Assess/NXT_Assess_mzatrp.png"
            className="w-16"
            alt="login website logo"
          />

          <h1 className="font-bold italic text-[#263868]">
            NXT <span className="font-semibold">Assess</span>
          </h1>
        </div>
        <form onSubmit={handleOnSubmit} className="w-full ">
          <label className=" text-[#7E858E] text-xs w-full">
            USERNAME
            <br />
            <input
              ref={username}
              type="text"
              className="border w-full h-6 px-2 py-1 text-[#263868] text-base"
            />
          </label>
          <br />
          <label className="text-[#7E858E] text-xs">
            PASSWORD
            <br />
            <input
              ref={password}
              type={passVisible}
              className="border w-full h-6 px-2 py-1 text-[#263868] text-base"
            />
          </label>
          <br />
          <label className="flex items-center pt-1">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={handleChange}
            />
            <span className="ml-2 text-xs">Show Password</span>
          </label>
          <button
            type="submit"
            className="w-full bg-[#263868] py-1 rounded-lg mt-8 text-white text-sm"
          >
            Login
          </button>
          <p className="text-red-500 text-xs mt-1">{errMessage}</p>
        </form>
      </div>
    </section>
  )
}

export default Login
