import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [result,setResult]=useState('')
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPEN_AI_Key,
  });
  //console.log(import.meta.env.VITE_OPEN_AI_Key)
  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
    //console.log(response.data.data[0].url);
    setResult(response.data.data[0].url);
  };
  return (
    <div className="app-main">
      <h1>Generate an Image using Open AI Api</h1>
      <input
        type="text"
        className="app-input"
        placeholder="Type something to generate Image"
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={generateImage}>Generate An Image</button>

    {result.length >0 ?  <img className="result-image" src={result || ""} alt="" /> : <></>}
    </div>
  );
}

export default App;
