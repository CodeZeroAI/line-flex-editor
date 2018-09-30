import * as React from 'react';
import {SeparatorComponentJson} from "./Definitions";
import {BaseComponent} from "./BaseComponent";
import {DropdownSelector} from "../editors/DropdownSelector";
export class SeparatorComponent extends BaseComponent<SeparatorComponentJson> {
    constructor(props:any){
        super(props);
    }

    protected renderEditor(): JSX.Element {
        return (
            <div className={'flex-tooltip-section'}>
                <label className={'flex-tooltip-label'}>Margin</label>
                <div className={'flex-tooltip-entry'}>
                    <DropdownSelector
                        options={BaseComponent.MARGIN_DROPDOWN_OPTIONS}
                        defaultValue={this.props.json.margin || 'md'}
                        onChange={this.onMarginChanged}
                    />
                </div>
                <div className={'flex-tooltip-section'}>
                    <label className={'flex-tooltip-label'}>Color</label>
                    <input id={`${this.id}-edit-color`}
                           className="flex-tooltip-text-input flex-tooltip-entry flex-tooltip-input flex-tooltip-input-color btn-flat"
                           type="color"
                           defaultValue={this.props.json.color || '#000000'}
                           onChange={this.onColorChanged}
                    />
                </div>
            </div>
        );
    }
    protected onColorChanged = () => {
        const color = $(`#${this.id}-edit-color`).val() + '';
        console.log('changing color to ' + color);
        this.props.json.color = color;
        this.onJsonChanged();
    };
    renderComponent() {
        return (
            <div id = {this.id} className={`flex-component flex-separator-component`}>
            </div>
        );
    }
}