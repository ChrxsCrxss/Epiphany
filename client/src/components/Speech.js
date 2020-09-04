import React from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const Dictaphone = () => {
  const { transcript, resetTranscript } = useSpeechRecognition()

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  return (
    <div>
      <button onClick={SpeechRecognition.startListening({ continuous: true })}>Start</button>
      <button onClick={SpeechRecognition.abortListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <textarea
          placeholder="Type, Paste, or Speak!"
          value={transcript}
        />
    </div>
  )
}
export default Dictaphone