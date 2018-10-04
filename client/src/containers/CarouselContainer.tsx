import * as React from 'react';
import {CarouselContainerJson} from "./Definitions";
import {BubbleContainer} from "./BubbleContainer";
import {BaseComponent} from "../components/BaseComponent";
import {ComponentManager} from "../controllers/ComponentManager";
import {FlexEditor} from "../FlexEditor";

export class CarouselContainer extends BaseComponent<CarouselContainerJson> {
    private maxHeight = 0;
    private bubbles : BubbleContainer[] = [];
    constructor(props: any) {
        super(props);
    }

    protected renderEditor(): JSX.Element | null{
        return null;
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
        this.bubbles = [];
        return this.props.json.contents.map((bubbleJson, i) => {
            return <BubbleContainer key={`bubble-${i}`} json={bubbleJson}
                                    width={300} ref={(comp)=>{if(comp)this.bubbles[i] = comp}}
                                    parentContainer={this}
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

    onComponentClicked = (e: any) => {
        ComponentManager.getInstance().setActiveComponent(this.bubbles[FlexEditor.getInstance().state.selectedIndex]);
        e.stopPropagation();
    };
}