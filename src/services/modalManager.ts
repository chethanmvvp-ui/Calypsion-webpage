let activeModalCount = 0;

function updateModalClass() {
    if (typeof document !== 'undefined') {
        if (activeModalCount > 0) {
            document.body.classList.add('has-modal-open');
        } else {
            document.body.classList.remove('has-modal-open');
        }
    }
}

export function registerModal() {
    activeModalCount++;
    updateModalClass();
}

export function unregisterModal() {
    activeModalCount = Math.max(0, activeModalCount - 1);
    updateModalClass();
}

export function getActiveModalCount() {
    return activeModalCount;
}
