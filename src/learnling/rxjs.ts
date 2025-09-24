import { mapTo, map, tap, concatAll, mergeAll, pluck, zipAll, combineAll, reduce,
    toArray, expand, switchMap, switchMapTo, concatMap, filter,takeWhile,
    bufferTime
} from 'rxjs/operators';
import _ from 'lodash';
import { interval } from 'rxjs';


export async function main() {
    const source = interval(1000);
    const buffered = source.pipe(bufferTime(12000));
    buffered.subscribe((val) => console.log(val));
}

main()
