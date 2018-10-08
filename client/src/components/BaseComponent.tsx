import * as React from 'react';
import {ComponentManager} from "../controllers/ComponentManager";
import {
    ActionJson,
    BaseComponentJson,
    ContainerComponent,
    ElementalComponentJson,
    Gravity,
    Margin
} from "./Definitions";
import {FlexEditor} from "../FlexEditor";
import {Constant} from "../Utils";
import {DropdownSelector} from "../editors/DropdownSelector";
import {ActionSelector} from "../editors/ActionSelector";
import {BoxComponent} from "./BoxComponent";

declare const tippy: any;

export interface BaseComponentProps<T extends BaseComponentJson> {
    json: T,
    parentContainer: ContainerComponent,
    width: number | 'auto',
    height: number | 'auto'
}

export abstract class BaseComponent<T extends BaseComponentJson> extends React.Component<BaseComponentProps<T>> {
    public static readonly MARGIN_DROPDOWN_OPTIONS = [
        Constant.SIZING_PARENT, Constant.SIZING_NONE, Constant.SIZING_XS, Constant.SIZING_SM, Constant.SIZING_MD,
        Constant.SIZING_LG, Constant.SIZING_XL, Constant.SIZING_XXL
    ];
    public static readonly GRAVITY_DROPDOWN_OPTIONS = [
        Constant.GRAVITY_TOP, Constant.GRAVITY_CENTER, Constant.GRAVITY_BOTTOM
    ];

    public getComponentDom() {
        return $(`#${this.id}`);
    }

    protected onMarginChanged = (margin: Margin | 'parent') => {
        console.log('changing margin to ' + margin);
        if (margin == 'parent') delete (this.props.json as ElementalComponentJson).margin;
        else (this.props.json as ElementalComponentJson).margin = margin;
        this.onJsonChanged();
    };
    protected onGravityChanged = (gravity: Gravity) => {
        console.log('changing gravity to ' + gravity);
        (this.props.json as ElementalComponentJson).gravity = gravity;
        this.onJsonChanged();
    };

    protected onFlexChanged = () => {
        const dom = $(`#${this.id}-edit-flex`);
        const flex = Number(dom.val());
        const json = this.props.json as ElementalComponentJson;
        if (flex || flex === 0) {
            console.log('changing flex to ' + flex);
            json.flex = flex;
        }
        else {
            delete json.flex;
        }
        this.onJsonChanged(true);
    };

    public onInactive() {
        $(`#${this.id}`).parent().removeClass('flex-selected');
        this.getTippy().hide();
    }

    public onActive() {
        $(`#${this.id}`).parent().addClass('flex-selected');
        this.getTippy().show();
    }

    public onHover = () => {
        // console.log("triggering hover ",this.props);
        // const dom = $(`#${this.id}`);
        // if(dom.find('.flex-hover').length == 0)
        //     dom.parent().addClass('flex-hover');
    };
    public onUnhover = () => {
        // $(`#${this.id}`).parent().removeClass('flex-hover');
    };

    protected abstract renderEditor(): JSX.Element | null;

    // protected renderEditor(): JSX.Element | null {
    //     return (<b>Base!!</b>);
    // }

    protected abstract renderComponent(): JSX.Element

    public readonly id: string;
    public needResize = true;
    public isHovered = 0;

    protected constructor(props: BaseComponentProps<T>) {
        super(props);
        this.id = "C" + Date.now() + '_' + Math.ceil(Math.random() * 100000);
        ComponentManager.getInstance().registerComponent(this);
    }

    getTippy(): any {
        return (document.getElementById(this.id) as any)._tippy;
    }

    delete = () => {
        ComponentManager.getInstance().clearActiveComponent();
        const index = $(`#${this.id}`).closest('.flex-box-content').data('index');
        (this.props.parentContainer as BoxComponent).removeContent(index);
        this.onJsonChanged();
    };
    selectParent = () => {
        ComponentManager.getInstance().setActiveComponent(this.props.parentContainer as BoxComponent);
    };

    getEditor() {
        return (<div className="container flex-tooltip-container">
            <div className="flex-tooltip-header">
                <h6>{this.props.json.type} setting</h6>
                {this.props.parentContainer instanceof BoxComponent ? [(
                    <button title='Delete component'
                            key={this.id + '-delete-btn'}
                            className="btn btn-flat flex-tooltip-delete" onClick={this.delete}>
                        <i className="icon-trash"/>
                    </button>), (
                    <button title={'Select container box'}
                            key={this.id + '-select-box-btn'}
                            className="btn btn-flat flex-tooltip-select-parent" onClick={this.selectParent}>
                        <i className="icon-enlarge"/>
                    </button>
                )] : null
                }
            </div>
            <div className="flex-tooltip-body">
                {this.renderEditor()}
                {this.isElementalComponent() ?
                    this.getElementalComponentEditor() : null}
            </div>
        </div>)
    }

