
import { Component } from 'react'
import { Page, DisplayText, Button, Caption, Banner } from '@shopify/polaris'
import initGameWithoutAI from '../versions/pong'

export default class extends Component {
    componentDidMount() {
        
        // Client-side
        if(typeof window !== 'undefined') {
            initGameWithoutAI(this.canvas)
        }
    }

    render() {
        return (
            <Page>
                <div className="row middle-xs" style={{ minHeight: '100vh' }}>
                    <div className="col-xs-12 col-md-4 center-xs start-md">
                        <DisplayText size="medium">HTML5 Pong Game</DisplayText>
                        <DisplayText size="small">By Xavier Le Tohic</DisplayText>
                        <Caption>This project is still work in progress.</Caption>
                        <div className="actions">
                            <Button
                                primary
                                url="https://github.com/XavierLeTohic/pong-game"
                                external
                            >
                                Go to Github
                            </Button>
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-8 center-xs">
                        <div>
                            <canvas
                                ref={c => this.canvas = c}
                                height="450"
                                width="600"
                            />
                        </div>
                    </div>
                    <style jsx>{`
                .actions {
                    margin-top: 20px;
                }
            `}</style>
                </div>
            </Page>
        )
    }
}