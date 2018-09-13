import * as React from 'react';
import {ImageComponentJson} from "./Definitions";
import {Utils} from "../Utils";
export class ImageComponent extends React.Component<{json: ImageComponentJson, width:number}, {}> {
    constructor(props:any){
        super(props);
    }
    private getImageHeight = () =>{
        return Utils.calculateHeight(this.props.width, this.props.json.aspectRatio || "1:1");
    };
    private getContainerStyle = ()=>{
        return {
            backgroundSize: this.props.json.aspectMode == 'cover' ? 'cover' : 'contain',
            width:this.props.width,
            height: this.getImageHeight(),
            backgroundImage: `url(${this.props.json.url})`
        };
    };
    render() {
        return (
            <div className={`flex-image-component`} style = {this.getContainerStyle()}>

            </div>
        );
    }
}