        const canvas = document.getElementById('fireworks');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        class Firework {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = canvas.height;
                this.sx = Math.random() * 3 - 1.5;
                this.sy = -Math.random() * 4 - 4;
                this.size = Math.random() * 2 + 1;
                this.hue = Math.floor(Math.random() * 360);
                this.brightness = Math.floor(Math.random() * 50 + 50);
            }

            update() {
                this.x += this.sx;
                this.y += this.sy;
                this.sy += 0.05;
                this.size -= 0.02;
                if (this.size < 0) this.size = 0;
            }

            draw() {
                ctx.fillStyle = `hsl(${this.hue}, 100%, ${this.brightness}%)`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const fireworks = [];
        for (let i = 0; i < 50; i++) {
            fireworks.push(new Firework());
        }

        function animateFireworks() {
            ctx.fillStyle = 'rgba(18, 18, 18, 0.2)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            fireworks.forEach(fw => {
                fw.update();
                fw.draw();
                if (fw.size <= 0) fw.reset();
            });

            requestAnimationFrame(animateFireworks);
        }

        animateFireworks();

        // Trigger new fireworks every 5 seconds
        setInterval(() => {
            fireworks.forEach(fw => fw.reset());
        }, 5000);

        // Countdown timer
        const countdownElement = document.getElementById('countdown');
        const newYearMessage = document.getElementById('new-year-message');

        function updateCountdown() {
            const now = new Date();
            const currentYear = now.getFullYear();
            const nextYear = currentYear + 1;
            const newYear = new Date(`January 1, ${nextYear} 00:00:00`).getTime();
            const timeLeft = newYear - now.getTime();

            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

            if (timeLeft <= 0) {
                countdownElement.style.display = 'none';
                newYearMessage.style.display = 'block';
            }
        }

        setInterval(updateCountdown, 1000);
        updateCountdown();

        // Responsive canvas
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
