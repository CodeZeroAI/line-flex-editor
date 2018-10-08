import {BaseComponent} from "../components/BaseComponent";
import {BoxComponent} from "../components/BoxComponent";
import {PaletteItem} from "../toolbars/PaletteItem";
import {
    BaseComponentJson, BoxComponentJson, ButtonComponentJson,
    ComponentType,
    FillerComponentJson, IconComponentJson, ImageComponentJson,
    Layout,
    Margin, SpacerComponentJson,
    TextComponentJson
} from "../components/Definitions";
import {BubbleContainerJson} from "../containers/Definitions";

export interface ComponentPaletteDefinition {
    icon: string,
    name: string,
    type: string
}

export class ComponentManager {
    public static readonly ComponentPaletteDefinitions = {
        'box':  {icon: 'enlarge', name: 'Box', type:'box'},
        'image':  {icon: 'file-picture', name: 'Image', type:'image'},
        'icon':  {icon: 'cube', name: 'Icon', type:'icon'},
        'text':  {icon: 'typography', name: 'Text', type:'text'},
        'button':  {icon: 'touch', name: 'Button', type:'button'},
        'spacer':  {icon: 'move-horizontal', name: 'Spacer', type:'spacer'},
        'filler':  {icon: 'lan3', name: 'Filler', type:'filler'},
        'separator':  {icon: 'pagebreak', name: 'Separator', type:'separator'}
    };
    public static readonly ComponentDefaultDefinitions : {[key:string] : BaseComponentJson} = {
        'box':{ type: 'box' as ComponentType, contents: [
                // {type: 'text' as ComponentType, text:'Box'}
            ], spacing: 'none' as Margin, layout:'vertical' as Layout} as BoxComponentJson,
        'image':{ type: 'image' as ComponentType, url: 'https://upload.convolab.ai/flex/placeholder.gif',
            aspectRatio: '1:1', aspectMode: 'cover', size: 'md' } as ImageComponentJson,
        'icon':{ type: 'icon' as ComponentType, url: 'https://upload.convolab.ai/flex/placeholder.gif'} as IconComponentJson,
        'text': {type: 'text' as ComponentType, text:'Text'} as TextComponentJson,
        'filler': {type: 'filler' as ComponentType} as FillerComponentJson,
        'spacer': {type: 'spacer' as ComponentType} as SpacerComponentJson,
        'separator': {type: 'separator' as ComponentType} as SpacerComponentJson,
        'button':{type:'button' as ComponentType, action: {label: 'Button', value: '', type: 'message'}} as ButtonComponentJson
    };
    private static readonly DefaultBubbleJson = {
        'bubble':{
            type:'bubble', body:ComponentManager.ComponentDefaultDefinitions['box']
        } as BubbleContainerJson
    };
    private static instance: ComponentManager;

    public static getInstance() {
        if (!this.instance) this.instance = new ComponentManager();
        return this.instance;
    }


    private components: { [key: string]: BaseComponent<any> } = {};
    private activeComponent: BaseComponent<any>;
    private draggingPalette: PaletteItem;

    constructor() {
    }
    public getNewBubbleJson(){
        return JSON.parse(JSON.stringify(ComponentManager.DefaultBubbleJson));
    }
    public getComponentById(id: string) {
        return this.components[id];
    }

    public markAllComponentsNeedResize() {
        for (let compId in this.components) {
            this.components[compId].needResize = true;
        }
    }

    public getClosestBoxComponent(componentId: string): BoxComponent | null{
        const parentId = $(`#${componentId}`).closest('.flex-box-component').attr('id');
        if (!parentId) return null;
        // else console.log('parent of ' + componentId + ' found as ' + parentId);
        return this.getComponentById(parentId) as BoxComponent;
    }

    public registerComponent(component: BaseComponent<any>) {
        this.components[component.id] = component;
    }

    public isActiveComponent(component: BaseComponent<any>) {
        return this.activeComponent && this.activeComponent.id == component.id;
    }

    public setActiveComponent(component: BaseComponent<any>) {
        if (this.isActiveComponent(component)) return;
        this.clearActiveComponent();
        this.activeComponent = component;
        component.onActive();
    }

    public clearActiveComponent() {
        if (this.activeComponent) {
            this.activeComponent.onInactive();
            delete this.activeComponent;
        }
    }
    public getDraggingPalette(){
        return this.draggingPalette || null;
    }
    public setDraggingPalette(palette: PaletteItem) {
        this.clearDraggingPalette();
        this.draggingPalette = palette;
    }
    public hoveredBox : BoxComponent;

    /**
     * Re-detect the current state of all hovered box and select the box that is the drop target
     */
    public refreshHoveredBoxComponent(){
        let currentDepth = 0;
        let target : BoxComponent|null = null;
        for(let componentId in this.components){
            const component = this.components[componentId];
            if(!(component instanceof BoxComponent)) continue;
            const thisDepth = component.getComponentDepth();
            if(component.isHovered > 0 && currentDepth < thisDepth){
                target = component;
                currentDepth = thisDepth;
            }
        }

        // console.log("Refreshing hover...target: ",this.hoveredBox);
        // If target has changed, deactivate previous one
        if(this.hoveredBox && (!target || this.hoveredBox.id != target.id))
            this.hoveredBox.onDropoverInactive();
        if(target){
            target.onDropoverActive();
            this.hoveredBox = target;
        }
    }
    public clearDraggingPalette() {
        delete this.draggingPalette;
        for(let componentId in this.components){
            const component = this.components[componentId];
            if(!(component instanceof BoxComponent)) continue;
            component.isHovered = 0;
        }
        this.refreshHoveredBoxComponent();
    }
}