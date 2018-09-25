import * as React from 'react';
import {SeparatorComponentJson} from "./Definitions";
export class SeparatorComponent extends React.Component<{json: SeparatorComponentJson}, {}> {
    constructor(props:any){
        super(props);
    }
    render() {
        return (
            <div className={`flex-separator-component`}>
            </div>
        );
    }
}