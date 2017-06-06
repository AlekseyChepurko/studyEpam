/**
 * Created by Алексей on 03.06.2017.
 */

export class Component {
    constructor(type="fragment", props={},parent=this){
        Object.defineProperty(this, "parent",{
            set(val){
                this.__parent__ = val;
            },
            get(){
                if(this.numberInParent !== undefined){
                    if(!this.__parent__.dependentChildren)
                        this.__parent__.dependentChildren = [this.numberInParent];
                    if (this.__parent__.dependentChildren.indexOf(this.numberInParent) === -1)
                        this.__parent__.dependentChildren.push(this.numberInParent);
                }
                return(this.__parent__)
            }
        });
        Object.defineProperty(this, 'children',{
            value: props.children || [],
            enumerable: true
        });
        this.props = props;
        Object.freeze(this.props);
        this.state = {};
        this.isRendered = false;
        this.dependentChildren = [];
        this.__parent__= undefined;
        this.parent = parent;
        type === "fragment"
            ? this.HTMLObject = document.createDocumentFragment()
            : this.HTMLObject = document.createElement(type);
        if (parent !== this && parent.children.indexOf(this) === -1)
            this.parent.children.push(this);
        parent === this
            ?this.numberInParent = undefined
            :this.numberInParent = this.parent.children.indexOf(this);

        if(this.props.attributes && type !== 'fragment')
            for(const prop in this.props.attributes){
                this.HTMLObject.setAttribute(prop, this.props.attributes[prop])
            }
        if(this.props.data && typeof this.props.data !== 'object')
            this.HTMLObject.innerHTML += this.props.data;
        return this;

    }
    addChildren(children=[]){
        if(!Array.isArray(children))
            children = [children];
        children.forEach((child)=>{
            if (!(child instanceof Component))
                throw new TypeError(`instance of ${child.constructor.name} given instead of Component`);
            child.parent = this;
            child.numberInParent = this.children.length;
            if(this.children.indexOf(child) > -1 )
                return;
            return this.children.push(child);
        })
    };
    removeChild(element){
        if (element.constructor.name !== "Number" && element.constructor.name !== "Component")
            throw new TypeError(`Passing ${element.constructor.name} as argument for removeChild function instead of Number or Component`);
        switch (element.constructor.name){
            case "Number":
                if (this.children[element] === undefined)
                    throw new ReferenceError(`${element}s child does not exist`);
                this.dependentChildren.splice(this.children[element].numberInParent,1);
                this.children[element].numberInParent = undefined;
                this.children[element].parent = this.children[element];
                return this.children.splice(element,1);
            case "Component":
                if(this.children.indexOf(element) === -1)
                    throw new ReferenceError(`Child does not exist`);
                this.dependentChildren.splice(element.numberInParent,1);
                element.numberInParent = undefined;
                element.parent = element;
                return this.children.splice(this.children.indexOf(element),1);
            default: throw new TypeError(`Passing ${element.constructor.name} as argument for removeChild function instead of Number or Component`);
        }

    };

    componentWillRender(){
    };
    componentDidRender(){
    };
    componentWillUpdate(){};
    componentDidUpdate(){
    };

    /**
     *
     * @param element
     * @param dest
     */
    static render(element ,dest) {
        if(!('render' in element))
            if(element.constructor.name !== "Component")
                throw new SyntaxError("Every Component instance that extends Component has to define method render()");
            else {}
        else
            element.addChildren(element.render());

        if (!(element instanceof Component) && !(element instanceof Node)) {
    throw new TypeError(`Render source has to be Component or Node instance - not ${element.constructor.name}`);
}
        if (!(dest instanceof Node) && !(dest instanceof Component)) {
            throw new TypeError(`Render destination has to be Node instance - not ${dest.constructor.name}`);
        }
        element.componentWillRender();

        if (dest instanceof Node){
            if (element instanceof Component) {
                element.children.forEach((item) => {
                    Component.render(item, element.HTMLObject);
                });
                dest.appendChild(element.HTMLObject);
            }
            else dest.appendChild(element);
        } else {
            if (element instanceof Component) {
                element.children.forEach((item) => {
                    Component.render(item, element.HTMLObject);
                });
                dest.HTMLObject.appendChild(element.HTMLObject);
            }
            else dest.HTMLObject.appendChild(element);
        }

        element.componentDidRender();
        element.isRendered = true;
        return dest;
    }
}

export function render(element, dest){
    return Component.render(element, dest);
}

export default class Sugard{
    /**
     * Creates Component element
     * @param {string|undefined} type
     * @param {object|undefined} props
     * @param {Component|object} parent
     * @returns {Component}
     */
    static createElement(type="fragment",props={}, parent){
        if(typeof type === 'string'){
            const res = new Component(type,  props, parent);
            if(props.children)
                res.addChildren(props.children);
            return res;
        }
        throw new TypeError("Now only tags may be render via this method");
    };

}