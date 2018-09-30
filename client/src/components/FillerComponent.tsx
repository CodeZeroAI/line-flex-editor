import * as React from 'react';
import {FillerComponentJson} from "./Definitions";
import {BaseComponent} from "./BaseComponent";
export class FillerComponent extends BaseComponent<FillerComponentJson> {
    constructor(props:any){
        super(props);
    }
    protected renderEditor(): JSX.Element | null {
        return null;
    }
    renderComponent() {
        return (
            <div id = {this.id}  className={`flex-component flex-filler-component`}>
                FILLER
            </div>
        );
    }
}