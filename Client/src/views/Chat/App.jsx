import React, { useState, useEffect } from "react";
import { Chat } from "./chat";
import { AppWrapper } from "./AppWrapper";
import Cookies from "universal-cookie";
import "./App.css";
 
const cookies = new Cookies();

function ChatApp({recipient}) {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  // const [recipient, setRecipient] = useState(""); // Change: Use 'recipient' instead of 'room'
  const [isInChat, setIsInChat] = useState(false);

  if (!isAuth) {
    return (
      <AppWrapper
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        setIsInChat={setIsInChat}
      >
        
      </AppWrapper>
    );
  }

  return (
    <AppWrapper isAuth={isAuth} setIsAuth={setIsAuth} setIsInChat={setIsInChat}>
      {!isInChat ? (
        <div className="room">
          
          <button
            onClick={() => {
              setIsInChat(true);
            }}
          >
            Start Conversation
          </button>
        </div>
      ) : (
        <Chat recipient={recipient} /> /* Change: Pass 'recipient' prop */
      )}
    </AppWrapper>
  );
}

export default ChatApp;
