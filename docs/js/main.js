window.onload = function () {
    getQuote();
}

const loadingContainer = document.getElementById("loading-div"),
    quotesContainer = document.getElementById("quotes-container"),
    shuffleButton = document.getElementById("shuffle"),
    quoteInfo = document.getElementById('quote-info');

function getQuote() {
    fetch("https://type.fit/api/quotes")
        .then(response => response.json())
        .then(data => {
            loadingContainer.style.display = "none";
            quotesContainer.style.display = "block";
            shuffleButton.innerHTML = `<i class="fa fa-random" aria-hidden="true"></i> Shuffle`;
            shuffleButton.addEventListener("click", () => {
                showQuotes(data);
            });
            showQuotes(data);
        })
        .catch(() => {
            loadingContainer.style.display = "none";
            quotesContainer.style.display = "block";
            quoteInfo.innerHTML = `<div id="error">Failed to load quote!!!</div>`;
            shuffleButton.innerHTML = `<i class="fa fa-refresh" aria-hidden="true"></i> Reload`;
            shuffleButton.addEventListener("click", () => {
                getQuote();
            });
        });
}

function showQuotes(quotes) {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    quoteInfo.style.opacity = 0;
    setTimeout(() => {
        quoteInfo.style.opacity = 100;
        quoteInfo.innerHTML = `
            <div id="quote">
                <i class="fa fa-quote-left" aria-hidden="true"></i>
                ${randomQuote.text}
            </div>
            <div id="author">${randomQuote.author === null ? "Anonymous" : "-" + randomQuote.author}</div> `;
    }, 500)
}