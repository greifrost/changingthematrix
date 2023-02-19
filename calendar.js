let calendarContainer = document.querySelector("#calendar-container");
let calendarRendered = false;
let curDateStr = null;
let curDateTime = null;

function renderEvents() {
    if(calendarRendered) {
        return;
    }
    
    let events = [
        {
            price: 'AU$ 19',
            start: '2023-2-1',
            end: '2023-2-28',
            ktValue: 'kBqhVFJeg0Yf',
        },
        {
            price: 'AU$ 19',
            start: '2023-3-1',
            end: '2023-3-15',
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

    for (let i = 0; i < events.length; i++) {
        const event = events[i];

        if(curDateStr < event.start || curDateStr > event.end) {
            continue;
        }

        calendarContainer.innerHTML += `
            <h1>Current Date Time: ${curDateTime}</h1>
            <h1>Price: ${event.price}</h1>
            <h2>Start Date: ${event.start}</h2>
            <h2>End Date: ${event.end}</h2>
            <div class="js_kt_asset_embed js_kartra_trackable_object" data-kt-type="calendar"
                data-kt-embed="inline"
                data-kt-value="${event.ktValue}"
                data-kt-owner="mpD5zD4g"
                data-kt-accent="#90642f" >
            </div>
            <br/><br/><br/>
            `;

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
        let hours = curDate.getHours();
        let minutes = curDate.getMinutes();

        curDateStr = `${year}-${month}-${date}`;
        curDateTime = `${month} ${date}, ${year} - ${hours}:${minutes}`;
        
        // if(date) {
        //     renderEvents();
        // }
        renderEvents();
    } catch (error) {
        console.log(error);
    }

    setTimeout(() => {
        setServerTime();
    }, 3000);
}

setServerTime();
