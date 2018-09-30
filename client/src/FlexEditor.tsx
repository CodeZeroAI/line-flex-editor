import * as React from 'react';
import './FlexEditor.css';
import './FlexComponent.css';
import './FlexTooltip.css';
import './FlexTopToolbar.css';
import {CarouselContainerJson} from "./containers/Definitions";
import {CarouselContainer} from "./containers/CarouselContainer";
import {ComponentManager} from "./controllers/ComponentManager";
import {FlexTopToolbar} from "./toolbars/FlexTopToolbar";
export interface FlexEditorProp {json: CarouselContainerJson, selectedIndex : number}
export class FlexEditor extends React.Component<{},FlexEditorProp > {
    private static instance : FlexEditor;
    private history : FlexEditorProp[] = [];
    public static getInstance(){
        return this.instance;
    }
    constructor(props:any){
        super(props);
        FlexEditor.instance = this;
        this.state = {
            json: require('./sample.json'), selectedIndex: 0
        };
        this.history = [JSON.parse(JSON.stringify(this.state))];
    }
    onJsonChanged(){
        console.log('JSON: ',this.state);
        this.history.push(JSON.parse(JSON.stringify(this.state)));
        ComponentManager.getInstance().markAllComponentsNeedResize();
        this.forceUpdate();
    }
    undo(){
        this.history.pop();
        this.setState(this.history[this.history.length - 1]);
    }
    componentDidMount(){
        $("#flex-editor-container").on('click', this.onClick)
    }
    onClick = () => {
        ComponentManager.getInstance().clearActiveComponent();
    };
    render() {
        return (
            <div id = 'flex-editor-container' className={`flex-editor-container`}>
                <FlexTopToolbar json={this.state.json.contents[this.state.selectedIndex] ||
                                        this.state.json.contents[0] } />
                <CarouselContainer json={this.state.json} width={'auto'} height={'auto'}/>
            </div>
        );
    }
}