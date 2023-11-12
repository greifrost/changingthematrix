document.addEventListener( 'DOMContentLoaded', function() {

let perPage = 3;
let width = window.innerWidth;
if (width < 600) {
    perPage = 1;
}
else if (width < 900) {
    perPage = 2;
}
new Splide('.splide', {
    type: 'loop',
    perPage: perPage,
}).mount();
      
} );
