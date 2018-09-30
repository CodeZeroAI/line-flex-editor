import * as React from 'react';
import {Align, AspectMode, AspectRatio, ImageComponentJson, SizeWithFull} from "./Definitions";
import {Constant, Utils} from "../Utils";
import {BaseComponent} from "./BaseComponent";
import {DropdownSelector} from "../editors/DropdownSelector";
import {TextComponent} from "./TextComponent";

export class ImageComponent extends BaseComponent<ImageComponentJson> {
    public static readonly IMAGE_SIZE_DROPDOWN_OPTIONS = [
        Constant.SIZING_XXS, Constant.SIZING_XS, Constant.SIZING_SM, Constant.SIZING_MD,
        Constant.SIZING_LG, Constant.SIZING_XL, Constant.SIZING_XXL, Constant.SIZING_3XL, Constant.SIZING_4XL,
        Constant.SIZING_5XL, Constant.SIZING_FULL
    ];
    public static readonly IMAGE_ASPECTRATIO_DROPDOWN_OPTIONS = [
        Constant.ASPECTRATIO_1_1, Constant.ASPECTRATIO_1o51_1, Constant.ASPECTRATIO_1o91_1
        , Constant.ASPECTRATIO_4_3, Constant.ASPECTRATIO_16_9, Constant.ASPECTRATIO_20_13
        , Constant.ASPECTRATIO_2_1, Constant.ASPECTRATIO_3_1, Constant.ASPECTRATIO_3_4
        , Constant.ASPECTRATIO_9_16, Constant.ASPECTRATIO_1_2, Constant.ASPECTRATIO_1_3
    ];
    public static readonly IMAGE_ASPECTMODE_DROPDOWN_OPTIONS = [
        Constant.ASPECTMODE_FIT, Constant.ASPECTMODE_COVER
    ];
    constructor(props: any) {
        super(props);
    }

    protected renderEditor(): JSX.Element {
        return (
            <div>
                <div className={'flex-tooltip-section'}>
                    <label className={'flex-tooltip-label'}>Image URL</label>
                    <input id={`${this.id}-edit-url`}
                           className="flex-tooltip-text-input flex-tooltip-entry flex-tooltip-input"
                           type="text"
                           onChange={this.onImageChanged}
                           defaultValue={this.props.json.url}/>
                </div>
                <div className={'flex-tooltip-section'}>
                    <label className={'flex-tooltip-label'}>Size</label>
                    <div className={'flex-tooltip-entry'}>
                        <DropdownSelector
                            options={ImageComponent.IMAGE_SIZE_DROPDOWN_OPTIONS}
                            defaultValue={this.props.json.size || 'md'}
                            onChange={this.onImageSizeChanged}
                        />
                    </div>
                </div>
                <div className={'flex-tooltip-section'}>
                    <label className={'flex-tooltip-label'}>Aspect ratio</label>
                    <div className={'flex-tooltip-entry'}>
                        <DropdownSelector
                            options={ImageComponent.IMAGE_ASPECTRATIO_DROPDOWN_OPTIONS}
                            defaultValue={this.props.json.aspectRatio || '1:1'}
                            onChange={this.onImageAspectRatioChanged}
                        />
                    </div>
                </div>
                <div className={'flex-tooltip-section'}>
                    <label className={'flex-tooltip-label'}>Aspect mode</label>
                    <div className={'flex-tooltip-entry'}>
                        <DropdownSelector
                            options={ImageComponent.IMAGE_ASPECTMODE_DROPDOWN_OPTIONS}
                            defaultValue={this.props.json.aspectMode || 'fit'}
                            onChange={this.onImageAspectModeChanged}
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
                            onChange={this.onImageAlignChanged}
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
                    <label className={'flex-tooltip-label'}>Background color</label>
                    <input id={`${this.id}-edit-color`}
                           className="flex-tooltip-text-input flex-tooltip-entry flex-tooltip-input flex-tooltip-input-color btn-flat"
                           type="color"
                           defaultValue={this.props.json.backgroundColor || '#000000'}
                           onChange={this.onColorChanged}
                    />
                </div>
            </div>
        );
    }
    onImageChanged = () => {
        this.props.json.url = $(`#${this.id}-edit-url`).val() as string;
        this.onJsonChanged();
    };
    protected onImageSizeChanged = (size: SizeWithFull) => {
        console.log('changing size to ' + size);
        this.props.json.size = size;
        this.onJsonChanged();
    };
    protected onImageAspectRatioChanged = (aspectRatio: AspectRatio) => {
        console.log('changing size to ' + aspectRatio);
        this.props.json.aspectRatio = aspectRatio;
        this.onJsonChanged();
    };


    protected onColorChanged = () => {
        const color = $(`#${this.id}-edit-color`).val() + '';
        console.log('changing color to ' + color);
        this.props.json.backgroundColor = color;
        this.onJsonChanged();
    };
    protected onImageAspectModeChanged = (aspectMode: AspectMode) => {
        console.log('changing size to ' + aspectMode);
        this.props.json.aspectMode = aspectMode;
        this.onJsonChanged();
    };
    protected onImageAlignChanged = (align: Align) => {
        console.log('changing align to ' + align);
        this.props.json.align = align;
        this.onJsonChanged();
    };
    private getImageHeight = () => {
        return Utils.calculateHeight(this.getImageWidth(), this.props.json.aspectRatio || "1:1");
    };

    private getImageWidth() {
        const specSize = Utils.getImageSizePixel(this.props.json.size || 'md');
        if (this.props.width == 'auto') return specSize;
        return Math.min(specSize, this.props.width);
    }

    /**
     * Get horizontal margin when image size is not equal to component size calculated from flex spec
     */
    private getHorizontalMargin() {
        if (this.props.width == 'auto') return 0;
        return (this.props.width - this.getImageWidth()) / 2;
    }

    private getContainerStyle = () => {
        return {
            backgroundSize: this.props.json.aspectMode == 'cover' ? 'cover' : 'contain',
            width: this.getImageWidth(),
            height: this.getImageHeight(),
            margin: `0 ${this.getHorizontalMargin()}px`,
            backgroundImage: `url(${this.props.json.url})`,
            backgroundColor: this.props.json.backgroundColor || 'none'
        };
    };

    renderComponent() {
        return (
            <div id={this.id} className={`flex-component flex-image-component`} style={this.getContainerStyle()}>

            </div>
        );
    }
}