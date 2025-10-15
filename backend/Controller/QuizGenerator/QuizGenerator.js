const {GoogleGenerativeAI} = require("@google/generative-ai")
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

 const QuizGenerator = async(req,res)=>{
   const {subject,chapter,topic,option} = req.query;
   
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `
      You are a question generator for ${subject} practice.
      The user is at chapter ${chapter} where they learn about ${topic}.
      The questions have to be ${option}
      Generate EXACTLY 5 multiple-choice questions.
      Each question must have:
      - A "question" field (string)
      - An "options" field (array of 4 choices)
      - An "answer" field (string, exactly matching one of the options)
      Return ONLY valid JSON array, no extra text.
    `;

    const result = await model.generateContent(prompt);
    let text = result.response.text();
   // const questions = JSON.parse(text); // Validate carefully
    
// remove markdown fences if Gemini adds them
text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    res.json({quizes:text});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate questions" });
  }
} 

module.exports = {QuizGenerator}