// JavaScript for Text-to-Speech Converter
const textInput = document.getElementById("text-input");
const voiceSelect = document.getElementById("voice-select");
const rate = document.getElementById("rate");
const speakButton = document.getElementById("speak-btn");
const stopButton = document.getElementById("stop-btn");
const loader = document.getElementById("loader");

const synth = window.speechSynthesis;
let voices = [];

// Populate the voice dropdown
const populateVoices = () => {
  voices = synth.getVoices();
  voiceSelect.innerHTML = voices.map((voice, i) => 
    `<option value="${i}">${voice.name} (${voice.lang})</option>`
  ).join('');
};

// Set up event listeners
speakButton.addEventListener("click", () => {
  if (synth.speaking) return;

  const text = textInput.value.trim();
  if (text !== "") {
    loader.style.display = "block";
    const utterThis = new SpeechSynthesisUtterance(text);

    // Set selected voice
    const selectedVoice = voices[voiceSelect.value];
    utterThis.voice = selectedVoice;

    // Set rate
    utterThis.rate = rate.value;

    utterThis.onend = () => {
      loader.style.display = "none";
    };

    synth.speak(utterThis);
  }
});

stopButton.addEventListener("click", () => {
  if (synth.speaking) {
    synth.cancel();
    loader.style.display = "none";
  }
});

// Populate voices when they change
synth.onvoiceschanged = populateVoices;

// Initialize voices on page load
populateVoices();
