import { Component, Host, State, h, FunctionalComponent as FC } from '@stencil/core';
import { onNewFile } from '@services/new-file';
import { JSX } from '@src/components';
import { mtVisible } from '@components/mt-visible/mt-visible.functional';
import { store } from '@src/settings.store';


/* const [ MtFileDropZoneV, MtImageRecursiveV ] = [
    // mtVisible((props: Partial<JSX.IntrinsicElements[ 'mt-file-drop-zone' ]>, children) => <mt-file-drop-zone {...props}>{children}</mt-file-drop-zone>),
    mtVisible('mt-file-drop-zone', (props, children) => <mt-file-drop-zone {...props}>{children}</mt-file-drop-zone>),
    mtVisible('mt-image-recursive', (props, children) => <mt-image-recursive {...props}>{children}</mt-image-recursive>)
]; */

const [ MtFileDropZoneV, MtImageRecursiveV ] = [
    mtVisible('mt-file-drop-zone'),
    mtVisible('mt-image-recursive')
];

const InputRange: FC<Partial<JSX.MtInputRange> & { class?: string; }> = (props, children) => {
    const p = { ...props, class: `column full ${props.class || ''}` };

    return (<mt-input-range enabled="false" emitOnInit {...p}>{children}</mt-input-range>);
};


@Component({
    tag: 'app-root',
    styleUrl: 'app-root.scss',
    shadow: false,
    scoped: true
})
export class AppRoot {
    private imageRecursive: HTMLMtImageRecursiveElement;
    private mediaPicker: HTMLMtMediaPickerElement;
    @State() private nbRecursion: number = 5;
    @State() private width: number;
    // @State() private onCanvasWidth: number;
    @State() private isMediaLoaded: boolean = false;


    constructor() { }


    private onClick(name: 'clear-all' | 'clear-selection') {
        if (name === 'clear-all') {
            this.clear();
        }

        if (name === 'clear-selection') {
            this.imageRecursive.removeRecursion();
        }
    }

    private async clear() {
        this.isMediaLoaded = false;
        store.set('width', undefined);

        await Promise.all([
            this.imageRecursive.clear(),
            this.mediaPicker.reset()
        ]);
    }


    private onNewFiles(event: CustomEvent<FileList>) {
        onNewFile(event.detail, mediaEl => {
            this.clear();
            this.isMediaLoaded = true;
            this.imageRecursive.create(mediaEl);
        });
    }


    render() {
        const onNewFiles = this.onNewFiles.bind(this);
        const onClick = this.onClick.bind(this);
        onNewFiles === onNewFiles;
        onClick === onClick;

        return (
            <Host class="center full" >

                {/* <mt-file-drop-zone class="margin-top full center" onFiles={onNewFiles}>
                    You can drop an image or video here also 📷
                </mt-file-drop-zone> */}

                <h3 class="center full title">Milotti Challenge</h3>

                <section class="center full column margin-top">

                    <mt-media-picker onFiles={onNewFiles} ref={el => this.mediaPicker = el}>Choose or Drag an image or video</mt-media-picker>

                    <mt-row class="margin-top-2">
                        <mt-button secondary slot="item" onClick={() => onClick('clear-all')}>Clear All</mt-button>
                        <mt-button secondary slot="item" onClick={() => onClick('clear-selection')}>Clear Selection</mt-button>
                    </mt-row>


                    <div class="column full center margin-top">
                        <InputRange name="canvas-width" min="200" max="2000" default="auto" onData={e => this.width = e.detail} store="width">Canvas Width:</InputRange>
                        <InputRange name="nb-recursion" class="margin-top-2" min="1" max="30" value="5" onData={e => this.nbRecursion = e.detail}>Number Recursion:</InputRange>
                    </div>

                    <MtFileDropZoneV class="margin-top full center" onFiles={onNewFiles} visible={!this.isMediaLoaded}>
                        You can drop an image or video here also 📷
                    </MtFileDropZoneV>

                    <MtImageRecursiveV class="margin-top center" visible={this.isMediaLoaded} width={this.width} nbRecursion={this.nbRecursion} innerRef={el => this.imageRecursive = el}>
                    </MtImageRecursiveV>

                </section>

            </Host >
        );
    }

}
