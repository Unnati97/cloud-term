import React, { useState } from "react";
import NavBar from "./welcome-nav-bar";
import LexChatbot from "./lex-chat-bot";



const LexUi = (props) => {
  
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  
  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };
    return (
      <>
        <NavBar />
        <div className="auth-wrapper" style={{ marginTop: "5%" }}>
        <div>
            <LexChatbot />
        </div>
        </div>
      </>
    );
}
export default LexUi;
