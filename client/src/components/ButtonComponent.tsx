import * as React from 'react';
import {ButtonComponentJson} from "./Definitions";
export class ButtonComponent extends React.Component<{json: ButtonComponentJson, width:number | 'auto' , height:number | 'auto' }, {}> {
    constructor(props:any){
        super(props);
    }
    private getFontColor(){
        if(this.props.json.style == 'primary') return 'white';
        if(this.props.json.style == 'secondary') return 'black';
        else return this.props.json.color || '#42659a';
    }
    private getBackgroundColor(){
        if(this.props.json.style == 'primary') return this.props.json.color || '#17c950';
        if(this.props.json.style == 'secondary') return this.props.json.color || '#dcdfe5';
        else return this.props.json.color || 'none';
    }
    private getContentStyle(){
        return {
            backgroundColor: this.getBackgroundColor(),
            width:this.props.width,
            height: this.props.height
        }
    }
    render() {
        const action = this.props.json.action || {
            type: 'postback',
            label: 'Click me',
            data: 'Click me',
            displayText: 'Click me'
        };
        return (
            <div className={`flex-button-component
                flex-button-height-${this.props.json.height || 'md'}
                flex-text-gravity-${this.props.json.gravity || 'top'}`}
                 style = {this.getContentStyle()} >
                <p style={{color: this.getFontColor()}}>{action.label}</p>
            </div>
        );
    }
}