import * as React from 'react';
import {TextComponentJson} from "./Definitions";

export class TextComponent extends React.Component<{json: TextComponentJson, width:number | "auto", height:number | "auto"}, {}> {
    constructor(props:any){
        super(props);
    }
    private getContentStyle(){
        const json : any = {
            color:this.props.json.color,
            width:this.props.width,
            height:this.props.height
        };
        return json;
    }
    render() {
        return (
            <div className={`flex-text-component
                flex-text-align-${this.props.json.align || 'start'}
                flex-text-gravity-${this.props.json.gravity || 'top'}
                flex-text-size-${this.props.json.size}
                ${this.props.json.wrap ? 'flex-text-wrap' : ''}
                flex-text-weight-${this.props.json.weight}`} style = {this.getContentStyle()} >
                <p>{this.props.json.text}</p>
            </div>
        );
    }
}