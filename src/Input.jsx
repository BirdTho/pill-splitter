import React from 'react';
import "./Input.css";

/**
 *
 * @param {{
 *     onChange: function(num: number),
 *     className: string,
 *     windowHeight: number
 * }} props
 * @returns {JSX.Element}
 * @constructor
 */
export function Input(props) {
    /**
     * @type {React.MutableRefObject<HTMLSpanElement>}
     */
    const spanRef = React.useRef();

    /**
     * @type {React.MutableRefObject<HTMLSpanElement>}
     */
    const inputRef = React.useRef();

    React.useEffect(() => {
        if (spanRef.current?.offsetWidth) {
            inputRef.current.style.paddingRight = `${spanRef.current.offsetWidth}px`;
        }
    }, [props.windowHeight]);

    /**
     *
     * @param {InputEvent<HTMLInputElement>} e
     */
    const onChange = function (e) {
        props.onChange?.(parseFloat(e.target.value ?? "0"));
    }
    return (
        <div className={"num-input " + props.className}>
            <input ref={inputRef} onChange={onChange}  type="number"/>
            {props.after && <span ref={spanRef} className="after-span">{props.after}</span>}
        </div>
    );
}