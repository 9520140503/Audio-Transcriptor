const textArea = document.getElementById('text');
const button = document.getElementById('record');
const btnText = document.getElementById('btnText');

const SpeechRecognition =  window.SpeechRecognition || window.webkitSpeechRecognition;

if(SpeechRecognition){
    const recognition = new SpeechRecognition();
    recognition.continous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    let listen = false;
    button.addEventListener('click',()=>{
        if(!listen){
            recognition.start();
            btnText.textContent = "Start Speech";
            listen = true;
        }else{
            recognition.stop();
            btnText.textContent = "Stop Speech";
            listen = false;
        }
    });

    //Handle Speech:
    recognition.onresult = (event)=>{
        let transcript = '';
        for(let i = event.resultIndex ; i< event.results.length;i++){
            let script = event.results[i][0]+ transcript;
            if(event.results[i].isFinal){
                transcript += script+" ";
            }
        }
        textArea.innerHTML = transcript+"<br>";
        textArea.scrollTop = textArea.scrollHeight;
    }

    recognition.onerror = (event)=>{
        console.log(event.error);
    }

}else{
    alert("Sorry, your browser doesnot support speech recognition")
}