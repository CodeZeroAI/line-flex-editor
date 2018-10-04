import * as React from 'react';
import {BlockStyleJson} from "../containers/Definitions";
import {ToggleButton} from "./ToggleButton";

export class BlockStyleEditor extends React.Component<{ json: BlockStyleJson, prefix: string, onJsonChanged: () => void }, {}> {
    public readonly id: string;

    constructor(props: any) {
        super(props);
        this.id = "C" + Date.now() + '_' + Math.ceil(Math.random() * 100000);
    }

    protected onBackgroundColorChanged = () => {
        const color = $(`#${this.id}-edit-background-color`).val() + '';
        console.log('changing background color to ' + color);
        this.props.json.backgroundColor = color;
        this.props.onJsonChanged();
    };

    protected onSeparatorColorChanged = () => {
        const color = $(`#${this.id}-edit-separator-color`).val() + '';
        console.log('changing separator color to ' + color);
        this.props.json.separatorColor = color;
        this.props.onJsonChanged();
    };
    protected onSeparatorToggle = (separator: boolean) => {
        this.props.json.separator = separator;
        this.props.onJsonChanged();
    };

    render() {
        return (
            <div className={'flex-tooltip-section'}>
                <label className={'flex-tooltip-label'}>{this.props.prefix} Background</label>
                <input id={`${this.id}-edit-background-color`}
                       className="flex-tooltip-text-input flex-tooltip-entry flex-tooltip-input flex-tooltip-input-color btn-flat"
                       type="color"
                       defaultValue={this.props.json.backgroundColor || '#000000'}
                       onChange={this.onBackgroundColorChanged}
                />
                <label className={'flex-tooltip-label'}>{this.props.prefix} Separator</label>
                <ToggleButton defaultValue={this.props.json.separator || false} onChange={this.onSeparatorToggle} icon={'move-vertical'} label={'Separator'}/>
                {this.props.json.separator ?  (
                    <input id={`${this.id}-edit-separator-color`}
                           className="flex-tooltip-text-input flex-tooltip-entry flex-tooltip-input flex-tooltip-input-color btn-flat"
                           type="color"
                           defaultValue={this.props.json.separatorColor || '#000000'}
                           onChange={this.onSeparatorColorChanged}
                    />) : null}

            </div>
        );
    }
}