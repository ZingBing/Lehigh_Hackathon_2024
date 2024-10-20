"use client";

import { useAuthenticator } from "@aws-amplify/ui-react";
import { useState } from "react";
import "./../app/app.css";
import "@aws-amplify/ui-react/styles.css";

export default function App() {
  const { signOut } = useAuthenticator();
  const [studyBuddies, setStudyBuddies] = useState<{ id: number; name: string; subject: string }[]>([]);
  const [matches, setMatches] = useState<{ name: string; subject: string }[]>([]);

  function addStudyBuddy() {
    const name = window.prompt("Study Buddy name");
    const subject = window.prompt("Subject");
    if (name && subject) {
      setStudyBuddies([...studyBuddies, { id: studyBuddies.length + 1, name, subject }]);
    }
  }

  function findMatches() {
    const subject = window.prompt("Enter subject to find a match");
    if (subject) {
      const matchedBuddies = studyBuddies.filter(buddy => buddy.subject.toLowerCase() === subject.toLowerCase());
      setMatches(matchedBuddies);
    }
  }

  return (
    <main>
      <h1>Study Buddy Finder</h1>
      <div>
        <h2>Find a Study Buddy</h2>
        <button onClick={addStudyBuddy}>+ Add Study Buddy</button>
        <ul>
          {studyBuddies.map((buddy) => (
            <li key={buddy.id}>
              {buddy.name} - {buddy.subject}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Matchmaking</h2>
        <button onClick={findMatches}>Find Matches</button>
        <ul>
          {matches.map((match, index) => (
            <li key={index}>
              {match.name} - {match.subject}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}