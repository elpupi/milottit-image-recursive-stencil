import { Component, Host, Event, EventEmitter, h } from '@stencil/core';
import { MtStore } from '@components/mt-store/mt-store.functional';
/* import { Store } from '@components/mt-store/mt-store';


type State = {
    isDragging: boolean;
}; */


@Component({
    tag: 'mt-file-drop-zone',
    styleUrl: 'mt-file-drop-zone.scss',
    shadow: false,
    scoped: true
})
export class MtFileDropZone {
    @Event({ eventName: 'files' }) onFiles: EventEmitter<FileList>;

    render() {
        return (
            <Host>
                <MtStore state={{ isDragging: false }} childRenderer={store => (

                    <mt-droppable class="drop-zone center full" onFiles={e => this.onFiles.emit(e.detail)} onDragging={e => store.set('isDragging', e.detail)}>
                        <span draggable class="info">
                            <mt-visible visible={!store.get('isDragging')}><slot></slot></mt-visible>
                            <mt-visible visible={store.get('isDragging')}><span>Dragging file...</span></mt-visible>
                        </span>

                        <span draggable class="loading"></span>
                    </mt-droppable>

                )}></MtStore>

            </Host >
        );
    }

}
