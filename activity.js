class Activity {
    constructor(max_time=60, callback = () => {}) {
        this.interval = null; // setInterval handler
        this.uact = false; // current activity status
        this.max = max_time; // activity time limit
        this.callback = callback; // callback function
        this.current = this.__gc('__cact')===undefined?0:(this.__gc('__cact')-0); // current activity time
        this.init();
    }
    init() {
        if(this.__gc('__gtes') === undefined) {
            document.addEventListener('keydown', () => {this.uact=true;});
            document.addEventListener('mousedown', () => {this.uact=true;});
            document.addEventListener('mousemove', () => {this.uact=true;});
            this.interval = setInterval(() => {
                if(this.uact) {
                    this.current += 5;
                    this.__sc('__cact',this.current);
                    this.uact = false;
                    if(this.current >= this.max) {
                        this.__acb();
                        clearInterval(this.interval);
                    }
                }
            },5000)
        }
    };
    __acb = () => {
        this.__sc('__gtes',1);
        try {
            this.callback();
        } catch(e) {}
    }
    __gc = (name) => {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    };
    __sc = (name, value, days=30) => {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+days*24*60*60*1000);
            var expires = "; expires=" + date.toGMTString();
        } else {
            var expires = "";
        }
        document.cookie = name+"=" + value+expires + ";path=/"; // + and " added
    };
}