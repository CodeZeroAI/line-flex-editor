import * as React from 'react';
import {SpacerComponentJson} from "./Definitions";
export class SpacerComponent extends React.Component<{json: SpacerComponentJson}, {}> {
    constructor(props:any){
        super(props);
    }
    render() {
        return (
            <div className={`flex-spacer-component flex-spacer-${this.props.json.size}`}>
            </div>
        );
    }
}