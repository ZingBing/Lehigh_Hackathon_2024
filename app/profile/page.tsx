"use client";

import { useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./../profile/profile.css";

export default function Profile() {
  const { signOut } = useAuthenticator();
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
  });
  const [classes, setClasses] = useState<string[]>(["Math 101", "History 202"]);
  const [hobbies, setHobbies] = useState<string[]>(["Reading", "Cycling"]);

  function addClass() {
    const className = window.prompt("Class name");
    if (className) {
      setClasses([...classes, className]);
    }
  }

  function addHobby() {
    const hobbyName = window.prompt("Hobby name");
    if (hobbyName) {
      setHobbies([...hobbies, hobbyName]);
    }
  }

  return (
    <main>
      <div className="settings-box">
        <h1>My Profile</h1>
        <div>
          <h2>General Information</h2>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
        </div>
        <div>
          <h2>Current Classes</h2>
          <button onClick={addClass}>+ Add Class</button>
          <ul>
            {classes.map((cls, index) => (
              <li key={index}>{cls}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Hobbies</h2>
          <button onClick={addHobby}>+ Add Hobby</button>
          <ul>
            {hobbies.map((hobby, index) => (
              <li key={index}>{hobby}</li>
            ))}
          </ul>
        </div>
        <button onClick={signOut}>Sign out</button>
      </div>
    </main>
  );
}