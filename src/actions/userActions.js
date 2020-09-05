import {
    TEST
} from '../types';

export const testAction = test => {
    return () => {
        console.log('test action :', test)
    }
}