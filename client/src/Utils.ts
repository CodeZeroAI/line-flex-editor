import {AspectRatio} from "./components/Definitions";

export class Utils{
    public static calculateHeight(width: number, aspectRatio: AspectRatio){
        const ratios : string[] = aspectRatio.split(":");
        return Math.round(width/Number(ratios[0])*Number(ratios[1]));
    }
}