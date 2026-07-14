// ===============================
// PORTFOLIO SCRIPT V2
// Developed by ChatGPT
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // EMAIL JS
    // ===============================

    const form = document.getElementById("contact-form");

if(form){

form.addEventListener("submit", async function(e){

e.preventDefault();

const button=form.querySelector("button");

button.disabled=true;

button.innerText="Sending...";

const formData=new FormData(form);

const object=Object.fromEntries(formData);

const json=JSON.stringify(object);

try{

const response=await fetch(

"https://api.web3forms.com/submit",

{

method:"POST",

headers:{

"Content-Type":"application/json",

Accept:"application/json"

},

body:json

}

);

const result=await response.json();

if(result.success){

alert("✅ Message Sent Successfully!");

form.reset();

}else{

alert("❌ "+result.message);

}

}catch(error){

alert("❌ Network Error");

console.error(error);

}

button.disabled=false;

button.innerText="Send Message";

});

}

    // ===============================
    // Typing Effect
    // ===============================

    const typing = document.querySelector(".typing");

    if (typing) {

        const words = [
            "YouTube Scriptwriter",
            "Storytelling Expert",
            "Content Strategist",
            "Research Based Scripts"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function type() {

            const current = words[wordIndex];

            if (!deleting) {

                typing.textContent = current.substring(0, charIndex++);

                if (charIndex > current.length) {

                    deleting = true;

                    setTimeout(type, 1200);

                    return;

                }

            } else {

                typing.textContent = current.substring(0, charIndex--);

                if (charIndex < 0) {

                    deleting = false;

                    wordIndex++;

                    if (wordIndex >= words.length)
                        wordIndex = 0;

                }

            }

            setTimeout(type, deleting ? 40 : 70);

        }

        type();

    }

    // ===============================
    // Counter
    // ===============================

    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {

        const target = +counter.dataset.target;

        const suffix = counter.dataset.suffix || "";

        let current = 0;

        function update() {

            const increment = Math.ceil(target / 80);

            current += increment;

            if (current > target)
                current = target;

            counter.innerText = current + suffix;

            if (current < target)
                requestAnimationFrame(update);

        }

        update();

    });

});
// ===============================
// ACTIVE NAVIGATION
// ===============================

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.id;
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});


// ===============================
// SCROLL PROGRESS BAR
// ===============================

const progressBar = document.getElementById("progress-bar");

window.addEventListener("scroll", () => {

    if (!progressBar) return;

    const scrollTop = document.documentElement.scrollTop;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress = (scrollTop / scrollHeight) * 100;

    progressBar.style.width = progress + "%";

});


// ===============================
// REVEAL ANIMATION
// ===============================

const revealElements = document.querySelectorAll(
    ".about-card,.service-card,.portfolio-card,.stat,.skill,.section-title"
);

function revealOnScroll() {

    revealElements.forEach(el => {

        const top = el.getBoundingClientRect().top;

        if (top < window.innerHeight - 120) {

            el.classList.add("active");

        }

    });

}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();


// ===============================
// BACK TO TOP
// ===============================

const topBtn = document.getElementById("topBtn");

if (topBtn) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            topBtn.style.display = "block";

        } else {

            topBtn.style.display = "none";

        }

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}


// ===============================
// LOADER
// ===============================

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (loader) {

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        }, 500);

    }

});
// ===============================
// PORTFOLIO CARD TILT
// ===============================

document.querySelectorAll(".portfolio-card").forEach(card => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = ((y / rect.height) - 0.5) * -10;
        const rotateY = ((x / rect.width) - 0.5) * 10;

        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-8px)
        `;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = `
            perspective(1000px)
            rotateX(0deg)
            rotateY(0deg)
            translateY(0px)
        `;

    });

});


// ===============================
// MOBILE MENU
// ===============================

const menu = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("nav ul");

if (menu && navMenu) {

    menu.addEventListener("click", () => {

        navMenu.classList.toggle("active");

    });

    document.querySelectorAll("nav ul a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

        });

    });

}


// ===============================
// GSAP ANIMATIONS
// ===============================

if (typeof gsap !== "undefined") {

    if (typeof ScrollTrigger !== "undefined") {

        gsap.registerPlugin(ScrollTrigger);

    }

    gsap.from(".hero-left", {

        x: -120,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"

    });

    gsap.from(".hero-right", {

        x: 120,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"

    });

    gsap.utils.toArray(".section-title").forEach(title => {

        gsap.from(title, {

            scrollTrigger: {

                trigger: title,
                start: "top 85%"

            },

            y: 50,
            opacity: 0,
            duration: 0.8

        });

    });

    gsap.utils.toArray(

        ".about-card,.service-card,.portfolio-card,.stat,.skill"

    ).forEach(card => {

        gsap.from(card, {

            scrollTrigger: {

                trigger: card,
                start: "top 85%"

            },

            y: 60,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"

        });

    });

}


// ===============================
// PARALLAX PROFILE IMAGE
// ===============================

const profile = document.querySelector(".profile-card");

if (profile) {

    window.addEventListener("mousemove", (e) => {

        const x = (window.innerWidth / 2 - e.clientX) / 40;
        const y = (window.innerHeight / 2 - e.clientY) / 40;

        profile.style.transform = `translate(${x}px,${y}px)`;

    });

}


// ===============================
// BUTTON RIPPLE EFFECT
// ===============================

document.querySelectorAll(".primary,.secondary,.portfolio-btn").forEach(btn => {

    btn.addEventListener("click", function(e){

        const circle = document.createElement("span");

        const diameter = Math.max(btn.clientWidth, btn.clientHeight);

        circle.style.width = diameter + "px";
        circle.style.height = diameter + "px";

        circle.style.left = e.offsetX - diameter/2 + "px";
        circle.style.top = e.offsetY - diameter/2 + "px";

        circle.classList.add("ripple");

        const ripple = btn.querySelector(".ripple");

        if(ripple){

            ripple.remove();

        }

        btn.appendChild(circle);

    });

});


// ===============================
// WEBSITE READY
// ===============================

console.log("✅ Portfolio V2 Loaded Successfully");