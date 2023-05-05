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
        /*{
            period: '<b>5th - 14th April</b>',
            price: '$19',
            start: '2023-04-04 - 17:45',
            end: '2023-04-14 - 17:45',
            personCalendarCode: 'eGvt3py15WZa',
            virtualCalendarCode: '5iBANhW4VDlF',
        },*/
        {
            period: '<b>10th May - 14th June</b>',
            price: '$29',
            start: '2023-05-04 - 17:46',
            end: '2023-06-14 - 18:00',
            personCalendarCode: 'p0tHfjGSOKlF',
            virtualCalendarCode: 'sLIUdEiBCPrK',
        },
        {
            period: '<b>14th June - 5th July</b>',
            price: '$45',
            start: '2023-06-14 - 18:01',
            end: '2023-07-5 - 17:45',
            personCalendarCode: '21DT7RB64s9c',
            virtualCalendarCode: '4xL7uAPWMFdT',
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
                <p class="price-period">
                    <span class="price">${event.price}</span>
                    <span class="period">${event.period}</span>
                </p>
            </div>
                `;
                // <div class="price">
                // </div>
                // <div class="period">
                // </div>

        if(eventClass == 'present-event') {
            // <h1>Current Date Time: ${curDateTimeStr}</h1>
            if(event.personCalendarCode) {
                calendarContainer.innerHTML += `
                    <div id="personCalendar" 
                        class="js_kt_asset_embed js_kartra_trackable_object" 
                        data-kt-type="calendar"
                        data-kt-embed="inline"
                        data-kt-value="${event.personCalendarCode}"
                        data-kt-owner="mpD5zD4g"
                        data-kt-accent="#7f4fc0" >
                    </div>
                `;
                eventAddedFlag = true;
            }

            if(event.virtualCalendarCode) {
                calendarContainer.innerHTML += `
                    <div id="virtualCalendar" 
                        class="js_kt_asset_embed js_kartra_trackable_object" 
                        data-kt-type="calendar" 
                        data-kt-embed="inline" 
                        data-kt-value="${event.virtualCalendarCode}"
                        data-kt-owner="mpD5zD4g" 
                        data-kt-accent="#7f4fc0" >
                    </div>
                `;
                eventAddedFlag = true;
            }
            
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
        let year = curDate.getFullYear().toString().padStart(2,0);
        let month = (curDate.getMonth() + 1).toString().padStart(2,0);
        let date = curDate.getDate().toString().padStart(2,0);
        let hours = curDate.getHours().toString().padStart(2,0);
        let minutes = curDate.getMinutes().toString().padStart(2,0);

        
        curDateStr = `${year}-${month}-${date}`;
        curDateTimeStr = `${year}-${month}-${date} - ${hours}:${minutes}`;
        
        eventContainer.innerHTML = '';
        calendarContainer.innerHTML = '';
        renderEvents();
        togglePersonVirtualCalendar();
    } catch (error) {
        console.log(error);
    }

    // setTimeout(() => {
    //     setServerTime();
    // }, 3000);
}

function togglePersonVirtualCalendar() {
    let personRadio = document.querySelector('#personRadio');
    let virtualRadio = document.querySelector('#virtualRadio');
    let personCalendar = document.querySelector('#personCalendar');
    let virtualCalendar = document.querySelector('#virtualCalendar');



    function toggleDisplay(event) {
        let type = event.target.value;

        if(type == 'person') {
            personCalendar.style.display = "inline-block";
            virtualCalendar.style.display = "none";
        }
        else if(type == 'virtual') {
            personCalendar.style.display = "none";
            virtualCalendar.style.display = "inline-block";
        }
    }

    if(personRadio && virtualRadio && personCalendar && virtualCalendar) {
        personCalendar.style.display = "inline-block";
        virtualCalendar.style.display = "none";

        personRadio.addEventListener('change', toggleDisplay);
        virtualRadio.addEventListener('change', toggleDisplay);
    }
}


function include(file) {
      
    var script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.defer = true;
      
    document.getElementsByTagName('head').item(0).appendChild(script);     
}
      
setServerTime();