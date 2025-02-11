import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ReactMic } from "react-mic";
import axios from "axios";

const Group = () => {
  const location = useLocation();
  const { groupSize } = location.state || { groupSize: 1 }; // Default to 1 person
  const [record, setRecord] = useState(false);
  const [discussion, setDiscussion] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    // API call to log group size
    const logGroupSize = async () => {
      try {
        const response = await axios.post("https://example.com/api/group-size", {
          groupSize,
        });
        console.log("Group size logged:", response.data);
      } catch (error) {
        console.error("Error logging group size:", error);
      }
    };

    logGroupSize();
  }, [groupSize]);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  const onStop = async (recordedBlob) => {
    try {
      setRecord(false);
      setIsProcessing(true);

      if (file) {
        const fileContent = await readFileContent(file);

        const rasaResponse = await axios.post(
          "http://localhost:5005/webhooks/rest/webhook",
          { sender: "user", message: fileContent }
        );

        if (rasaResponse.data.length > 0) {
          const botResponse = rasaResponse.data[0].text;
          setDiscussion((prev) => [...prev, { sender: "Bot", text: botResponse }]);
          speak(botResponse);
        }
      }
      setIsProcessing(false);
    } catch (error) {
      console.error("Error processing file:", error);
      setIsProcessing(false);
    }
  };

  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div>
      <h1>Group Discussion</h1>
      <p>Selected Group Size: {groupSize} Person{groupSize > 1 ? "s" : ""}</p>
      <div className="discussion">
        {discussion.map((msg, idx) => (
          <div key={idx} className={msg.sender === "You" ? "user-msg" : "ai-msg"}>
            <strong>{msg.sender}: </strong>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="audio-controls">
        <ReactMic record={record} onStop={onStop} mimeType="audio/wav" className="audio-input" />
        <button onClick={() => setRecord(!record)} disabled={isProcessing}>
          {record ? "Stop Recording" : "Start Recording"}
        </button>
      </div>
      <div className="file-upload">
        <input type="file" onChange={handleFileChange} />
        {file && <p>File selected: {file.name}</p>}
      </div>
      {isProcessing && <p>Processing...</p>}
    </div>
  );
};

export default Group;
