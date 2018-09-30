import * as React from 'react';
import {Component} from "react";
export interface DropdownSelectorProps {
    options: { value: string, label: string, icon?: string, description?: string }[],
    defaultValue: string,
    width?: string,
    paddingX?: number,
    tooltip?: string,
    hideTextOnLabel?: boolean,
    id?: string,
    dropup?: boolean,
    onChange: (value: string) => void
}
export class DropdownSelector extends Component<DropdownSelectorProps> {
    private id: string = 'D' + Date.now() + '_' + Math.round(Math.random() * 1000000);
    private currentValue : string;
    constructor(props: DropdownSelectorProps) {
        super(props);
        if(props.id) this.id = props.id;
    }

    componentDidMount() {
        // $(`${this.id}-${i}`)
    }
    getCurrentValue(){
        return this.currentValue;
    }
    onSelect = (option: { value: string, label: string, icon?: string }) => {
        const textDom = $(`#${this.id}>button>b:first-child`);
        textDom.empty();
        if (option.icon) textDom.append(`<i class = 'icon-${option.icon} position-left' />`);
        if (!this.props.hideTextOnLabel) textDom.append(option.label);
        this.currentValue = option.value;
        this.props.onChange(option.value);
    };

    render() {
        this.currentValue = this.props.defaultValue;
        let defaultOption: { value: string, label: string, icon?: string } | null = null;
        for (const opt of this.props.options) {
            if (opt.value == this.props.defaultValue) defaultOption = opt;
        }
        if (!defaultOption) defaultOption = this.props.options[0];

        const style : any = {};
        if(this.props.paddingX)
            style.paddingLeft = style.paddingRight = this.props.paddingX+'px';
        // console.log('defaultOption: ',defaultOption);
        // console.log('props: ',this.props);
        return (
            <div id={this.id} className="btn-group flex-tooltip-selector"
                 style={{width: this.props.width || '100%', marginRight: '5px'}}>
                <button type="button" className={"btn btn-flat border-teal dropdown-toggle legitRipple "+(this.props.dropup ? 'dropup' : '')}
                        title={this.props.tooltip}
                        data-toggle="dropdown"
                        style={style}
                        aria-expanded="false">
                        {defaultOption.icon ? <i className={`icon-${defaultOption.icon} position-left`}/> : null}
                    {this.props.hideTextOnLabel ? null : (<b>{defaultOption.label}</b>)}
                    <span className="caret flex-tooltip-dropdown-caret"/>
                </button>
                <ul className="dropdown-menu dropdown-menu-right">
                    {this.props.options.map((opt, i) => {
                        const onOptClicked = () => {
                            this.onSelect(opt);
                        };
                        return (
                            <li key={`${this.id}-${i}`}>
                                <a href="javascript:void(0);" onClick={onOptClicked} title = {opt.description}>
                                    {opt.icon ? <i className={`icon-${opt.icon} position-left`}/> : null}
                                    {opt.label}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}