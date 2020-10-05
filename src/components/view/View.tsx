import React from 'react'
import { GeneratorContext } from '../generator/GeneratorContext'
import './View.css'

interface IViewStyle {
    boxShadow: string
    color: string
    opacity: string
}

class View extends React.Component<{}, {}> {
    static contextType = GeneratorContext
    context!: React.ContextType<typeof GeneratorContext>

    constructor(props = {}) {
        super(props)
    }

    getViewStyles(): IViewStyle {
        const {offsetX, offsetY, blur, spread, color, opacity} = this.context.shadow
        return {
            boxShadow: `${offsetX}px ${offsetY}px ${blur}px ${spread}px`,
            color: `#${color.toString(16)}`,
            opacity: `${opacity}`
        }
    }

    getViewCssStyleString(): string {
        const {offsetX, offsetY, blur, spread, color, opacity} = this.context.shadow
        return  `
                box-shadow: ${offsetX}px ${offsetY}px ${blur}px ${spread}px #${color.toString(16)};
                opacity: ${opacity.toFixed(2)};
                `
    }

    render() {
        return (
            <div  className="view">
                <div className="view-box">
                    <div 
                        style={this.getViewStyles()}
                        className="view-box__shadow"
                    ></div>
                </div>

                <pre className="view-css">
                    {this.getViewCssStyleString()}
                </pre>
            </div>
        )
    }
}

export default View

