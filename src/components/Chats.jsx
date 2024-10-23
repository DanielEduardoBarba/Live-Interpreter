import { useEffect, useState } from "react";
import Phrase from "./Phrase";
import { allWordsAlt, spokenWords, translatedWords } from "../scripts/live.js";


export default function Chats() {
    const [spoke, setSpoken] = useState([])
    const [translated, setTranslated] = useState([])
    const [allWords, setAllWords] = useState([])
    const [refresh, setRefresh] = useState(false)

    useEffect(()=>{
        setInterval(()=>{
            // console.log("CURR ALT WORDS ", allWordsAlt)
            // console.log("CURR ALT WORDS LENGTH ", allWordsAlt.length)
            if(allWordsAlt.length){
                setRefresh(refresh?false:true)
                setAllWords(allWordsAlt)
                // setSpoken(spokenWords)
                // setTranslated(translatedWords)
            }

        },1000)
    })

    return (
            <div  className="w-full flex flex-col justify-start w-screen h-screen bg-gray-500 overflow-scroll">

                {
                    allWords.length && refresh
                        ? allWords.map((p,i)=> <Phrase  key={i} p={p}  />)
                        : allWords.length
                            ?allWords.map((p,i)=> <Phrase key={i} p={p}  />)
                            :""
                }

            </div>
    )
}