import {AspectRatio, ComponentType, Layout, Margin, SizeWithFull} from "./components/Definitions";

export class Constant{
    public static SIZING_PARENT = {label: 'Use parent\'s spacing', value: 'parent'};
    public static SIZING_NONE = {label: 'None', value: 'none'};
    public static SIZING_XXS = {label: '2x Extra Small', value: 'xxs'};
    public static SIZING_XS = {label: 'Extra Small', value: 'xs'};
    public static SIZING_SM = {label: 'Small', value: 'sm'};
    public static SIZING_MD = {label: 'Medium', value: 'md'};
    public static SIZING_LG = {label: 'Large', value: 'lg'};
    public static SIZING_XL = {label: 'Extra Large', value: 'xl'};
    public static SIZING_XXL = {label: '2x Extra Large', value: 'xxl'};
    public static SIZING_3XL = {label: '3x Extra Large', value: '3xl'};
    public static SIZING_4XL = {label: '4x Extra Large', value: '4xl'};
    public static SIZING_5XL = {label: '5x Extra Large', value: '5xl'};
    public static SIZING_FULL = {label: 'Full', value: 'full'};
    public static ALIGN_LEFT = {label: 'Start', value: 'start', icon: 'align-left'};
    public static ALIGN_CENTER = {label: 'Center', value: 'center', icon: 'align-center-horizontal'};
    public static ALIGN_RIGHT = {label: 'End', value: 'end', icon: 'align-right'};
    public static GRAVITY_TOP = {label: 'Top', value: 'top', icon: 'align-top'};
    public static GRAVITY_CENTER = {label: 'Center', value: 'center', icon: 'align-center-vertical'};
    public static GRAVITY_BOTTOM = {label: 'Bottom', value: 'bottom', icon: 'align-bottom'};
    public static LAYOUT_HORIZONTAL = {label: 'Horizontal', value: 'horizontal', icon:'move-horizontal'};
    public static LAYOUT_VERTICAL = {label: 'Vertical', value: 'vertical', icon:'move-vertical'};
    public static LAYOUT_BASELINE = {label: 'Baseline', value: 'baseline', icon:'font-size'};
    public static ASPECTRATIO_1_1 = {label: '1:1', value: '1:1'};
    public static ASPECTRATIO_1o51_1 = {label: '1.51:1', value: '1.51:1'};
    public static ASPECTRATIO_1o91_1 = {label: '1.91:1', value: '1.91:1'};
    public static ASPECTRATIO_4_3 = {label: '4:3', value: '4:3'};
    public static ASPECTRATIO_16_9 = {label: '16:9', value: '16:9'};
    public static ASPECTRATIO_20_13 = {label: '20:13', value: '20:13'};
    public static ASPECTRATIO_2_1 = {label: '2:1', value: '2:1'};
    public static ASPECTRATIO_3_1 = {label: '3:1', value: '3:1'};
    public static ASPECTRATIO_3_4 = {label: '3:4', value: '3:4'};
    public static ASPECTRATIO_9_16 = {label: '9:16', value: '9:16'};
    public static ASPECTRATIO_1_2 = {label: '1:2', value: '1:2'};
    public static ASPECTRATIO_1_3 = {label: '1:3', value: '1:3'};
    public static ASPECTMODE_COVER = {label: 'Cover', value: 'cover'};
    public static ASPECTMODE_FIT = {label: 'Fit', value: 'fit'};
    public static BUTTON_STYLE_PRIMARY = {label: 'Primary', value:'primary'};
    public static BUTTON_STYLE_SECONDARY = {label: 'Secondary', value:'secondary'};
    public static BUTTON_STYLE_LINK = {label: 'Link', value:'link'};
}
export class Utils{
    public static calculateHeight(width: number, aspectRatio: AspectRatio){
        const ratios : string[] = aspectRatio.split(":");
        return Math.round(width/Number(ratios[0])*Number(ratios[1]));
    }
    public static getMarginPixel(margin: Margin){
        if(margin == 'none') return 0;
        if(margin == 'xs') return 2;
        if(margin == 'sm') return 4;
        if(margin == 'md') return 8;
        if(margin == 'lg') return 12;
        if(margin == 'xl') return 16;
        if(margin == 'xxl') return 20;
        else throw new Error('Invalid margin size '+margin);
    }
    public static getFlexValue(type: ComponentType, layout: Layout,  flex?:number){
        if(type == 'icon') return 0;
        else if(type == 'filler') return 1;

        if(layout == 'horizontal' || layout == 'baseline') return flex === undefined ? 1 : flex;
        return flex === undefined ? 0 : flex;
    }
    public static getImageSizePixel(size: SizeWithFull){
        if(size == 'xxs') return 40;
        if(size == 'xs') return 60;
        if(size == 'sm') return 80;
        if(size == 'md') return 100;
        if(size == 'lg') return 120;
        if(size == 'xl') return 140;
        if(size == 'xxl') return 160;
        if(size == '3xl') return 180;
        if(size == '4xl') return 200;
        if(size == '5xl') return 220;
        if(size == 'full') return 99999999;
        else throw new Error('Invalid image size '+size);
    }
}