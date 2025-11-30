document.addEventListener('DOMContentLoaded', function () {

    const topShade = document.createElement('div');
    const bottomShade = document.createElement('div');

    topShade.style.position = bottomShade.style.position = "fixed";
    topShade.style.left     = bottomShade.style.left = "0";
    topShade.style.width    = bottomShade.style.width = "100%";
    topShade.style.background = bottomShade.style.background = "rgba(0,0,0,0.65)";
    topShade.style.pointerEvents = bottomShade.style.pointerEvents = "none";
    topShade.style.zIndex   = bottomShade.style.zIndex = "9999";

    document.body.appendChild(topShade);
    document.body.appendChild(bottomShade);

    const H = 40; 

    document.addEventListener("mousemove", (e) => {
        const top = e.clientY - H / 2;
        const bottom = window.innerHeight - (top + H);

        topShade.style.top = "0px";
        topShade.style.height = top + "px";

        bottomShade.style.top = (top + H) + "px";
        bottomShade.style.height = bottom + "px";
    });

});
