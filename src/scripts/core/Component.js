/**
 * Created by Алексей on 03.06.2017.
 */

const global= document.querySelector('body');
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
        this.isRendered = false;
        this.children = [];
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
        return this;

    }
    addChildren(...children){
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

    render(dest=this.parent){
        if(dest === this)
            throw new ReferenceError(`Rendering to the self`);

        if(!(dest instanceof Node) && dest.constructor.name !== "Component")
            throw new TypeError(`You are trying to mount element to not Node or Component instance`);

        this.children.forEach((child)=>{
            this.HTMLObject.appendChild(
                child.HTMLObject
            );
            child.render();
        });
        dest instanceof Node
            ?dest.appendChild(this.HTMLObject)
            :dest.HTMLObject.appendChild(this.HTMLObject);
        return this.HTMLObject;
    }
}

export default class Sugard{
    static createElement(elem, parent, props){
        return new Component(elem, props, parent);
    };
}