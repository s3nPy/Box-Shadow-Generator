import React, { createContext, PropsWithChildren, useCallback, useState } from "react";


export interface IShadow {
    offsetX: number
    offsetY: number
    blur: number
    spread: number
    color: number
    opacity: number
}

export interface IGeneratorContext {
    shadow: IShadow
    change: (key: keyof IShadow) => (v: number) => void
}

const initialShadow: IShadow = {
    offsetX: 0,
    offsetY: 0,
    blur: 0,
    spread: 0,
    color: 124144,
    opacity: .75
}

export const GeneratorContext = createContext<IGeneratorContext>({
    shadow: initialShadow,
    change: () => () => {}
})


export const GeneratorProvider = (props: PropsWithChildren<{}>): React.ReactElement => {
    const [shadow, setShadow] = useState<IShadow>(initialShadow)

    const change = useCallback((key: keyof IShadow) => {
        return (value: number | string) => {
            setShadow(prev => ({...prev, [key]: value}))
        } 
    }, [])

    return (
        <GeneratorContext.Provider value={{shadow, change}}>
            {props.children}
        </GeneratorContext.Provider>
    )
}