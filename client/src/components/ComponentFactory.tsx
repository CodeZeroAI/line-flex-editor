import {ContainerComponent, ContentJson} from "./Definitions";
import {BoxComponent} from "./BoxComponent";
import {ButtonComponent} from "./ButtonComponent";
import * as React from "react";
import {ImageComponent} from "./ImageComponent";
import {TextComponent} from "./TextComponent";
import {IconComponent} from "./IconComponent";
import {FillerComponent} from "./FillerComponent";
import {SeparatorComponent} from "./SeparatorComponent";
import {SpacerComponent} from "./SpacerComponent";

export class ComponentFactory {
    public static createComponent(json: ContentJson, width: number | 'auto', height: number | 'auto', parentComponent: ContainerComponent): JSX.Element {
        if (json.type == 'box') return <BoxComponent json={json} width={width} height={height}
                                                     parentContainer={parentComponent}/>;
        if (json.type == 'button') return <ButtonComponent json={json} width={width} height={height}
                                                           parentContainer={parentComponent}/>;
        if (json.type == 'image') return <ImageComponent json={json} width={width} height={height}
                                                         parentContainer={parentComponent}/>;
        if (json.type == 'text') return <TextComponent json={json} width={width} height={height}
                                                       parentContainer={parentComponent}/>;
        if (json.type == 'icon') return <IconComponent json={json} width={width} height={height}
                                                       parentContainer={parentComponent}/>;
        if (json.type == 'filler') return <FillerComponent json={json} width={width} height={height}
                                                           parentContainer={parentComponent}/>;
        if (json.type == 'separator') return <SeparatorComponent json={json} width={width} height={height}
                                                                 parentContainer={parentComponent}/>;
        if (json.type == 'spacer') return <SpacerComponent json={json} width={width} height={height}
                                                           parentContainer={parentComponent}/>;
        else throw new Error('Invalid content type for json: ' + JSON.stringify(json));
    }
}