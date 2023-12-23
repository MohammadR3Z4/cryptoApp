import React from 'react'
import { PacmanLoader } from "react-spinners";

function Loading() {
    return (
        <div className="fixed flex justify-center items-center inset-0 bg-black/50 z-50">
            <PacmanLoader color="#ffffff" size={30} />
        </div>
    )
}

export default Loading
