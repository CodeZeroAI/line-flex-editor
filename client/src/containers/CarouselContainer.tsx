import * as React from 'react';
import {CarouselContainerJson} from "./Definitions";
import {BubbleContainer} from "./BubbleContainer";
import {BaseComponent} from "../components/BaseComponent";
import {FlexEditor} from "../FlexEditor";

declare const Swiper: any;

export class CarouselContainer extends BaseComponent<CarouselContainerJson> {
    private maxHeight = 0;
    private swiper: any;
    currentIndex = 0;
    private bubbles: BubbleContainer[] = [];

    constructor(props: any) {
        super(props);
    }

    getBubbleCount(){
        return this.props.json.contents.length;
    }
    isFull(){
        return this.props.json.contents.length >= 10;
    }
    getCurrentBubbleComponentJson(){
        return this.props.json.contents[this.currentIndex];
    }
    removeCurrentBubbleComponent(){
        this.props.json.contents.splice(this.currentIndex--, 1);
        if(this.currentIndex < 0) this.currentIndex = 0;
        FlexEditor.getInstance().onJsonChanged();
        setTimeout(()=>{
            this.initSwiper(this.currentIndex);
        }, 50);
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
    initSwiper(index = 0){
        if(this.swiper) this.swiper.destroy();
        this.swiper = new Swiper(`#${this.id}`, {
            effect: 'slide',
            initialSlide: index,
            loop: false,
            centeredSlides: true,
            slidesPerView: 4,
            keyboardControl: true,
            mousewheelControl: true,
            lazyLoading: true,
            simulateTouch: false,
            preventClicks: false,
            preventClicksPropagation: false,
            lazyLoadingInPrevNext: true,
            nextButton: `#${this.id} .swiper-button-next`,
            prevButton: `#${this.id} .swiper-button-prev`,
            pagination: {
                el: `#${this.id} .swiper-pagination`,
                clickable: true
            },
            // Responsive breakpoints
            breakpoints: {
                // when window width is <= 800px
                800: {
                    slidesPerView: 1
                },
                // when window width is <= 1280px
                1280: {
                    slidesPerView: 2
                },
                // when window width is <= 1280px
                1400: {
                    slidesPerView: 3
                }
            }
        });
        this.swiper.on('slideChange', this.onSlideChange);
    }
    componentDidMount() {
        super.componentDidMount();
        console.log(this.swiper);
        $(`#${this.id} .swiper-button-prev`).on('click', this.selectPreviousBubble);
        $(`#${this.id} .swiper-button-next`).on('click', this.selectNextBubble);
        const self = this;
        $(`#${this.id} .swiper-pagination-bullet`).on('click', function () {
            self.selectBubbleWithIndex($(this).index());
        });
        this.initSwiper();
        this.selectBubbleWithIndex(this.currentIndex);
        this.componentDidRender();
    }
    onSlideChange = () => {
        this.currentIndex = this.swiper.realIndex;

        // Index is at add carousel card
        if(this.currentIndex == this.props.json.contents.length){
            this.selectPreviousBubble();
        }
        else{
            if (this.currentIndex == 0)
                $(`#${this.id} .swiper-button-prev`).hide();
            else
                $(`#${this.id} .swiper-button-prev`).show();
            if (this.currentIndex >= this.getBubbleCount() - 1){
                $(`#${this.id} .swiper-button-next`).removeClass('icon-arrow-right32')
                    .addClass('icon-plus-3');
            }
            else{
                $(`#${this.id} .swiper-button-next`).addClass('icon-arrow-right32')
                    .removeClass('icon-plus-3');
            }
            FlexEditor.getInstance().topToolbar.refreshBubble();
        }
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
        if (this.currentIndex < this.getBubbleCount() - 1) {
            this.selectBubbleWithIndex(++this.currentIndex);
        }
    };

    componentDidUpdate() {
        this.componentDidRender();
    }

    componentDidRender = () => {
        if (this.needResize)
            this.resizeAndUpdate();
        this.onSlideChange();
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
    addNewCarousel = () =>{
        this.props.json.contents.push(JSON.parse(JSON.stringify(this.props.json.contents[this.getBubbleCount() - 1])));
        this.onJsonChanged();
        setTimeout(()=>{
            this.initSwiper(this.currentIndex);
            setTimeout(()=>{
                this.selectBubbleWithIndex(this.getBubbleCount()-1)
            }, 50);
        }, 50);
    };
    renderComponent() {
        console.log("rendering with ",this);
        if (this.needResize) this.maxHeight = 0;
        return (
            <div id={this.id} className={`flex-carousel-container swiper-container`}>
                <div className={'swiper-wrapper'}>
                    {this.generateBubbles()}
                    {!this.isFull() ?
                    <div className="swiper-slide flex-bubble-wrapper flex-add-carousel-slide">
                        <div className="">
                            <div id="C1538914237020_14935" className="flex-bubble-container"
                                 onClick={this.addNewCarousel}
                                 style={{"width": "300px", "height": "450px"}}>
                                <div className="flex-body-block flex-block has-body ">
                                    <div id="C1538914237021_14528"
                                         className="flex-component flex-box-component row flex-box-layout-horizontal flex-box-content-count-1"
                                         style={{"height": "420px"}}>
                                        <div id="C1538914237021_14528-c0" data-index="0"
                                             className="flex-box-content flex-box-content-horizontal flex-gravity-center flex-bot-content-type-button flex-box-spacing-sm"
                                             style={{"width": "260px", "height": "420px"}}>
                                            <div className="">
                                                <div id="C1538914237022_92259"
                                                     className="flex-component flex-button-component flex-button-height-md flex-text-gravity-center"
                                                     style={{"width": "260px"}}>
                                                    <p className={'flex-add-carousel-icon'}><i
                                                        className="icon-plus-circle2" />
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> : null}
                </div>
                <div className={`swiper-pagination ${this.isFull() ? 'full':''}`} />
                <div className="swiper-button-prev icon-arrow-left32" />
                <div className="swiper-button-next" />
            </div>
        );
    }

    onComponentClicked = (e: any) => {
        // ComponentManager.getInstance().setActiveComponent(this.bubbles[FlexEditor.getInstance().state.selectedIndex]);
        // e.stopPropagation();
    };
}