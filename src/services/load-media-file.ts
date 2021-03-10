import { HTMLMediaElement } from '@src/types';
import { removableEventListeners } from '@util';

const { once } = removableEventListeners();

const acceptableTypes = [ 'image/', 'video/' ] as const;

const acceptFile = (file: File) => acceptableTypes.some(type => file.type.startsWith(type));

export interface OnNewMediaFileOptions {
    onMedia?: (media: HTMLMediaElement) => void;
    onLoading?: (isLoading: 'start' | 'end') => void;
}

export const loadMediaFile = (files: FileList, options: OnNewMediaFileOptions = {}) => {

    if (files.length === 0)
        return;

    const acceptableFiles = [ ...files ].filter(file => acceptFile(file));

    if (acceptableFiles.length === 0) {
        console.warn(`Files must be one of the types: [ ${acceptableTypes.join(', ')} ]`);
        return;
    }

    const file = acceptableFiles[ 0 ];
    const url = URL.createObjectURL(file);

    const type = file.type.includes('video') ? 'video' : 'image';

    const getMedia = () => {
        if (type === 'image')
            return new Image();

        const video = document.createElement('video');
        video.autoplay = true;
        video.loop = true;

        return video;
    };

    const media = getMedia();
    media.src = url;

    options?.onLoading('start');

    once(media, type === 'image' ? 'load' : 'canplay', () => {

        options?.onLoading('end');
        options?.onMedia(media);

    }, { passive: true });
};
