import * as React from 'react';
import {Component} from "react";
import {ActionJson} from "../components/Definitions";
import {DropdownSelector} from "./DropdownSelector";
import {ActionFactory} from "./ActionFactory";

export class ActionSelector extends Component<{
    json?: ActionJson,
    onActionUpdated: (json: ActionJson) => void }> {

    private id: string = 'A' + Date.now() + '_' + Math.round(Math.random() * 1000000);
    private actionTypeDropdown: DropdownSelector;

    constructor(props: any) {
        super(props);
    }


    refreshValueInputs = () => {
        const action = ActionFactory.parseActionJson(this.props.json);
        const type = this.actionTypeDropdown.getCurrentValue();
        const prop = JSON.parse(JSON.stringify(ActionFactory.ACTION_PROPERTIES[type]));
        // if(this.props.noLabel) prop.unshift();
        for (let i = 1; i <= 3; i++) {
            const valueProp = prop.values[i-1];
            if (valueProp) {
                $(`#${this.id}-value-label-${i}`).text(valueProp.label).show();
                $(`#${this.id}-value-input-${i}`).val(action.values[i]).show();
            }
            else {
                $(`#${this.id}-value-label-${i}`).hide();
                $(`#${this.id}-value-input-${i}`).hide();
            }
        }
    };
    componentDidMount(){
        this.refreshValueInputs();
    }
    componentDidUpdate(){
        this.refreshValueInputs();
    }
    onValueChanged = () => {
        const values: string[] = [];
        for (let i = 1; i <= 3; i++) {
            values.push($(`#${this.id}-value-input-${i}>input`).val() as string);
        }
        const type = this.actionTypeDropdown.getCurrentValue();
        const actionJson = ActionFactory.getActionJson(type, values);
        this.props.onActionUpdated(actionJson);
    };

    render() {
        const action = ActionFactory.parseActionJson(this.props.json);
        return (
            <div>
                <div id={this.id} className={'flex-tooltip-section'}>
                    <label className={'flex-tooltip-label'}>Action</label>
                    <div className={'flex-tooltip-entry'}>
                        <DropdownSelector
                            ref={(dropdown) => {
                                this.actionTypeDropdown = dropdown as DropdownSelector
                            }}
                            id={this.id + '-type'}
                            options={ActionFactory.getActionDropdownSelector()}
                            defaultValue={action.type}
                            onChange={this.onValueChanged}
                        />
                    </div>
                    <label id={this.id + '-value-label-1'} className={'flex-tooltip-label mt-10'}> Val1</label>
                    <div id={this.id + '-value-input-1'} className={'flex-tooltip-entry'}>
                        <input id={`${this.id}-edit-text`}
                               className="flex-tooltip-text-input flex-tooltip-entry flex-tooltip-input"
                               type="text"
                               onChange={this.onValueChanged}
                               defaultValue={action.values[0] || ''}/>
                    </div>
                    <label id={this.id + '-value-label-2'} className={'flex-tooltip-label mt-10'}> Val2</label>
                    <div id={this.id + '-value-input-2'} className={'flex-tooltip-entry'}>
                        <input id={`${this.id}-edit-text`}
                               className="flex-tooltip-text-input flex-tooltip-entry flex-tooltip-input"
                               type="text"
                               onChange={this.onValueChanged}
                               defaultValue={action.values[1]|| ''}/>
                    </div>
                    <label id={this.id + '-value-label-3'} className={'flex-tooltip-label mt-10'}> Val3</label>
                    <div id={this.id + '-value-input-3'} className={'flex-tooltip-entry'}>
                        <input id={`${this.id}-edit-text`}
                               className="flex-tooltip-text-input flex-tooltip-entry flex-tooltip-input"
                               type="text"
                               onChange={this.onValueChanged}
                               defaultValue={action.values[2] || ''}/>
                    </div>
                </div>
            </div>
        );
    }
}