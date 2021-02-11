import './ToMG.css';

export function ToMG(props) {
    let ratio = props.ratio;
    let output;
    if (ratio < 0.025) {
        output = 100 * Math.round(ratio * 80) / 80;
    } else if (ratio < 0.05) {
        output = 100 * Math.round(ratio * 40) / 40;
    } else {
        output = 100 * Math.round(ratio * 20) / 20;
    }
    return <span className="out-mg">{output.toString(10)}mg (100mg max dosage)</span>;
}