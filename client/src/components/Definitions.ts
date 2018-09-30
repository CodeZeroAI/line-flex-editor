export interface BaseComponentJson{
    type: ComponentType
}
export interface ElementalComponentJson extends BaseComponentJson{
    flex?: number
    margin?: Margin
    align?: Align
    gravity?: Gravity
    action?:ActionJson
}
export type Margin = 'none'|'xs'|'sm'|'md'|'lg'|'xl'|'xxl'
export type SizeWithoutFull = 'xxs'|'xs'|'sm'|'md'|'lg'|'xl'|'xxl'|'3xl'|'4xl'|'5xl'
export type SizeWithFull = SizeWithoutFull | 'full'
export type ButtonHeight = 'sm'|'md'
export type ButtonStyle = 'link'|'primary'|'secondary'
export type Gravity = 'top'|'bottom'|'center'
export type Align = 'start'|'end'|'center'
export type Layout = 'horizontal' | 'vertical' | 'baseline'
export type ComponentType = 'box'|'button'|'text'|'image'|'icon'|'filler'|'spacer'|'separator'|'bubble'|'carousel'
export type AspectMode = 'cover'|'fit';
export type IconAspectRatio = '1:1'|'2:1'|'3:1';
export interface BoxComponentJson extends ElementalComponentJson{
    type: 'box'
    layout: Layout
    spacing: Margin
    contents: ContentJson[]
}
export type ContentJson = BoxComponentJson | ButtonComponentJson | IconComponentJson | FillerComponentJson | ImageComponentJson | SeparatorComponentJson | TextComponentJson | SpacerComponentJson;
export interface ButtonComponentJson extends ElementalComponentJson{
    type: 'button'
    height: ButtonHeight
    color: string
    style: ButtonStyle
}
export interface TextComponentJson extends ElementalComponentJson{
    type:'text'
    text: string
    wrap?: boolean
    maxLines?: number
    weight?: string
    color?: string
    size?: SizeWithoutFull
}
export type AspectRatio = '1:1'|'1.51:1'|'1.91:1'|'4:3'|'16:9'|'20:13'|'2:1'|'3:1'|'3:4'|'9:16'|'1:2'|'1:3'
export interface ImageComponentJson extends ElementalComponentJson{
    type:'image'
    url: string
    aspectRatio?: AspectRatio
    aspectMode?: AspectMode
    size?: SizeWithFull
    backgroundColor?: string
}
export interface IconComponentJson extends BaseComponentJson{
    type:'icon'
    url: string
    aspectRatio: IconAspectRatio
    margin: Margin
    size?: SizeWithoutFull
}
export interface FillerComponentJson extends ElementalComponentJson{
    type: 'filler',
    flex: 1
}
export interface SpacerComponentJson extends BaseComponentJson{
    type: 'spacer'
    size: string
}
export interface SeparatorComponentJson extends BaseComponentJson{
    type: 'separator'
    margin: Margin
    color: string
}
export interface ActionJson{
    type: string
    label: string
    data?: string
    displayText?: string
    text?: string
    uri?: string
}