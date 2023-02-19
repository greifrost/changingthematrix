let calendarContainer = document.querySelector("#calendar-container");
let calendarRendered = false;
let curDateStr = null;
let curDateTimeStr = null;
let renderAll = false;

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
            start: '2023-3-15',
            end: '2023-3-29',
            ktValue: 'aPweOAd3HoYf',
        },
        {
            price: 'AU$ 45',
            start: '2023-3-29',
            end: '2023-4-5',
            ktValue: 'wuHgnVWZ6KlF',
        },
    ];

    for (let i = 0; i < events.length; i++) {
        const event = events[i];

        if(!renderAll) {
            if(curDateStr < event.start || curDateStr > event.end) {
                continue;
            }
        }

        calendarContainer.innerHTML += `
            <h1>Current Date Time: ${curDateTimeStr}</h1>
            <h1>Price: ${event.price}</h1>
            <h2>Start Date: ${event.start}</h2>
            <h2>End Date: ${event.end}</h2>
            <div class="js_kt_asset_embed js_kartra_trackable_object" data-kt-type="calendar"
                data-kt-embed="inline"
                data-kt-value="${event.ktValue}"
                data-kt-owner="mpD5zD4g"
                data-kt-accent="#90642f" >
            </div>
            
            `;

    }

    calendarRendered = true;
}


async function setServerTime() {
    try {
        let result = (await fetch('https://worldtimeapi.org/api/timezone/Australia/Brisbane'));
        result = (await result.json());

        let curDate = new Date(result.datetime);
        let year = curDate.getFullYear();
        let month = curDate.getMonth() + 1;
        let date = curDate.getDate();
        let hours = curDate.getHours();
        let minutes = curDate.getMinutes();

        curDateStr = `${year}-${month}-${date}`;
        curDateTimeStr = `${year}-${month}-${date} - ${hours}:${minutes}`;
        
        renderEvents();
    } catch (error) {
        console.log(error);
    }

    // setTimeout(() => {
    //     setServerTime();
    // }, 3000);
}

setServerTime();

// curDateStr = '2023-2-19';
// renderEvents();
