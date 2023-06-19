"use strict";
const playerName = localStorage.getItem("player_name");
if (!playerName) {
    window.location = "/index.html";
}
document.addEventListener("DOMContentLoaded", () => {
    const btnCancel = document.querySelector(".btn-cancel");
    const playerNameEL = document.querySelector(".player_name");
    playerNameEL.textContent = `Hello ${playerName}`;
    btnCancel.addEventListener("click", () => {
        localStorage.removeItem("player_name");
        window.location = "/pages/game.html";
    });
    class CardSelector {
        constructor() {
            this.first = { id: -1, name: "first" };
            this.second = { id: -1, name: "second" };
            this.select = (cardId, name) => {
                if (this.first.id === -1) {
                    this.first = { id: cardId, name: name };
                }
                else if (this.first.id === cardId || this.second.id === cardId) {
                    console.error("duplicate selection");
                }
                else if (this.second.id === -1) {
                    this.second = { id: cardId, name: name };
                }
            };
            this.isFull = () => {
                return this.first.id !== -1 && this.second.id !== -1;
            };
            this.contains = (x) => {
                return this.first.id === x || this.second.id === x;
            };
            this.clear = () => {
                this.first = { id: -1, name: "first" };
                this.second = { id: -1, name: "second" };
            };
        }
    }
    const createBoard = () => {
        const grid = document.querySelector(".wrap-game");
        for (let i = 0; i < cardArray.length; i++) {
            let card = document.createElement("img");
            card.setAttribute("data-id", i.toString());
            card.setAttribute("draggable", "false");
            grid === null || grid === void 0 ? void 0 : grid.appendChild(card);
        }
        startGame();
    };
    const startGame = () => {
        cardArray.sort(() => 0.5 - Math.random());
        cardsWon = 0;
        updateScore();
        cardsChosen.clear();
        const images = document.querySelectorAll("img");
        images.forEach((node) => {
            if (!(node instanceof HTMLImageElement)) {
                throw new Error("Expected grid child nodes to be of type HTMLImageElement");
            }
            node.setAttribute("src", "../public/img/quest.jpg");
            node.addEventListener("click", flipCard);
        });
    };
    const updateScore = () => {
        if (resultDisplay) {
            resultDisplay.textContent = `${cardsWon} / ${cardArray.length / 2}`;
        }
    };
    const checkForMatch = () => {
        let cards = document.querySelectorAll("img");
        const { first, second } = cardsChosen;
        if (first.name === second.name) {
            //@ts-expect-error
            Toastify({
                text: "Bạn đã chọn đúng",
                duration: 1000,
                newWindow: true,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
                onClick: function () { }, // Callback after click
            }).showToast();
            cards[first.id].setAttribute("src", "../public/img/tich.png");
            cards[second.id].setAttribute("src", "../public/img/tich.png");
            cards[first.id].removeEventListener("click", flipCard);
            cards[second.id].removeEventListener("click", flipCard);
            cardsWon++;
            updateScore();
        }
        else {
            cards[first.id].setAttribute("src", "../public/img/quest.jpg");
            cards[second.id].setAttribute("src", "../public/img/quest.jpg");
        }
        cardsChosen.clear();
        if (cardsWon === cardArray.length / 2) {
            if (resultDisplay) {
                resultDisplay.textContent = "You Won!";
                //@ts-expect-error
                Toastify({
                    text: "Bạn đã chiến thắng",
                    duration: 3000,
                    newWindow: true,
                    close: true,
                    gravity: "top",
                    position: "center",
                    stopOnFocus: true,
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    },
                    onClick: function () { }, // Callback after click
                }).showToast();
            }
        }
    };
    const flipCard = (event) => {
        let card = event.target;
        let cardId = parseInt(card.getAttribute("data-id") || "-2");
        if (!cardsChosen.isFull() && !cardsChosen.contains(cardId)) {
            cardsChosen.select(cardId, cardArray[cardId].name);
            card.setAttribute("src", cardArray[cardId].img);
            if (cardsChosen.isFull()) {
                setTimeout(checkForMatch, 600);
            }
        }
    };
    let cardArray = new Array(6).fill(null).map((name, index) => ({
        name: `img${index + 1}`,
        img: `../public/img/img${index + 1}.png`,
    }));
    cardArray = [...cardArray, ...cardArray];
    console.log("cardArray: ", cardArray);
    const resultDisplay = document.querySelector("#current-score");
    const restartButton = document.querySelector(".btn-reset");
    restartButton === null || restartButton === void 0 ? void 0 : restartButton.addEventListener("click", startGame);
    const cardsChosen = new CardSelector();
    let cardsWon = 0;
    createBoard();
});
