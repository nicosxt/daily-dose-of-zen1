import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

function generateSessionId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { prompt } = req.body;

  try {

    const response = await axios.post(
        `${process.env.EDEN_API_URL}/characters/interact`, // Ensure this URL is correct
        {
          character_id: process.env.EDEN_CHARACTER_ID,
          session_id: generateSessionId(), // Use the session ID generator function
          message: prompt, // Your prompt or input
        },
        {
          headers: {
            "X-Api-Key": process.env.EDEN_API_KEY,
            "X-Api-Secret": process.env.EDEN_API_SECRET,
          },
        }
      );

      const { message } = response.data;
      console.log(message);

    return res.status(200).json({ message });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default handler;
