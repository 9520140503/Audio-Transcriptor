const voiceButton = document.getElementById('record');
const textArea =document.getElementById('text');
const textBtn = document.getElementById('btnText');
const download = document.getElementById('download');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if(SpeechRecognition){
    const recognition = new SpeechRecognition();

    recognition.continous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    let listen = false;

    //Toggling:
    voiceButton.addEventListener("click",()=>{
        if(!listen){
            recognition.start();
            textBtn.textContent =  "🛑 Stop Listening";
            listen = true;
        }else{
            recognition.stop();
            textBtn.textContent = "Start Listening";
            listen = false;
        }
    });

    function fixWording(transcript){
        return transcript.replace(/(?:^|[.!?]\s+)([a-z])/g,(match, p1) => match.replace(p1, p1.toUpperCase()));
    }

    function downloadScript(text){
        const blob = new Blob([text],{type:"text/plain"});
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = "transcript.txt";
        link.click();
    }

    //Handle Speech:
    recognition.onresult = (event)=>{
        let finalScript = '';
        for(let i = event.resultIndex; i < event.results.length; i++){
            const script = event.results[i][0].transcript;
            if(event.results[i].isFinal){
                finalScript += script+' ';
            }
        }
        finalScript = fixWording(finalScript);
        textArea.innerHTML = finalScript +"<br>";
        textArea.scrollTop = textArea.scrollHeight;

        download.addEventListener("click",()=>{
            downloadScript(textArea.textContent);
        })
    };

    //Error:
    recognition.onerror = (event)=>{
        console.log(event.error);
    };

}else{
    alert("Sorry, your browser does not support speech recognition");
}