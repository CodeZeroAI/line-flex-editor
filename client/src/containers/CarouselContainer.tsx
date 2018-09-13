import * as React from 'react';
import {CarouselContainerJson} from "./Definitions";
import {BubbleContainer} from "./BubbleContainer";
export class CarouselContainer extends React.Component<{json: CarouselContainerJson}, {}> {
    constructor(props:any){
        super(props);
    }
    generateBubbles = () =>{
        return this.props.json.contents.map((bubbleJson)=>{
            return <BubbleContainer json={bubbleJson} width={281}/>
        })
    };
    render() {
        return (
            <div className={`flex-carousel-container`}>
                {this.generateBubbles()}
            </div>
        );
    }
}