import React, {useState, useEffect} from "react";
import { MenuItem, FormControl, Select } from "@material-ui/core";

import "./App.css";

function App() {
const [countries , setCountries] = useState([]);


  //Use effect = runs a piece of code
  // based on a given condition

  useEffect(() =>{
    //the code inside here will run once
    //when the component loads and not again 

    //async -> send a rqst ,wait for it , do something with response
    const getCountriesData = async() =>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response)=> response.json())
      .then((data) => {
          const countries = data.map((country)=>(
            {
              name : country.country ,
              value : country.countryInfo.iso2
            }));

            setCountries(countries);

      })
    }
    getCountriesData();

  }, [countries]); 

  return (
    <div className="App">
      <div className="app_header">
        <h1> Lets build a covid 19 tracker </h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined" value="abc">
            {/* loop through all the countries and show a drop down list of the countries  */}
            <MenuItem value="worldwide"> WorldWide </MenuItem>
            {countries.map((country ) => (
               <MenuItem value={country.value}> {country.name} </MenuItem>
            ))}
            {/* <MenuItem value="worldwide"> Option 1 </MenuItem>
            <MenuItem value="worldwide"> Option 2 </MenuItem>
            <MenuItem value="worldwide"> Option 3 </MenuItem>
            <MenuItem value="worldwide"> Option 4 </MenuItem> */}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;
