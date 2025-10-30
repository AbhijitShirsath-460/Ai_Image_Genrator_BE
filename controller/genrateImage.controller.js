import * as dotenv from "dotenv";
// import OpenAI from "openai";
dotenv.config();

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

 console.log ("openai api key " , process.env.OPENAI_API_KEY,);


const openai = new OpenAIApi(configuration);




// OpenAI configuration setup

// const openai = new OpenAI({
//   apiKey: process.env.OPEN_AI_APIKEY ||'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'
// });

// Controller function

export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log("genrated image prompt", prompt);


    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    console.log("Image generate response:", response);

    const generatedImage = response.data.data[0].b64_json;
    // Updated data structure in v4
    return res.status(200).json({ photo: generatedImage });

  } catch (error) {
    console.error("OpenAI Error Details:", error.response?.data || error.message);

    if (error.code === "billing_hard_limit_reached") {
      return res.status(403).json({ error: "Billing limit reached. Please update your OpenAI billing settings." });
    }

    return res.status(500).json({
      message: error.message || "An error occurred while generating the image.",
      error: true,
      details: error.response?.data || null,
    });

  }
};
