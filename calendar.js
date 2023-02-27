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
            period: '<b>1st - 8th March (First in Discount)</b>',
            price: '$19',
            start: '2023-02-27',
            end: '2023-3-8 - 17:45',
            ktValue: 'kBqhVFJeg0Yf',
        },
        {
            period: '<b>8th - 29th March (Second Release)</b>',
            price: '$29',
            start: '2023-3-8 - 17:46',
            end: '2023-3-29 - 17:45',
            ktValue: 'aPweOAd3HoYf',
        },
        {
            period: '<b>29th March @ 5:46PM- 5th April (General)</b>',
            price: '$45',
            start: '2023-3-29 - 17:46',
            end: '2023-4-5 - 17:45',
            ktValue: 'wuHgnVWZ6KlF',
        },
    ];

    let eventAddedFlag = false;
    for (let i = 0; i < events.length; i++) {
        const event = events[i];

        let eventClass = '';
        // before
        console.log(curDateTimeStr);
        
        if( curDateTimeStr >= event.start && curDateTimeStr <= event.end) {
            eventClass = 'present-event';
        }
        else if(event.start < curDateTimeStr) {
            eventClass = 'past-event';
        }

        else if(event.start > curDateTimeStr) {
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
                    data-kt-accent="#7f4fc0" >
                </div>
            `;
            eventAddedFlag = true;
        }

    }

    if(eventAddedFlag) {
        include('https://app.kartra.com/js/build/front/embed/calendar.js');
    } else {
        calendarContainer.innerHTML = `
            /*<h2>Calendar Not Yet Available</h2>*/
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


function include(file) {
      
    var script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.defer = true;
      
    document.getElementsByTagName('head').item(0).appendChild(script);
      
}
      
setServerTime();

// curDateStr = '2023-2-19';
// renderEvents();