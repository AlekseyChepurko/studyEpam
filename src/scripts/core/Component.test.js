/**
 * Created by Алексей on 04.06.2017.
 */

import test from './test'
import Sugard,{Component, render} from './Component'

export default function tests(){
    test("Child addition",(()=>{
        let a = new Component(),
            b = new Component('div');
        a.addChildren([b]);
        return (b.parent === a && a.children[b.numberInParent] === b && a.children[a.dependentChildren[a.dependentChildren.indexOf(b.numberInParent)]] === b);
    })(), true);
    test("Equal elements addition", (()=>{
        let a = new Component();
        let b = new Component();
        a.addChildren([b,b,b,b,b]);
        a.removeChild(0);
        return a.children.length === 0;
    })(),true);
    test("Few elements addition",(()=>{
        let a = Sugard.createElement('div'),
            b = Sugard.createElement('section'),
            c = Sugard.createElement('table'),
            d =Sugard.createElement('h1');
        a.addChildren([b,c,d]);
        let q = document.createElement('nav');
        // render(a, q);
        return (render(a, q).outerHTML);
    })(),(()=>{
        let wrap = document.createElement('nav'),
            d = document.createElement('div'),
            s = document.createElement('section'),
            t = document.createElement('table'),
            h = document.createElement('h1');
        d.appendChild(s);
        d.appendChild(t);
        d.appendChild(h);
        wrap.appendChild(d);
        return wrap.outerHTML;
    })());
    test("Props children addition",(()=>{
        let b = Sugard.createElement('section'),
            c = Sugard.createElement('table'),
            d =Sugard.createElement('h1'),
            a = Sugard.createElement('div', {
            children: [b,c,d]
        });
        let q = document.createElement('nav');
        render(a,q);
        return (q.outerHTML);
    })(),(()=>{
        let wrap = document.createElement('nav'),
            d = document.createElement('div'),
            s = document.createElement('section'),
            t = document.createElement('table'),
            h = document.createElement('h1');
        d.appendChild(s);
        d.appendChild(t);
        d.appendChild(h);
        wrap.appendChild(d);
        return wrap.outerHTML;
    })());
    test("Construct with parent",(()=>{
        let a = new Component(),
            b = new Component(undefined, {}, a);
        if (!(a.children[0].parent === a))
            return false;
        return b.parent === a;
    })(), true);
    test("Backward compatibility (simple)", (()=>{
        let a = new Component(),
            b = new Component('div',{},a);
        return a.children[b.numberInParent] === b;
    })(),true);
    test("Backward compatibility (dependency)",(()=>{
        let a = new Component(),
            c = new Component(undefined,{},a),
            e = new Component(undefined,{},a),
            b = new Component('div',{},a),
            v = new Component('div',{},a),
            q = new Component('div',{},a),
            n = new Component('div',{},a);
        b.parent;
        q.parent;
        v.parent;
        if (a.children[a.dependentChildren[a.dependentChildren.indexOf(c.numberInParent)]] !== undefined ||
            a.children[a.dependentChildren[a.dependentChildren.indexOf(e.numberInParent)]] !== undefined ||
            a.children[a.dependentChildren[a.dependentChildren.indexOf(n.numberInParent)]] !== undefined)
            return false;
        return (a.children[a.dependentChildren[a.dependentChildren.indexOf(b.numberInParent)]] === b &&
        a.children[a.dependentChildren[a.dependentChildren.indexOf(q.numberInParent)]] === q &&
        a.children[a.dependentChildren[a.dependentChildren.indexOf(v.numberInParent)]] === v);
    })(), true);
    test("Child remove by number", (()=>{
        let a = new Component(),
            b = new Component('div', {}, a);
        b.parent;
        a.removeChild(0);
        return a.children.length === 0 && a.dependentChildren.length === 0 && b.parent === b && b.numberInParent === undefined;
    })(), true);
    test("Child remove by component", (()=>{
        let a = new Component(),
            b = new Component('div', {}, a);
        b.parent;
        a.removeChild(b);
        return a.children.length === 0 && a.dependentChildren.length === 0 && b.parent === b && b.numberInParent === undefined;
    })(), true);
    test("Render to Component", (()=>{
        let dest = new Component('div');
        let toRender = new Component('section');
        render(toRender, dest);
        return dest.HTMLObject.outerHTML;
    })(), (()=>{
        let a = document.createElement('div'),
            b = document.createElement('section');
        a.appendChild(b);
        return a.outerHTML
    })());
    test("Render to HTMLElement",(()=>{
        let dest = document.createElement('body'),
            toRender = new Component('section');
        dest.innerHTML = document.querySelector('body').innerHTML;
        render(toRender,dest);
        return dest.outerHTML;
    })(), (()=>{
        let a = document.querySelector('body'),
            b = document.createElement('section');
        a.appendChild(b);
        return a.outerHTML
    })());
    test("Advanced render to component", (()=>{
        let dest = Sugard.createElement('div'),

            toRender = Sugard.createElement('section'),
            table = Sugard.createElement('table'),
            h = Sugard.createElement(),
            a= Sugard.createElement('a');
        toRender.addChildren([table]);
        toRender.addChildren([h]);
        h.addChildren([a]);
        render(toRender, dest);
        return dest.HTMLObject.outerHTML;
    })(),(()=>{
        let wrap = document.createElement('div'),
            s = document.createElement('section'),
            t = document.createElement('table'),
            f = document.createDocumentFragment(),
            a = document.createElement('a');
        s.appendChild(t);
        f.appendChild(a);
        s.appendChild(f);
        wrap.appendChild(s);
        return wrap.outerHTML;
    })());
    test("Simple extension check", (()=>{
        class Ext extends Component{}
        return new Ext() instanceof Component;
    })(), true);
    test("Extended component rendering",(()=>{
        class Table extends Component{
            constructor(type='table', props) {
                super(type, props);
            }
            render(){};
        }
        let a = new Table(),
        b = document.createElement('div');
        render(a, b);
        return b.outerHTML;

    })(), (()=>{
        let a = document.createElement('div');
        a.appendChild(document.createElement('table'));
        return a.outerHTML;
    })())
}