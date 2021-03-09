import { Component, Host, h } from '@stencil/core';

@Component({
    tag: 'mt-row',
    styleUrl: 'mt-row.scss',
    shadow: false,
    scoped: true
})
export class MtRow {

    render() {
        return (
            <Host>
                <slot name="item"></slot>
            </Host>
        );
    }

}
