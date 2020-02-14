

export function copytoClipBoard(text) {
    try {
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.setAttribute('value', text);
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        return true;
    } catch {
        window.alert("Error copying to clipboard");
        return false;
    }
}