const inviteCode = "mPhWPRuvrH"; // Replace with the actual invite code
const apiUrl = `https://discord.com/api/v10/invites/${inviteCode}?with_counts=true`;

// Fetch and update server details
async function fetchInviteDetails() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch invite details.");
        const data = await response.json();

        // Update server details on the page
        document.getElementById("server-name").textContent = data.guild.name;
        document.getElementById("server-icon").src = `https://cdn.discordapp.com/icons/${data.guild.id}/${data.guild.icon}.png`;
        document.getElementById("member-stats").textContent = `${data.approximate_presence_count} Online • ${data.approximate_member_count} Members`;
        document.getElementById("invite-link").href = `https://discord.gg/${inviteCode}`;
    } catch (error) {
        console.error("Error fetching invite details:", error);
        document.getElementById("server-name").textContent = "Failed to load details.";
        document.getElementById("member-stats").textContent = "Unable to fetch member stats.";
    }
}

// Initialize particle background and fetch details
function init() {
    fetchInviteDetails();

    // Particle Background
    const canvas = document.getElementById("particleCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    class Particle {
        constructor(x, y, radius, speedX, speedY) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.speedX = speedX;
            this.speedY = speedY;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
            ctx.fill();
            ctx.closePath();
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
            }
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < 100; i++) {
            const radius = Math.random() * 2 + 1;
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const speedX = (Math.random() - 0.5) * 0.5;
            const speedY = (Math.random() - 0.5) * 0.5;
            particles.push(new Particle(x, y, radius, speedX, speedY));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle) => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    }

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    initParticles();
    animate();
}

document.addEventListener("DOMContentLoaded", init);
