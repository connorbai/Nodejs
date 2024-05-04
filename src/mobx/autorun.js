import { getNextId } from "./utils.js";
import {Reaction} from './reaction.js';

export function autorun(view) {
    const name = 'Autorun@' + getNextId();
    const reaction = new Reaction(
        name,
        function () {
            this.track(view);
        }
    );
    reaction.schedule();
}

// export default autorun;
