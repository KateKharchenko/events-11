const app = Vue.createApp({
    data() {
        return {
            telToken: '1680582407:AAGhx2_sCTKSSKRR9RISF1tlS86B-d7G7VM',
            botId: '282352564'
        }
    },
    methods: {
        subscribe() {
            text = encodeURIComponent(this.email);
            let url = `https://api.telegram.org/bot${this.telToken}/sendMessage?chat_id=${this.botId}&parse_mode=HTML&text=${text}`
            fetch(url)
        }
    }
})

app.component('countdown', {
    props: ['todate'],
    data() {
        return {
            till: Date.parse(this.todate),
            days: null,
            hours: null,
            mins: null,
            secs:null,
            intervalID: null
        }
    },
    mounted() {
        this.intervalID = setInterval(() => {
            let now = new Date();
            let diff = Math.floor((this.till - now.getTime())/1000);

            if (diff < 0) {
                clearInterval(this.intervalID);
            } else {

                this.days = Math.floor(diff / (60 * 60 * 24));
                diff = diff - this.days * (60 * 60 * 24);
                
                this.hours = Math.floor(diff / (60 * 60));
                diff = diff - this.hours * (60 * 60);
                
                this.mins = Math.floor(diff / 60)
                diff = diff - this.mins * 60;
    
                this.secs = diff;

            }
            
        }, 1000)
    },
    template: `
        {{now}}
        {{till}}
        <ul class="countdown">
            <li class="countdown__item">
                <div class="countdown__num">{{days}}</div>
                <div class="countdown__text">days</div>
            </li>
            <li class="countdown__item">
                <div class="countdown__num">{{hours}}</div>
                <div class="countdown__text">hours</div>
            </li>
            <li class="countdown__item">
                <div class="countdown__num">{{mins}}</div>
                <div class="countdown__text">minutes</div>
            </li>
            <li class="countdown__item">
                <div class="countdown__num">{{secs}}</div>
                <div class="countdown__text">seconds</div>
            </li>
        </ul>
    `
});


app.mount('#app');