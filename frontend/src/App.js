import './App.css';
import {useState} from 'react';
import axios from 'axios'


function App() {
  const [token, setToken] = useState('');
  const [owners, setOwners] = useState([]);

  function onChangeToken(val){
    setToken(val.target.value);
    setOwners([]);
  }

  


  // getUSD function that makes axios request to cloud function
  async function getOwners(){
    try {
      const response = await axios.get(`https://deep-index.moralis.io/api/v2/nft/${token}/owners`, {
        params: {
          chain: 'goerli',
          format: 'decimal',
          disable_total: true
        },
        headers: {
          'X-API-Key': 'Tz1737VrFic6WiwMRyfSGNqU08BU9uZCZZknmHfCGdG1hdb4sgfBD6X5t99yXnl5' // replace with your own API key
        }
      });
  
      console.log(response.data);
      setOwners(response.data.result.map((owner) => owner.owner_of));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Get all current NFT holders
        </p>

        {/* input field which changes token variable */}
        <input className="inputField" onChange={onChangeToken}></input>

        {/* search button that runs getUSD function */}
        <div className="searchButton" onClick={getOwners}>GET</div>

        {/* output */}
        {/* <div className="price">${Number(price).toFixed(2)}</div> */}
        
        {owners.length > 0 && (
          <div className="owners">
            {owners.map((owner, index) => (
              <div key={index}>{owner}</div>
            ))}
          </div>
      )}

    </header>
  </div>
  );
}

export default App;