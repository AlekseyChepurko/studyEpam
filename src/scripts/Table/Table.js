/**
 * Created by Алексей on 02.06.2017.
 */

import {Component} from '../core/Component'

export default class Table extends Component{
    constructor(props,) {
        super('fragment', props);
        this.state = {
            title: this.props.data.title,
            header: this.props.data.header,
            body: this.props.data.body
        };
    }
    render(){
        return([
            new Header({
                data: this.state.title
            }),
            new Body({
                header: this.state.header,
                body: this.state.body
            })
        ]);
    }
}
class Header extends Component {
    constructor(props) {
        super('header', props);
    }
    render(){}
}
class Body extends Component{
    constructor(props) {
        super('table', props)
    }
    render(){
        return ([
            new tHead({
                attributes: {
                    class: "headerClass"
                },
                data: this.props.header
            }),
            new tBody({
                data: this.props.body
            })
        ])
    }
}
class tHead extends Component{
    constructor(props) {
        super('thead', props);
    }
    render(){
        const line = new Component('tr');
        const underLine = new Component('tr');
        line.addChildren(this.props.data.map((item) => {
            return new Component('th', {
                data: item,
                attributes: {
                    align: "left",
                    class: `table__head_item`
                }
            });
        }));
        underLine.addChildren(this.props.data.map(() => {
            return new Component('th', {
                attributes: {
                    class: `underline`
                }
            });
        }));
        return [line, underLine];
    };
}
class tBody extends Component{
    constructor(props){
        super('tbody', props)
    }
    render(){
        const lines = this.props.data.map((item)=>{
            const line = new Component('tr');
            line.addChildren(Object.values(item).map(data => {
                    if( typeof data === 'object' && "state" in data){
                        const wrap = new Component('td');
                        wrap.addChildren(new Component('div', {
                            data: data['state'],
                            attributes: {
                                class: `state ${data['state']}`
                            }
                        }));
                        return wrap
                    }
                    else
                        return new Component('td', {data: data})
                }
                ));
            return line;
        });
        return lines;

    }
}