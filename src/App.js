import React, {useState, useEffect, useRef} from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState("");
  const [data, setData] = useState(null);
  const [count, setCount] = useState(null);
  const [count2, setCount2] = useState(10);
  const [pointsCounter, setPoints] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState([]);

  const options = {
    method: 'GET',
	  headers: {
      'X-RapidAPI-Host': 'nba-player-individual-stats.p.rapidapi.com',
      'X-RapidAPI-Key': 'c4adc611f4mshc06c0301b29d24dp14ba88jsn84008b554399'
    }
  };

  useEffect(() => {
    const dataFetch = async() => {
      const data = await fetch('https://nba-player-individual-stats.p.rapidapi.com/players', options);
      const json = await data.json();
      setData(json);
    }
    dataFetch()
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      })
  },[]);


  //const add = () => {
       
    //       count < count2? setCount(count => count + 1): setCount(11);  };
  const testo = 5;  
  const poop = 15;
  

 const clear = () => setPoints(100);

  const lowercase = inputValue.toLowerCase().split(" ");
  //const searchFilter = value !== "error"? data.filter(item => String(item.firstName).toLowerCase() === value[0] && String(item.lastName).toLowerCase() === value[1]): ""; 
  const stats = (param) => value === "" || value === "Not Found"? "": value.map(item => item[param]);
  const testpoints = () => {
    setCount(() => stats("careerPoints"))
  };

  const searchTest = data
  const settingInputValue = (e) => {
    setInputValue(e.target.value)
  }
  const searching = () => {
    if (inputValue.length > 0) {
    setSearch(data.filter(item => String(item.firstName).toLowerCase().includes(String(inputValue).toLowerCase())));
    } else {
      setSearch([]);
    }
  }
      
console.log(inputValue)
  useEffect(() => {
    const searchBar = document.getElementById("searchbar");
    if (searchBar) {
    searchBar.addEventListener("input", settingInputValue);
    searchBar.addEventListener("keyup", searching);
    return () => {
      searchBar.removeEventListener("input", settingInputValue);
      searchBar.removeEventListener("keyup", searching);
      } 
    }
},);
 if (loading) return <p>Loading</p>;
console.log(search);

  return (
  <div>
    <div className="Main-div">
    <h1>Active NBA Players</h1>
   <form>
    <label htmlFor="searchbar"></label>
    <input id="searchbar" type="text" name="fullname" placeholder="Enter a player's first and last name i.e 'Scottie Barnes' "></input>
    <button id="button" onClick={() => {
      data.filter(item => String(item.firstName).toLowerCase() === lowercase[0] && String(item.lastName).toLowerCase() === lowercase[1]).length === 0? setValue("Not Found"): setValue(data.filter(item => String(item.firstName).toLowerCase() === lowercase[0] && String(item.lastName).toLowerCase() === lowercase[1]));
      setCount(data.filter(item => String(item.firstName).toLowerCase() === lowercase[0] && String(item.lastName).toLowerCase() === lowercase[1]).map(item => item.careerPoints));
      
      }}  type="button" >FIND</button>
    <button  type="button"></button>
   </form>
  <p>{value === "Not Found"? "Oops": "" }</p>
  <div>
   {value === "" || value === "Not Found"? "":<img id="headshot" src={stats("headShotUrl")} ></img>}
  </div>
   <p>{stats("firstName")} {stats("lastName")}</p>
   <p>{value === "" || value === "Not Found"? "": "Career PPG: " + stats("careerPoints")}</p>
   <p>{value === "" || value === "Not Found"? "": "Career RPG: " + stats("careerRebounds")}</p>
   <p>{value === "" || value === "Not Found"? "": "Career APG: " + stats("carrerAssists")}</p>
  {search.map((item) => (
      <div>
        <p className='Search-item'>{item.firstName + " " + item.lastName}</p>
        
      </div>
    ))}
 
   </div>
   </div>
  );
}

export default App;
