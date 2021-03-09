import type { Area, HTMLMediaElement, WidthHeight } from '@src/types';
import { EaselBitmap } from './image-bitmap';
import easelJS from './easeljs';

interface Factor { x: number; y: number; }


export class ImageRecursive {
    public image: createjs.Container;

    constructor(private canvasDim: WidthHeight, public initArea: Area, private media: HTMLMediaElement, public maxRecursion = 5) {
    }

    create(): createjs.Container {
        const { initArea, canvasDim: d } = this;

        const factor: Factor = {
            x: initArea.width / d.width,
            y: initArea.height / d.height
        };

        const container = new easelJS.Container() as createjs.Container & { zIndex: number; };
        container.zIndex = 1;

        const nextImage = (scene: Area, step: number): createjs.Container => {
            if (step === 0)
                return container;

            const image = new EaselBitmap(this.media);
            image.destRect = scene;

            container.addChild(image);

            const F = factor;

            const nextScene = {
                width: F.x * scene.width,
                height: F.y * scene.height,
                x: initArea.x + F.x * scene.x,
                y: initArea.y + F.y * scene.y
            };

            return nextImage(nextScene, step - 1);
        };


        this.image = nextImage(initArea, this.maxRecursion);
        return this.image;
    }
}
