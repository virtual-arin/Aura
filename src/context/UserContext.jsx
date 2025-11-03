import main from "../api";
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
export const dataContext = createContext();

const UserContext = ({ children }) => {
  const speak = useCallback((text) => {
    if (!("speechSynthesis" in window)) {
      console.error("Speech Synthesis API not supported in this browser.");
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = 1;
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  }, []);

  async function airesponse(prompt) {
    await main(prompt);
    const response = await main(prompt);
    if (response) {
      speak(response);
      setTranscript(response);
    }
  }

  const [transcript, setTranscript] = useState("");
  const [isFinal, setIsFinal] = useState(false);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = useMemo(() => {
    if (!SpeechRecognition) return null;
    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-US";
    return rec;
  }, [SpeechRecognition]);

  useEffect(() => {
    if (!recognition) return;

    const handleResult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
          setIsFinal(true);
        } else {
          interimTranscript += event.results[i][0].transcript;
          setIsFinal(false);
        }
      }
      setTranscript(finalTranscript || interimTranscript);
      setTranscript(finalTranscript || interimTranscript); // Show interim transcript
    };

    recognition.addEventListener("result", handleResult);

    return () => recognition.removeEventListener("result", handleResult);
  }, [recognition]);

  useEffect(() => {
    if (isFinal && transcript) {
      airesponse(transcript);
    }
  }, [isFinal, transcript]);

  const value = useMemo(
    () => ({ speak, recognition, transcript }),
    [speak, recognition, transcript]
  );

  return <dataContext.Provider value={value}>{children}</dataContext.Provider>;
};

export default UserContext;
