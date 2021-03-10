import { Component, Host, Event, EventEmitter, h } from '@stencil/core';
import { HTMLMediaElement } from '@src/types';
import { MtStore } from '@util';
import { initDroppableState, MtDroppableStateInfo, MtDroppableWithState } from '@components/mt-droppable/mt-droppable.functional';




@Component({
    tag: 'mt-file-drop-zone',
    styleUrl: 'mt-file-drop-zone.scss',
    shadow: false,
    scoped: true
})
export class MtFileDropZone {
    @Event({ eventName: 'media' }) onMedia: EventEmitter<HTMLMediaElement>;

    render() {
        const onMedia = this.onMedia.emit.bind(this.onMedia);

        return (
            <Host>
                <MtStore state={initDroppableState} childRenderer={({ state }) => (
                    <MtDroppableWithState state={state} onMedia={onMedia}>
                        <MtDroppableStateInfo state={state.zoneState}></MtDroppableStateInfo>
                    </MtDroppableWithState>
                )}><slot></slot></MtStore>
            </Host >
        );
    }
}
