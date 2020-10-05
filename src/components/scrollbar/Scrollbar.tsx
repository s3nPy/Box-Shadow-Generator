import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { IShadow, GeneratorContext } from '../generator/GeneratorContext'
import './Scrollbar.css'


export interface IScrollbarProps {
    title: string
    shadowKey: keyof IShadow
    min: number
    max: number
    precision?: number
}

interface IScrollStyle {
    left: string
}

export default function Scrollbar(props: IScrollbarProps): React.ReactElement {
    const [value, setValue] = useState(0)
    const [coef, setCoef] = useState(.55)
    const [spy, setSpy] = useState(false)
    const [scrollStyle, setScrollStyle] = useState<IScrollStyle>({left: '0px'})
    const barRef = useRef<HTMLDivElement | null>(null)
    const {change} = useContext(GeneratorContext)
    
    const spyHandler = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if(spy) {
            e.persist()
            const rect = barRef.current?.getBoundingClientRect()
            const pos = Math.min(Math.max(e.clientX-rect!.x, 0), rect!.width)
            setCoef( pos / rect!.width )
        }
    }, [spy])

    // const scrollStyle: IScrollStyle = useMemo(() => {
    //     const width = barRef.current?.getBoundingClientRect()?.width
    //     if(width) {
    //         const left = Math.round(width * coef)-5
    //         return { left: `${left}px` }
    //     }
    //     return { left: '0px' }
    // }, [coef])    

    useEffect(() => {
        const width = barRef.current!.getBoundingClientRect()!.width
        const left = Math.round(width * coef)-5
        setScrollStyle({ left: `${left}px` })
    }, [coef])

    useEffect(() => {
        const norm = coef * (props.max - props.min) + props.min
        const nextValue = props.precision ? norm : Math.round(norm)
        setValue(nextValue)
    }, [coef, props.max, props.min, props.precision])

    useEffect(() => {
        change(props.shadowKey)(value)
    }, [value, change, props.shadowKey])

    return (
        <div 
            className="scrollbar" 
            onMouseMove={spyHandler} 
            onMouseUp={() => setSpy(false)}
        >
            <div className="scrollbar-header">
                <div className="scrollbar-header__title">
                    {props.title}  
                </div>
                <div className="scrollbar-header__value">
                    {props.precision ? value.toFixed(props.precision) : value}
                </div>
            </div>
            <div className="scrollbar-body" onMouseDown={() => setSpy(true)}>
                <div 
                    style={scrollStyle} 
                    className="scrollbar__scroll"
                ></div>
                <div 
                    ref={barRef}
                    className="scrollbar__bar"
                ></div>
            </div>
        </div>
    )
}
