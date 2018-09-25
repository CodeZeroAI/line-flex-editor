import * as React from 'react';
import {ImageComponentJson} from "./Definitions";
import {Utils} from "../Utils";
export class ImageComponent extends React.Component<{json: ImageComponentJson, width:number | 'auto' , height:number | 'auto' }, {}> {
    constructor(props:any){
        super(props);
    }
    private getImageHeight = () =>{
        return Utils.calculateHeight(this.getImageWidth(), this.props.json.aspectRatio || "1:1");
    };
    private getImageWidth(){
        const specSize = Utils.getImageSizePixel(this.props.json.size || 'md');
        if(this.props.width == 'auto') return specSize;
        return Math.min(specSize, this.props.width);
    }

    /**
     * Get horizontal margin when image size is not equal to component size calculated from flex spec
     */
    private getHorizontalMargin(){
        if(this.props.width == 'auto')return 0;
        return (this.props.width - this.getImageWidth()) / 2;
    }
    private getContainerStyle = ()=>{
        return {
            backgroundSize: this.props.json.aspectMode == 'cover' ? 'cover' : 'contain',
            width:this.getImageWidth(),
            height: this.getImageHeight(),
            margin: `0 ${this.getHorizontalMargin()}px`,
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