
function restoreOptions() {
    browser.storage.local.get().then(
        result => {
            var zoomrate = 0;
            if ('zoomrate' in result) {
                zoomrate = parseFloat(result.zoomrate) / 100.0;
            }
            setElementValue("zoomrate",zoomrate);
            setElementValue("output", zoomrate);
        }
    );
}

function setElementValue(elementID, newValue) {
    let oldValue = document.getElementById(elementID).value;

    if (oldValue !== newValue) {
        document.getElementById(elementID).value = newValue;
    }
}

function saveZoomrate() {
    var zoomrate = {
        zoomrate: document.getElementById("zoomrate").value
    }
    browser.storage.local.set(zoomrate);
}

function enableAutosave() {
    // document.getElementById("zoomrate").addEventListener("input", saveOptions);
    document.getElementById("zoomrate").addEventListener("change", saveOptions);
}

function saveOptions(event) {
    // event.preventDefault();
    var zoomrate = {
        zoomrate: document.getElementById("zoomrate").value
    }
    browser.storage.local.set(zoomrate);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.addEventListener("DOMContentLoaded", enableAutosave);
// browser.storage.onChanged.addListener(restoreOptions);

function initOffset() {
    var input = document.getElementById("zoomrate");
    var el, newPoint, newPlace, offset, siblings, k;
    width = input.offsetWidth;
    newPoint = (input.value - input.getAttribute("min")) / (input.getAttribute("max") - input.getAttribute("min"));
    offset = -1;
    if (newPoint < 0) { newPlace = 0; }
    else if (newPoint > 1) { newPlace = width; }
    else { newPlace = width * newPoint + offset; offset -= newPoint; }
    siblings = input.parentNode.childNodes;
    for (var i = 0; i < siblings.length; i++) {
        sibling = siblings[i];
        if (sibling.id == input.id) { k = true; }
        if ((k == true) && (sibling.nodeName == "OUTPUT")) {
            outputTag = sibling;
        }
    }
    outputTag.style.left = newPlace + "px";
    outputTag.style.marginLeft = offset + "%";
    outputTag.innerHTML = this.value;
}

function modifyOffset() {
    var el, newPoint, newPlace, offset, siblings, k;
    width = this.offsetWidth;
    newPoint = (this.value - this.getAttribute("min")) / (this.getAttribute("max") - this.getAttribute("min"));
    offset = -1;
    if (newPoint < 0) { newPlace = 0; }
    else if (newPoint > 1) { newPlace = width; }
    else { newPlace = width * newPoint + offset; offset -= newPoint; }
    siblings = this.parentNode.childNodes;
    for (var i = 0; i < siblings.length; i++) {
        sibling = siblings[i];
        if (sibling.id == this.id) { k = true; }
        if ((k == true) && (sibling.nodeName == "OUTPUT")) {
            outputTag = sibling;
        }
    }
    outputTag.style.left = newPlace + "px";
    outputTag.style.marginLeft = offset + "%";
    outputTag.innerHTML = this.value;
}

function modifyInputs() {

    var input = document.getElementById("zoomrate");
    input.onchange = modifyOffset;

    // the following taken from http://stackoverflow.com/questions/2856513/trigger-onchange-event-manually
    if ("fireEvent" in input) {
        input[i].fireEvent("onchange");
    } else {
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("change", false, true);
        input[i].dispatchEvent(evt);
    }
}
modifyInputs();
initOffset();
