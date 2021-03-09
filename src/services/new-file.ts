import { HTMLMediaElement } from '@src/types';
import { removableEventListeners } from '@util';

const { once } = removableEventListeners();

const acceptableTypes = [ 'image/', 'video/' ] as const;

const acceptFile = (file: File) => acceptableTypes.some(type => file.type.startsWith(type));


export const onNewFile = (files: FileList, onChange: (media: HTMLMediaElement) => void) => {
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

    /*  dropZoneLoadingText.textContent = 'Loading...';
     dropZoneInfo.forEach(el => elementVisibility(el, false)); */

    once(media, type === 'image' ? 'load' : 'canplay', () => {
        /*    dropZoneLoadingText.textContent = '';
           dropZoneInfo.forEach(el => elementVisibility(el, true));
    */
        onChange(media);
    }, { passive: true });
};
