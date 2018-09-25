import * as React from 'react';
import {IconComponentJson} from "./Definitions";
export class IconComponent extends React.Component<{json: IconComponentJson}, {}> {
    constructor(props:any){
        super(props);
    }
    render() {
        return (
            <div className={`flex-icon-component
                            flex-text-size-${this.props.json.size}`}>
                <span style = {{
                    "backgroundImage": `url('${this.props.json.url}')`
                }} ></span>
            </div>
        );
    }
}