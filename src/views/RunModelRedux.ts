interface IFileItem {
    fileName: string;
    fileSize: string;
    fileResult: string;
    isUpload: boolean;
    isResolved: boolean;
}

const initialState: IFileItem[] = [];

export const UPLOAD_FILE = 'UPLOAD_FILE';
export const RESOLVE_FILE = 'RESOLVE_FILE';
