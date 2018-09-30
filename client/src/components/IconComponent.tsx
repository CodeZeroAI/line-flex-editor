import * as React from 'react';
import {IconAspectRatio, IconComponentJson, SizeWithoutFull} from "./Definitions";
import {BaseComponent} from "./BaseComponent";
import {DropdownSelector} from "../editors/DropdownSelector";
import {Constant} from "../Utils";
export class IconComponent extends BaseComponent<IconComponentJson> {
    public static readonly ICON_SIZE_DROPDOWN_OPTIONS = [
        Constant.SIZING_XXS, Constant.SIZING_XS, Constant.SIZING_SM, Constant.SIZING_MD,
        Constant.SIZING_LG, Constant.SIZING_XL, Constant.SIZING_XXL, Constant.SIZING_3XL, Constant.SIZING_4XL,
        Constant.SIZING_5XL
    ];
    public static readonly ICON_ASPECTRATIO_DROPDOWN_OPTIONS = [
        Constant.ASPECTRATIO_1_1, Constant.ASPECTRATIO_2_1, Constant.ASPECTRATIO_3_1
    ];
    constructor(props:any){
        super(props);
    }

    protected renderEditor(): JSX.Element {
        return (
            <div>
                <div className={'flex-tooltip-section'}>
                    <label className={'flex-tooltip-label'}>Icon URL</label>
                    <input id={`${this.id}-edit-url`}
                           className="flex-tooltip-text-input flex-tooltip-entry flex-tooltip-input"
                           type="text"
                           onChange={this.onIconChanged}
                           defaultValue={this.props.json.url}/>
                </div>
                <div className={'flex-tooltip-section'}>
                    <label className={'flex-tooltip-label'}>Size</label>
                    <div className={'flex-tooltip-entry'}>
                        <DropdownSelector
                            options={IconComponent.ICON_SIZE_DROPDOWN_OPTIONS}
                            defaultValue={this.props.json.size || 'md'}
                            onChange={this.onIconSizeChanged}
                        />
                    </div>
                </div>
                <div className={'flex-tooltip-section'}>
                    <label className={'flex-tooltip-label'}>Aspect ratio</label>
                    <div className={'flex-tooltip-entry'}>
                        <DropdownSelector
                            options={IconComponent.ICON_ASPECTRATIO_DROPDOWN_OPTIONS}
                            defaultValue={this.props.json.aspectRatio || '1:1'}
                            onChange={this.onIconAspectRatioChanged}
                        />
                    </div>
                </div>
                <div className={'flex-tooltip-section'}>
                    <label className={'flex-tooltip-label'}>Margin</label>
                    <div className={'flex-tooltip-entry'}>
                        <DropdownSelector
                            options={BaseComponent.MARGIN_DROPDOWN_OPTIONS}
                            defaultValue={this.props.json.margin || 'md'}
                            onChange={this.onMarginChanged}
                        />
                    </div>
                </div>
            </div>
        );
    }
    onIconChanged = () => {
        this.props.json.url = $(`#${this.id}-edit-url`).val() as string;
        this.onJsonChanged();
    };
    protected onIconSizeChanged = (size: SizeWithoutFull) => {
        console.log('changing size to ' + size);
        this.props.json.size = size;
        this.onJsonChanged();
    };
    protected onIconAspectRatioChanged = (aspectRatio: IconAspectRatio) => {
        console.log('changing aspectratio to ' + aspectRatio);
        this.props.json.aspectRatio = aspectRatio;
        this.onJsonChanged();
    };

    renderComponent() {
        return (
            <div id = {this.id} className={`flex-component flex-icon-component
                            flex-text-size-${this.props.json.size}`}>
                <span style = {{
                    "backgroundImage": `url('${this.props.json.url}')`
                }} ></span>
            </div>
        );
    }
}