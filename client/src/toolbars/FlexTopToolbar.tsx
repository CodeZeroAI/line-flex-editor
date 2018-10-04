import * as React from 'react';
import {BlockStyleJson, BubbleContainerJson} from "../containers/Definitions";
import {ToggleButton} from "../editors/ToggleButton";
import {ComponentManager} from "../controllers/ComponentManager";
import {FlexEditor} from "../FlexEditor";
import {BoxComponentJson, ImageComponentJson} from "../components/Definitions";

export class FlexTopToolbar extends React.Component<{ json: BubbleContainerJson }, {}> {
    private previousContent : {
        header?: BoxComponentJson,
        hero?: ImageComponentJson,
        body?: BoxComponentJson,
        footer?: BoxComponentJson
    } = {};
    private previousStyle : {
        header?: BlockStyleJson,
        hero?: BlockStyleJson,
        body?: BlockStyleJson,
        footer?: BlockStyleJson
    } = {};

    constructor(props: any) {
        super(props);
    }

    onHeaderTriggered = (shouldExist: boolean) => {
        this.onTriggered('header', shouldExist)
    };
    onHeroTriggered = (shouldExist: boolean) => {
        this.onTriggered('hero', shouldExist)
    };
    onBodyTriggered = (shouldExist: boolean) => {
        this.onTriggered('body', shouldExist)
    };
    onFooterTriggered = (shouldExist: boolean) => {
        this.onTriggered('footer', shouldExist)
    };
    onTriggered = (part: 'header' | 'hero' | 'body' | 'footer', shouldExist: boolean) => {
        if (shouldExist && !this.props.json[part]) {
            if (this.previousContent[part]){
                this.props.json[part] = this.previousContent[part];
                this.props.json.styles[part] = this.previousStyle[part] as BlockStyleJson;
            }
            else if (part == 'hero') {
                this.props.json['hero'] = ComponentManager.ComponentDefaultDefinitions.image as ImageComponentJson;
                this.props.json.styles['hero'] = {}
            }
            else {
                this.props.json[part] = ComponentManager.ComponentDefaultDefinitions.box as BoxComponentJson;
                this.props.json.styles[part] = {}
            }
            FlexEditor.getInstance().onJsonChanged();
        }
        else if (!shouldExist && this.props.json[part]) {
            this.previousContent[part] = this.props.json[part];
            this.previousStyle[part] = this.props.json.styles[part];
            delete this.props.json[part];
            delete this.props.json.styles[part];
            FlexEditor.getInstance().onJsonChanged();
        }
    };

    render() {
        const hasHeader = !!this.props.json.header;
        const hasHero = !!this.props.json.hero;
        const hasBody = !!this.props.json.body;
        const hasFooter = !!this.props.json.footer;
        return (
            <div className="flex-editor-top-nav">
                <ToggleButton label={'Header'} defaultValue={hasHeader} onChange={this.onHeaderTriggered}/>
                <ToggleButton label={'Hero'} defaultValue={hasHero} onChange={this.onHeroTriggered}/>
                <ToggleButton label={'Body'} defaultValue={hasBody} onChange={this.onBodyTriggered}/>
                <ToggleButton label={'Footer'} defaultValue={hasFooter} onChange={this.onFooterTriggered}/>
            </div>
        );
    }
}