import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect } from 'react';
import axios from "axios";

// interface ResultPageProps {
//   imageUrl: string;
//   altText: string;
// }

const ResultPage = () => {
    const router = useRouter();
    const { prompt } = router.query;
    const [isLoading, setIsLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState('');
    const [promptMessage, setPromptMessage] = useState('');
    const altText = Array.isArray(prompt) ? prompt[0] : prompt;
  
    function generateSessionId() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }


    useEffect(() => {
        const fetchCardText = async () => {
          if (prompt) {
            setIsLoading(true);
            try {

              const res = await axios.post("/api/llm", { prompt });
              // const response = await axios.post(
              //   `${process.env.EDEN_API_URL}/characters/interact`, // Ensure this URL is correct
              //   {
              //     character_id: process.env.EDEN_CHARACTER_ID,
              //     session_id: generateSessionId(), // Use the session ID generator function
              //     message: prompt, // Your prompt or input
              //   },
              //   {
              //     headers: {
              //       "X-Api-Key": process.env.EDEN_API_KEY,
              //       "X-Api-Secret": process.env.EDEN_API_SECRET,
              //     },
              //   }
              // );
      
              // const { message } = response.data;
              // console.log(message);
      
              // Assuming parseCardString is a function you have that parses the message to extract card information
              //const card = parseCardString(message);
              // Use the card data as needed in your application
              // For example, you might set it in the state to display it in your component
              const { message } = res.data;
              setPromptMessage(message);

            } catch (error) {
              console.error('Failed to interact with Eden character:', error);
            } finally {
              setIsLoading(false);
            }
          }
        };
      
        fetchCardText();
      }, [prompt]); // Dependency array to re-run the effect when the prompt changes
      

    //-----------------Fetch image from Eden-----------------
    // useEffect(() => {
    //     const fetchImage = async () => {
    //       if (prompt) {
    //         setIsLoading(true);
    //         try {
    //           // Assuming prompt is a string; adjust if it could be an array
    //           const res = await axios.post("/api/create", { text_input: prompt });
    //           setImageUrl(res.data.uri);
    //         } catch (error) {
    //           console.error('Failed to fetch the image:', error);
    //         } finally {
    //           setIsLoading(false);
    //         }
    //       }
    //     };
    
    //     fetchImage();
    //   }, [prompt]);


  return (
    <div>
      <div className="prompt-display">{promptMessage}</div>
        {/* {isLoading ? (
       <div className="prompt-display">Loading image for: {promptMessage}</div>
        ) : imageUrl ? (
            <div>
        <div className="prompt-display">Loading image for: {promptMessage}</div>
        <Image src={imageUrl} alt={promptMessage} width={500} height={500} className="rounded-lg shadow-lg" />
        </div>
        ) : (
        <div>No image found</div>
        )} */}
    </div>
    );
};

export default ResultPage;
