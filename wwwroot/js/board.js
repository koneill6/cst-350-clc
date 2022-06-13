﻿// Register the Button Events
function registerButtonHandlers(sessionId) {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let btn = $(`#ms-${i}-${j}`);

            // Cells
            btn.mousedown((ev) => {
                switch (ev.which) {
                    case 1:
                        // Left Click (Reveal)
                        revealCell(sessionId, i, j);
                        break;
                    case 3:
                        // Right Click (Flag)
                        flagCell(sessionId, i, j);
                        break;
                    default:
                    // Middle Mouse/Anything Else 
                }
            });

            // Prevent right click menu.
            btn.contextmenu(() => false);
        }
    }

    // Reset Button Handler
    $('#ms-reset').click((ev) => deleteBoard(sessionId));
}

// Get the GameBoard partial.
function getGameBoard(sessionId) {
    $.ajax({
        url: '/Game/GetBoard',
        type: 'GET',
        data: {
            sessionId,
        },
        dataType: 'html',
        contentType: 'application/json',
        success: onSuccess,
        error: onError
    });
}

// Reveal a GameBoard cell.
function revealCell(sessionId, row, col) {
    $.ajax({
        url: '/Game/RevealBoard',
        type: 'GET',
        data: {
            sessionId,
            row,
            col
        },
        dataType: 'html',
        contentType: 'application/json',
        success: onSuccess,
        error: onError
    });
}

// Flag a GameBoard cell.
function flagCell(sessionId, row, col) {
    $.ajax({
        url: '/Game/FlagBoard',
        type: 'GET',
        data: {
            sessionId,
            row,
            col
        },
        dataType: 'html',
        contentType: 'application/json',
        success: onSuccess,
        error: onError
    });
}

// Delete the board starting a new game.
function deleteBoard(sessionId) {
    $.ajax({
        url: '/Game/ResetBoard',
        type: 'GET',
        data: {
            sessionId
        },
        dataType: 'html',
        contentType: 'application/json',
        success: onSuccess,
        error: onError
    });
}

// Helper for ajax success.
function onSuccess(data, status, xhr) {
    _logDebug('xhr', '/Game/GetBoard', true, data, status, xhr);
    $('#game-board').html(data);
    registerButtonHandlers(sessionId);
}

// Helper for ajax error.
function onError(status, err) {
    _logDebug('xhr', '/Game/GetBoard', false, status, err);
    alert(status);
}

// Debug printing.
function _logDebug(source, path, didSucceed, ...payload) {
    console.info(`[${source} ${didSucceed ? 'success' : 'error'}] @ ${path}`, payload);
}

// Exec.
const sessionId = $("#session-id").val();
getGameBoard(sessionId);