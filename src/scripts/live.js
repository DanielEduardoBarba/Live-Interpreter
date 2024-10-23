
import { sendForTranslation } from "./socket"

const delay = 5
let spokenAlready = false

export function resetSpeech() {
    spokenAlready = false
    console.log("-------------listening------------")
}


let transcribedText
export let spokenWords = []
export let translatedWords = []
export let allWordsAlt = []

activeSR()

// setInterval(() => {

    // console.log(lastRec ,">", Date.now()," difference ",Date.now()-lastRec)

    // if (1 == 0) {
    //     console.log('Speaking:', transcribedText)
    //     // spokenAlready=true
    //     // speakText(transcribedText)

    //     const sendObj = {
    //         from: "es",
    //         to: "en",
    //         req: "translate",
    //         message: transcribedText
    //     }
    //     sendForTranslation(sendObj)
    // }
// }, 3000)


export function activeSR() {

    // SPEECH Recognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        console.log("-------------active speech recognition------------")
        // Initialize speech recognition
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)()

        // Configure recognition settings (optional)
        recognition.continuous = true // Keep listening until stopped
        recognition.interimResults = true // Get interim results as the user speaks

        // Set the language to Spanish (Spain)
        // recognition.lang = 'es-ES' // 'es-ES' for Spanish (Spain)
        recognition.lang = 'en-EN' // 'es-ES' for Spanish (Spain)
        let lastRec
        let results = ""
        let phrase=""
        // Event handler for recognized speech
        recognition.onresult = (event) => {

   
               try{
                   
                   let wordsArray = []
                   phrase = event.results[event.results.length-1][0].transcript
                //    wordsArray=phrase.split(" ")
                //    const alphaArray = [...event.results[i][String(i)]?.transcript]
                //    let word = ""
                //    alphaArray.forEach(letter => {
                //        if (letter == " ") {
                //            wordsArray.push(word)
                //            word = ""
                //        } else {
                //            word += letter
                //        }
                // //    })
                //    console.log("WORD array ", wordsArray)
                //    wordsArray.forEach(wd => {
                //        if (!results.includes(wd)) results += String(" " + wd)
                //    })
               }catch(e){
                console.log("error parsing words ",e)
               }
                

            setTimeout(() => {

                // console.log(lastRec ,">", Date.now()," difference ",Date.now()-lastRec)

                if (Date.now() - lastRec > delay) {
                    console.log('Speaking:', phrase)
                    // spokenAlready=true
                    // speakText(phrase)

                    const sendObj = {
                        from: "es",
                        to: "en",
                        req: "translate",
                        message: phrase
                    }
                    sendForTranslation(sendObj)
                    spokenWords.push(phrase)
                    allWordsAlt.push({phrase, type:"spoken"})
                }
            }, delay)




            lastRec = Date.now()

         

            // You can handle the recognized text here, e.g., send it to a server, process it, etc.
        }

        // Event handler for errors
        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error)
        }

        // Start listening
        recognition.start()

        // To stop recognition (e.g., when a button is clicked), you can call:
        // recognition.stop();
    } else {
        console.log('Speech recognition not supported in this browser.')
    }
}

// Function to speak text
export function speakText(text, voiceName = "Arthur") {
  

    const voices = window.speechSynthesis.getVoices();
    
    
    // const selectedVoice=" "
    const selectedVoice = voices.find(voice => voice.name === voiceName)
    console.log("Selected voice ", selectedVoice)

    if (selectedVoice) {

        translatedWords.push({phrase:text, type:"translated"})
        allWordsAlt.push(text)
        const speech = new SpeechSynthesisUtterance(text)

        speech.voice = selectedVoice

        window.speechSynthesis.speak(speech)  
    } else {
        console.error(`Voice "${voiceName}" not found.`);
    }
}


