document.addEventListener('DOMContentLoaded', () => {
    const orderButton = document.getElementById('order-button');
    orderButton.addEventListener('click', createSmoothieOrder);

    class Smoothie {
        constructor(name, base, fruits, size) {
            this.name = name;
            this.base = base;
            this.fruits = fruits;
            this.size = size;
            this.price = this.calculatePrice();
            this.color = this.calculateColor();
        }

        calculatePrice() {
            let price = 3; // base price
            price += this.fruits.length * 0.5;
            if (this.size === 'medium') price += 1;
            if (this.size === 'large') price += 2;
            return price;
        }

        calculateColor() {
            const fruitColors = {
                Banana: 'rgb(245, 245, 0)', // Yellow
                Strawberry: 'rgb(255, 40, 60)', // More reddish
                Blueberry: 'rgb(75, 0, 130)', // Purplish Blue
                Mango: 'rgb(255, 165, 0)', // Orange
            };

            if (this.fruits.length === 1) {
                return fruitColors[this.fruits[0]];
            }

            let totalColor = [0, 0, 0];
            this.fruits.forEach(fruit => {
                const color = fruitColors[fruit].match(/\d+/g).map(Number);
                totalColor[0] += color[0];
                totalColor[1] += color[1];
                totalColor[2] += color[2];
            });

            const numFruits = this.fruits.length;
            return `rgb(${Math.round(totalColor[0] / numFruits)}, ${Math.round(totalColor[1] / numFruits)}, ${Math.round(totalColor[2] / numFruits)})`;
        }

        describe() {
            return `
                <h2>Your Smoothie</h2>
                <p><strong>Name:</strong> ${this.name}</p>
                <p><strong>Base:</strong> ${this.base}</p>
                <p><strong>Fruits:</strong> ${this.fruits.join(', ')}</p>
                <p><strong>Size:</strong> ${this.size}</p>
                <p><strong>Price:</strong> $${this.price.toFixed(2)}</p>
            `;
        }
    }

    function createSmoothieOrder() {
        const name = document.getElementById('name').value;
        const base = document.getElementById('base').value;
        const fruits = Array.from(document.querySelectorAll('input[name="fruits"]:checked')).map(el => el.value);
        const size = document.getElementById('size').value;

        if (name && base && fruits.length > 0 && size) {
            const smoothie = new Smoothie(name, base, fruits, size);
            displayOrder(smoothie);
            setBackgroundColor(smoothie.color);
        } else {
            alert('Please complete all fields.');
        }
    }

    function displayOrder(smoothie) {
        const orderSummary = document.getElementById('order-summary');
        orderSummary.innerHTML = smoothie.describe();
        orderSummary.classList.remove('hidden');

        const smoothieImage = document.getElementById('smoothie-image');
        smoothieImage.classList.remove('hidden');

        animateSummary();
    }

    function animateSummary() {
        const orderSummary = document.getElementById('order-summary');
        orderSummary.style.opacity = 0;
        setTimeout(() => {
            orderSummary.style.transition = 'opacity 0.5s';
            orderSummary.style.opacity = 1;
        }, 10);
    }

    function setBackgroundColor(color) {
        document.body.style.transition = 'background-color 0.5s';
        document.body.style.backgroundColor = color;
    }
});
