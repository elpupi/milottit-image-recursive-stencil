import { h/* , FunctionalComponent, JSX as JSX2 */ } from '@stencil/core';
/* import { JSX } from '@src/components';
import { JSXBase } from '@stencil/core/internal'; */
import { composeByTag2 } from '@util';

/* export function mtVisible<T extends FunctionalComponent<any>>(Component: T): FunctionalComponent<Props<ComponentOf<T>>> {
    return (props: Props<ComponentOf<T>>, children: VNode[]): VNode => {
        const { visible, class: className, style, innerRef = _el => { }, ...passThroughProps } = props;

        return <mt-visible visible={visible} class={className} style={style}><Component ref={innerRef} {...passThroughProps}>{children}</Component></mt-visible>;
    };
} */
/* type Props<T> = T & JSX.MtVisible & JSXBase.HTMLAttributes<T> & { innerRef?: JSXBase.HTMLAttributes<T>[ 'ref' ]; };
type ComponentOf<T> = T extends FunctionalComponent<infer U> ? U : never;



type Comp<Tag extends keyof JSX.IntrinsicElements, E extends boolean = false> = Partial<JSX2.IntrinsicElements[ Tag ]> & (E extends false ? {} : Extra<Tag>);
type Extra<Tag extends keyof JSX.IntrinsicElements> = JSX.MtVisible & { innerRef?: JSXBase.HTMLAttributes<Comp<Tag>>[ 'ref' ]; };
type FComp<Tag extends keyof JSX.IntrinsicElements, E extends boolean = false> = FunctionalComponent<Comp<Tag, E>>;
 */

/* export function mtVisible2<Tag extends keyof JSX.IntrinsicElements>(Component: FComp<Tag>): FComp<Tag, true> {
    return (props: Comp<Tag, true>, children: VNode[]): VNode => {
        const { visible, class: className, style, innerRef = _el => { }, ...passThroughProps } = props;
        const p = passThroughProps as unknown as Comp<Tag>;

        return <mt-visible visible={visible} class={className} style={style}><Component ref={innerRef} {...p}>{children}</Component></mt-visible>;
    };
}
 */

/* export function mtVisible<Tag extends keyof JSX.IntrinsicElements>(Component: FComp<Tag>): FComp<Tag, true>;
export function mtVisible<T extends FunctionalComponent<any>>(Component: T): FunctionalComponent<Props<ComponentOf<T>>>;
export function mtVisible<T extends FunctionalComponent<any>>(Component: T): FunctionalComponent<Props<ComponentOf<T>>> {
    return (props: Props<{}>, children: VNode[]): VNode => {
        const { visible, class: className, style, innerRef = _el => { }, ...passThroughProps } = props;

        return <mt-visible visible={visible} class={className} style={style}><Component ref={innerRef} {...passThroughProps}>{children}</Component></mt-visible>;
    };
} */


// export const mtVisible = composeByTag('mt-visible', (props, children) => <mt-visible {...props}>{children}</mt-visible>, { outerProps: [ 'visible' ] });
export const mtVisible = composeByTag2('mt-visible', { outerProps: [ 'visible' ] });

// const VisibleImage = mtVisible('mt-image-recursive', (props, children) => <mt-image-recursive {...props}>{children}</mt-image-recursive>);
/* const VisibleImage = makeVisible('mt-image-recursive', (props, children) => <mt-image-recursive {...props}>{children}</mt-image-recursive>);

type A = typeof VisibleImage;

const a = <VisibleImage nbRecursion={2} visible={true} innerRef={el => el}></VisibleImage>;

VisibleImage(undefined, undefined, undefined);
 */
