import * as React from 'react';
import {CarouselContainerJson} from "./Definitions";
import {BubbleContainer} from "./BubbleContainer";
import {BaseComponent} from "../components/BaseComponent";

export class CarouselContainer extends BaseComponent<CarouselContainerJson> {
    private maxHeight = 0;

    constructor(props: any) {
        super(props);
    }

    private resizeAndUpdate() {
        const self = this;
        $(`#${this.id}`).find('.flex-bubble-container').each(function(){
            let bubbleHeight = 0;
            $(this).find('.flex-block').each(function(){
                bubbleHeight += $(this).outerHeight() || 0;
            });
            self.maxHeight = Math.max(bubbleHeight, self.maxHeight)
        });
        this.needResize = false;
        this.forceUpdate();
    }

    componentDidMount() {
        super.componentDidMount();
        this.componentDidRender();
    }

    componentDidUpdate() {
        this.componentDidRender();
    }

    componentDidRender = () => {
        if (this.needResize)
            this.resizeAndUpdate();
    };
    generateBubbles = () => {
        return this.props.json.contents.map((bubbleJson, i) => {
            return <BubbleContainer key={`bubble-${i}`} json={bubbleJson} width={300}
                                    height={this.maxHeight || 'auto'}/>
        })
    };

    renderComponent() {
        if(this.needResize) this.maxHeight = 0;
        return (
            <div id = {this.id}  className={`flex-carousel-container`}>
                    {this.generateBubbles()}
            </div>
        );
    }
}