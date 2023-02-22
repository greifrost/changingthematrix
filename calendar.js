let calendarContainer = document.querySelector("#calendar-container");
let eventContainer = document.querySelector("#event-container");

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
            period: ' Jan 1-31',
            price: '$19 ',
            start: '2023-1-1',
            end: '2023-1-31',
            ktValue: 'kBqhVFJeg0Yf',
        },
        {
            period: 'Feb 1-28',
            price: 'AU$ 19',
            start: '2023-2-1',
            end: '2023-2-28',
            ktValue: 'kBqhVFJeg0Yf',
        },
        {
            period: 'March 1 - 15',
            price: '$19',
            start: '2023-3-1',
            end: '2023-3-7',
            ktValue: 'kBqhVFJeg0Yf',
        },
        {
            period: 'March 8 - 29',
            price: '$29',
            start: '2023-3-8',
            end: '2023-3-29',
            ktValue: 'aPweOAd3HoYf',
        },
        {
            period: 'March 30 - April 5',
            price: '$45',
            start: '2023-3-30',
            end: '2023-4-5',
            ktValue: 'wuHgnVWZ6KlF',
        },
    ];

    for (let i = 0; i < events.length; i++) {
        const event = events[i];

        let eventClass = '';
        // before
        if( curDateStr >= event.start && curDateStr <= event.end) {
            eventClass = 'present-event';
        }
        else if(event.start < curDateStr) {
            eventClass = 'past-event';
        }

        else if(event.start > curDateStr) {
            eventClass = 'future-event';
        }

        eventContainer.innerHTML += `
            <div class="event ${eventClass}">
                <div class="price">
                    ${event.price}
                </div>
                <div class="period">
                    ${event.period}
                </div>
            </div>
        `;

        if(eventClass == 'present-event') {
            // <h1>Current Date Time: ${curDateTimeStr}</h1>
            calendarContainer.innerHTML += `
                <div class="js_kt_asset_embed js_kartra_trackable_object" data-kt-type="calendar"
                    data-kt-embed="inline"
                    data-kt-value="${event.ktValue}"
                    data-kt-owner="mpD5zD4g"
                    data-kt-accent="#90642f" >
                </div>
            `;
        }

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
        
        eventContainer.innerHTML = '';
        calendarContainer.innerHTML = '';
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