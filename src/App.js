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
    setSearch(data.filter(item => 
      String(item.firstName + " " + item.lastName + "      ").toLowerCase().includes(String(inputValue).toLowerCase()) && String(item.firstName) !== "null" ));
    
    } else {
      setSearch([]);
    }
  }

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
const visibility = () => {
  const searchContainer = document.getElementById("Search-container")
  if (inputValue != "") {
   searchContainer.style.display = "block"
 } else {
   searchContainer.style.display = "none"
 };
 }

 /*
    <button id="button" onClick={() => {
      data.filter(item => String(item.firstName).toLowerCase() === lowercase[0] && String(item.lastName).toLowerCase() === lowercase[1]).length === 0? setValue("Not Found"): setValue(data.filter(item => String(item.firstName).toLowerCase() === lowercase[0] && String(item.lastName).toLowerCase() === lowercase[1]));
      setCount(data.filter(item => String(item.firstName).toLowerCase() === lowercase[0] && String(item.lastName).toLowerCase() === lowercase[1]).map(item => item.careerPoints));
      
      }}  type="button" >FIND</button>
*/
useEffect(() => {
  const searchBar = document.getElementById("searchbar");
  if (searchBar) {
    searchBar.addEventListener("keyup", visibility)
  }
 },)
 
useEffect(() => {
  const searchItem = document.getElementById("Search-item");
  if (searchItem) {
    searchItem.addEventListener("mouseover", consolee)
  }
 },)
 if (loading) return <p>Loading</p>;
const consolee = (event) => {
  event.target.style.color = "orange";
}


  return (
  <div>
    <div className="Main-div">
    <h1>Active NBA Players</h1>
   <form>
    <label htmlFor="searchbar"></label>
    <input id="searchbar" type="text" name="fullname" placeholder="Enter a player's first and last name i.e 'Scottie Barnes' "></input>
  
   </form>
 
  
   <div id="Search-container"  className="borderbottom">
  {search.map((item) => (
      <div key={item.id}className="Search-item-container" >
        <p  id="Search-item" className='Search-item'>{item.firstName + " " + item.lastName}</p>
        <img className="headshot" src={item.headShotUrl != null? item.headShotUrl: "http://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png&scale=crop&transparent=true&w=300&h=218"}></img>
      </div>  
    
    ))}
  </div>
   </div>
   </div>
  );
}

export default App;
