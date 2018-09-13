import * as React from 'react';
import {BubbleContainerJson} from "./Definitions";
import {BoxComponent} from "../components/BoxComponent";
import {ImageComponent} from "../components/ImageComponent";

export class BubbleContainer extends React.Component<{ json: BubbleContainerJson, width: number}, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className={`flex-bubble-container`}>
                {this.props.json.header ? (
                    <div className={`flex-header-block`}>
                        <BoxComponent json={this.props.json.header} width={this.props.width}/>
                    </div>) : null}
                {this.props.json.hero ? <ImageComponent json={this.props.json.hero} width={this.props.width}/> : null}
                {this.props.json.body ? <BoxComponent json={this.props.json.body} width={this.props.width}/> : null}
                {this.props.json.footer ? <BoxComponent json={this.props.json.footer} width={this.props.width}/> : null}
            </div>
        );
    }
}