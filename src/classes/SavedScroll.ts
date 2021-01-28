import LocalStorage from './LocalStorage';

class ISavedScroll {
    #savedScroll: Record<string, number>;

    constructor() {
        this.#savedScroll = LocalStorage.get(LocalStorage.paths.savedScroll) || {};

        window.addEventListener(
            'beforeunload',
            () => {
                LocalStorage.set(LocalStorage.paths.savedScroll, this.#savedScroll);
            },
            { passive: true }
        );
    }

    get(name: string): number | undefined {
        return this.#savedScroll[name];
    }

    set(name: string, value: number): void {
        if (value) {
            this.#savedScroll[name] = value;

            return;
        }

        delete this.#savedScroll[name];
    }
}

const SavedScroll = new ISavedScroll();

export default SavedScroll;
