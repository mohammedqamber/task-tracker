"use client";

import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Mic, Square } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

type Props = {
  onTranscript?: (text: string) => void;
  onReset?: (text: string) => void;
};

export default function VoiceInput({ onTranscript, onReset }: Props) {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    onTranscript && onTranscript(transcript);
  }, [transcript]);

  useEffect(() => {
    if (open) {
      resetTranscript();
      SpeechRecognition.startListening({
        continuous: true,
        language: "en-IN",
      });
    } else {
      SpeechRecognition.stopListening();
    }
  }, [open]);

  const stopRecording = () => {
    SpeechRecognition.stopListening();
    onReset && onReset(transcript);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Beautiful Blue Trigger Button */}
      <DialogTrigger asChild>
        <Button
          className="
            px-4 py-2 flex items-center gap-2 
            bg-blue-600 text-white rounded-md shadow 
            hover:bg-blue-700 active:scale-95 transition
          "
        >
          <Mic size={18} /> Voice Task
        </Button>
      </DialogTrigger>

      {/* Dialog */}
      <DialogContent className="flex flex-col gap-6 py-8">
        {/* 🔥 Top-left aligned title */}
        <DialogHeader className="items-start text-left">
          <DialogTitle className="text-gray-800 text-lg font-semibold">
            Speak Your Task
          </DialogTitle>

          <DialogDescription className="text-gray-500 text-sm">
            Describe your task clearly — we’re listening.
          </DialogDescription>
        </DialogHeader>

        {/* Mic Icon */}
        <div className="flex justify-center">
          <div
            className={`p-6 rounded-full shadow-md transition ${
              listening
                ? "bg-blue-600 text-white animate-pulse shadow-blue-300"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            <Mic size={40} />
          </div>
        </div>

        {/* Waveform */}
        {listening && (
          <div className="flex items-end gap-1 h-8 justify-center mt-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="w-[5px] bg-blue-600 rounded-sm animate-wave"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        )}

        {/* Transcript */}
        <div className="w-full text-sm bg-gray-100 rounded-md p-4 min-h-[70px] text-gray-700 italic shadow-inner">
          {transcript || "Speak… your words will appear here."}
        </div>

        {/* Stop Button */}
        <button
          onClick={stopRecording}
          className="
            mt-2 w-full flex justify-center items-center gap-2 
            px-4 py-2 bg-gray-700 text-white rounded-md
            hover:bg-gray-800 transition active:scale-95
          "
        >
          <Square size={16} /> Stop
        </button>
      </DialogContent>
    </Dialog>
  );
}
