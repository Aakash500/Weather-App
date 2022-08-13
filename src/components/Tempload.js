import CircularProgress from '@mui/material/CircularProgress'
const styleObj = {
    height: "calc(100% - 50px)",
    display: "flex",
    alignItems: "center",
    justifyContent : "center",
}
const Tempload = () => {
  return (
    <div style={styleObj}>
        <CircularProgress/>
    </div>
  )
}

export default Tempload