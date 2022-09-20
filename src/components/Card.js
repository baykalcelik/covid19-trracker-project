import { useEffect, useState } from 'react';

import CountUp from 'react-countup';

import './card.css';

export default function Card(props){


    return(
        <div className={'cardCover ' + (props.statType === "Infected" ? "infected" : props.statType === "Recovered" ? "recovered" : props.statType === "Deaths" ? "deaths" : "")} >
            <p className={'statType ' + (props.statType === "Infected" ? "infectedText" : props.statType === "Recovered" ? "recoveredText" : props.statType === "Deaths" ? "deathsText" : "") }>{props.statType}</p>
            <p className='recordAnnounced'>
                <CountUp start={0} end={props.recordAnnounced} duration={1} separator={","}/>
            
            </p>
            <p className='actualDate'>{props.actualDate}</p>
            <p className='explanationText'>{props.statType === "Infected" ? "Number of active cases of Covid-19" : props.statType === "Recovered" ? "Number of recoveries from Covid-19" : props.statType === "Deaths" ? "Number of deaths caused by Covid-19" : ""}  </p>

        
        </div>
    )
}