import { Component, Host, h, EventEmitter, Event, Method, Fragment } from '@stencil/core';
import { MtStore } from '@util';
import { HTMLMediaElement } from '@src/types';
import { initDroppableState, MtDroppableStateInfo, MtDroppableWithState } from '@components/mt-droppable/mt-droppable.functional';


@Component({
    tag: 'mt-media-picker',
    styleUrl: 'media-picker.scss',
    shadow: false,
    scoped: true
})
export class MtMediaPicker {
    @Event({ eventName: 'media' }) onMedia: EventEmitter<HTMLMediaElement>;

    private input: HTMLInputElement;

    @Method() async reset() {
        // allow to react to change event when the same file is choosen
        this.input.value = null;
    }

    render() {
        const onMedia = this.onMedia.emit.bind(this.onMedia);

        return (
            <Host class="center">
                <MtStore state={initDroppableState} childRenderer={({ state }) => (
                    <Fragment>

                        <MtDroppableWithState state={state} onMedia={onMedia}>
                            <label htmlFor="picker">
                                <mt-button primary style={{ width: '300px' }}>
                                    <MtDroppableStateInfo state={state.zoneState}></MtDroppableStateInfo>
                                </mt-button>
                            </label>
                        </MtDroppableWithState>

                        <input type="file" id="picker" name="picker" accept="image/*, video/*" onInput={() => state.files = this.input.files} ref={el => this.input = el} />
                    </Fragment>

                )}><slot></slot></MtStore>
            </Host>
        );
    }

}
