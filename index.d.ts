import Vue, { Component } from 'vue'

export default class VueDropZone extends Vue {

}



export interface DropZoneOptions {
    url?: string | null;
    method?: string;
    withCredentials?: boolean;
    timeout?: number;
    parallelUploads?: number;
    uploadMultiple?: boolean;
    chunking?: boolean;
    forceChunking?: boolean;
    chunkSize?: number;
    parallelChunkUploads?: boolean;
    retryChunks?: boolean;
    retryChunksLimit?: number;
    maxFilesize?: number | null;
    paramName?: string;
    createImageThumbnails?: boolean;
    maxThumbnailFilesize?: number;
    thumbnailWidth?: number;
    thumbnailHeight?: number;
    thumbnailMethod?: string;
    resizeWidth?: number | null;
    resizeHeight?: number | null;
    resizeMimeType?: string | null;
    resizeQuality?: number;
    resizeMethod?: string;
    filesizeBase?: number;
    maxFiles?: number | null;
    headers?: null | {[h: string]: string};
    clickable?: boolean | string | HTMLElement;
    ignoreHiddenFiles?: boolean;
    acceptedFiles?: null | string;
    autoProcessQueue?: boolean;
    autoQueue?: boolean;
    addRemoveLinks?: boolean;
    previewsContainer?: null | string | HTMLElement;
    hiddenInputContainer?: null | string | HTMLElement;
    capture?: null | 'camera' | 'microphone' | 'camcorder';
    renameFile?: null | ((f: File) => void);
    forceFallback?: boolean;
}
