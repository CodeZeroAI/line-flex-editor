import * as React from 'react';
import {FillerComponentJson} from "./Definitions";
export class FillerComponent extends React.Component<{json: FillerComponentJson}, {}> {
    constructor(props:any){
        super(props);
    }
    render() {
        return (
            <div className={`flex-filler-component`}>
                FILLER
            </div>
        );
    }
}