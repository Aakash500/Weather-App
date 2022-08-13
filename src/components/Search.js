import "./css/search.css";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import SearchIcon from "@mui/icons-material/Search";
import PlaceIcon from "@mui/icons-material/Place";
import { Cityname } from "./Main";
import { useRef, useState, useContext } from "react";

const Search = () => {
  const referenceTo = useRef();
  const [city, setCity] = useState("");
  const autoFocus = () => {
    referenceTo.current.focus();
  };

  const { handleCityChange } = useContext(Cityname);
 
  return (
    <div className="search">
      <div>
        <MyLocationIcon style={{ fontSize: "30px", cursor: "pointer" }} />
      </div>
      <div className="search-bar">
        <PlaceIcon className="location-icon" onClick={autoFocus} />
        <input
          size="20"
          ref={referenceTo}
          type="text"
          placeholder="Type city name"
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleCityChange(city) }
        />
        <SearchIcon
          value={city}
          onClick={() => {
            handleCityChange(city);
          }}
          className="search-icon"
        />
      </div>
    </div>
  );
};

export default Search;
