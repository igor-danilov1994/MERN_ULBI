export const sizeFormatter = (size) => {
    if (size > 1024 * 1024 * 1024) {
        return (size / (1024 * 1024 * 1024)).toFixed(1) + 'GB'
    }
    if (size > 1024 * 1024) {
        return (size / (1024 * 1024)).toFixed(1) + 'Mb'
    }
    if (size > 1024) {
        return (size / 1024).toFixed(1) + 'kb'
    }
    return size + 'B'
}
