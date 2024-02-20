document.addEventListener("DOMContentLoaded", function () {
    const maintext = document.querySelector(".maintext");
    const originalSpans = maintext.querySelectorAll("span");

    // Convert NodeList to Array for easy manipulation
    const spanArray = Array.from(originalSpans);

    // Shuffle function to randomize the order of spans
    function shuffleSpans(spans) {
        return spans.sort(() => Math.random() - 0.5);
    }

    // Shuffle the order of spans
    const shuffledSpans = shuffleSpans(spanArray);

    // Create a new paragraph element
    const newParagraph = document.createElement('p');

    // Append the shuffled spans to the new paragraph
    shuffledSpans.forEach(span => newParagraph.appendChild(span));

    // Replace the existing content of the div with the new paragraph
    maintext.innerHTML = '';
    maintext.appendChild(newParagraph);
});

document.addEventListener('DOMContentLoaded', function () {
    const maintext = document.querySelector('.maintext');
    const spotlight = document.createElement('div');
    spotlight.classList.add('spotlight');
    maintext.appendChild(spotlight);

    maintext.addEventListener('mouseleave', function () {
        // Hide the spotlight when the cursor leaves the div
        spotlight.style.display = 'none';
    });

    maintext.addEventListener('mouseenter', function (mouseEvent) {
        // Show the spotlight when the cursor enters the div
        spotlight.style.display = 'block';
    });

    maintext.addEventListener('mousemove', function (mouseEvent) {
        const mouseX = mouseEvent.clientX;
        const mouseY = mouseEvent.clientY;

        // Update the position of the spotlight
        spotlight.style.left = mouseX - spotlight.offsetWidth / 2 + 'px';
        spotlight.style.top = mouseY - spotlight.offsetHeight / 2 + 'px';

        highlightWordsInSpotlight(maintext, mouseX, mouseY);
    });
});

function highlightWordsInSpotlight(targetElement, mouseX, mouseY) {
    const spans = targetElement.querySelectorAll('span'); // split by word

    spans.forEach((span) => {
        const rect = span.getBoundingClientRect();
        const wordX = rect.left + rect.width / 2 + window.scrollX; // calculate distance from cursor based on center of span
        const wordY = rect.top + rect.height / 2 + window.scrollY;

        const distance = Math.sqrt((mouseX - wordX) ** 2 + (mouseY - wordY) ** 2);

        if (distance <= 70) {
            span.classList.add('highlight');
        } else {
            span.classList.remove('highlight');
        }
    });
}

function handlePageLoadAndResize() {
    window.addEventListener('load', (mouseEvent, spotlight) => {
        const mouseX = 75;
        const mouseY = 75;
        highlightWordsInSpotlight(document.querySelector('.maintext'), mouseX, mouseY);
    });

    window.addEventListener('resize', (mouseEvent) => {
        const mouseX = mouseEvent.clientX;
        const mouseY = mouseEvent.clientY;
        highlightWordsInSpotlight(document.querySelector('.maintext'), mouseX, mouseY);
    });
}

handlePageLoadAndResize();