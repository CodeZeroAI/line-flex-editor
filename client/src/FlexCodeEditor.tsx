import * as React from 'react';
import {BaseComponentJson} from "./components/Definitions";
const AceEditor = require('react-ace');

export class FlexCodeEditor extends React.Component<{json: BaseComponentJson},{}> {
    constructor(props:any){
        super(props);
    }
    private onChange = (newValue: any) =>{
        console.log('changed to ',newValue);
    };
    render() {
        return (
            <div id = 'flex-editor-code-editor' className={`flex-code-editor-container`}>
                <AceEditor
                    mode="java"
                    theme="github"
                    onChange={this.onChange}
                    name="UNIQUE_ID_OF_DIV"
                />
            </div>
        );
    }
}