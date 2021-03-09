import type { Area } from '@src/types';
import easelJS from './easeljs';


export interface ImageSource {
    getImage(): HTMLImageElement;
}


export class EaselBitmap extends easelJS.Bitmap {
    public destRect: Area;
    public debug: any = undefined;

    constructor(imageOrUrl: string | ImageSource | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement) {
        super(imageOrUrl);
    }

    getImage() {
        return (this.image as any as ImageSource)?.getImage?.() || this.image;
    }

    draw(ctx: CanvasRenderingContext2D, ignoreCache: boolean) {

        const { destRect, sourceRect } = this;

        if (!destRect)
            return super.draw(ctx, ignoreCache);

        if ((this as any).DisplayObject_draw(ctx, ignoreCache)) { return true; }

        const img = this.getImage();
        if (!img) { return true; }


        if (sourceRect && destRect)
            ctx.drawImage(img, sourceRect.x, sourceRect.y, sourceRect.width, sourceRect.height, destRect.x, destRect.y, destRect.width, destRect.height);
        else if (destRect && destRect.width && destRect.height)
            ctx.drawImage(img, destRect.x, destRect.y, destRect.width, destRect.height);
        else if (destRect)
            ctx.drawImage(img, destRect.x, destRect.y);
        else
            ctx.drawImage(img, 0, 0);

        return true;
    }
}
