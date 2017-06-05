/**
 * Created by Алексей on 02.06.2017.
 */

import Sugard,{Component} from '../core/Component'

export default class Table extends Component{
    constructor(props, type='table') {
        super(type, props);
        this.state = {
            title: this.props.data.title,
            header: this.props.data.header,
            body: this.props.data.body
        };
    }
    componentWillRender(){}
    componentDidRender(){}

    render(){
        this.addChildren([
            new Head({
                attributes: {
                    class: "headerClass"
                }
            }),
        ]);
    }
}

class Head extends Component{
    constructor(props={}, type='thead') {
        super(type, props);
    }
    render(){
        const headers = ['a','b','c','d'];
        const line = new Component('tr');
        line.addChildren(headers.map((item)=> new Component('th', {data: item})));
        this.addChildren([line]);
    };
}