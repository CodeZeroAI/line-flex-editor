import * as React from 'react';
import {BoxComponentJson, ComponentType, ElementalComponentJson, Layout} from "./Definitions";
import {ComponentFactory} from "./ComponentFactory";
import {Constant, Utils} from "../Utils";
import {BaseComponent} from "./BaseComponent";
import {DropdownSelector} from "../editors/DropdownSelector";
import {ComponentManager} from "../controllers/ComponentManager";
import {FlexEditor} from "../FlexEditor";
import {CarouselContainer} from "../containers/CarouselContainer";
import {BubbleContainer} from "../containers/BubbleContainer";

export class BoxComponent extends BaseComponent<BoxComponentJson> {
    public static readonly BOX_LAYOUT_DROPDOWN = [
        Constant.LAYOUT_VERTICAL, Constant.LAYOUT_HORIZONTAL, Constant.LAYOUT_BASELINE
    ];
    public static readonly BOX_SPACING_DROPDOWN = [
        Constant.SIZING_NONE, Constant.SIZING_XS, Constant.SIZING_SM, Constant.SIZING_MD
        , Constant.SIZING_LG, Constant.SIZING_XL, Constant.SIZING_XXL
    ];

    protected renderEditor(): JSX.Element {
        return (
            <div>
                <div className={'flex-tooltip-section'}>
                    <label className={'flex-tooltip-label'}>Layout</label>
                    <div className={'flex-tooltip-entry'}>
                        <DropdownSelector
                            options={BoxComponent.BOX_LAYOUT_DROPDOWN}
                            defaultValue={this.props.json.layout || 'md'}
                            onChange={this.onLayoutChanged}
                        />
                    </div>
                </div>
                <div className={'flex-tooltip-section'}>
                    <label className={'flex-tooltip-label'}>Spacing</label>
                    <div className={'flex-tooltip-entry'}>
                        <DropdownSelector
                            options={BoxComponent.BOX_SPACING_DROPDOWN}
                            defaultValue={this.props.json.spacing || 'none'}
                            onChange={this.onLayoutChanged}
                        />
                    </div>
                </div>
            </div>
        );
    }
    protected onLayoutChanged = (layout: Layout) => {
        console.log('changing layout to '+layout);
        this.props.json.layout = layout;
        this.onJsonChanged();
    };

    private totalAllocatedWidth = 0;
    private totalAllocatedHeight = 0;

    constructor(props: any) {
        super(props);
    }

    private getChildrenTotalFlex = () => {
        return this.props.json.contents.reduce((sum, content: any) => {
            let flex = Utils.getFlexValue(content.type, this.props.json.layout, content.flex);
            // throw new Error('content ' + JSON.stringify(content) + ' cannot be inside box content');
            return sum + (flex);
        }, 0) || 1;
    };

    private getAvailableContentWidth() {
        return (Number(this.props.width) || $(`#${this.id}`).outerWidth() || 0) - this.getTotalMarginPixel() - this.totalAllocatedWidth;
    }

    private getRemainingContentHeight() {
        return (Number(this.props.height) || $(`#${this.id}`).outerHeight() || 0) - this.getTotalMarginPixel() - this.totalAllocatedHeight;
    }

    private getChildWidth = (flex: number) => {
        if (flex == 0) return 'auto';
        const totalFlex = this.getChildrenTotalFlex();
        return Math.round(flex / totalFlex * this.getAvailableContentWidth())
    };
    private getChildHeight = (flex: number, id: string) => {
        // if flex is 0 or the component will be resized later, let height be the component's content height
        if (flex == 0 || this.needResize) return 'auto';
        const totalFlex = this.getChildrenTotalFlex();
        const extraHeight = Math.round(flex / totalFlex * this.getRemainingContentHeight());
        console.log("totalFlex: " + totalFlex + ' extraHeight: ' + extraHeight + ' remainingHeight:' + this.getRemainingContentHeight());
        return ($(`#${id}`).outerHeight() || 0) + extraHeight;
    };

    componentWillReceiveProps(nextProps: { json: BoxComponentJson, width: number | 'auto', height: number | 'auto' }) {
        if (JSON.stringify(this.props.json) != JSON.stringify(nextProps.json)) this.needResize = true;
    }

