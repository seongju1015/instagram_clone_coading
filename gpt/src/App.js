import './App.css';
import {useState} from "react";
import {CallGPT} from "./api/gpt";

function App() {
  const [data,setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClickAPICall = async () =>{
    try{
      setIsLoading(true);
      const message = await CallGPT();
      setData(message);
    }catch (error){
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleClickAPICall}>GPT API CALL</button>
      <div>data: {data}</div>
      <div>isLoading : {isLoading? "Loading.." : "fin"} </div>
    </div>
  );
}

export default App;
