import { globalState } from "./utils.js";

export class Reaction {
    constructor(name, onInvalidate) {
        this.name = name;
        this.onInvalidate = onInvalidate;
        this.observing = []; // 表示观察到了哪些可观察变量
    }
    track(fn) {
        globalState.trackingDerivation = this;
        fn.call();
        globalState.trackingDerivation = null;
        bindDependencies(this);
    }
    schedule() {
        globalState.pendingReaction.push(this);
        runReactions();
    }
    runReaction() {
        this.onInvalidate();
    }
}

function bindDependencies(derivation) {
    const { observing } = derivation;
    observing.forEach((observableValue) => {
        observableValue.observers.add(derivation);
    });
}

function runReactions() {
    const allReactions = globalState.pendingReaction;
    let reaction;
    while (reaction = allReactions.shift()) {
        reaction.runReaction();
    }
}