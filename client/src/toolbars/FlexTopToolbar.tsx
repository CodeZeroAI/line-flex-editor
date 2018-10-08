import * as React from 'react';
import {BlockStyleJson} from "../containers/Definitions";
import {ToggleButton} from "../editors/ToggleButton";
import {ComponentManager} from "../controllers/ComponentManager";
import {FlexEditor} from "../FlexEditor";
import {BoxComponentJson, ImageComponentJson} from "../components/Definitions";

export class FlexTopToolbar extends React.Component<{}, {}> {
    private previousContent: {
        header?: BoxComponentJson,
        hero?: ImageComponentJson,
        body?: BoxComponentJson,
        footer?: BoxComponentJson
    } = {};
    private previousStyle: {
        header?: BlockStyleJson,
        hero?: BlockStyleJson,
        body?: BlockStyleJson,
        footer?: BlockStyleJson
    } = {};

    refreshBubble = () => {
        this.forceUpdate();
    };

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
    onJSONTriggered = (shouldShowJson: boolean) => {
        FlexEditor.getInstance().setShouldShowJson(shouldShowJson);
    };
    onTriggered = (part: 'header' | 'hero' | 'body' | 'footer', shouldExist: boolean) => {
        const bubbleJson = FlexEditor.getInstance().getActiveBubble();
        if (shouldExist && !bubbleJson[part]) {
            if (this.previousContent[part]) {
                bubbleJson[part] = this.previousContent[part];
                bubbleJson.styles[part] = this.previousStyle[part] as BlockStyleJson;
            }
            else if (part == 'hero') {
                bubbleJson['hero'] = ComponentManager.ComponentDefaultDefinitions.image as ImageComponentJson;
                bubbleJson.styles['hero'] = {}
            }
            else {
                bubbleJson[part] = ComponentManager.ComponentDefaultDefinitions.box as BoxComponentJson;
                bubbleJson.styles[part] = {}
            }
            FlexEditor.getInstance().onJsonChanged();
        }
        else if (!shouldExist && bubbleJson[part]) {
            this.previousContent[part] = bubbleJson[part];
            this.previousStyle[part] = bubbleJson.styles[part];
            delete bubbleJson[part];
            delete bubbleJson.styles[part];
            FlexEditor.getInstance().onJsonChanged();
        }
    };
    removeBubble = () => {
        FlexEditor.getInstance().getVisualEditor().getCaourselComponent().removeCurrentBubbleComponent();
    };

    render() {
        const bubbleJson = FlexEditor.getInstance().getActiveBubble();
        console.log("Topbar props: ", this.props);
        const hasHeader = !!bubbleJson.header;
        const hasHero = !!bubbleJson.hero;
        const hasBody = !!bubbleJson.body;
        const hasFooter = !!bubbleJson.footer;
        const isJsonMode = FlexEditor.getInstance().state.shouldShowJson;
        const hasSingleBubble = FlexEditor.getInstance().getVisualEditor() &&
            (FlexEditor.getInstance().getVisualEditor().getCaourselComponent().props.json.contents.length <= 1);
        return (
            <div className="flex-editor-top-nav">
                {isJsonMode ? null : [
                    <ToggleButton key={'top-nav-toggle-header'} label={'Header'} defaultValue={hasHeader}
                                  onChange={this.onHeaderTriggered}/>,
                    <ToggleButton key={'top-nav-toggle-hero'} label={'Hero'} defaultValue={hasHero}
                                  onChange={this.onHeroTriggered}/>,
                    <ToggleButton key={'top-nav-toggle-body'} label={'Body'} defaultValue={hasBody}
                                  onChange={this.onBodyTriggered}/>,
                    <ToggleButton key={'top-nav-toggle-footer'} label={'Footer'} defaultValue={hasFooter}
                                  onChange={this.onFooterTriggered}/>
                ]}
                <div style={{position: 'absolute', 'right': '10px'}}>
                    <ToggleButton icon={'code'}
                                  label={'JSON'}
                                  defaultValue={FlexEditor.getInstance().state.shouldShowJson}
                                  onChange={this.onJSONTriggered}
                    />
                        <button className={`btn-remove-bubble btn btn-xs btn btn-flat text-bold flex-tootip-toggle ${hasSingleBubble ? 'disabled':''}`}
                                 onClick={hasSingleBubble ? undefined : this.removeBubble}
                        >
                            <i className={'icon-trash'}/> Delete bubble
                        </button>
                </div>
            </div>
        );
    }
}