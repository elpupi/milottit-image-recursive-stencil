import { Component, Host, State, h, FunctionalComponent as FC, Fragment } from '@stencil/core';
import { settingsStore } from '@store';
import { MtStore, mtVisible, PropsByTag } from '@util';
import { HTMLMediaElement } from '@src/types';


/* const [ MtFileDropZoneV, MtImageRecursiveV ] = [
    // mtVisible((props: Partial<JSX.IntrinsicElements[ 'mt-file-drop-zone' ]>, children) => <mt-file-drop-zone {...props}>{children}</mt-file-drop-zone>),
    mtVisible('mt-file-drop-zone', (props, children) => <mt-file-drop-zone {...props}>{children}</mt-file-drop-zone>),
    mtVisible('mt-image-recursive', (props, children) => <mt-image-recursive {...props}>{children}</mt-image-recursive>)
]; */

const [ MtFileDropZoneV, MtImageRecursiveV ] = [
    mtVisible('mt-file-drop-zone'),
    mtVisible('mt-image-recursive')
];

const InputRange: FC<PropsByTag<'mt-input-range'>> = (props, children) => {
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
        settingsStore.state.width = undefined;

        await Promise.all([
            this.imageRecursive.clear(),
            this.mediaPicker.reset()
        ]);
    }


    private onMedia(event: CustomEvent<HTMLMediaElement>) {
        const mediaEl = event.detail;

        this.clear();
        this.isMediaLoaded = true;
        this.imageRecursive.create(mediaEl);
    }


    render() {
        const onMedia = this.onMedia.bind(this);
        const onClick = this.onClick.bind(this);


        return (
            <Host class="center full">
                <MtStore store={settingsStore} childRenderer={({ state }) => (

                    <Fragment>
                        <h3 class="center full title">Milotti's Image Recursive Project</h3>

                        <section class="center full column margin-top">

                            <mt-media-picker onMedia={onMedia} ref={el => this.mediaPicker = el}>Choose or Drag an image or video</mt-media-picker>

                            <mt-row class="margin-top-2">
                                <mt-button secondary slot="item" onClick={() => onClick('clear-all')}>Clear All</mt-button>
                                <mt-button secondary slot="item" onClick={() => onClick('clear-selection')}>Clear Selection</mt-button>
                            </mt-row>


                            <div class="column full center margin-top">
                                <InputRange name="canvas-width" min="200" max="2000" default="auto" onData={e => state.width = e.detail} keySettingsStore="width">Canvas Width:</InputRange>
                                <InputRange name="nb-recursion" class="margin-top-2" min="1" max="30" value="5" onData={e => state.nbRecursion = e.detail}>Number Recursion:</InputRange>
                            </div>

                            <MtFileDropZoneV class="margin-top full center" onMedia={onMedia} visible={!this.isMediaLoaded}>
                                You can drop an image or video here also 📷
                                </MtFileDropZoneV>

                            <MtImageRecursiveV class="margin-top center" visible={this.isMediaLoaded} width={state.width} nbRecursion={state.nbRecursion} innerRef={el => this.imageRecursive = el}>
                            </MtImageRecursiveV>

                        </section>
                    </Fragment>

                )}></MtStore>
            </Host >
        );
    }

}
