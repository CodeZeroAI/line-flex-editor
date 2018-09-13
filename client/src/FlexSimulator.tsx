import * as React from 'react';
import './FlexEditor.css';
export class FlexEditor extends React.Component<{flexJson: any}, {}> {
    constructor(props:any){
        super(props);
    }
    render() {
        return (
            <div className={`flex-simulator-container col-md-4`}>
            </div>
        );
    }
}