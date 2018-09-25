import {AspectRatio, ComponentType, Layout, Margin, SizeWithFull} from "./components/Definitions";

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