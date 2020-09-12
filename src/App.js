import React, { useState, useEffect } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from './Table'
import {sortData} from './util';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";

import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(["worldwide"]);
  const [countryInfo , setCountryInfo] = useState({});
  const [tableData , setTableData] = useState([]);
  //Use effect = runs a piece of code
  // based on a given condition

  useEffect(() => {
      fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      })
  })

  useEffect(() => {
    //the code inside here will run once
    //when the component loads and not again

    //async -> send a rqst ,wait for it , do something with response
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, [countries]);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    // setCountry(countryCode);

    const url = countryCode === "worldwide"? 'https://disease.sh/v3/covid-19/all' :
     `https://disease.sh/v3/covid-19/countries/${countryCode}`

     await fetch(url)
     .then((response) => response.json())
     .then((data) => {
        setCountry(countryCode);
        
        //all of the data from the country response
        setCountryInfo(data);
     },[])  

  // https://disease.sh/v3/covid-19/all
// "https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]"
  };

  console.log('Country Info ' ,countryInfo )
  return (
    <div className="App">
      <div className="app_left">
        <div className="app_header">
          <h1> Lets build a covid 19 tracker </h1>
          <FormControl className="app_dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              {/* loop through all the countries and show a drop down list of the countries  */}
              <MenuItem value="worldwide"> WorldWide </MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}> {country.name} </MenuItem>
              ))}
              {/* <MenuItem value="worldwide"> Option 1 </MenuItem>
            <MenuItem value="worldwide"> Option 2 </MenuItem>
            <MenuItem value="worldwide"> Option 3 </MenuItem>
            <MenuItem value="worldwide"> Option 4 </MenuItem> */}
            </Select>
          </FormControl>
        </div>

        {/*InfoBox   */}
        <div className="app_stats">
          <InfoBox 
          title="CoronaVirus Cases" 
          cases={countryInfo.todayCases} 
          total={countryInfo.cases} />
          
          <InfoBox 
          title="Recovered" 
          cases={countryInfo.todayRecovered} 
          total={countryInfo.recovered} />
          
          <InfoBox 
          title="Deaths" 
          cases={countryInfo.todayDeaths} 
          total={countryInfo.deaths} />
        </div>
        <Map />
      </div>

      <Card className="app_right">
        <CardContent>
          <h4> Live cases by country </h4>
          <Table countries = {tableData}/>
          <h4>WorldWide New Cases</h4>
          <LineGraph/>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
