import {Link} from 'react-router-dom'
import Header from './Header'

const Failure = () => (
  <>
    <Header />
    <section className="flex flex-col justify-center items-center w-full h-screen">
      <img
        src="https://res.cloudinary.com/dr8jg61z3/image/upload/v1728742972/NXT%20Assess/Group_7519_yfddlq.png"
        alt="failure view"
        className="w-2/5"
      />
      <h1 className="text-[#334155] text-4xl font-medium my-4">
        Oops! Something went wrong
      </h1>
      <p className="text-[#64748B] text-base">We are having some trouble</p>
      <Link to="/assessment">
        <button
          type="button"
          className="bg-[#164687] text-white rounded text-sm font-medium py-2 px-8 my-8"
        >
          Retry
        </button>
      </Link>
    </section>
  </>
)

export default Failure
