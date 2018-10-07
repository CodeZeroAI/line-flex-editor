import * as React from 'react';
import {FlexEditor} from "./FlexEditor";
import {CarouselContainerJson} from "./containers/Definitions";

declare const ace : any;
export class FlexCodeEditor extends React.Component<{json: CarouselContainerJson},{}> {
    private editor: any;
    constructor(props:any){
        super(props);
    }
    componentDidMount(){
        this.editor = ace.edit('flex-editor-code-editor', {
        });
        this.editor.setOption({
            highlightSelectedWord: false
        });
        this.editor.session.setMode("ace/mode/javascript");
        this.editor.getSession().on('change', this.onJSONChanged);
        this.componentDidRender();
    }
    private scheduleId : number;
    onJSONChanged = () =>{
        const scheduleId = this.scheduleId = Date.now();
        setTimeout(()=>{
            if(scheduleId != this.scheduleId) return;
            try{
                if(JSON.stringify(JSON.parse(this.editor.getValue())) == JSON.stringify(this.props.json)) return;
                const json = JSON.parse(this.editor.getValue());
                this.props = {json:json};
                FlexEditor.getInstance().setJson(json);
            }
            catch(e){

            }
        }, 200)
    };
    shouldComponentUpdate(nextProp: {json: CarouselContainerJson}){
        return JSON.stringify(nextProp) != JSON.stringify(this.props);
    }
    componentDidRender = () =>{
        this.editor.setValue(JSON.stringify(this.props.json, null, 4));
        this.editor.clearSelection();
    };
    componentDidUpdate(){
        this.componentDidRender();
    }
    render() {
        return (
            <div id = 'flex-editor-code-editor' className={`flex-code-editor-container`}>

            </div>
        );
    }
}