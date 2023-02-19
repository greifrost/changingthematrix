    let calendarRendered = false;
    
    function renderEvents() {
        let calendarContainer = document.querySelector("#calendar-container");
        console.log(calendarContainer);
        console.log('render events');
        if(calendarRendered) {
            return;
        }

        
        let events = [
            {
                price: '<h1>AU$ 19</h1>',
                start: '2023-03-01',
                end: '2023-03-15',
                ktValue: 'kBqhVFJeg0Yf',
            },
            {
                price: 'AU$ 29',
                start: '2023-03-15',
                end: '2023-03-29',
                ktValue: 'aPweOAd3HoYf',
            },
            {
                price: 'AU$ 45',
                start: '2023-03-29',
                end: '2023-04-05',
                ktValue: 'wuHgnVWZ6KlF',
            },
        ];

        console.log(calendarContainer);
        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            calendarContainer.innerHTML += event.price;
            calendarContainer.innerHTML += `
                <div class="js_kt_asset_embed js_kartra_trackable_object" data-kt-type="calendar"
                    data-kt-embed="inline"
                    data-kt-value="${event.ktValue}"
                    data-kt-owner="mpD5zD4g"
                    data-kt-accent="#90642f" >
                </div>`;

                    // <div class="js_kt_asset_embed js_kartra_trackable_object" data-kt-type="calendar" data-kt-embed="inline" 
                    //     data-kt-value="wuHgnVWZ6KlF" 
                    //     data-kt-owner="mpD5zD4g" 
                    //     data-kt-accent="#90642f" ></div>
                        
                    //     <script type="text/javascript" src="https://app.kartra.com/js/build/front/embed/calendar.js"></script>
            
            
                    // <div class="js_kt_asset_embed js_kartra_trackable_object" data-kt-type="calendar" data-kt-embed="inline" 
                    //     data-kt-value="aPweOAd3HoYf" 
                    //     data-kt-owner="mpD5zD4g" 
                    //     data-kt-accent="#90642f" ></div>
                    
                    // <script type="text/javascript" src="https://app.kartra.com/js/build/front/embed/calendar.js"></script>


                    // <div class="js_kt_asset_embed js_kartra_trackable_object" data-kt-type="calendar" data-kt-embed="inline" 
                    //     data-kt-value="kBqhVFJeg0Yf" 
                    //     data-kt-owner="mpD5zD4g" 
                    //     data-kt-accent="#90642f" ></div>

                    // <script type="text/javascript" src="https://app.kartra.com/js/build/front/embed/calendar.js"></script>
        }
        calendarRendered = true;
    }


    async function setServerTime() {
        try {
            let result = (await fetch('https://worldtimeapi.org/api/timezone/Australia/Brisbane'));
            result = (await result.json());

            let curDate = new Date(result.datetime);
            let year = curDate.getFullYear();
            let month = curDate.getMonth();
            let date = curDate.getDate();
            let hour = curDate.getHours();
            let minutes = curDate.getMinutes();

            let serverTimeText = document.querySelector("#server-time");
            serverTimeText.innerHTML = `CURRENT DATE: ${ date }`;
            
            console.log(date);
            if(date) {
                renderEvents();
            }
        } catch (error) {
            console.log(error);
        }

        setTimeout(() => {
            setServerTime();
        }, 3000);
    }

    setServerTime();
    renderEvents();
