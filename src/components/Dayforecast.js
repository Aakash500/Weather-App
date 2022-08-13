import './css/dayforecast.css'

const Dayforecast = ({title, icon, data}) => {
  return (
    <div className='dayforecast'>
       {icon}
       <p className='dayforecast-title'>{title}</p>
       <p className='dayforecast-data'>{data}</p>
    </div>
  )
}

export default Dayforecast