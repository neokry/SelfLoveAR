const Scene = require("Scene");
const Time = require("Time");
const Diagnostics = require("Diagnostics");
const CameraInfo = require("CameraInfo");
const Reactive = require("Reactive");

(async function () {
    Diagnostics.log("script started");

    const actions = [
        "TURN OFF YOUR PHONE FOR ONE HOUR",
        "GO OUTSIDE WITHOUT YOUR PHONE",
        "WRITE DOWN 5 THINGS UR GRATEFUL 4",
        "TAKE 10 DEEP BELLY BREATHS",
        "DRINK A TALL GLASS OF WATER",
        "STRETCH FOR TEN MINUTES",
        "CALL AN OLD FRIEND",
    ];

    const actionText = await Scene.root.findFirst("2dText0");
    Diagnostics.log("Listening for video");

    CameraInfo.isRecordingVideo.onOn().subscribe((e) => {
        shuffle(actions);
        Time.setTimeout(() => {
            Diagnostics.log("Video on");
            cardLoopRecursive(0, 0);
        }, 800);
    });

    CameraInfo.isRecordingVideo.onOff().subscribe((e) => {
        actionText.text = "Lovin' Myself";
    });

    function cardLoopRecursive(i, count) {
        if (count > actions.length * 3) {
            return;
        }

        Time.setTimeout(() => {
            Diagnostics.log("updating text to " + actions[i]);
            actionText.text = actions[i];
            cardLoopRecursive(i + 1 < actions.length ? i + 1 : 0, count + 1);
        }, 130);
    }

    function cardLoop() {
        for (let n = 0; n < 3; n++) {
            for (let i = 0; i < actions.length; i++) {
                Time.setTimeout(() => {
                    Diagnostics.log("updating text to " + actions[i]);
                    actionText.text = actions[i];
                }, 100 * (actions.length * n + (i + 1)));
            }
        }
    }

    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    Diagnostics.log("script finished");
})();
