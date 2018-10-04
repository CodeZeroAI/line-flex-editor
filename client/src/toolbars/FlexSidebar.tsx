import * as React from 'react';
import {ComponentManager} from "../controllers/ComponentManager";
import {PaletteItem} from "./PaletteItem";

export class FlexSidebar extends React.Component<{}, {}> {
    private getPaletteItems = () => {
        const ret = [];
        for(let type in ComponentManager.ComponentPaletteDefinitions){
            const compDef = ComponentManager.ComponentPaletteDefinitions[type];
            ret.push(
                <li key = {'component-palette-'+type}>
                    <PaletteItem paletteDefinition={compDef}/>
                </li>
            );
        }
        return ret;
    };

    render() {
        return (
            <div className="flex-editor-left-nav">
                <span>Component</span>
                <ul className="flex-palette">
                    {this.getPaletteItems()}
                </ul>
            </div>
        )
    }
}