export interface BaseComponentJson{
    flex?: number
    margin?: Margin
    align?: 'start'|'end'|'center'
    gravity?: Gravity
    action?:ActionJson
}
export type Margin = 'none'|'xs'|'sm'|'md'|'lg'|'xl'|'xxl'
export type SizeWithoutFull = 'xxs'|'xs'|'sm'|'md'|'lg'|'xl'|'xxl'|'3xl'|'4xl'|'5xl'
export type SizeWithFull = SizeWithoutFull | 'full'
export type Height = 'sm'|'md'
export type ButtonStyle = 'link'|'primary'|'secondary'
export type Gravity = 'top'|'bottom'|'center'
export type Layout = 'horizontal' | 'vertical' | 'baseline'
export type ComponentType = 'box'|'button'|'text'|'image'|'icon'|'filler'|'spacer'|'separator'
export interface BoxComponentJson extends BaseComponentJson{
    type: 'box'
    layout: Layout
    spacing: Margin
    contents: ContentJson[]
}
export type ContentJson = BoxComponentJson | ButtonComponentJson | IconComponentJson | FillerComponentJson | ImageComponentJson | SeparatorComponentJson | TextComponentJson | SpacerComponentJson;
export interface ButtonComponentJson extends BaseComponentJson{
    type: 'button'
    height: Height
    color: string
    style: ButtonStyle
}
export interface TextComponentJson extends BaseComponentJson{
    type:'text'
    text: string
    wrap?: boolean
    maxLines?: number
    weight?: string
    color?: string
    size?: SizeWithoutFull
}
export type AspectRatio = '1:1'|'1.51:1'|'1.91:1'|'4:3'|'16:9'|'20:13'|'2:1'|'3:1'|'3:4'|'9:16'|'1:2'|'1:3'
export interface ImageComponentJson extends BaseComponentJson{
    type:'image'
    url: string
    aspectRatio?: AspectRatio
    aspectMode?: 'cover'|'fit'
    size?: SizeWithFull
}
export interface IconComponentJson{
    type:'icon'
    url: string
    aspectRatio: '1:1'|'2:1'|'3:1'
    margin: Margin
    size?: SizeWithoutFull
}
export interface FillerComponentJson extends BaseComponentJson{
    type: 'filler',
    flex: 1
}
export interface SpacerComponentJson{
    type: 'spacer'
    size: string
}
export interface SeparatorComponentJson{
    type: 'separator'
    margin: Margin
    color: string
}
export interface ActionJson{
    type: string
    label: string
    data: string
    displayText: string
}