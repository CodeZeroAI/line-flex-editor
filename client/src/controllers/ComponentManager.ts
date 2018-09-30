import {BaseComponent} from "../components/BaseComponent";
import {BoxComponent} from "../components/BoxComponent";
import {BoxComponentJson, ImageComponentJson, Layout} from "../components/Definitions";

export class ComponentManager{
    private static instance : ComponentManager;
    public static getInstance(){
        if(!this.instance) this.instance = new ComponentManager();
        return this.instance;
    }
    public static getDefaultBoxComponentJson(layout: Layout) : BoxComponentJson{
        return {
            type:'box', layout:layout, contents: [],
            flex: layout == 'horizontal' ? 1:0, spacing:'none'
        }
    };
    public static getDefaultImageComponentJson() : ImageComponentJson{
        return {
            type:'image',
            url: '',
            aspectRatio: '1:1',
            aspectMode: 'fit',
            size: 'md'
        }
    };

    private components : {[key:string]: BaseComponent<any>} = {};
    private activeComponent : BaseComponent<any>;
    constructor(){}
    public getComponentById(id: string){
        return this.components[id];
    }
    public markAllComponentsNeedResize(){
        for(let compId in this.components){
            this.components[compId].needResize = true;
        }
    }
    public getParentBoxComponent(componentId: string) : BoxComponent{
        const parentId = $(`#${componentId}`).closest('.flex-box-component').attr('id');
        if(!parentId) throw new Error('Parent id not found for component ID '+componentId);
        else console.log('parent of '+componentId+' found as '+parentId);
        return this.getComponentById(parentId) as BoxComponent;
    }
    public registerComponent(component : BaseComponent<any>){
        this.components[component.id] = component;
    }
    public isActiveComponent(component: BaseComponent<any>){
        return this.activeComponent && this.activeComponent.id == component.id;
    }
    public setActiveComponent(component: BaseComponent<any>){
        if(this.isActiveComponent(component)) return;
        this.clearActiveComponent();
        this.activeComponent = component;
        component.onActive();
    }
    public clearActiveComponent(){
        if(this.activeComponent){
            this.activeComponent.onInactive();
            delete this.activeComponent;
        }
    }
}