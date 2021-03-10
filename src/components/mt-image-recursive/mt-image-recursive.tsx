import { Component, Host, Prop, h, Method, Watch, State, EventEmitter, Event } from '@stencil/core';
import { settingsStore } from '@store';
import { toNumber } from '@util';
import { Area, WidthHeight, HTMLMediaElement } from '@src/types';
import { easelJS, DragableSelection, ImageRecursive, EaselBitmap, imageDimensions } from '@services';

export type NumberStr = number | string;


@Component({
    tag: 'mt-image-recursive',
    styleUrl: 'mt-image-recursive.scss',
    shadow: true,
})
export class MtImageRecursive {
    @Prop() width: NumberStr = '100%';
    private canvasWidth: NumberStr;
    @State() canvasHeight: NumberStr = 100;
    @Prop() nbRecursion: NumberStr = 5;
    @Event({ eventName: 'newWidth' }) onNewWidth: EventEmitter<number>;

    private stage: createjs.Stage;
    private canvas: HTMLCanvasElement;
    private imageRecursive: ImageRecursive;
    private selection: DragableSelection;
    private mediaEl: HTMLMediaElement;
    private sceneDimension: WidthHeight;


    private initStage() {
        this.clearCanvas();

        const stage = new easelJS.Stage(this.canvas);

        const addChild = stage.addChild.bind(stage);

        // each time we add an object, we sort out according to zIndex if it exists
        stage.addChild = function (...children: createjs.DisplayObject[]): createjs.DisplayObject {
            const child = addChild(...children);

            stage.sortChildren((o1: createjs.DisplayObject & { zIndex?: number; }, o2: createjs.DisplayObject & { zIndex?: number; }) => {
                const z1 = o1.zIndex || 0;
                const z2 = o2.zIndex || 0;

                return z1 > z2 ? 1 : z1 < z2 ? -1 : 0;
            });

            return child;
        };

        stage.autoClear = false;
        this.stage = stage;
    }

    private setSize(size: Partial<WidthHeight<NumberStr>>) {
        this.canvasWidth = size.width ?? this.canvasWidth;
        this.canvasHeight = size.height ?? this.canvasHeight;

        if (typeof this.canvasWidth === 'number') {
            this.onNewWidth.emit(this.canvasWidth);
            settingsStore.state.width = this.canvasWidth;
        }
    }

    @Watch('width') watchWidth(newWidth: number, oldWidth: number) {
        if (!newWidth || newWidth === oldWidth)
            return;

        this.setSize({ width: newWidth ?? '100%' });

        const selection = this.selection;

        this.create(this.mediaEl);

        if (selection) {
            const ratio = newWidth / oldWidth;
            const zoom = ratio === 0 || ratio === Infinity || isNaN(ratio) ? 1 : ratio;

            this.selection?.copyFromSelection(selection, zoom);
        }
    }

    @Watch('nbRecursion') watchNbRecursion() {
        this.createImageRecursive();
    }

    @Method() async create(mediaEl: HTMLMediaElement | undefined) {
        if (!mediaEl)
            return;

        this.initStage();
        this.mediaEl = mediaEl;

        const { stage } = this;

        const easelImage = this.createImage();
        stage.addChild(easelImage);

        this.addDragableSelection();

        // run tick (rAF in the background calling every time stage.update => calling .draw
        easelJS.Ticker.on('tick', (event: createjs.Event) => stage.update(event));
    }

    private createImage(): EaselBitmap {

        this.sceneDimension = imageDimensions(this.mediaEl, { width: toNumber(this.width) });
        const { width, height } = this.sceneDimension;

        this.setSize({ width, height });

        const imageEasel = new EaselBitmap(this.mediaEl);
        imageEasel.destRect = new easelJS.Rectangle(0, 0, width, height);

        return imageEasel;
    }

    private addDragableSelection() {

        const { width, height } = this.sceneDimension;

        this.selection = new DragableSelection(this.stage, { constraints: { ratioWtoH: height / width } });

        this.selection.onChange(area => this.createImageRecursive(area));
    }

    private createImageRecursive(area?: Area) {
        const { width, height } = this.sceneDimension;

        const areaToDraw = area || this.imageRecursive?.initArea;

        if (!areaToDraw)
            return;

        this.removeImageRecursive();

        this.imageRecursive = new ImageRecursive({ width, height }, areaToDraw, this.mediaEl, toNumber(this.nbRecursion));
        const imageRecursiveObj = this.imageRecursive.create();

        this.stage.addChild(imageRecursiveObj);
    }


    private removeImageRecursive() {
        if (this?.imageRecursive) {
            this.stage.removeChild(this.imageRecursive.image);
            this.imageRecursive = undefined;
        }
    }

    @Method() async removeRecursion() {
        return this.removeImageRecursive();
    }

    private clearCanvas() {
        // kill stuff
        easelJS.Ticker.removeAllEventListeners();

        this.stage?.enableDOMEvents(false);
        this.stage?.clear();

        // this.setDefaultSize();
    }

    @Method() async clear() {
        this.clearCanvas();
    }

    render() {
        return (
            <Host>
                <canvas width={this.canvasWidth} height={this.canvasHeight} ref={el => this.canvas = el}></canvas>
            </Host>
        );
    }

}
