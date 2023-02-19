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
            calendarContainer.innerHTML += '<div class="js_kt_asset_embed js_kartra_trackable_object"';
            calendarContainer.innerHTML += '    data-kt-type="calendar" ';
            calendarContainer.innerHTML += '    data-kt-embed="inline"  ';
            calendarContainer.innerHTML += '    data-kt-value="kBqhVFJeg0Yf" ';
            calendarContainer.innerHTML += '    data-kt-owner="mpD5zD4g"  ';
            calendarContainer.innerHTML += '    data-kt-accent="#90642f" >  ';
            calendarContainer.innerHTML += '    </div> ';
            console.log('append child...');
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
