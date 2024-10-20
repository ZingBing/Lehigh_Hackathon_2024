"use client";

import { useState } from "react";
import AWS from "aws-sdk";
import "@aws-amplify/ui-react/styles.css";
import "./../../app/app.css";

// Configure AWS SDK
AWS.config.update({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: process.env.NEXT_PUBLIC_AWS_IDENTITY_POOL_ID,
  }),
});

const lexRuntime = new AWS.LexRuntime();

export default function AIStudyBuddy() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const handleAskQuestion = async () => {
    if (question.trim() === "") return;

    const params = {
      botAlias: process.env.NEXT_PUBLIC_LEX_BOT_ALIAS,
      botName: process.env.NEXT_PUBLIC_LEX_BOT_NAME,
      inputText: question,
      userId: "user-id", // You can use a unique user ID here
    };

    lexRuntime.postText(params, (err, data) => {
      if (err) {
        console.error(err);
        setAnswer("Error: Unable to get response from AI.");
      } else {
        setAnswer(data.message || "No answer found.");
      }
    });
  };

  return (
    <main>
      <div className="ai-study-buddy-box">
        <h1>AI Study Buddy</h1>
        <div>
          <input
            type="text"
            value={question}
            onChange={handleQuestionChange}
            placeholder="Ask a question..."
          />
          <button onClick={handleAskQuestion}>Ask</button>
        </div>
        <div>
          <h2>Answer</h2>
          <p>{answer}</p>
        </div>
      </div>
    </main>
  );
}