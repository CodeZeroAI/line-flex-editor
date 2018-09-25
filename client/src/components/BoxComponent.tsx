import * as React from 'react';
import {BoxComponentJson} from "./Definitions";
import {ComponentFactory} from "./ComponentFactory";
import {Utils} from "../Utils";

export class BoxComponent extends React.Component<{ json: BoxComponentJson, width: number | 'auto', height: number | 'auto' }, {}> {
    private id : string;
    private totalAllocatedWidth = 0;
    private totalAllocatedHeight = 0;
    private needResize = true;
    constructor(props: any) {
        super(props);
        this.id = Date.now()+'_'+Math.ceil(Math.random()*100000);
    }

    private getChildrenTotalFlex = () => {
        return this.props.json.contents.reduce((sum, content: any) => {
            let flex = Utils.getFlexValue(content.type, this.props.json.layout, content.flex);
                // throw new Error('content ' + JSON.stringify(content) + ' cannot be inside box content');
            return sum + (flex);
        }, 0) || 1;
    };
    private getAvailableContentWidth(){
        return (Number(this.props.width) || $(`#${this.id}`).outerWidth() || 0) - this.getTotalMarginPixel() - this.totalAllocatedWidth;
    }
    private getRemainingContentHeight(){
        return (Number(this.props.height) || $(`#${this.id}`).outerHeight() || 0) - this.getTotalMarginPixel() - this.totalAllocatedHeight;
    }
    private getChildWidth = (flex: number) => {
        if(flex == 0) return 'auto';
        const totalFlex = this.getChildrenTotalFlex();
        return Math.round(flex / totalFlex * this.getAvailableContentWidth())
    };
    private getChildHeight = (flex: number, id: string) => {
        // if flex is 0 or the component will be resized later, let height be the component's content height
        if(flex == 0 || this.needResize) return 'auto';
        const totalFlex = this.getChildrenTotalFlex();
        const extraHeight = Math.round(flex / totalFlex * this.getRemainingContentHeight());
        console.log("totalFlex: "+totalFlex+' extraHeight: '+extraHeight+' remainingHeight:'+this.getRemainingContentHeight());
        return ($(`#${id}`).outerHeight() || 0)+extraHeight;
    };
    componentWillReceiveProps(nextProps: { json: BoxComponentJson, width: number | 'auto', height: number | 'auto' }){
        if(JSON.stringify(this.props) != JSON.stringify(nextProps)) this.needResize = true;
    }
    private resizeAndUpdateWidth(){
        this.totalAllocatedWidth = 0;
        const contentDoms = $(`#${this.id}`).children('.flex-box-content');
        for(let i in this.props.json.contents){
            const content = this.props.json.contents[i];
            const flex : number = Utils.getFlexValue(content.type, this.props.json.layout, (content as any).flex);
            if(flex == 0 || this.props.json.layout == 'vertical')
                this.totalAllocatedWidth += $(contentDoms[i]).width() || 0;
        }
    }
    private resizeAndUpdateHeight(){
        this.totalAllocatedHeight = 0;
        const contentDoms = $(`#${this.id}`).children('.flex-box-content');
        for(let i in this.props.json.contents){
            const contentJson = this.props.json.contents[i];
            if(contentJson.type == 'spacer' || contentJson.type == 'separator') continue;
            this.totalAllocatedHeight += $(contentDoms[i]).outerHeight() || 0;
        }
    }
    private resizeAndUpdate(){
        if(this.props.json.layout == 'horizontal' || this.props.json.layout == 'baseline')
            this.resizeAndUpdateWidth();
        else
            this.resizeAndUpdateHeight();
        this.needResize = false;
        this.forceUpdate();
    }
    componentDidMount(){
        this.componentDidRender();
    }
    componentDidUpdate(){
        this.componentDidRender();
    }
    componentDidRender = ()=>{
        if(this.needResize)
            this.resizeAndUpdate();
    };
    private getSpacing(){
        return this.props.json.spacing || 'none';//((this.props.json.layout == 'horizontal' ? 'none':'md'));
    }
    private getTotalMarginPixel(){
        let totalMargin = 0;
        for(let content of this.props.json.contents){
            totalMargin += Utils.getMarginPixel((content as any).margin || this.getSpacing())
        }
        return (this.props.json.contents.length - 1) * Utils.getMarginPixel(this.getSpacing());
    }
    render() {
        // console.log("Available content width for ",this.props.json," is "+this.getAvailableContent()+' and zeroflex WidthOrHeight = '+this.totalAllocatedWidth);
        const layout = this.props.json.layout;
        return (
            <div id = {this.id} className={`flex-box-component row flex-box-layout-${layout}`} style = {{height: this.props.height}}>
                {this.props.json.contents.map((contentJson, i) => {
                    const key = this.id+"-c"+i;
                    let componentClass = `flex-box-content flex-box-content-${layout} flex-bot-content-type-${contentJson.type}`;
                    // Spacer ignore spacing attribute
                    if(contentJson.type != 'spacer') componentClass += ` flex-box-spacing-${contentJson.margin || this.getSpacing()}`;

                    const flex = (contentJson as any).flex;
                    const width = (layout == 'vertical') ? this.props.width : this.getChildWidth(Utils.getFlexValue(contentJson.type, layout, flex));
                    const height = (layout == 'horizontal' || layout == 'baseline') ?
                        this.props.height : this.getChildHeight(flex === undefined ? 0 : flex, key);
                    console.log('dimension for ',contentJson,': w='+width+', h='+height);

                    const component = ComponentFactory.createComponent(contentJson, width, height);
                    return (<div key = {key} id = {key} className={`${componentClass}`}>{component}</div>);
                })}
            </div>
        );
    }
}