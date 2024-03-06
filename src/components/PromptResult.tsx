// import Image from "next/image";
// import { useRouter } from "next/router";
// import React, { useState, useEffect } from 'react';
// import axios from "axios";

// // interface PromptResultProps {
// //   imageUrl: string;
// //   altText: string;
// // }

// const PromptResult = ({prompt}) => {
//     const router = useRouter();
//     const [isLoading, setIsLoading] = useState(true);
//     const [imageUrl, setImageUrl] = useState('');
//     const [promptMessage, setPromptMessage] = useState('');
  
//     function generateSessionId() {
//         return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
//     }


//     useEffect(() => {
//         const fetchCardText = async () => {
//           if (prompt) {
//             setIsLoading(true);
//             try {

//               const res = await axios.post("/api/llm", { prompt });
//               // const response = await axios.post(
//               //   `${process.env.EDEN_API_URL}/characters/interact`, // Ensure this URL is correct
//               //   {
//               //     character_id: process.env.EDEN_CHARACTER_ID,
//               //     session_id: generateSessionId(), // Use the session ID generator function
//               //     message: prompt, // Your prompt or input
//               //   },
//               //   {
//               //     headers: {
//               //       "X-Api-Key": process.env.EDEN_API_KEY,
//               //       "X-Api-Secret": process.env.EDEN_API_SECRET,
//               //     },
//               //   }
//               // );
      
//               // const { message } = response.data;
//               // console.log(message);
      
//               // Assuming parseCardString is a function you have that parses the message to extract card information
//               //const card = parseCardString(message);
//               // Use the card data as needed in your application
//               // For example, you might set it in the state to display it in your component
//               const { message } = res.data;
//               setPromptMessage(message);

//             } catch (error) {
//               console.error('Failed to interact with Eden character:', error);
//             } finally {
//               setIsLoading(false);
//             }
//           }
//         };
      
//         fetchCardText();
//       }, [prompt]); // Dependency array to re-run the effect when the prompt changes
    


//   return (
//     <div>
//       <div className="prompt-display">{promptMessage}</div>
//     </div>
//     );
// };

// export default PromptResult;
