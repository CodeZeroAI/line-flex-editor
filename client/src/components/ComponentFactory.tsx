import {ContentJson} from "./Definitions";
import {BoxComponent} from "./BoxComponent";
import {ButtonComponent} from "./ButtonComponent";
import * as React from "react";
import {ImageComponent} from "./ImageComponent";
import {TextComponent} from "./TextComponent";
import {IconComponent} from "./IconComponent";
import {FillerComponent} from "./FillerComponent";
import {SeparatorComponent} from "./SeparatorComponent";
import {SpacerComponent} from "./SpacerComponent";

export class ComponentFactory{
    public static createComponent(json: ContentJson, width:number) : JSX.Element{
        if(json.type == 'box') return <BoxComponent json={json} width={width}/>;
        if(json.type == 'button') return <ButtonComponent json={json}/>;
        if(json.type == 'image') return <ImageComponent json={json} width={width}/>;
        if(json.type == 'text') return <TextComponent json={json}/>;
        if(json.type == 'icon') return <IconComponent json={json}/>;
        if(json.type == 'filler') return <FillerComponent json={json}/>;
        if(json.type == 'separator') return <SeparatorComponent json={json}/>;
        if(json.type == 'spacer') return <SpacerComponent json={json}/>;
        else throw new Error('Invalid content type for json: '+JSON.stringify(json));
    }
}