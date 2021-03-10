export type BooleanAttribute = boolean | 'true' | 'false';

export const toBoolean = (v: BooleanAttribute) => {
    return typeof v === 'boolean' ? v : v === 'true' ? true : v === 'false' ? false : false;
};
export const toString = (v: any) => {
    return `${v}`;
};

export const toNumber = (v: number | string) => {
    return typeof v === 'number' ? v : parseFloat(v);
};


export const zoomFromMouseWheel = (event: WheelEvent) => {
    return event.deltaY > 0 ? 1 / 1.1 : 1.1;
};


export const elementVisibility = (el: HTMLElement, visible: boolean) => visible ? el.classList.remove('invisible') : el.classList.add('invisible');


export type TT<K> = K | K[];

export function ensureArray<T extends TT<any>>(v: T): T extends any[] ? T : T[] {
    return (Array.isArray(v) ? v : typeof v !== 'undefined' ? [ v ] : []) as any;
}

export function ensureFunction<T>(v: T): T extends (...args: any[]) => any ? T : never {
    return typeof v === 'function' ? v as any : (..._args: any[]) => v;
}

export function isDefinedProp<T extends {} | any[]>(o: T, k: keyof T) {
    return k in o;
}

export type FF<T, Args extends [ any?, any?, any?, any?, any?, any?, ] = []> = T | ((...args: Args) => T);


export type ReturnIfSelector<T, E, N> = { if?: FF<boolean>, then: T; else?: E; next?: N; isValueFunction?: boolean; };
export type IfSelector<T, E, N, D> = ((data?: D) => ReturnIfSelector<T, E, N>) | ReturnIfSelector<T, E, N>;


export const ifChained = <D = never, F = never>(data: D = undefined, finalValue: F = undefined, done: boolean = false) => ({
    next: <T, E = never, N = never>(selector: IfSelector<T, E, N, D>) => {
        // for TS typing, we are obliged to return in one place only
        // otherwise, TS will give the return type of next the "any" type
        let value: F | T | E = undefined;
        let nextData: N = undefined;
        let isDone: boolean = undefined;

        if (done) {
            value = finalValue;
            nextData = data as any as N;
            isDone = true;
        } else {

            const select = ensureFunction(selector)(data);

            const iff = ensureFunction(select.if)();
            const then = () => select.isValueFunction ? select.then : ensureFunction(select.then)();
            const elsee = () => isDefinedProp(select, 'else') ? select.isValueFunction ? select.else : ensureFunction(select.else)() : undefined;

            value = iff || typeof iff === 'undefined' ? then() : elsee();
            nextData = isDefinedProp(select, 'next') ? select.next : data as any as N;
            isDone = iff || isDefinedProp(select, 'else');
        }

        return { next: ifChained(nextData, value, isDone).next, value };
    }
});
