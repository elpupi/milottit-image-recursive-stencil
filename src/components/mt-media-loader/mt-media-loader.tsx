import { Component, Host, h, Prop, State, Watch, Event, EventEmitter } from '@stencil/core';
import { loadMediaFile } from '@services';
import { HTMLMediaElement } from '@src/types';


@Component({
    tag: 'mt-media-loader',
    styleUrl: 'mt-media-loader.scss',
    shadow: false,
    scoped: true
})
export class MtMediaLoader {
    @Event({ eventName: 'media' }) onMedia: EventEmitter<HTMLMediaElement>;
    @Event({ eventName: 'loading' }) onLoading: EventEmitter<boolean>;
    @Prop() files: FileList;
    @State() isLoading: boolean = false;

    @Watch('files') watchFiles() {
        if (this.files && this.files.length > 0) {
            loadMediaFile(this.files, {
                onLoading: loadingState => { this.isLoading = loadingState === 'start'; this.onLoading.emit(this.isLoading); },
                onMedia: mediaEl => this.onMedia.emit(mediaEl)
            });
        }
    }

    render() {
        return (
            <Host>
                <mt-visible visible={this.isLoading}><slot name="loading"></slot></mt-visible>
            </Host>
        );
    }

}
