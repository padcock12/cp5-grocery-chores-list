import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // setup state
  const [choresParker, setChoresParker] = useState([]);
  const [error, setError] = useState("");
  const [choreName, setChoreName] = useState("");
  const [howLong,setHowLong] = useState("");
  const [personName, setPersonName] = useState("");


  const fetchChores = async() => {
    try {      
      const response = await axios.get("/api/choresParker");
      setChoresParker(response.data);
    } catch(error) {
      setError("error retrieving products: " + error);
    }
  }
  

 
  
  const createChore = async() => {
    try {
      await axios.post("/api/chores", {choreName:choreName,howLong:howLong,personName:personName});
    } catch(error) {
      setError("error adding a product: " + error);
    }
  }
  
  
  const removeFromChores = async(item)=> {
    try {
      const response = await axios.delete("/api/chores/"+item.choreName, {choreName:choreName});
      setChoresParker(response.data);
    } catch(error) {
      setError("error while deleting cart item"+ error);
    }
  }
  

  // fetch ticket data
  useEffect(() => {
    //fetchChoresParker();
    fetchChores();
  },[]);

  const addChore = async(e) => {
    e.preventDefault();
    await createChore();
    fetchChores();
    setChoreName("");
    setHowLong("");
    setPersonName("");
  }

  // render results
  return (
    <div className="App">
    
      {error}
      <form onSubmit={addChore}>
        <div class="firstQ">
          <h2>
            What is the Chore?
            <input type="text" value={choreName} onChange={e => setChoreName(e.target.value)} />
          </h2>
        </div>
        <div class="secondQ">
          <h2>
            How Frequently Does it Need to be Done?
            <textarea value={howLong} onChange={e=>setHowLong(e.target.value)}></textarea>
          </h2>
        </div>
        <div class="thirdQ">
          <h2>
            Who's Job is it?
            <textarea value={personName} onChange={e=>setPersonName(e.target.value)}></textarea>
          </h2>
        </div>
        <input type="submit" value="Submit" />
      </form>
      <h1>Chore List</h1>
      {choresParker.map( choreParker => (
        <div key={choreParker.id} className="choreParker">
            <p>{choreParker.personName} needs to do {choreParker.choreName} {choreParker.howLong}</p>
            <button onClick={e => removeFromChores(choreParker)}>Remove Chore</button>
        </div>
      ))}
    </div>
  );
}

export default App;