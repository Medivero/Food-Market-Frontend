import React, { useEffect, useState } from "react";
import './preloader.css'

function PreLoader(props){
    return (
        <div className={`loader ${props.Loaded1 ? 'loaded' : 'not-loaded'}`}>
            <div className="loader-text">
                Mediv's shop   
            </div>
            <div className="box-loader">
            </div>
        </div>
    )
}

export default PreLoader;