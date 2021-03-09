import { FunctionalComponent as FComponent, JSX } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';

export type ComponentOf<T> = T extends FComponent<infer U> ? U : never;

export type Elements = JSX.IntrinsicElements;
export type Tags = keyof JSX.IntrinsicElements;


export type ElementByTag<Tag extends Tags> = Partial<Elements[ Tag ]>;

export type FComponentByTag<Tag extends Tags, O = {}> = FComponent<Partial<O> & ElementByTag<Tag>>;

export type ExtractElement<T> = T extends JSXBase.HTMLAttributes<infer U> ? U : never;


export type Attributes<T> = JSXBase.HTMLAttributes<T>;
export type Props<T> = T & Attributes<T>;
export type PropsByTag<Tag extends Tags> = Props<ElementByTag<Tag>>;
