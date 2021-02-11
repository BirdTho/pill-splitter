import React from 'react';
import {Input} from './Input';
import {ToMG} from './ToMG';

import './App.css';

function clamp(a, b) {
    if (a < 0) return 0;
    if (a > b) return 1;
    return a / b;
}

const totalDose = 100.0;

function calculateRatio(pillWeight, pieceWeight) {
    if (pillWeight <= 0) {
        return 0;
    }
    if (Number.isNaN(pieceWeight)) return 0;
    if (Number.isNaN(pillWeight)) return 0;
    return clamp(pieceWeight, pillWeight);
}

function App() {
    const [pillWeight, setPillWeight] = React.useState(0);
    const [pillPieceWeight, setPillPieceWeight] = React.useState(0);
    const [windowHeight, setWindowHeight] = React.useState(window.innerHeight);
    const [mainVisibility, setMainVisibility] = React.useState('hidden');

    React.useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowHeight(window.innerHeight);
        });
    }, [])

    /**
     *
     * @type {React.MutableRefObject<HTMLDivElement>}
     */
    const divRef = React.useRef();

    React.useEffect(() => {
        if (divRef.current?.offsetHeight) {
            const currentTopPadding = parseInt(divRef.current.style.paddingTop || "0", 10);
            divRef.current.style.paddingTop = `${(window.innerHeight - (divRef.current.offsetHeight - currentTopPadding)) >> 1}px`;
            setMainVisibility('');
        }
    }, [windowHeight]);

    return (
        <div className="App">
            <div className="main-container" ref={divRef} style={{visibility: mainVisibility}}>
                <Input className="pill-weight" after="mg" onChange={(num) => {setPillWeight(num)}} windowHeight={windowHeight}/>
                <br/>
                <Input className="piece-weight" after="mg" onChange={(num) => {setPillPieceWeight(num)}} windowHeight={windowHeight}/>
                <br/>
                <ToMG ratio={calculateRatio(pillWeight, pillPieceWeight)}/>
                <br/>
                <span>Raw: {(calculateRatio(pillWeight, pillPieceWeight) * 100).toFixed(2)}</span>
            </div>
        </div>
    );
}

export default App;
