import * as React from 'react';
import {BubbleContainerJson} from "./Definitions";
import {BoxComponent} from "../components/BoxComponent";
import {ImageComponent} from "../components/ImageComponent";

export class BubbleContainer extends React.Component<{ json: BubbleContainerJson, width: number, height: number | 'auto'}, {}> {
    private id : string;
    constructor(props: any) {
        super(props);
        this.id = Date.now()+'_'+Math.ceil(Math.random()*100000);
    }
    private getNonBodyHeight(){
        const dom = $(`#${this.id}`);
        let h = 0;
        h += dom.children('.flex-header-block').outerHeight() || 0;
        h += dom.children('.flex-hero-block').outerHeight() || 0;
        h += dom.children('.flex-footer-block').outerHeight() || 0;
        return h;
    }
    private calculateBodyHeight(){
        if(this.props.height == 'auto') return 'auto';
        const h = (this.props.height - this.getNonBodyHeight());
        const topMargin = 20;
        const bottomMargin = this.props.json.footer ? 20 : 10;
        return h - topMargin - bottomMargin;
    }
    render() {
        const width = this.props.width;
        let hasClass =  '';
        if(this.props.json.header) hasClass += 'has-header ';
        if(this.props.json.hero) hasClass += 'has-hero ';
        if(this.props.json.body) hasClass += 'has-body ';
        if(this.props.json.footer) hasClass += 'has-footer ';
        return (
            <div id = {this.id} className={`flex-bubble-container`} style = {{width: `${this.props.width}px`, height: this.props.height == 'auto' ? this.props.height : `${this.props.height}px`}}>
                {this.props.json.header ? (
                    <div className={`flex-header-block flex-block ${hasClass}`}>
                        <BoxComponent json={this.props.json.header} width={width-40} height = 'auto'/>
                    </div>) : null}
                {this.props.json.hero ?
                    <div className={`flex-hero-block flex-block ${hasClass}`}><ImageComponent json={this.props.json.hero} width={width} height = 'auto'/></div> : null}
                {this.props.json.body ?
                    <div className={`flex-body-block flex-block ${hasClass}`}> <BoxComponent json={this.props.json.body} width={width-40} height = {this.calculateBodyHeight()}/></div> : null}
                {this.props.json.footer ?
                    <div className={`flex-footer-block flex-block ${hasClass}`}><BoxComponent json={this.props.json.footer} width={width-20} height = 'auto' /></div> : null}
            </div>
        );
    }
}