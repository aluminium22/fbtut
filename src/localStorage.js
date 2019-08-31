export const loadState = () => {
    console.log('LOAD STATE');
    try {
        const serializedState = localStorage.getItem('authUid');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state) => {
    console.log('SAVE STATE', state);
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('authUid', serializedState);
    } catch {
        // ignore write errors
    }
};

export const clearState = () => {
    console.log('CLEAR STATE');
    try {
        localStorage.clear();
    } catch {
        // ignore write errors
    }
};