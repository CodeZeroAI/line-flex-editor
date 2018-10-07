import * as React from 'react';
import './FlexEditor.css';
import './FlexComponent.css';
import './FlexTooltip.css';
import './FlexTopToolbar.css';
import {CarouselContainerJson} from "./containers/Definitions";
import {ComponentManager} from "./controllers/ComponentManager";
import {FlexTopToolbar} from "./toolbars/FlexTopToolbar";
import {FlexCodeEditor} from "./FlexCodeEditor";
import {FlexVisualEditor} from "./FlexVisualEditor";

export interface FlexEditorProp {
    json: CarouselContainerJson,
    shouldShowJson: boolean
}

export class FlexEditor extends React.Component<{}, FlexEditorProp> {
    private static instance: FlexEditor;
    private history: FlexEditorProp[] = [];
    private codeEditor: FlexCodeEditor;
    private visualEditor: FlexVisualEditor;

    public getCodeEditor() {
        return this.codeEditor;
    }
    public getVisualEditor() {
        return this.visualEditor;
    }

    public static getInstance() {
        return this.instance;
    }

    constructor(props: any) {
        super(props);
        FlexEditor.instance = this;
        this.state = {
            json: require('./sample.json'), shouldShowJson: false
        };
        this.history = [JSON.parse(JSON.stringify(this.state))];
    }

    setShouldShowJson(shouldShowJson: boolean) {
        this.setState({shouldShowJson: shouldShowJson});
    }

    getActiveBubble = () => {
        if(this.visualEditor)
            return this.visualEditor.getCaourselComponent().getCurrentBubbleComponentJson();
        else return this.state.json.contents[0];
    };
    setJson = (json : CarouselContainerJson)=>{
        this.setState({json});
    };
    onJsonChanged() {
        console.log('JSON: ', this.state);
        this.history.push(JSON.parse(JSON.stringify(this.state)));
        ComponentManager.getInstance().markAllComponentsNeedResize();
        this.forceUpdate();
    }

    undo() {
        this.history.pop();
        this.setState(this.history[this.history.length - 1]);
    }

    componentDidMount() {
        $("#flex-editor-container").on('click', this.onClick)
    }

    onClick = () => {
        ComponentManager.getInstance().clearActiveComponent();
    };
    protected onDragOver = () => {
        ComponentManager.getInstance().refreshHoveredBoxComponent();
    };

    render() {
        return (
            <div id='flex-editor-container'
                 className={`flex-editor-container ${this.state.shouldShowJson ? 'json-mode' : ''}`}
                 onDragOverCapture={this.onDragOver}
            >
                <FlexTopToolbar json={this.getActiveBubble()}/>
                <FlexVisualEditor key = {'flex-visual-editor'} json = {this.state.json} ref={(editor) => {
                    this.visualEditor = editor as FlexVisualEditor
                }} />
                {this.state.shouldShowJson ?
                    [<FlexCodeEditor key = {'flex-code-editor'} json={this.state.json} ref={(editor) => {
                        this.codeEditor = editor as FlexCodeEditor
                    }}/>] :
                    null
                }

            </div>
        );
    }
}