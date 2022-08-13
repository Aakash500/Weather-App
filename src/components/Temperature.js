import './css/temperature.css'

const Temperature = ({desc, temp}) => {
  return (
    <div className='temperature'>
        <p className='desc'>{desc}</p>
        <p className='temp'>
        <span>{temp}</span>
        <div className='unit'>
            <span className='o'>o</span>
            <span className='c'>c</span>
        </div>
        </p>
    </div>
  )
}

export default Temperature