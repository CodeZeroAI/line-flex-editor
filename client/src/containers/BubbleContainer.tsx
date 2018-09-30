import * as React from 'react';
import {BubbleContainerJson} from "./Definitions";
import {BoxComponent} from "../components/BoxComponent";
import {ImageComponent} from "../components/ImageComponent";
import {BaseComponent} from "../components/BaseComponent";
import {BlockStyleEditor} from "../editors/BlockStyleEditor";

export class BubbleContainer extends BaseComponent<BubbleContainerJson> {
    constructor(props: any) {
        super(props);
    }

    private getNonBodyHeight() {
        const dom = $(`#${this.id}`);
        let h = 0;
        h += dom.find('.flex-header-block').outerHeight() || 0;
        h += dom.find('.flex-hero-block').outerHeight() || 0;
        h += dom.find('.flex-footer-block').outerHeight() || 0;
        return h;
    }

    private calculateBodyHeight() {
        if (this.props.height == 'auto' || this.needResize) return 'auto';
        const h = (this.props.height - this.getNonBodyHeight());
        const topMargin = 20;
        const bottomMargin = this.props.json.footer ? 20 : 10;
        return h - topMargin - bottomMargin;
    }

    protected renderEditor(): JSX.Element {
        return (
            <div>
                {this.getBlockStyleComponent('header')}
                {this.getBlockStyleComponent('hero')}
                {this.getBlockStyleComponent('body')}
                {this.getBlockStyleComponent('footer')}
            </div>
        );
    }

    private getBlockStyleComponent = (type: 'header' | 'hero' | 'body' | 'footer') => {
        return this.props.json.styles[type] ? <BlockStyleEditor json={this.props.json.styles[type]} prefix={type}
                                                                onJsonChanged={this.onJsonChanged}/> : null;
    };
    private getBlockStyleCss = (type: 'header' | 'hero' | 'body' | 'footer') => {
        if (!this.props.json.styles[type]) return {};
        const styleJson = this.props.json.styles[type];
        return {
            background: styleJson.backgroundColor || 'none',
            borderTop: styleJson.separator ? `solid 1px ${styleJson.separatorColor || '#D4D6DA'}` : 'none',
            marginTop: styleJson.separator ? '-1px' : '0'
        }
    };

    renderComponent() {
        const width = this.props.width as number;
        let hasClass = '';
        if (this.props.json.header) hasClass += 'has-header ';
        if (this.props.json.hero) hasClass += 'has-hero ';
        if (this.props.json.body) hasClass += 'has-body ';
        if (this.props.json.footer) hasClass += 'has-footer ';
        return (
            <div id={this.id} className={`flex-bubble-container`} style={{
                width: `${this.props.width}px`,
                height: this.props.height == 'auto' ? this.props.height : `${this.props.height}px`
            }}>
                {this.props.json.header ? (
                    <div className={`flex-header-block flex-block ${hasClass}`} style={this.getBlockStyleCss('header')}>
                        <BoxComponent json={this.props.json.header} width={width - 40} height='auto'/>
                    </div>) : null}
                {this.props.json.hero ?
                    <div className={`flex-hero-block flex-block ${hasClass}`} style={this.getBlockStyleCss('hero')}>
                        <ImageComponent json={this.props.json.hero} width={width} height='auto'/></div> : null}
                {this.props.json.body ?
                    <div className={`flex-body-block flex-block ${hasClass}`} style={this.getBlockStyleCss('body')}>
                        <BoxComponent json={this.props.json.body} width={width - 40}
                                      height={this.calculateBodyHeight()}/></div> : null}
                {this.props.json.footer ?
                    <div className={`flex-footer-block flex-block ${hasClass}`} style={this.getBlockStyleCss('footer')}>
                        <BoxComponent json={this.props.json.footer} width={width - 20} height='auto'/></div> : null}
            </div>
        );
    }
}