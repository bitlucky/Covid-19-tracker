import React, {useState} from "react";
import { MenuItem, FormControl, Select } from "@material-ui/core";

import "./App.css";

function App() {
const [countries , setCountries] = useState(["USA" , "UK" , "India"]);


  //Use effect = runs a piece of code
  // based on a given condition

  useEffect(() =>{
    //the code inside here will run once
    //when the component loads and not again 


  }, [countries]); 

  return (
    <div className="App">
      <div className="app_header">
        <h1> Lets build a covid 19 tracker </h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined" value="abc">
            {/* loop through all the countries and show a drop down list of the countries  */}
            {countries.map((country ) => (
               <MenuItem value={country }> {country} </MenuItem>
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