    public isElementalComponent = () => {
        return this.props.json.type == 'button' ||
            this.props.json.type == 'text' ||
            this.props.json.type == 'image' ||
            this.props.json.type == 'filler' ||
            this.props.json.type == 'box'
    };
    private getElementalComponentEditor = () => {
        const json = this.props.json as ElementalComponentJson;
        return (
            <div>
                <div className={'flex-tooltip-section'}>
                    <label className={'flex-tooltip-label'}>Flex</label>
                    <div className={'flex-tooltip-entry'}>
                        <input id={`${this.id}-edit-flex`}
                               className="flex-tooltip-text-input flex-tooltip-entry flex-tooltip-input"
                               type="number"
                               defaultValue={
                                   json.flex + ''
                               }
                               onChange={this.onFlexChanged}
                        />
                    </div>
                </div>
                <div className={'flex-tooltip-section'}>
                    <label className={'flex-tooltip-label'}>Margin</label>
                    <div className={'flex-tooltip-entry'}>
                        <DropdownSelector
                            options={BaseComponent.MARGIN_DROPDOWN_OPTIONS}
                            defaultValue={json.margin || 'md'}
                            onChange={this.onMarginChanged}
                        />
                    </div>
                </div>
                <div className={'flex-tooltip-section'}>
                    <label className={'flex-tooltip-label'}>Gravity</label>
                    <div className={'flex-tooltip-entry'}>
                        <DropdownSelector
                            options={BaseComponent.GRAVITY_DROPDOWN_OPTIONS}
                            defaultValue={json.gravity || 'top'}
                            onChange={this.onGravityChanged}
                        />
                    </div>
                </div>
                <div className={'flex-tooltip-section'}>
                    <ActionSelector
                        json={json.action}
                        onActionUpdated={this.onActionChanged}
                    />
                </div>
            </div>
        )
    };
    onActionChanged = (actionJson: ActionJson) => {
        (this.props.json as ElementalComponentJson).action = actionJson;
        this.onJsonChanged(true);
    };
    isOnActiveBubble() {
        return this.getComponentDom().closest('.swiper-slide-active').length > 0;
    }

    componentDidMount() {
        // console.log('binding click event for ',this);
        const dom = $(`#${this.id}`);
        dom.on('click', this.onComponentClicked);
        dom.on('mouseenter', this.onHover);
        dom.on('mouseleave', this.onUnhover);
        tippy(document.querySelector(`#${this.id}`), {
            content: document.getElementById(`${this.id}-tooltip`),//ReactDOMServer.renderToStaticMarkup(this.getEditor()),
            placement: 'right-end',
            arrow: true,
            distance: 20,
            theme: 'flex-tooltip',
            hideOnClick: false,
            trigger: 'manual'
        });

    }

    onJsonChanged = (wait = false) => {
        FlexEditor.getInstance().onJsonChanged(wait);
    };

    private allowDrop(ev: any) {
        ev.preventDefault();
    }

    protected onDrop = (e: any) => {
        this.isHovered = 0;
    };
    protected onDragLeave = () => {
        // console.log('exit ',this);
        this.isHovered--;
    };
    protected onDragEnter = () => {
        // console.log('enter ',this);
        this.isHovered++;
    };

    render() {
        // console.log("rendering ",this.props.json," with needResize: "+this.needResize);
        setTimeout(() => {
            this.needResize = false;
        }, 10);
        return (
            <div className={ComponentManager.getInstance().isActiveComponent(this) ? 'flex-selected' : ''}
                 onDragOver={this.allowDrop}
                 onDrop={this.onDrop}
                 onDragEnter={this.onDragEnter}
                 onDragLeave={this.onDragLeave}
            >
                {this.renderComponent()}
                <div id={`${this.id}-tooltip`}>
                    {this.getEditor()}
                </div>
            </div>
        )
    }
    public getBubbleIndex = ()=>{
        return $(`#${this.id}`).closest('.swiper-slide').index();
    };
    onComponentClicked = (e: any) => {
        if(this.isOnActiveBubble()){
            ComponentManager.getInstance().setActiveComponent(this);
        }
        else{
            FlexEditor.getInstance().getVisualEditor().getCaourselComponent().selectBubbleWithIndex(
                this.getBubbleIndex()
            );
        }
        e.stopPropagation();
    };
}