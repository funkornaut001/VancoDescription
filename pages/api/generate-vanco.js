import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const { title } = req.body;

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(title),
    temperature: 1,
    max_tokens: 2048,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(title) {
  return `Users of Vanco can create \"tiles\" for diffrent donation catagories. 
  Each tile has a title and a description. 
  Here are some examples: \nEndowment\nThis fund receives gifts and bequests for the support of the growing missions of our Congregation and community.
  \nMemorial Fund\nDonations are accepted at any time in memory of or in honor of a loved one.\nWorship/Music\nDonations will help supply the Worship Team with all that is needed for regular and special worship services.
  \nCreate a description, 200 charchters or less, based off of the title. Make the descriptions fun, engaging, inspiring, impactful and with proper spelling and grammar.
  ${title}`;
}
