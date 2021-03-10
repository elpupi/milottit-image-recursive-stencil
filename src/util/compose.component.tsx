import { h, FunctionalComponent as FComponent } from '@stencil/core';
import { Attributes, Props, Tags, ElementByTag, FComponentByTag, ComponentOf, ExtractElement } from './jsx.types';


type InnerRef<T> = { innerRef?: Attributes<T>[ 'ref' ]; };
type Attrs<T> = Props<T & InnerRef<T>>;
type AttrsByTag<Tag extends Tags> = Attrs<ElementByTag<Tag>>;


/* export type FInnerComponent<O = {}> = <F extends FComponent>(InnerComponent: F) => FComponent<ComponentOf<F> & Attrs<O>>;
export type FInnerComponentByTag<O = {}> = <Tag extends Tags>(InnerComponent: FComponentByTag<Tag, O>) => FComponent<O & AttrsByTag<Tag>>; */

export type FInner<O> = <T extends FComponent | Tags>(InnerComponent: T extends Tags ? FComponentByTag<T, O> : T) =>
    T extends Tags ? FComponent<O & AttrsByTag<T>> : FComponent<ComponentOf<T> & Attrs<O>>;


export interface ComposeOptions {
    outerProps?: Array<string | number>;
}


/* export function compose<Tag extends Tags, F extends FComponentByTag<Tag>>(tag: Tag, OuterComponent: F, options?: ComposeOptions): FInner<ComponentOf<F>>;

export function compose<T extends FComponent>(OuterComponent: T, options?: ComposeOptions): FInner<ComponentOf<T>>;

export function compose<T extends FComponent>(OuterComponent: T, options: ComposeOptions = {}): FInner<ComponentOf<T>> {
    const outerPropsKeys = (options.outerProps || []).concat('class', 'style').filter(k => k !== 'innerRef');

    return ((InnerComponent: FComponent) => (props: Attrs<{}>, children: VNode[]): VNode | VNode[] => {
        const { innerRef = _el => { } } = props;

        const outerProps = Object.fromEntries(outerPropsKeys.map(k => [ k, props[ k ] ]));
        const innerProps = Object.fromEntries(Object.entries(props).map(([ k, p ]) => [ k, p ]).filter(([ k ]) => !outerPropsKeys.some(key => key === k)));

        return (
            <OuterComponent {...outerProps}>
                <InnerComponent ref={innerRef} {...innerProps}> {children} </InnerComponent>
            </OuterComponent>
        );
    }) as any;
} */

export interface ComposeOptionsByTag<Tag extends Tags> {
    outerProps?: Array<keyof ElementByTag<Tag>>;
}


export type FInnerComponent<T, C> = FComponent<T & InnerRef<C>>;
export type FInnerByTag<O> = <Tag extends Tags, C extends ElementByTag<Tag>>(tag: Tag, InnerComponent: FComponent<C>) => FInnerComponent<O & C, ExtractElement<C>>;

export function composeByTag<Tag extends Tags, C extends ElementByTag<Tag>>(_tag: Tag, OuterComponent: FComponent<C>, options: ComposeOptionsByTag<Tag> = {}): FInnerByTag<C> {
    const outerPropsKeys = (options.outerProps || []).concat('class', 'style').filter(k => k !== 'innerRef');

    return ((_tag, InnerComponent: FComponent) => (props, children) => {
        const { innerRef = _el => { } } = props;

        const outerProps = Object.fromEntries(outerPropsKeys.map(k => [ k, props[ k ] ]));
        const innerProps = Object.fromEntries(Object.entries(props).map(([ k, p ]) => [ k, p ]).filter(([ k ]) => !outerPropsKeys.some(key => key === k)));

        const O = OuterComponent as FComponent;

        return (
            <O {...outerProps}>
                <InnerComponent ref={innerRef} {...innerProps}> {children} </InnerComponent>
            </O>
        );
    }) as FInnerByTag<C>;
}

export type FInnerByTag2<O> = <Tag extends Tags, C extends ElementByTag<Tag>>(tag: Tag) => FInnerComponent<O & C, ExtractElement<C>>;

export function composeByTag2<Tag extends Tags, C extends ElementByTag<Tag>>(outerTag: Tag, options: ComposeOptionsByTag<Tag> = {}): FInnerByTag2<C> {
    const outerPropsKeys = (options.outerProps || []).concat('class', 'style').filter(k => k !== 'innerRef');

    return ((innerTag) => (props, children) => {
        const { innerRef = _el => { } } = props;

        const outerProps = Object.fromEntries(outerPropsKeys.map(k => [ k, props[ k ] ]));
        const innerProps = Object.fromEntries(Object.entries(props).map(([ k, p ]) => [ k, p ]).filter(([ k ]) => !outerPropsKeys.some(key => key === k)));

        const innerComponent = h(innerTag, { ref: innerRef, ...innerProps }, children);
        return h(outerTag, Object.assign({}, outerProps), innerComponent);

    }) as FInnerByTag2<C>;
}
