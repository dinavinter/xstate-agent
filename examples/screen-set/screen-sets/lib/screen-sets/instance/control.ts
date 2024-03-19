import {isParentHasClass} from '../../../helpers/utils';
import {GigyaFieldClasses} from './field';

export class GigyaControl {

    protected wrapper: HTMLDivElement;

    protected constructor(protected nativeElement: HTMLElement) {
        this.wrapper = <HTMLDivElement>nativeElement;
        if(!isParentHasClass(this.wrapper, GigyaFieldClasses.Wrapper)) {
            throw new Error('Invalid gigya control');
        }
    }
}

export const GigyaControlClasses = {
    Wrapper: 'gigya-composite-control'
};
