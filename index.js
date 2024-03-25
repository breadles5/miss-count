import WebSocketManager from './deps/socket.js';
const socket = new WebSocketManager('127.0.0.1:24050');

const cache = {
    state: -1,
    miss: -1,
    cb: -1,
};
socket.api_v2((data) => {
    try {
        if(cache.state !== data.state.number) {
            cache.state = data.state.number;
            if(cache.state !== 2) {
                document.getElementsByClassName("miss-counter").style.opacity = 0;
            } else {
                document.getElementsByClassName("miss-counter").style.opacity = 1;
            };
        };

        if(cache.miss !== data.play.hits[0]) {
            cache.miss = data.play.hits[0];
            document.getElementById("count").innerHTML = cache.miss;
            if (cache.miss == 0){
                document.getElementById("count").style.color = "rgb(64,64,64)";
            } else {
                document.getElementById("count").style.color = "rgb(255,255,255)"
            };
        };

        if (cache.cb !== data.play.hits.sliderBreaks) {
            cache.cb = data.play.hits.sliderBreaks;
            document.getElementById("cbcount").innerHTML = cache.cb;
            if (cache.cb == 0){
                document.getElementById("cbcount").style.color = "rgb(64,64,64)";
            } else {
                document.getElementById("cbcount").style.color = "rgb(255,255,255)"
            };
        };

    } catch(err) {
        console.log(err)
    };
});