

export default function Phrase({ p }) {


    return (
        <div style={{
            // alignContent:p.type=="spoken"?"flex-start":"flex-end"
        }} className="bg-white dark:bg-gray-800 w-72 shadow-lg mx-auto rounded-xl p-2 mb-2">
            <p className="text-gray-600 text-sm dark:text-white">
                {p.phrase}
            </p>
        </div>
    )

}