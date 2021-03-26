import React, {useEffect} from "react";

export default function NotFound() {

    useEffect(() => {
        document.title = "BrewMe - 404 - Not-Found"
    },[])

    return (
        <p>Nothing here</p>
    )
}