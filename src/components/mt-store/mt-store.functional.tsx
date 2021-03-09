import { h, FunctionalComponent } from '@stencil/core';
import { getRenderingRef, VNode } from '@stencil/core/internal';
import { ElementByTag } from '@util/jsx.types';
import { createStore } from '@stencil/store';
import { vnodeToComponent } from '@util';
import { MtStoreChildComponent, MtStoreChildRenderer, StoreState } from './types';


// const instanceMap = new WeakMap<{}, FunctionalComponent<JSX.IntrinsicElements[ 'mt-store' ]>>();


/* export const MtStore = (props: Props, children: Array<MtStoreChildRenderer<any> | VNode>): FunctionalComponent => {
    // const instance = getRenderingRef();

    //  const mtStore = instanceMap.get(instance);
    // if (mtStore)
    //     return mtStore;

    const warning = `MtStore must have the 1st child type function(store: Store): VNode | VNode[]`;

    const child = children[ 0 ];

    if (typeof child !== 'function') {
        console.error(warning);
        return;
    }

    const childRenderer: MtStoreChildRenderer<any> = child;

    const { state, childs, ref, ...rest } = props;

    const allChildren = (children.length > 1 ? (children as VNode[]).slice(1) : []).concat(childs || []);


    const newMtStore = <mt-store state={state as any} childRenderer={childRenderer} childs={allChildren} ref={ref as any} {...rest}></mt-store>;
    // instanceMap.set(instance, newMtStore);

    return newMtStore;
}; */


// @Prop() state: StoreState = {};
// @Prop({ mutable: true }) store: Store<StoreState>;
type ChildRenderer<S extends StoreState> = MtStoreChildRenderer<S> | MtStoreChildComponent<S>;

export interface MtStoreProps<S extends StoreState> {
    state?: S;
    childRenderer?: ChildRenderer<S>;
    childs?: VNode[];
}

// type Props<S extends StoreState> = PropsByTag<'mt-store'>;
type MtStoreComp = ElementByTag<'mt-store'>;


const instanceMap = new WeakMap<{}, MtStoreComp[ 'store' ]>();

export const MtStore = <S extends StoreState>(props: MtStoreProps<S>, children: Array<ChildRenderer<S> | VNode>): FunctionalComponent => {

    const warning = `MtStore must have the "childRenderer" of type "(store: Store)=> VNode | VNode[]" set as the first child or through the attribute "childRenderer"`;

    const { state = {}, childs, childRenderer } = props;

    const child = children[ 0 ] || childRenderer;

    if (typeof child !== 'function') {
        console.error(warning);
        return null;
    }

    const childR: ChildRenderer<S> = child;

    const allChildren = (children.length > 1 ? children.slice(1) as VNode[] : []).concat(childs || []);

    const instance = getRenderingRef();
    const instanceStore = instanceMap.get(instance);

    const store = instanceStore || createStore(state);
    instanceMap.set(instance, store);

    const vnodeOrComp = childR(store as any, allChildren);
    const Child = typeof vnodeOrComp === 'function' ? vnodeOrComp : vnodeToComponent(vnodeOrComp);

    return <Child><store></store></Child>;
};
