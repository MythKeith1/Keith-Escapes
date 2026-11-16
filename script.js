
// =============================================
// SOLSTICE ESCAPES
// PREMIUM LUXURY TRAVEL EXPERIENCE
// STAGE 03 — JAVASCRIPT
// =============================================


document.addEventListener("DOMContentLoaded", () => {

    // =============================================
    // 01. SELECT DOM ELEMENTS
    // =============================================

    const siteHeader = document.getElementById("site-header");

    const menuToggle = document.getElementById("menu-toggle");

    const mainNavigation = document.getElementById("main-navigation");

    const bookingForm = document.getElementById("booking-form-element");

    const formMessage = document.getElementById("form-message");

    const travelDate = document.getElementById("travel-date");


    // =============================================
    // 02. MOBILE NAVIGATION
    // =============================================

    if (menuToggle && mainNavigation) {

        menuToggle.addEventListener("click", () => {

            const isOpen = mainNavigation.classList.toggle("active");

            menuToggle.classList.toggle("active", isOpen);

            menuToggle.setAttribute("aria-expanded", String(isOpen));

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );

        });


        // Close navigation after selecting a link

        const navigationLinks = mainNavigation.querySelectorAll("a");

        navigationLinks.forEach(link => {

            link.addEventListener("click", () => {

                mainNavigation.classList.remove("active");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            });

        });


        // Close navigation with Escape

        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {

                mainNavigation.classList.remove("active");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            }

        });

    }


    // =============================================
    // 03. HEADER SCROLL BEHAVIOUR
    // =============================================

    let lastScrollPosition = 0;

    function updateHeader() {

        if (!siteHeader) return;

        const currentScroll = window.scrollY;

        if (currentScroll > 60) {

            siteHeader.classList.add("scrolled");

        } else {

            siteHeader.classList.remove("scrolled");

        }

        lastScrollPosition = currentScroll;

    }

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();


    // =============================================
    // 04. CURRENT YEAR
    // =============================================

    const yearElement = document.querySelector(".footer-bottom p");

    if (yearElement) {

        yearElement.textContent =
            `© ${new Date().getFullYear()} SOLSTICE ESCAPES. ALL RIGHTS RESERVED.`;

    }


    // =============================================
    // 05. TRAVEL DATE VALIDATION
    // =============================================

    if (travelDate) {

        const today = new Date();

        const localToday = new Date(
            today.getTime() - today.getTimezoneOffset() * 60000
        );

        travelDate.min = localToday.toISOString().split("T")[0];

    }


    // =============================================
    // 06. BOOKING FORM VALIDATION
    // =============================================

    if (bookingForm) {

        bookingForm.addEventListener("submit", event => {

            event.preventDefault();

            const fullName = document.getElementById("full-name");

            const email = document.getElementById("email");

            const destination = document.getElementById("destination");

            const travellers = document.getElementById("travellers");

            const message = document.getElementById("travel-message");


            // Clear previous feedback

            if (formMessage) {

                formMessage.textContent = "";

            }


            // Validate required fields

            if (!bookingForm.checkValidity()) {

                bookingForm.reportValidity();

                return;

            }


            // Validate email

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email.value.trim())) {

                formMessage.textContent =
                    "Please enter a valid email address.";

                email.focus();

                return;

            }


            // Validate travel date

            if (travelDate.value) {

                const selectedDate = new Date(
                    `${travelDate.value}T00:00:00`
                );

                const today = new Date();

                today.setHours(0, 0, 0, 0);

                if (selectedDate < today) {

                    formMessage.textContent =
                        "Please select a future travel date.";

                    travelDate.focus();

                    return;

                }

            }


            // Prepare enquiry details

            const enquiry = {

                fullName: fullName.value.trim(),

                email: email.value.trim(),

                destination: destination.value,

                travellers: travellers.value,

                travelDate: travelDate.value || "Not specified",

                message: message.value.trim()

            };


            // Demonstration confirmation

            console.log(
                "SOLSTICE ESCAPES — BOOKING ENQUIRY",
                enquiry
            );


            // Show confirmation

            formMessage.textContent =
                "Thank you, " + enquiry.fullName +
                ". Your enquiry has been validated successfully. " +
                "This demonstration form is not connected to a live booking service.";


            formMessage.setAttribute("role", "status");

            bookingForm.reset();


            // Return user to confirmation message

            formMessage.scrollIntoView({

                behavior: "smooth",

                block: "center"

            });

        });

    }


    // =============================================
    // 07. SCROLL REVEAL ANIMATIONS
    // =============================================

    const revealElements = document.querySelectorAll(
        ".intro-content, " +
        ".destination-card, " +
        ".escape-card, " +
        ".experience-content, " +
        ".testimonial-card, " +
        ".journey-step, " +
        ".booking-form-intro"
    );


    // Respect reduced motion preferences

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    if ("IntersectionObserver" in window && !prefersReducedMotion) {

        const revealObserver = new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("revealed");

                        observer.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }

        );


        revealElements.forEach(element => {

            element.classList.add("reveal");

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("revealed");

        });

    }


    // =============================================
    // 08. CLOSE MOBILE MENU ON OUTSIDE CLICK
    // =============================================

    document.addEventListener("click", event => {

        if (!menuToggle || !mainNavigation) return;

        const clickedInsideMenu =
            mainNavigation.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);

        if (
            !clickedInsideMenu &&
            !clickedToggle &&
            mainNavigation.classList.contains("active")
        ) {

            mainNavigation.classList.remove("active");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        }

    });


    // =============================================
    // 09. DESTINATION ENQUIRY SHORTCUTS
    // =============================================

    const destinationLinks = document.querySelectorAll(
        ".destination-content a"
    );

    const destinationSelect = document.getElementById("destination");


    destinationLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (!destinationSelect) return;

            const destinationCard = link.closest(
                ".destination-card"
            );

            if (!destinationCard) return;

            const destinationName = destinationCard
                .querySelector("h3")
                ?.textContent.trim();

            if (!destinationName) return;

            destinationSelect.value = destinationName;

        });

    });


    // =============================================
    // 10. INITIALISE WEBSITE
    // =============================================

    console.log(
        "SOLSTICE ESCAPES: Experience initialised successfully."
    );

});
