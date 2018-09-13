import * as React from 'react';
import './FlexEditor.css';
import {CarouselContainerJson} from "./containers/Definitions";
import {CarouselContainer} from "./containers/CarouselContainer";
export class FlexEditor extends React.Component<{}, {json: CarouselContainerJson}> {
    constructor(props:any){
        super(props);
        this.state = {
            json: require('./sample.json')
        }
    }
    render() {
        return (
            <div className={`flex-editor-container`}>
                <CarouselContainer json={this.state.json}/>
            </div>
        );
    }
}