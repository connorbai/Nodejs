import { object } from './observableobject.js';
import { isObject } from './utils.js';

export function observable(v) {
    if (isObject) {
        return object(v);
    }
}

// export default observable;