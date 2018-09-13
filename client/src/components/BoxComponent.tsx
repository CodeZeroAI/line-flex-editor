import * as React from 'react';
import {BaseComponentJson, BoxComponentJson} from "./Definitions";
import {ComponentFactory} from "./ComponentFactory";
export class BoxComponent extends React.Component<{json: BoxComponentJson, width:number}, {}> {
    constructor(props:any){
        super(props);
    }
    private getChildrenTotalFlex = ()=>{
        return this.props.json.contents.reduce((sum, content: any, index)=>{
            if(content.flex === undefined)
                throw new Error('content '+JSON.stringify(content)+' cannot be inside box content');
            return sum+content.flex;
        }, 0)
    };
    render() {
        return (
            <div className={`flex-box-component`}>
                {this.props.json.contents.map(contentJson=>{
                    const component = ComponentFactory.createComponent(contentJson, this.props.width);
                    if(this.props.json.layout == 'vertical'){
                        return (<div className = 'col-md-12'>{component}</div>);
                    }
                    else if(this.props.json.layout == 'horizontal'){
                        CALCULATE TOTAL AND
                        return (<div className = 'col-md-12'>{component}</div>);
                    }
                    else throw new Error('invalid layout for BoxComponentJson: '+JSON.stringify(this.props.json));
                })}
            </div>
        );
    }
}