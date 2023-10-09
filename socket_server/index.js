
import { exec } from "child_process"
import { WebSocketServer } from "ws"

// Using system command
// trans es:en "hola como va"
// trans es:en "hola como va" | awk 'BEGIN { found = 0 } /^$/ { found++ } found == 1 && found < 2 { print }'

const PORT = 4000

let socketServer

function server() {

    socketServer = new WebSocketServer({ port: PORT })
    console.log(`Serving socket on port: ${PORT}`)


    socketServer.on('connection', async (client) => {
        console.log("client connected")
        // client.send(JSON.stringify({message:"HELLO"}))

        client.on('message', async (stringifiedJson) => {

            try {

                const s_data = JSON.parse(stringifiedJson)
                let res = s_data
                if (String(s_data.req) == "translate" && s_data.message)
                    console.log("Client says: ", s_data.message)

                res.translation = await translate(s_data.from, s_data.to, s_data.message)

                console.log("Sending back: ", res.translation)
                client.send(JSON.stringify(res))


            } catch (error) {
                console.log("Error receiving/processing inboud: ", error)
            }
        })


        client.on('close', () => {
            console.log("client disconnected")
        })



    })

}

async function translate(from, to, message) {
    const alphaTxtOnly = message.replace(/[^a-zA-Z]/g, '')
    const translatedTxt = await sysCMD(`trans ${from}:${to} ${alphaTxtOnly} | sed -r "s/\x1B\[[0-9;]*[mK]//g" | awk 'BEGIN { found = 0 } /^$/ { found++ } found == 1 && found < 2 { print }'`)
    return translatedTxt

}

function sysCMD(cmd) {
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            console.log(stdout)
            if (error) {
                console.log("stderr -> ", stderr)
                // resolve(error)
            } else resolve(stdout)
        })
    })
}



server()

