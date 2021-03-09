import { Component, Host, State, Event, EventEmitter, h } from '@stencil/core';

@Component({
    tag: 'mt-droppable',
    styleUrl: 'mt-droppable.scss',
    shadow: false,
    scoped: true
})
export class MtDroppable {
    @State() draggingClass: string = '';
    @Event({ eventName: 'dragging' }) onDragging: EventEmitter<boolean>;
    @Event({ eventName: 'data' }) onData: EventEmitter<DataTransfer>;
    @Event({ eventName: 'files' }) onFiles: EventEmitter<FileList>;
    // when a child get the 'dragenter' event, this parent will get it also through bubbling
    // so onDragEnter will be called when MtDroppable is entered, but also when the children elements
    // also. When the counter is 0, we know that we just entered/leaved the current element
    private childrenCounter: number = 0;


    private onDragEnter(event: DragEvent) {
        if (this.childrenCounter === 0) {
            this.draggingClass = 'dragging';
            event.dataTransfer.effectAllowed = 'copy';
            console.log(event.dataTransfer.files);
            this.onDragging.emit(true);

            event.preventDefault(); // obliged to do it, if not, browser disallows draggable
        }

        ++this.childrenCounter;
    }

    private onDragOver(event: DragEvent) {
        event.dataTransfer.dropEffect = 'copy';
        event.preventDefault();
    }

    private onDragDrop(event: DragEvent) {
        this.draggingClass = '';

        const data = event.dataTransfer;

        this.onData.emit(data);

        if (data.files)
            this.onFiles.emit(data.files);

        this.setCounter(0);

        event.preventDefault();
    }

    private onDragLeave() {
        this.setCounter(this.childrenCounter - 1);
    }

    private setCounter(counter: number) {
        this.childrenCounter = counter;

        if (this.childrenCounter === 0) {
            this.draggingClass = '';
            this.onDragging.emit(false);
        }
    }

    render() {
        const enter = this.onDragEnter.bind(this);
        const over = this.onDragOver.bind(this);
        const drop = this.onDragDrop.bind(this);
        const leave = this.onDragLeave.bind(this);

        return (
            <Host draggable class={`${this.draggingClass}`} onDragEnter={enter} onDragOver={over} onDragLeave={leave} onDrop={drop}>
                <slot></slot>
            </Host>
        );
    }
}
