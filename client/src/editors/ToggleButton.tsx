import * as React from 'react';
import {Component} from "react";

export class ToggleButton extends Component<{
    icon?:string,
    label?: string,
    defaultValue: boolean,
    tooltip?: string,
    onChange: (value: boolean) => void
}> {
    private id: string = 'D' + Date.now() + '_' + Math.round(Math.random() * 1000000);

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        // $(`${this.id}-${i}`)
    }

    toggle = () => {
        const dom = $(`#${this.id}`);
        dom.toggleClass('toggle-active');
        this.props.onChange(dom.hasClass('toggle-active'));
    };

    render() {
        let btnClass = "btn btn-xs btn btn-flat text-bold flex-tootip-toggle ";
        if(this.props.defaultValue) btnClass += 'toggle-active';
        return (
            <button id={this.id} type="button" title={this.props.tooltip} className={btnClass} onClick={this.toggle}>
                {this.props.icon ? <i className={`icon-${this.props.icon}`} /> : null}
                {this.props.label}
            </button>
        );
    }
}