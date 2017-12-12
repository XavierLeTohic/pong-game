import { Component } from 'react'
import initGameWithAI from '../versions/with-ai'

export default class extends Component {

    componentDidMount() {
        
        // Client-side
        if(typeof window !== 'undefined') {
            initGameWithoutAI(this.canvas)
        }
    }

    componentWillUnmount() {
        
    }

    render() {
        return (
            <div className="row center-xs middle-xs" style={{ minHeight: '100vh'}}>
                <canvas 
                    ref={c => this.canvas = c} 
                    height="600"
                    width="800"
                />
            </div>
        )
    }
}