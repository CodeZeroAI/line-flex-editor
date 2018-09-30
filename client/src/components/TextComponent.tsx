import * as React from 'react';
import {Align, SizeWithoutFull, TextComponentJson} from "./Definitions";
import {BaseComponent} from "./BaseComponent";
import {DropdownSelector} from "../editors/DropdownSelector";
import {Constant} from "../Utils";
import {ToggleButton} from "../editors/ToggleButton";

export class TextComponent extends BaseComponent<TextComponentJson> {

    public static readonly TEXT_SIZE_DROPDOWN_OPTIONS = [
        Constant.SIZING_XXS, Constant.SIZING_XS, Constant.SIZING_SM, Constant.SIZING_MD,
        Constant.SIZING_LG, Constant.SIZING_XL, Constant.SIZING_XXL, Constant.SIZING_3XL, Constant.SIZING_4XL,
        Constant.SIZING_5XL
    ];

    public static readonly TEXT_ALIGN_DROPDOWN_OPTIONS = [
        Constant.ALIGN_LEFT, Constant.ALIGN_CENTER, Constant.ALIGN_RIGHT
    ];
    public static readonly TEXT_WRAP_DROPDOWN_OPTIONS = [
        Constant.ALIGN_LEFT, Constant.ALIGN_CENTER, Constant.ALIGN_RIGHT
    ];


    constructor(props: any) {
        super(props);
    }

    protected renderEditor(): JSX.Element {
        return (
            <div>
                <div className={'flex-tooltip-section'}>
                    <label className={'flex-tooltip-label'}>Text</label>
                    <input id={`${this.id}-edit-text`}
                           className="flex-tooltip-text-input flex-tooltip-entry flex-tooltip-input"
                           type="text"
                           onChange={this.onTextChanged}
                           defaultValue={this.props.json.text}/>
                </div>
                <div className={'flex-tooltip-section'}>
                    <label className={'flex-tooltip-label'}>Size</label>
                    <div className={'flex-tooltip-entry'}>
                        <DropdownSelector
                            options={TextComponent.TEXT_SIZE_DROPDOWN_OPTIONS}
                            defaultValue={this.props.json.size || 'spacing'}
                            onChange={this.onTextSizeChanged}
                        />
                    </div>
                </div>
                <div className={'flex-tooltip-section'}>
                    <label className={'flex-tooltip-label'}>Appearance</label>
                    <div className={'flex-tooltip-entry'}>
                        <input id={`${this.id}-edit-color`}
                               className="flex-tooltip-text-input flex-tooltip-entry flex-tooltip-input flex-tooltip-input-color btn-flat"
                               type="color"
                               defaultValue={this.props.json.color || '#000000'}
                               onChange={this.onColorChanged}
                        />
                        <ToggleButton icon={'bold2'}
                                      tooltip={'Bold'}
                                      defaultValue={this.props.json.weight == 'bold'}
                                      onChange={this.onTextBoldChanged}
                        />
                        <ToggleButton icon={'rtl2'}
                                      tooltip={'Word wrap'}
                                      defaultValue={this.props.json.wrap || false}
                                      onChange={this.onTextWrapChanged}
                        />
                    </div>
                </div>
                <div className={'flex-tooltip-section'}>
                    <label className={'flex-tooltip-label'}>Alignment</label>
                    <div className={'flex-tooltip-entry'}>
                        <DropdownSelector
                            width={'68px'}
                            paddingX={12}
                            hideTextOnLabel={true}
                            options={TextComponent.TEXT_ALIGN_DROPDOWN_OPTIONS}
                            defaultValue={this.props.json.align || 'start'}
                            onChange={this.onTextAlignChanged}
                            tooltip={'Text Align'}
                        />
                        <DropdownSelector
                            width={'68px'}
                            paddingX={12}
                            hideTextOnLabel={true}
                            options={TextComponent.GRAVITY_DROPDOWN_OPTIONS}
                            defaultValue={this.props.json.size || 'top'}
                            onChange={this.onGravityChanged}
                            tooltip={'Text Gravity'}
                        />
                    </div>
                </div>
                <div className={'flex-tooltip-section'}>
                    <label className={'flex-tooltip-label'}>Number of Lines</label>
                    <div className={'flex-tooltip-entry'}>
                        <input id={`${this.id}-edit-lines`}
                               className="flex-tooltip-text-input flex-tooltip-entry flex-tooltip-input"
                               type="number"
                               defaultValue={(this.props.json.maxLines || 0) + ''}
                               onChange={this.onMaxLinesChanged}
                        />
                    </div>
                </div>
            </div>
        );
    }

    protected onMaxLinesChanged = () => {
        const maxLines = Number($(`#${this.id}-edit-lines`).val());
        if (maxLines || maxLines === 0) {
            console.log('changing max lines to ' + maxLines);
            this.props.json.maxLines = maxLines;
            this.onJsonChanged();
        }
        $(`#${this.id}-edit-lines`).val(this.props.json.maxLines + '');
    };
    protected onColorChanged = () => {
        const color = $(`#${this.id}-edit-color`).val() + '';
        console.log('changing color to ' + color);
        this.props.json.color = color;
        this.onJsonChanged();
    };
    protected onTextSizeChanged = (size: SizeWithoutFull) => {
        console.log('changing size to ' + size);
        this.props.json.size = size;
        this.onJsonChanged();
    };
    protected onTextWrapChanged = (wrap: boolean) => {
        console.log('changing wrap to ' + wrap);
        this.props.json.wrap = wrap;
        this.onJsonChanged();
    };
    protected onTextBoldChanged = (bold: boolean) => {
        console.log('changing bold to ' + bold);
        this.props.json.weight = bold ? 'bold' : 'regular';
        this.onJsonChanged();
    };
    onTextChanged = () => {
        this.props.json.text = $(`#${this.id}-edit-text`).val() as string;
        this.onJsonChanged();
    };

    protected onTextAlignChanged = (align: Align) => {
        console.log('changing align to ' + align);
        this.props.json.align = align;
        this.onJsonChanged();
    };

    private getContentStyle() {
        return {
            color: this.props.json.color,
            width: this.props.width,
            height: this.props.height
        };
    }

    renderComponent() {
        return (
            <div id={this.id} className={`flex-component flex-text-component
                flex-text-align-${this.props.json.align || 'start'}
                flex-text-size-${this.props.json.size}
                ${this.props.json.wrap ? 'flex-text-wrap' : ''}
                flex-text-weight-${this.props.json.weight}`} style={this.getContentStyle()}>
                <p>{this.props.json.text}</p>
            </div>
        );
    }
}