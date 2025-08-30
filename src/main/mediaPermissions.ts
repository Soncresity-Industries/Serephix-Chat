/*
 * Vesktop, a desktop app aiming to give you a snappier Discord Experience
 * Copyright (c) 2025 Vendicated and Vesktop contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { session, systemPreferences } from "electron";

export function registerMediaPermissionsHandler() {
    if (process.platform !== "darwin") return;

    session.defaultSession.setPermissionRequestHandler(async (_webContents, permission, callback, details) => {
        let granted = true;

        if ("mediaTypes" in details) {
            if (details.mediaTypes?.includes("audio")) {
                granted &&= await systemPreferences.askForMediaAccess("microphone");
            }
            if (details.mediaTypes?.includes("video")) {
                granted &&= await systemPreferences.askForMediaAccess("camera");
            }
        }

        callback(granted);
    });
}
