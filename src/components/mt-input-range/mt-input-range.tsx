import { Component, Host, Prop, State, Event, h, EventEmitter, Method } from '@stencil/core';
import { toBoolean, BooleanAttribute, toNumber } from '@src/util';
import { store, SettingsStore } from '@src/settings.store';


@Component({
    tag: 'mt-input-range',
    styleUrl: 'mt-input-range.scss',
    shadow: false,
    scoped: true
})
export class MtInputRange {
    @Prop({ mutable: true }) default: string | number;
    @Prop() name: string;
    @Prop() min: string | number;
    @Prop() max: string | number;
    @Prop() value: string | number = '';
    @Prop({ mutable: true }) enabled: BooleanAttribute = true;
    @Prop() emitOnInit: BooleanAttribute = false;
    @Prop() store: keyof SettingsStore;
    @State() output: string;

    @Event({ eventName: 'data' }) changeEmitter: EventEmitter<number>;


    private input: HTMLInputElement;


    connectedCallback() {
        if (!this.default)
            this.default = this.value;

        if (!this.output)
            this.setOutput(this.default);

        if (this.store) {
            store.onChange(this.store, value => {
                const v = value ?? this.default;
                this.value = v;
                this.setOutput(v);
            });
        }
    }

    componentDidLoad() {
        if (toBoolean(this.emitOnInit))
            this.emitValue();
    }


    private setOutput(value: number | string) {
        const v = toNumber(value);
        this.output = `${isNaN(v) ? value : Math.floor(v)}`;
    }

    private isEnabled() {
        return toBoolean(this.enabled);
    }

    private inputValue() {
        const value = parseFloat(this.input.value);
        return isNaN(value) ? undefined : value;
    }

    private _getValue(force: boolean = false) {
        if (this.isEnabled() || force)
            return this.inputValue();

        const defaultV = toNumber(this.value ?? this.default);
        return typeof defaultV === 'number' && !isNaN(defaultV) ? defaultV : undefined;
    }


    @Method() async getValue(force: boolean = false) {
        return this._getValue(force);
    }

    private onCheck(event: InputEvent) {
        const checkbox = event.target as HTMLInputElement;
        this.enabled = !checkbox.checked;

        const isEnabled = this.isEnabled();
        this.setOutput(isEnabled ? this.input.value : this.default);

        this.emitValue();
    }

    private onInput() {
        this.setOutput(this.input.value);
        this.emitValue();
    }

    private emitValue() {
        this.changeEmitter.emit(this._getValue());
    }

    render() {
        const label = () => (
            <div class="label" >
                <label htmlFor={this.name}>
                    <slot name="label"></slot>
                    <slot></slot>
                </label>

                <span class="output">{this.output}</span>
            </div>
        );


        const checkbox = () => (
            <div class="checkbox">
                <label>Disabled</label>
                <input type="checkbox" checked={!this.isEnabled()} onInput={this.onCheck.bind(this)} />
            </div>
        );

        return (
            <Host>
                <div class="header">
                    {label()}
                    {checkbox()}
                </div>

                <input type="range" name={this.name} step="1" min={this.min} max={this.max} value={this.value} onInput={this.onInput.bind(this)}
                    disabled={!this.isEnabled()} ref={el => this.input = el}></input>
            </Host>
        );
    }

}
