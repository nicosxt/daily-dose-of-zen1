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
    <div style={{
      position: 'absolute',
      width: '100%',
      left: '50%',
      top: '50%',
      height: '100%',
      background: `url('imgs/bg.jpg') no-repeat center center`,
      backgroundSize: 'cover',
      transform: 'translate(-50%, -50%)',
      zIndex: '-1',
    }} />

      {!showNewContent && (
      <div className="page-container h-[80vh]">
        <div className="page-item">
        <h1 className="mb-12 text-5xl font-bold text-center text-title" style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)' }}>DailyZen.Club</h1>
        </div>
        <div className="mt-4 page-item">
          <textarea
            placeholder="I&apos;m feeling..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="inputfield"
          />
        </div>
        <div className="page-item">
          <button className="page-button" onClick={() => handleButtonClick("I'm excited!")}>
            <span role="img" aria-label="Search">🥳</span>
          </button>
          <button className="page-button" onClick={() => handleButtonClick("I feel confused...")}>
            <span role="img" aria-label="Search">🥹</span>
          </button>
          <button className="page-button" onClick={() => handleButtonClick("I'm feeling lazy and sluggish~")}>
            <span role="img" aria-label="Search">🪱</span>
          </button>
          <button className="page-button" onClick={() => handleButtonClick("I'm depressed ToT, help!")}>
            <span role="img" aria-label="Search">😭</span>
          </button>
          <button className="page-button" onClick={() => handleButtonClick("I'm wondering about some things...")}>
            <span role="img" aria-label="Search">🤔</span>
          </button>
          <button className="page-button" onClick={() => handleButtonClick("I feel very funky~ Woo woo")}>
            <span role="img" aria-label="Search">💃</span>
          </button>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isCreating}
          className={`create-button page-item standard-button`}
        >
          Inspire Me
        </button>
      </div>
      )}

    {showNewContent && (
    // <div className="page-parent">
      <div className="page-container h-50vh prompt-container">
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
