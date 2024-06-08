import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import ResultPage from "./resultpage";
//import PromptResult from "@/components/PromptResult";
import axios from "axios";


export default function Home() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [resultImageUrl, setResultImageUrl] = useState(undefined);
  const [showNewContent, setShowNewContent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const defaultResult = "......";
  const [result, setResult] = useState(defaultResult);

  const handleButtonClick = (buttonText: string) => {
    setPrompt(buttonText);
    //setShowNewContent(true);
  };
  // This function is called when the user clicks the "Create" button
  //sends request to EdenAI API to generate an image based on the user's input
const handleSubmit = async () => {

    if (prompt) {
      setIsLoading(true);
      try {
        setShowNewContent(true);
        const res = await axios.post("/api/llm", { prompt });
        const { message } = res.data;
        setResult(message);
      } catch (error) {
        console.error('Failed to interact with Eden character:', error);
      } finally {
        setIsLoading(false);
      }
    }
};

const handleGoBack = () => {
  setShowNewContent(false); // Show page-container and hide resultpage-parent
  setPrompt(""); // Clear the prompt
  setResult(defaultResult) // Clear the result
};

  return (
    
    <main className="p-4 page-parent" style={{ position: 'relative', overflow: 'hidden' }}>
    {/* <video autoPlay muted loop style={{
      position: 'absolute',
      width: '100%',
      left: '50%',
      top: '50%',
      height: '100%',
      objectFit: 'cover',
      transform: 'translate(-50%, -50%)',
      zIndex: '-1',
    }}>
      <source src="vids/bg.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video> */}

      {!showNewContent && (
      <div className="page-container h-[60vh]">
        <div className="page-item">
          <h1 className="mb-12 text-5xl font-bold text-center">Daily Dose of Zen</h1>
        </div>
        <div className="page-item">
          <h3 className="text-2xl text-center">I&apos;m feeling...</h3>
        </div>
        <div className="page-item">
          <button className="page-button standard-button" onClick={() => handleButtonClick("I'm excited!")}>
            Excited <span role="img" aria-label="Search">🥳</span>
          </button>
          <button className="page-button standard-button" onClick={() => handleButtonClick("I feel confused...")}>
            Confused <span role="img" aria-label="Search">🥹</span>
          </button>
          <button className="page-button standard-button" onClick={() => handleButtonClick("I'm feeling lazy and sluggish~")}>
            Sluggish <span role="img" aria-label="Search">🪱</span>
          </button>
          <button className="page-button standard-button" onClick={() => handleButtonClick("I'm depressed ToT, help!")}>
            Depressed <span role="img" aria-label="Search">😭</span>
          </button>
          <button className="page-button standard-button" onClick={() => handleButtonClick("I'm wondering about some things...")}>
            Inquisitive <span role="img" aria-label="Search">🤔</span>
          </button>
          <button className="page-button standard-button" onClick={() => handleButtonClick("I feel very funky~ Woo woo")}>
            Funky <span role="img" aria-label="Search">💃</span>
          </button>
        </div>
        <div className="mt-4 page-item">
          <input
            type="text"
            placeholder="Type here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-[90%] m-auto p-[10px] text-[16px] border-[1.5px] border-[solid] border-[#000000] rounded-none text-[black]"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={isCreating}
          className={`create-button page-item standard-button`}
        >
          INSPIRE ME
        </button>
      </div>
      )}

    {showNewContent && (
    // <div className="page-parent">
      <div className="page-container h-50vh">
      <div className={`page-item prompt-display ${result !== defaultResult ? 'fade-in' : ''}`}>
          <h1 className="mb-12 text-3xl text-center">&quot;{prompt}&quot;</h1>
          
      </div>
      <div className={`page-item prompt-display ${result !== defaultResult ? 'fade-in' : ''}`}>
          <h1 className="mb-12 text-3xl text-center">{result}</h1>
      </div>
      {result !== defaultResult && (
        <button
          className="standard-button"
          onClick={handleGoBack}>
            RETURN
        </button>
      )}
      </div>
    // </div>
    )}

    </main>
  );
}
