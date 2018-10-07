import * as React from 'react';
import {CarouselContainer} from "./containers/CarouselContainer";
import {CarouselContainerJson} from "./containers/Definitions";
import {FlexSidebar} from "./toolbars/FlexSidebar";

export class FlexVisualEditor extends React.Component<{json: CarouselContainerJson},{}> {
    private carousel : CarouselContainer;
    getCaourselComponent(){
        return this.carousel;
    }
    constructor(props:any){
        super(props);
    }
    componentDidMount(){

        this.componentDidRender();
    }
    componentDidRender = () =>{
    };
    componentDidUpdate(){
        this.componentDidRender();
    }
    render() {
        return (
            <div key = {'flex-editor-simulator'}
                 className = {'flex-editor-simulator'} style={{marginLeft: '170px'}}>
                <FlexSidebar key = {'flex-sidebar'} />
                <CarouselContainer json={this.props.json} width={'auto'} height={'auto'}
                                   ref={(carousel) => {
                                       this.carousel = carousel as CarouselContainer
                                   }}
                                   parentContainer={this}/>
            </div>
        );
    }
}