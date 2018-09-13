import * as React from 'react';
import {TextComponentJson} from "./Definitions";
export class TextComponent extends React.Component<{json: TextComponentJson}, {}> {
    constructor(props:any){
        super(props);
    }
    render() {
        return (
            <div className={`flex-text-component`}>
                {this.props.json.text}
            </div>
        );
    }
}