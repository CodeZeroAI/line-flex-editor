import * as React from 'react';
import {CarouselContainerJson} from "./Definitions";
import {BubbleContainer} from "./BubbleContainer";

export class CarouselContainer extends React.Component<{ json: CarouselContainerJson }, {}> {
    private needResize = true;
    private maxHeight = 0;

    constructor(props: any) {
        super(props);
    }

    private resizeAndUpdate() {
        const self = this;
        $(`#carousel-container`).children('.flex-bubble-container').each(function(){
            let bubbleHeight = 0;
            $(this).children('.flex-block').each(function(){
                bubbleHeight += $(this).outerHeight() || 0;
            });
            self.maxHeight = Math.max(bubbleHeight, self.maxHeight)
        });
        this.needResize = false;
        this.forceUpdate();
    }

    componentDidMount() {
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

    render() {
        return (
            <div id={'carousel-container'} className={`flex-carousel-container`}>
                    {this.generateBubbles()}
            </div>
        );
    }
}