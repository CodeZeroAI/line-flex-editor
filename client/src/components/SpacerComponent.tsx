import * as React from 'react';
import {SizeWithoutFull, SpacerComponentJson} from "./Definitions";
import {BaseComponent} from "./BaseComponent";
import {DropdownSelector} from "../editors/DropdownSelector";
import {Constant} from "../Utils";
export class SpacerComponent extends BaseComponent<SpacerComponentJson> {

    public static readonly SPACER_SIZE_DROPDOWN_OPTIONS = [
        Constant.SIZING_XS, Constant.SIZING_SM, Constant.SIZING_MD,
        Constant.SIZING_LG, Constant.SIZING_XL, Constant.SIZING_XXL
    ];
    constructor(props:any){
        super(props);
    }

    protected renderEditor(): JSX.Element {
        return (
            <div className={'flex-tooltip-section'}>
                <label className={'flex-tooltip-label'}>Size</label>
                <div className={'flex-tooltip-entry'}>
                    <DropdownSelector
                        options={SpacerComponent.SPACER_SIZE_DROPDOWN_OPTIONS}
                        defaultValue={this.props.json.size || 'md'}
                        onChange={this.onSpacerSizeChanged}
                    />
                </div>
            </div>
        );
    }
    protected onSpacerSizeChanged = (size: any) => {
        console.log('changing size to ' + size);
        this.props.json.size = size;
        this.onJsonChanged();
    };
    renderComponent() {
        return (
            <div id = {this.id}  className={`flex-component flex-spacer-component flex-spacer-${this.props.json.size}`}>
            </div>
        );
    }
}