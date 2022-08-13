import './css/contentwrapper.css'

const Contentwrapper = ({children}) => {
  return (
    <div className='content-wrapper'>
      {children}
    </div>
  )
}

export default Contentwrapper