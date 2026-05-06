
let recordBtn = document.getElementById("recordBtn");
let transcript = document.getElementById("transcript");
let copyBtn = document.getElementById("copyBtn");
let saveBtn = document.getElementById("saveBtn");
let clearBtn = document.getElementById("clearBtn");

let recognition;

let isRecording = false;

if ("webkitSpeechRecognition" in window) {
    recognition = new webkitSpeechRecognition();
    console.log(recognition); 

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

} else {
    alert("speech recognition not supported in this browser. try chrome");
}

recordBtn.addEventListener("click", () => {
    if (isRecording) {
        recognition.stop(); 
        recordBtn.textContent = "Start Recording";
        recordBtn.classList.remove("recording");

    } else {
        recognition.start(); 
        recordBtn.textContent = "Stop Recording";
        recordBtn.classList.add("recording");
    }

    isRecording = !isRecording;
});

recognition.onresult = (event) => {
    let transcriptText = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
        transcriptText += event.results[i][0].transcript + " ";
    }

    transcript.innerHTML = transcriptText;
};

copyBtn.addEventListener("click",()=>{
 navigator.clipboard.writeText(transcript.innerText)
 alert("Text copied to clipboard")
})


saveBtn.addEventListener("click", () => {
    const blob = new Blob([transcript.innerText], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "transcript.txt";
    link.click();
});

clearBtn.addEventListener("click", () => {
    transcript.innerHTML= "";
});