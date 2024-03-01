import Image from "next/image";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [resultImageUrl, setResultImageUrl] = useState(undefined);

  const handleButtonClick = (buttonText: string) => {
    setPrompt(buttonText);
  };

  // This function is called when the user clicks the "Create" button
  //sends request to EdenAI API to generate an image based on the user's input
  const handleSubmit = async () => {
    try {
      setIsCreating(true);
      const res = await axios.post("/api/create", { text_input: prompt });
      setIsCreating(false);
      setResultImageUrl(res.data.uri);
    } catch (e) {
      console.error(e);
      setIsCreating(false);
    }
  };

  return (
    <main className="p-4 inputpage-parent">
      <div className="inputpage-container">
        <div className="inputpage-item">
          <h1 className="mb-12 text-5xl font-bold text-center">Daily Dose of Zen</h1>
        </div>
        <div className="inputpage-item">
          <h3 className="text-2xl font-bold text-center">I'm feeling...</h3>
        </div>
        <div className="inputpage-item">
          <button className="inputpage-button standard-button" onClick={() => handleButtonClick("I'm excited!")}>
            Excited <span role="img" aria-label="Search">🥳</span>
          </button>
          <button className="inputpage-button standard-button" onClick={() => handleButtonClick("I feel confused...")}>
            Confused <span role="img" aria-label="Search">🥹</span>
          </button>
          <button className="inputpage-button standard-button" onClick={() => handleButtonClick("I'm feeling lazy and sluggish~")}>
            Sluggish <span role="img" aria-label="Search">🪱</span>
          </button>
          <button className="inputpage-button standard-button" onClick={() => handleButtonClick("I'm depressed ToT, help!")}>
            Depressed <span role="img" aria-label="Search">😭</span>
          </button>
          <button className="inputpage-button standard-button" onClick={() => handleButtonClick("I'm wondering about some things...")}>
            Inquisitive <span role="img" aria-label="Search">🤔</span>
          </button>
          <button className="inputpage-button standard-button" onClick={() => handleButtonClick("I feel very funky~ Woo woo")}>
            Funky <span role="img" aria-label="Search">💃</span>
          </button>
        </div>
        <div className="mt-4 inputpage-item">
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
          className={`inputpage-item standard-button ${isCreating ? 'hover:bg-[#858585] bg-[#333333]' : 'hover:bg-[#13c1a1] bg-[#fd92ff]'}`}
        >
          {isCreating ? "Creating............." : "Create"}
        </button>
        <div className="inputpage-item">
          {resultImageUrl && (
            <div className="flex justify-center">
              <Image
                src={resultImageUrl}
                alt={prompt}
                width={500}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
