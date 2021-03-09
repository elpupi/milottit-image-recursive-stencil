import { FunctionalComponent, h, VNode } from '@stencil/core';
import { PropsByTag, Tags } from './jsx.types';

export const vnodeToComponent = <T extends {}>(vnodes: VNode | VNode[]): FunctionalComponent<T> => {
    return (_props: T, _children: VNode[]) => vnodes;
};


export const tagToComponent = <Tag extends Tags>(tag: Tag): FunctionalComponent<PropsByTag<Tag>> => {
    return (props: {}, children) => h(tag, { ...props }, children);
};
