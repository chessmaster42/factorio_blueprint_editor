window.onload = function () {
    document.addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 'r'.charCodeAt(0)) {
            window.FBE.viewmodel.rotateSelectedItem();
        }
        else if (key === 'q'.charCodeAt(0)) {
            window.FBE.viewmodel.pickPlacable(null);
        }
    });

    window.FBE.view.createSideBar();
    window.FBE.view.initializeGrid();
    window.FBE.view.resizeGrid();
};

window.closebtn = function () {
    document.getElementById("blueprint").style.display = "none";
};

/*
https://stackoverflow.com/a/33928558
*/
function copyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return window.clipboardData.setData("Text", text);
    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}

window.copybtn = function (ev) {
    copyToClipboard(ev.target.parentElement.getElementsByClassName("modal__data")[0].value);
    window.closebtn(ev);
};

window.bpbtn = function () {
    document.getElementById("blueprint").style.display = "block";
    var encoded = window.FBE.viewmodel.encode();
    if (encoded) {
        document.getElementById("bp").value = encoded;
        document.getElementById("bp").select();
    } else {
        document.getElementById("bp").value = "Grid is empty";
    }
};

window.loadbtn = function () {
    document.getElementById("blueprint").style.display = "block";
    document.getElementById("bp").value = "";
}

window.decodebtn = function () {
    var encoded = document.getElementById("bp").value;
    window.FBE.viewmodel.decode(encoded);
    document.getElementById("blueprint").style.display = "none";
}