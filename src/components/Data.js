import ThermostatIcon from "@mui/icons-material/Thermostat";
import WindPowerIcon from "@mui/icons-material/WindPower";
import OpacityIcon from "@mui/icons-material/Opacity";
import SpeedIcon from "@mui/icons-material/Speed";
const data = [
  {
    icon: <OpacityIcon style={{fontSize:"30px"}}/>,
    title: "Humidity",
  },
  {
    icon: <ThermostatIcon style={{fontSize:"30px"}}/>,
    title: "Temperature Felt",
  },
  {
    icon: <SpeedIcon style={{fontSize:"30px"}}/>,
    title: "Pressure",
  },
  {
    icon: <WindPowerIcon style={{fontSize:"30px"}}/>,
    title: "Wind",
  },
];

export default data;
