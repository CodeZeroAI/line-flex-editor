import * as React from 'react';
export abstract class BaseEditor<T> extends React.Component<{component: T}> {
    public readonly id : string;
    constructor(props : {component: T}){
        super(props);
        this.id = Date.now()+'_'+Math.ceil(Math.random()*100000);
    }
    componentDidRender = () =>{
    };
    componentDidMount(){
        this.componentDidRender();
    }
    componentDidUpdate(){
        this.componentDidRender();
    }
    render(){
        return null;
    }
}