import { EdenClient } from "@edenlabs/eden-sdk";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { text_input } = req.body;

  try {
    const eden = new EdenClient({
      apiKey: process.env.EDEN_API_KEY,
      apiSecret: process.env.EDEN_API_SECRET,
    });
    const response = await eden.tasks.create({
      generatorName: "create",
      config: {
        text_input,
      },
    });
    const taskId = response.taskId;

    if (!taskId) {
      return res.status(500).json({ error: "Task creation failed" });
    }

    // Poll for result
    const startTime = Date.now();
    let taskResult;
    while (Date.now() - startTime < 10 * 60 * 1000) {
      // 10 minutes timeout
      const taskResponse = await eden.tasks.get({ taskId });
      const task = taskResponse.task;
      if (!task) {
        return res.status(500).json({ error: "Task not found" });
      }
      if (task.status === "completed") {
        taskResult = task.creation?.uri;
        break;
      } else if (task.status === "failed") {
        return res.status(500).json({ error: "Task failed" });
      }
      await new Promise((resolve) => setTimeout(resolve, 5000)); // wait for 5 seconds before next poll
    }

    if (!taskResult) {
      return res
        .status(500)
        .json({ error: "Task timed out or something went wrong" });
    }

    // use taskResult here
    return res.status(200).json({ uri: taskResult });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default handler;
