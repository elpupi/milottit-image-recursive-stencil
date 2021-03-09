export type HTMLMediaElement = HTMLImageElement | HTMLVideoElement;

export interface WidthHeight<T = number> {
    width: T;
    height: T;
}

export interface Area {
    x: number;
    y: number;
    width: number;
    height: number;
}
