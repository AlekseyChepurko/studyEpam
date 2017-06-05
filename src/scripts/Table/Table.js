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
        return(
            new Head({
                attributes: {
                    class: "headerClass"
                },
                data: ['a','b','c','d']
            })
        );
    }
}

class Head extends Component{
    constructor(props={}, type='thead') {
        super(type, props);
    }
    render(){
        const line = new Component('tr');
        line.addChildren(this.props.data.map((item) => {
            return new Component('th', {data: item});
        }));
        return line;
    };
}