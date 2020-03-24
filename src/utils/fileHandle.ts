import { TYPES, TYPES_COLOR } from './constant';
import { IFileResult } from 'src/views/WelcomeRedux';

export function resFileHandle(v: string) :IFileResult {
    let result: IFileResult = {type: '', confidence: 0, bgColor: ''};
    let arr = v.slice(2,-2).trim().split(/\s+/).map(v => {return +v;});
    let maxNum = 0,maxIndex: number;
    arr.forEach((v:number,i:number) => {
        if (v > maxNum) {
            maxNum = v;
            maxIndex = i;
        }
    })
    result.type = TYPES[maxIndex];
    result.confidence = +maxNum.toFixed(1);
    result.bgColor = TYPES_COLOR[maxIndex];
    return result;

}  