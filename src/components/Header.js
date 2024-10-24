import {Link, useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = () => {
  // const navigate = useNavigate()
  const history = useHistory()
  const handleLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
    // navigate('/login')
  }
  return (
    <div className="bg-[#263868] flex justify-between items-center px-12 py-4">
      <Link to="/" className="flex flex-col items-center justify-center">
        <img
          src="https://res.cloudinary.com/dr8jg61z3/image/upload/v1728722858/NXT%20Assess/NXT_Assess_logo_h4fcok.png"
          alt="website logo"
          className="h-9 m-0"
        />
        <p className="text-white font-bold italic m-0 text-base">
          NXT <span className="font-normal">Assess</span>
        </p>
      </Link>

      <button
        type="button"
        onClick={handleLogout}
        className="bg-transparent text-white text-xs border py-2 px-4 rounded-md"
      >
        Logout
      </button>
    </div>
  )
}

export default Header
