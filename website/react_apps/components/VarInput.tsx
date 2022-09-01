import React from 'react';


export default function VarInput(props: { variable?: any, setvariable: (t: any) => void, className?: string }) {
    
    const variable = props.variable
    const setvariable = props.setvariable
    const className = props.className

    return <input className={className} value={variable} onChange={e => setvariable(e.target.value)} />
}
