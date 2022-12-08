import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // setup state
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [itemName, setItemName] = useState("");
  const [userEnter, setUserEnter] = useState("");
  const [quantity,setQuantity] = useState("");

  const fetchProducts = async() => {
    try {      
      const response = await axios.get("/api/products");
      setProducts(response.data);
    } catch(error) {
      setError("error retrieving products: " + error);
    }
  }
  
 
  
  const createProduct = async() => {
    try {
      await axios.post("/api/products", {itemName:itemName,userEnter:userEnter,quantity:quantity});
    } catch(error) {
      setError("error adding a product: " + error);
    }
  }

  const increaseQuantity = async(item)=> {
    try {
      const response = await axios.put("/api/cart/increase/"+item.itemName+"/"+item.quantity, {id:itemName, quantity:quantity});
      setProducts(response.data);
    } catch(error) {
      setError("error while increasing quantity"+error);
    }
  }
  
  const decreaseQuantity = async(item)=> {
    try {
      const response = await axios.put("/api/cart/decrease/"+item.itemName+"/"+item.quantity, {id:itemName, quantity:quantity});
      setProducts(response.data);
    } catch(error) {
      setError("error while decreasing quantity"+error);
    }
  }
  
  const removeFromProducts = async(item)=> {
    try {
      const response = await axios.delete("/api/products/"+item.itemName, {itemName:itemName});
      setProducts(response.data);
    } catch(error) {
      setError("error while deleting cart item"+ error);
    }
  }

  // fetch ticket data
  useEffect(() => {
    fetchProducts();
  },[]);

  const addProduct = async(e) => {
    e.preventDefault();
    await createProduct();
    fetchProducts();
    setItemName("");
    setUserEnter("");
    setQuantity("");
  }


  // render results
  return (
    <div className="App">
    
      {error}
      <form onSubmit={addProduct}>
        <div class="firstQ">
          <h2 class="firstQ">
            Who needs this?
            <input type="text" value={userEnter} onChange={e => setUserEnter(e.target.value)} />
          </h2>
        </div>
        <div class="secondQ">
          <h2 class="firstQ">
            What do you need?
            <textarea value={itemName} onChange={e=>setItemName(e.target.value)}></textarea>
          </h2>
        </div>
        <div class="thirdQ">
          <h2 class="secondLabel">
            How many do you need?
            <textarea value={quantity} onChange={e=>setQuantity(e.target.value)}></textarea>
          </h2>
        </div>
        <input type="submit" value="Submit" />
      </form>
      <h1>Products</h1>
      {products.map( item => (
        <div key={item.id}>
            <p>{item.itemName}, {item.quantity}</p>
            <button onClick={e=> increaseQuantity(item)}>+</button>
            <button onClick={e=> decreaseQuantity(item)}>-</button>
            <button onClick={e=> removeFromProducts(item)}>Remove From Cart</button>
        </div>
      ))}     
    </div>
  );
}

export default App;