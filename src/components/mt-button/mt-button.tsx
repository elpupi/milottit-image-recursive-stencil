import { Component, Host, Prop, h } from '@stencil/core';

@Component({
    tag: 'mt-button',
    styleUrl: 'mt-button.scss',
    shadow: false,
    scoped: true
})
export class MtButton {
    @Prop() primary: boolean;
    @Prop() secondary: boolean;

    render() {
        return (
            <Host class={this.primary ? 'primary' : this.secondary ? 'secondary' : ''}>
                <slot></slot>
            </Host>
        );
    }

}
