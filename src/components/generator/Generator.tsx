import React from 'react'
import Scrollbar from '../scrollbar/Scrollbar'
import View from '../view/View'
import './Generator.css'
import { GeneratorProvider } from './GeneratorContext'


export default function Generator(): React.ReactElement {


    return (
        <GeneratorProvider>
        <div className="generator">
            <div className="generator__options">
                <Scrollbar title="offset X" min={-100} max={100} shadowKey="offsetX"/>
                <Scrollbar title="offset Y" min={-100} max={100} shadowKey="offsetY"/>

                <Scrollbar title="blur" min={0} max={100} shadowKey="blur"/>
                <Scrollbar title="spread" min={-100} max={100} shadowKey="spread"/>

                <Scrollbar title="color" min={0} max={256**3-1} shadowKey="color"/>
                <Scrollbar title="opacity" min={0} max={1} shadowKey="opacity" precision={2}/>
            </div>
            <div className="generator__view">
                <View />
            </div>
        </div>
        </GeneratorProvider>
    )
}

