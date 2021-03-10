import { h } from '@stencil/core';
import { FunctionalComponent, VNode } from '@stencil/core/internal';
import { Props, MtSelect, } from '@util';
import { HTMLMediaElement } from '@src/types';

export type DroppableZoneState = 'idle' | 'loading' | 'dragging';
export type DroppableState = { files: FileList; zoneState: DroppableZoneState; };
export type StateInfoFComp = FunctionalComponent<Props<{ state: DroppableZoneState; } & { ref?: never; }>>;

export type MtDroppableWithStateProps = Props<{ state: DroppableState; onMedia?: (media: HTMLMediaElement) => void; } & { ref?: never; }>;

export const MtDroppableWithState: FunctionalComponent<MtDroppableWithStateProps> = (props, children: Array<VNode | StateInfoFComp>) => {
    const { state, onMedia, ...restProps } = props;

    return (
        <div {...restProps}>
            <mt-media-loader files={state.files} onLoading={e => state.zoneState = e.detail ? 'loading' : 'idle'} onMedia={e => onMedia(e.detail)}></mt-media-loader>

            <mt-droppable class="drop-zone center full" onFiles={e => state.files = e.detail} onDragging={e => state.zoneState = e.detail ? 'dragging' : 'idle'}>
                {children.map(c => typeof c === 'function' ? c({ state: state.zoneState }, null, null) : c)}
            </mt-droppable>
        </div>

    );
};

export const MtDroppableStateInfo: StateInfoFComp = (props, children) => {
    const { state, ...restProps } = props;

    return (
        <div {...restProps}>
            <mt-visible visible={props.state === 'idle'}><slot></slot></mt-visible>

            <MtSelect state={props.state} renderer={[
                { state: 'dragging', renderer: <span>Dragging file...</span> },
                { state: 'loading', renderer: <span>Loading...</span> }
            ]}></MtSelect>

            {children}
        </div>
    );
};


export const initDroppableState: DroppableState = { files: undefined, zoneState: 'idle' };
