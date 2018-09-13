import * as React from 'react';
import {ButtonComponentJson} from "./Definitions";
export class ButtonComponent extends React.Component<{json: ButtonComponentJson}, {}> {
    constructor(props:any){
        super(props);
    }
    render() {
        return (
            <div className={`flex-button-component`}>
            </div>
        );
    }
}