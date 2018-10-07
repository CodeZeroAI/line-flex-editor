import * as React from 'react';
import {ButtonComponentJson, ButtonHeight, ButtonStyle} from "./Definitions";
import {BaseComponent} from "./BaseComponent";
import {DropdownSelector} from "../editors/DropdownSelector";
import {Constant} from "../Utils";
export class ButtonComponent extends BaseComponent<ButtonComponentJson> {
    public static readonly BUTTON_HEIGHT_DROPDOWN_OPTIONS = [
        Constant.SIZING_SM, Constant.SIZING_MD
    ];
    public static readonly BUTTON_STYLE_DROPDOWN_OPTIONS = [
        Constant.BUTTON_STYLE_PRIMARY, Constant.BUTTON_STYLE_SECONDARY, Constant.BUTTON_STYLE_LINK
    ];
    constructor(props:any){
        super(props);
    }

    protected renderEditor(): JSX.Element {
        return (
            <div>
                <div className={'flex-tooltip-section'}>
                    <label className={'flex-tooltip-label'}>Height</label>
                    <div className={'flex-tooltip-entry'}>
                        <DropdownSelector
                            options={ButtonComponent.BUTTON_HEIGHT_DROPDOWN_OPTIONS}
                            defaultValue={this.props.json.height || 'md'}
                            onChange={this.onHeightChanged}
                        />
                    </div>
                </div>
                <div className={'flex-tooltip-section'}>
                    <label className={'flex-tooltip-label'}>Style</label>
                    <div className={'flex-tooltip-entry'}>
                        <DropdownSelector
                            options={ButtonComponent.BUTTON_STYLE_DROPDOWN_OPTIONS}
                            defaultValue={this.props.json.style || 'link'}
                            onChange={this.onStyleChanged}
                        />
                    </div>
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
    protected onStyleChanged = (style : ButtonStyle) => {
        console.log('changing style to ' + style);
        this.props.json.style = style;
        this.onJsonChanged();
    };
    protected onHeightChanged = (height: ButtonHeight) => {
        console.log('changing size to ' + height);
        this.props.json.height = height;
        this.onJsonChanged();
    };


    private getFontColor(){
        if(this.props.json.style == 'primary') return 'white';
        if(this.props.json.style == 'secondary') return 'black';
        else return this.props.json.color || '#42659a';
    }
    private getBackgroundColor(){
        if(this.props.json.style == 'primary') return this.props.json.color || '#17c950';
        if(this.props.json.style == 'secondary') return this.props.json.color || '#dcdfe5';
        else return 'none';//return this.props.json.color || 'none';
    }
    private getContentStyle(){
        return {
            background: this.getBackgroundColor(),
            width:this.props.width
            // height: this.props.height
        }
    }
    renderComponent() {

        const action = this.props.json.action || {
            type: 'postback',
            label: 'Click me',
            data: 'Click me',
            displayText: 'Click me'
        };
        // console.log(this.getContentStyle());
        return (
            <div id = {this.id} className={`flex-component flex-button-component
                flex-button-height-${this.props.json.height || 'md'}
                flex-text-gravity-${this.props.json.gravity || 'top'}`}
                 style = {this.getContentStyle()} >
                <p style={{color: this.getFontColor()}}>{action.label}</p>
            </div>
        );
    }
}