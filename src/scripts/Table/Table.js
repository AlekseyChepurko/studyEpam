/**
 * Created by Алексей on 02.06.2017.
 */

import {Component} from '../core/Component'

export default class Table extends Component{
    constructor(head, body, type='table', ...props) {
        super(type, ...props);
        this.state = {
            head: head,
            body: body
        };
    }

    componentWillRender(){
        // console.log('table will render');
    }
    componentDidRender(){
        // console.log('table did render');
    }

    // render(){}
}