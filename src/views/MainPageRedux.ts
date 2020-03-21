export interface IPicItem {
    fileName: string,
    fileSize: number,
    fileObject: any,
    fileResult: any,
    // uploadFlag: boolean,
    // analysisFlag: boolean,
}
export interface IPicState {
    pics: IPicState[],
    uploadPer: number,
    analysisPer: number,
}
const initialState: IPicState = {
    pics: [],
    uploadPer: 0,
    analysisPer: 0,
};

export const UPLOAD_PIC_START = 'UPLOAD_PIC';
export const UPLOAD_PIC_SUCCESS = 'UPLOAD_PIC_SUCCESS';
export const DELETE_PIC = 'DELETE_PIC';
export const ANALYSIS_PIC_START = 'ANALYSIS_PIC_START';
export const ANALYSIS_PIC_SUCCESS = 'ANALYSIS_PIC_SUCCESS';

export function picState (state = initialState, action: any) {
    switch (action.type) {
        case 'UPLOAD_PIC' : {
            return {
                ...state,
                pics: action.payload
            }
        }
        default: return state;
    }
}