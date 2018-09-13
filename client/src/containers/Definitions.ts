import {BoxComponentJson, ImageComponentJson} from "../components/Definitions";

export interface BlockJson{
   header?: BoxComponentJson
   hero?: ImageComponentJson
   body?: BoxComponentJson
   footer: BoxComponentJson
}
export interface CarouselContainerJson{
    type:'carousel'
    contents: BubbleContainerJson[]
}
export interface BubbleContainerJson extends BlockJson{
    type: 'bubble'
    direction : 'ltr' | 'rtl'
    styles: BubbleStyleJson
}
export interface BubbleStyleJson{
    header: BlockStyleJson
    hero: BlockStyleJson
    body: BlockStyleJson
    footer: BlockStyleJson
}
export interface BlockStyleJson{
    backgroundColor: string
    separator: boolean
    separatorColor: string
}