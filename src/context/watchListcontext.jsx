import { createContext, useState, useEffect } from "react";
export const WatchListContext = createContext()

export const WatchListContextProvider = (props) =>{

    const [watchStock,setWatchStock]=useState(
        localStorage.getItem("current")?.split(",") ||
        ["TSLA","MSFT"]
        )

    useEffect(()=>{
        localStorage.setItem("current",watchStock)
    },[watchStock])

    const addStock = (stock)=>{
        /* if cant find stock in list, add it to list */
        if (watchStock.indexOf(stock) === -1){
            setWatchStock([...watchStock,stock])
        }
    }

    /* Go through all entry in watchlist. only keep entries that do not match stock */
    const deleteStock = (stock)=>{
        setWatchStock(watchStock?.filter((element) =>{
            return element !== stock
        }))
    }

    return <WatchListContext.Provider value={{watchStock,addStock,setWatchStock,deleteStock}}>
        {props.children}
    </WatchListContext.Provider>
}
