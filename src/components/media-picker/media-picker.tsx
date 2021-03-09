import { Component, Host, h, EventEmitter, Event, Method } from '@stencil/core';

@Component({
    tag: 'mt-media-picker',
    styleUrl: 'media-picker.scss',
    shadow: false,
    scoped: true
})
export class MtMediaPicker {
    @Event({ eventName: 'files' }) onFiles: EventEmitter<FileList>;
    private input: HTMLInputElement;

    private onChange(_event: CustomEvent<InputEvent>) {
        this.onFiles.emit(this.input.files);
    }

    @Method() async reset() {
        // allow to react to change event when the same file is choosen
        this.input.value = null;
    }

    render() {
        return (
            <Host class="center">
                <mt-droppable onFiles={this.onChange.bind(this)}>
                    <label htmlFor="picker">
                        <mt-button primary><slot></slot></mt-button>
                    </label>

                    <input type="file" id="picker" name="picker" accept="image/*, video/*" onInput={this.onChange.bind(this)} ref={el => this.input = el} />
                </mt-droppable>
            </Host>
        );
    }

}
