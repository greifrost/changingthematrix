
    let calendarRendered = false;
    function renderEvents() {
        if(calendarRendered) {
            return;
        }

        let events = [
            {
                price: 'AU$ 19',
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

        let calendarContainer = document.querySelector("#calendar-container");
        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            calendarContainer.innerHTML += '<h1>' + event.price + '</h1>';
            calendarRendered = true;
        }


    async function setServerTime() {
        // First Release - AU$ 19
        // (March 1, 6pm - March 15, 6pm)
        
        // Second Release - AU$ 29
        // (March 15, 6pm - March 29, 6pm)
        
        // Standard Release - AU$ 45
        // (March 29, 6pm - April 5, 5:45pm)

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
            
            if(date ) {
                renderEvents();
            }

                // ${ month } ${ date }, ${ year } ${ hour }:${ minutes }
        } catch (error) {
            
        }

        setTimeout(() => {
            setServerTime();
        }, 3000);
    }


    setServerTime();
