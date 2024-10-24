import Loader from 'react-loader-spinner'

const LoaderSpinner = () => (
  <div
    className="loader-container h-screen flex justify-center items-center"
    data-testid="loader"
  >
    <Loader type="ThreeDots" color="#263868" height={50} width={50} />
  </div>
)

export default LoaderSpinner
