import * as React from 'react';
import {CarouselContainerJson} from "./Definitions";
import {BubbleContainer} from "./BubbleContainer";
import {BaseComponent} from "../components/BaseComponent";

declare const Swiper: any;

export class CarouselContainer extends BaseComponent<CarouselContainerJson> {
    private maxHeight = 0;
    private swiper: any;
    currentIndex = 0;
    private bubbles: BubbleContainer[] = [];

    constructor(props: any) {
        super(props);
    }

    getCurrentBubbleComponentJson(){
        return this.props.json.contents[this.currentIndex];
    }
    protected renderEditor(): JSX.Element | null {
        return null;
    }

    private resizeAndUpdate() {
        const self = this;
        $(`#${this.id}`).find('.flex-bubble-container').each(function () {
            let bubbleHeight = 0;
            $(this).find('.flex-block').each(function () {
                bubbleHeight += $(this).outerHeight() || 0;
            });
            self.maxHeight = Math.max(bubbleHeight, self.maxHeight);
        });
        console.log('max height: '+this.maxHeight);
        this.needResize = false;
        this.forceUpdate();
    }

    componentDidMount() {
        super.componentDidMount();
        this.swiper = new Swiper(`#${this.id}`, {
            effect: 'coverflow',
            loop: false,
            centeredSlides: true,
            slidesPerView: 3,
            initialSlide: 0,
            keyboardControl: true,
            mousewheelControl: true,
            lazyLoading: true,
            preventClicks: false,
            preventClicksPropagation: false,
            lazyLoadingInPrevNext: true,
            nextButton: `#${this.id} .swiper-button-next`,
            prevButton: `#${this.id} .swiper-button-prev`,
            coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 10,
                modifier: 0,
                slideShadows: false,
            },
            pagination: {
                el: `#${this.id} .swiper-pagination`,
            }
        });
        console.log(this.swiper);
        $(`#${this.id} .swiper-button-prev`).on('click', this.selectPreviousBubble);
        $(`#${this.id} .swiper-button-next`).on('click', this.selectNextBubble);
        const self = this;
        $(`#${this.id} .swiper-pagination-bullet`).on('click', function () {
            self.selectBubbleWithIndex($(this).index());
        });
        this.swiper.on('slideChange', this.onSlideChange);
        this.selectBubbleWithIndex(this.currentIndex);
        this.componentDidRender();
    }
    onSlideChange = () => {
        this.currentIndex = this.swiper.realIndex;
        if (this.currentIndex == 0)
            $(`#${this.id} .swiper-button-prev`).hide();
        else
            $(`#${this.id} .swiper-button-prev`).show();
        if (this.currentIndex >= this.props.json.contents.length - 1)
            $(`#${this.id} .swiper-button-next`).hide();
        else
            $(`#${this.id} .swiper-button-next`).show();
    };
    selectPreviousBubble = () => {
        if (this.currentIndex > 0) {
            this.selectBubbleWithIndex(--this.currentIndex);
        }
    };
    selectBubbleWithIndex(index: number) {
        this.swiper.slideTo(index);
    }

    selectNextBubble = () => {
        if (this.currentIndex < this.props.json.contents.length - 1) {
            this.selectBubbleWithIndex(++this.currentIndex);
        }
    };

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
            return (
                <div key={`bubble-${i}`} className={'swiper-slide flex-bubble-wrapper'}>
                    <BubbleContainer
                        json={bubbleJson}
                        width={300} ref={(comp) => {
                        if (comp) this.bubbles[i] = comp
                    }}
                        parentContainer={this}
                        height={this.maxHeight || 'auto'}/>
                </div>
            )
        })
    };

    renderComponent() {
        console.log("rendering with ",this);
        if (this.needResize) this.maxHeight = 0;
        return (
            <div id={this.id} className={`flex-carousel-container swiper-container`}>
                <div className={'swiper-wrapper'}>
                    {this.generateBubbles()}
                </div>
                <div className="swiper-pagination"></div>
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
            </div>
        );
    }

    onComponentClicked = (e: any) => {
        // ComponentManager.getInstance().setActiveComponent(this.bubbles[FlexEditor.getInstance().state.selectedIndex]);
        // e.stopPropagation();
    };
}