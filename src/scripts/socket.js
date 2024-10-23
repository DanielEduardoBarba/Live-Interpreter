import { speakText } from "./live"


let socketServer
export function serverConnect(){

   socketServer = new WebSocket("ws://localhost:4000")

    socketServer.onopen=()=>{
        console.log("Connected to server")
        // socketServer.send(JSON.stringify({message:"hola"}))
    }
    socketServer.onmessage=(inbound)=>{

        const s_data = JSON.parse(inbound.data)
        console.log("Server message: ", s_data)

        if(String(s_data.req)=="translate"){
            speakText(s_data.translation)
           

        }
    }


}

export function sendForTranslation(sendObj){
    if(socketServer){
        socketServer.send(JSON.stringify(sendObj))
    }
}

