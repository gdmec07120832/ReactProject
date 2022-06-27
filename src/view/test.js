import React,{Component} from "react";


class Test extends Component{

    constructor(props){
        super(props);
        this.state={data:new Date()}

    }

    componentDidMount(){
        this.timerID=setInterval(()=>this.tick(),1000);
    }
    componentWillUnmount(){
        clearInterval(this.timerID);
    }
    tick(){
        this.setState({data:new Date()});
    }


    render(){

        return (
            <div>
                <p>这里是测试的！！！</p>
                <div> asdadasdad1`aaaaa{this.state.data.toLocaleTimeString()+'  '+this.props.value+' '+this.props.name}</div>                
            </div>            
        );
    }
}
Test.defaultProps = {
    name: 'Runoob'
}


export default Test;