    private resizeAndUpdateWidth() {
        this.totalAllocatedWidth = 0;
        const contentDoms = $(`#${this.id}`).children('.flex-box-content');
        for (let i in this.props.json.contents) {
            const content = this.props.json.contents[i];
            const flex: number = Utils.getFlexValue(content.type, this.props.json.layout, (content as any).flex);
            if (flex == 0 || this.props.json.layout == 'vertical')
                this.totalAllocatedWidth += $(contentDoms[i]).width() || 0;
        }
    }

    /**
     * Get level of depth within the flex json content the component reside in
     */
    public getComponentDepth(){
        let depth = 0;
        let parent = this.props.parentContainer;
        while(!(parent instanceof FlexEditor)){
            parent = (parent as BoxComponent|CarouselContainer|BubbleContainer).props.parentContainer;
            depth++;
        }
        return depth;
    }
    private resizeAndUpdateHeight() {
        this.totalAllocatedHeight = 0;
        const contentDoms = $(`#${this.id}`).children('.flex-box-content');
        for (let i in this.props.json.contents) {
            const contentJson = this.props.json.contents[i];
            if (contentJson.type == 'spacer' || contentJson.type == 'separator') continue;
            this.totalAllocatedHeight += $(contentDoms[i]).outerHeight() || 0;
        }
    }

    private resizeAndUpdate() {
        console.log('resizing ', this.props.json);
        if (this.props.json.layout == 'horizontal' || this.props.json.layout == 'baseline')
            this.resizeAndUpdateWidth();
        else
            this.resizeAndUpdateHeight();
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

    protected onDrop = (e: any) => {
        const box = ComponentManager.getInstance().getClosestBoxComponent(this.id);
        const droppedPalette = ComponentManager.getInstance().getDraggingPalette();
        if (droppedPalette) {
            console.log('palette ', droppedPalette, ' dropped on ', box);
            this.addContent(droppedPalette.props.paletteDefinition.type as ComponentType);
            ComponentManager.getInstance().clearDraggingPalette();
        }
    };
    private getSpacing() {
        return this.props.json.spacing || 'none';//((this.props.json.layout == 'horizontal' ? 'none':'md'));
    }
    public onDropoverActive(){
        $(`#${this.id}`).addClass('flex-dragged-over');
    }
    public onDropoverInactive(){
        $(`#${this.id}`).removeClass('flex-dragged-over');
    }
    private getTotalMarginPixel() {
        let totalMargin = 0;
        for (let content of this.props.json.contents) {
            totalMargin += Utils.getMarginPixel((content as any).margin || this.getSpacing())
        }
        return (this.props.json.contents.length - 1) * Utils.getMarginPixel(this.getSpacing());
    }
    public addContent(type: ComponentType){
        this.props.json.contents.push(ComponentManager.ComponentDefaultDefinitions[type] as any);
        this.onJsonChanged();
    }
    public removeContent(index: number){
        return this.props.json.contents.splice(index, 1);
    }
    renderComponent() {
        // console.log("Available content width for ",this.props.json," is "+this.getAvailableContent()+' and zeroflex WidthOrHeight = '+this.totalAllocatedWidth);
        const layout = this.props.json.layout;
        return (
            <div id={this.id} className={`flex-component flex-box-component row flex-box-layout-${layout}
                                        flex-box-content-count-${this.props.json.contents.length}`}
                 style={{height: this.props.height}}>
                {this.props.json.contents.map((contentJson, i) => {
                    const key = this.id + "-c" + i;
                    let gravity: string = (contentJson as ElementalComponentJson).gravity || 'top';
                    if (layout == 'baseline') gravity = 'baseline';

                    let componentClass = `flex-box-content flex-box-content-${layout} flex-gravity-${gravity} flex-bot-content-type-${contentJson.type}`;
                    // Spacer ignore spacing attribute
                    if (contentJson.type != 'spacer') componentClass += ` flex-box-spacing-${contentJson.margin || this.getSpacing()}`;

                    const flex = (contentJson as any).flex;
                    const width = (layout == 'vertical') ? this.props.width : this.getChildWidth(Utils.getFlexValue(contentJson.type, layout, flex));
                    const height = (layout == 'horizontal' || layout == 'baseline') ?
                        this.props.height : this.getChildHeight(flex === undefined ? 0 : flex, key);
                    // console.log('dimension for ',contentJson,': w='+width+', h='+height);

                    const component = ComponentFactory.createComponent(contentJson, width, height, this);
                    return (<div key={key} id={key} data-index = {i} className={`${componentClass}`} style = {{
                        width:`${width}px`,
                        height: `${height}px`
                    }}>{component}</div>);
                })}
            </div>
        );
    }
}