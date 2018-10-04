import * as React from 'react';
import {ComponentManager, ComponentPaletteDefinition} from "../controllers/ComponentManager";

export class PaletteItem extends React.Component<{paletteDefinition: ComponentPaletteDefinition}, {}> {
    public readonly id : string;
    protected constructor(props: {paletteDefinition: ComponentPaletteDefinition}) {
        super(props);
        this.id = "I" + Date.now() + '_' + Math.ceil(Math.random() * 100000);
    }
    private onDrag = () => {
        console.log('dragging ',this);
        ComponentManager.getInstance().setDraggingPalette(this);
    };
    private onDragEnd = ()=>{
        setTimeout(()=>{
            console.log('clearing drag ',this);
            ComponentManager.getInstance().clearDraggingPalette();
        },1);
    };
    render() {
        const compDef = this.props.paletteDefinition;
        return (
            <button id ={this.id} className="btn btn-flat flex-palette-item"
                    draggable={true}
                    onDragStart={this.onDrag}
                    onDragEnd={this.onDragEnd}
            >
                <i className={`icon-${compDef.icon} position-left`}/>
                {compDef.name}
            </button>
        )
    }
}