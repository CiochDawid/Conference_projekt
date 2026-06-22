const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const navDropdownTriggers = document.querySelectorAll(".nav-dropdown-trigger");
const sections = Array.from(document.querySelectorAll(".page-section"));
const isEditionOnePage = document.body.classList.contains("edition-one-page");
let sectionScrollLockUntil = 0;

if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
        navLinks.classList.toggle("show");
    });
}

navItems.forEach(function (link) {
    link.addEventListener("click", function () {
        if (navLinks) {
            navLinks.classList.remove("show");
        }
    });
});

function getHrefHash(href) {
    if (!href || href.indexOf("#") === -1) {
        return "";
    }

    return "#" + href.split("#").pop();
}

function updateActiveNavigation() {
    let currentSectionId = "";

    sections.forEach(function (section) {
        const rectangle = section.getBoundingClientRect();

        const sectionIsVisible =
            rectangle.top <= window.innerHeight * 0.45 &&
            rectangle.bottom >= window.innerHeight * 0.45;

        if (sectionIsVisible) {
            currentSectionId = section.getAttribute("data-nav-id") || section.getAttribute("id");
        }
    });

    navDropdownTriggers.forEach(function (trigger) {
        trigger.classList.remove("active");
    });

    navItems.forEach(function (link) {
        link.classList.remove("active");

        const href = link.getAttribute("href");
        const linkHash = getHrefHash(href);

        if (currentSectionId && linkHash === "#" + currentSectionId) {
            link.classList.add("active");
        }

        if (window.location.pathname.includes("kontakt.html") && href === "kontakt.html") {
            link.classList.add("active");
        }

        if (window.location.pathname.includes("Edycja-I.html") && href === "Edycja-I.html") {
            link.classList.add("active");
            navDropdownTriggers.forEach(function (trigger) {
                trigger.classList.add("active");
            });
        }

        if (window.location.pathname.includes("logo.html") && href === "logo.html") {
            link.classList.add("active");
        }

        if (window.location.pathname.includes("zapisy.html") && href === "zapisy.html") {
            link.classList.add("active");
        }
    });
}

function setupReturnToHomeLinks() {
    const homeLinks = document.querySelectorAll('a[href="index.html#start"], a[href="./index.html#start"]');

    homeLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            window.location.href = "index.html#start";
        });
    });
}

function getAnimationPath() {
    const existingAnimation = document.querySelector(".wave-animation");

    if (existingAnimation && existingAnimation.getAttribute("data-animation-path")) {
        return existingAnimation.getAttribute("data-animation-path");
    }

    return "./animation/Wave Animation.json";
}

function createGlobalLottieBackground() {
    const existingBackground = document.querySelector(".global-lottie-background");

    if (existingBackground) {
        return existingBackground.querySelector(".global-lottie-animation");
    }

    const background = document.createElement("div");
    background.className = "global-lottie-background";

    const animationContainer = document.createElement("div");
    animationContainer.className = "global-lottie-animation";

    background.appendChild(animationContainer);
    document.body.insertBefore(background, document.body.firstChild);

    return animationContainer;
}

function loadLottieScript(callback) {
    if (window.lottie) {
        callback();
        return;
    }

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.2/lottie.min.js";

    script.onload = function () {
        callback();
    };

    script.onerror = function () {
        console.warn("Nie udało się wczytać biblioteki Lottie.");
    };

    document.body.appendChild(script);
}

function loadMovingFixedLottieBackground() {
    if (!window.lottie) {
        return;
    }

    const animationContainer = createGlobalLottieBackground();

    if (!animationContainer || animationContainer.dataset.loaded === "true") {
        return;
    }

    animationContainer.dataset.loaded = "true";

    const animationPath = getAnimationPath();

    const animation = lottie.loadAnimation({
        container: animationContainer,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: animationPath,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid meet",
            progressiveLoad: true
        }
    });

    animation.setSpeed(0.55);

    animation.addEventListener("data_ready", function () {
        animationContainer.classList.add("is-loaded");
        animation.play();
    });

    animation.addEventListener("DOMLoaded", function () {
        animationContainer.classList.add("is-loaded");
        animation.play();
    });

    animation.addEventListener("data_failed", function () {
        console.warn("Nie udało się wczytać animacji:", animationPath);
    });
}

function setupOrganizerCards() {
    const organizerGrid = document.querySelector(".organizer-grid-v5");

    if (!organizerGrid || organizerGrid.dataset.initialized === "true") {
        return;
    }

    const cards = Array.from(organizerGrid.querySelectorAll(".organizer-card-v5"));

    if (cards.length === 0) {
        return;
    }

    organizerGrid.dataset.initialized = "true";

    function closeOrganizerDescriptions() {
        organizerGrid.classList.remove("has-active");

        cards.forEach(function (card) {
            card.classList.remove("is-active");

            const button = card.querySelector(".organizer-photo-button");

            if (button) {
                button.setAttribute("aria-expanded", "false");
            }
        });
    }

    cards.forEach(function (card) {
        const button = card.querySelector(".organizer-photo-button");

        if (!button) {
            return;
        }

        button.addEventListener("click", function (event) {
            event.stopPropagation();

            const wasActive = card.classList.contains("is-active");
            closeOrganizerDescriptions();

            if (!wasActive) {
                organizerGrid.classList.add("has-active");
                card.classList.add("is-active");
                button.setAttribute("aria-expanded", "true");
            }
        });
    });

    organizerGrid.addEventListener("click", function (event) {
        if (event.target === organizerGrid) {
            closeOrganizerDescriptions();
        }
    });

    document.addEventListener("click", function (event) {
        if (!organizerGrid.contains(event.target)) {
            closeOrganizerDescriptions();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeOrganizerDescriptions();
        }
    });
}

function setupRevealGroups() {
    const groups = Array.from(document.querySelectorAll("[data-reveal-group], .reveal-grid, .topic-reveal-grid, .cooperation-reveal-grid"));

    if (groups.length === 0) {
        return;
    }

    function closeGroup(group) {
        const cards = Array.from(group.querySelectorAll(":scope > .reveal-card"));
        group.classList.remove("has-active");

        cards.forEach(function (card) {
            card.classList.remove("is-active");
            card.classList.remove("is-dimmed");

            const trigger = card.querySelector(".reveal-trigger");

            if (trigger) {
                trigger.setAttribute("aria-expanded", "false");
            }
        });
    }

    function toggleCard(group, card) {
        const trigger = card.querySelector(".reveal-trigger");
        const wasActive = card.classList.contains("is-active");

        closeGroup(group);

        if (!wasActive) {
            group.classList.add("has-active");
            card.classList.add("is-active");

            if (trigger) {
                trigger.setAttribute("aria-expanded", "true");
            }
        }

        Array.from(group.querySelectorAll(":scope > .reveal-card")).forEach(function (item) {
            item.classList.toggle("is-dimmed", group.classList.contains("has-active") && item !== card && card.classList.contains("is-active"));
        });
    }

    groups.forEach(function (group) {
        if (group.dataset.revealInitialized === "true") {
            return;
        }

        const cards = Array.from(group.querySelectorAll(":scope > .reveal-card"));

        if (cards.length === 0) {
            return;
        }

        group.dataset.revealInitialized = "true";

        cards.forEach(function (card) {
            const trigger = card.querySelector(".reveal-trigger");

            if (trigger) {
                trigger.addEventListener("click", function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    toggleCard(group, card);
                });
            }

            card.addEventListener("click", function (event) {
                if (event.target.closest("a")) {
                    return;
                }

                if (trigger && trigger.contains(event.target)) {
                    return;
                }

                event.preventDefault();
                event.stopPropagation();
                toggleCard(group, card);
            });
        });

        group.addEventListener("click", function (event) {
            if (event.target === group) {
                closeGroup(group);
            }
        });
    });

    document.addEventListener("click", function (event) {
        groups.forEach(function (group) {
            if (!group.contains(event.target)) {
                closeGroup(group);
            }
        });
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            groups.forEach(closeGroup);
        }
    });
}

function setupEditionGallery() {
    const gallery = document.querySelector(".js-edition-gallery");

    if (!gallery || gallery.dataset.initialized === "true") {
        return;
    }

    const track = gallery.querySelector(".edition-gallery-track");
    const prevButton = gallery.querySelector(".edition-gallery-prev");
    const nextButton = gallery.querySelector(".edition-gallery-next");
    const currentCounter = gallery.querySelector(".edition-gallery-current");
    const totalCounter = gallery.querySelector(".edition-gallery-total");

    if (!track) {
        return;
    }

    const originalSlides = Array.from(track.children);
    const totalSlides = originalSlides.length;

    if (totalSlides === 0) {
        return;
    }

    gallery.dataset.initialized = "true";

    if (totalCounter) {
        totalCounter.textContent = String(totalSlides);
    }

    let currentIndex = 0;
    let isAnimating = false;
    let autoplayId = null;

    function updateCounter() {
        if (currentCounter) {
            currentCounter.textContent = String(currentIndex + 1);
        }
    }

    function updatePosition(animate) {
        if (!animate) {
            track.classList.add("is-resetting");
        } else {
            track.classList.remove("is-resetting");
        }

        track.style.transform = "translateX(" + (-currentIndex * 100) + "%)";

        if (!animate) {
            window.requestAnimationFrame(function () {
                track.classList.remove("is-resetting");
            });
        }

        updateCounter();
    }

    function goTo(index, animate) {
        if (isAnimating) {
            return;
        }

        currentIndex = (index + totalSlides) % totalSlides;
        isAnimating = Boolean(animate);
        updatePosition(animate);

        if (!animate) {
            isAnimating = false;
        }
    }

    function nextSlide() {
        goTo(currentIndex + 1, true);
    }

    function previousSlide() {
        goTo(currentIndex - 1, true);
    }

    track.addEventListener("transitionend", function (event) {
        if (event.target === track) {
            isAnimating = false;
        }
    });

    if (prevButton) {
        prevButton.addEventListener("click", function () {
            previousSlide();
            restartAutoplay();
        });
    }

    if (nextButton) {
        nextButton.addEventListener("click", function () {
            nextSlide();
            restartAutoplay();
        });
    }

    gallery.addEventListener("keydown", function (event) {
        if (event.key === "ArrowLeft") {
            previousSlide();
            restartAutoplay();
        }

        if (event.key === "ArrowRight") {
            nextSlide();
            restartAutoplay();
        }
    });

    function startAutoplay() {
        stopAutoplay();
        autoplayId = window.setInterval(nextSlide, 2250);
    }

    function stopAutoplay() {
        if (autoplayId) {
            window.clearInterval(autoplayId);
            autoplayId = null;
        }
    }

    function restartAutoplay() {
        startAutoplay();
    }

    gallery.addEventListener("mouseenter", stopAutoplay);
    gallery.addEventListener("mouseleave", startAutoplay);
    gallery.addEventListener("focusin", stopAutoplay);
    gallery.addEventListener("focusout", startAutoplay);

    updatePosition(false);
    startAutoplay();
}

function runWhenDocumentReady(callback) {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", callback, { once: true });
        return;
    }

    callback();
}

function runWhenIdle(callback, timeout) {
    if ("requestIdleCallback" in window) {
        window.requestIdleCallback(callback, { timeout: timeout || 1500 });
        return;
    }

    window.setTimeout(callback, Math.min(timeout || 700, 1200));
}

function shouldLoadDecorativeLottie() {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    if (reducedMotion) {
        return false;
    }

    if (connection && (connection.saveData || /2g/.test(connection.effectiveType || ""))) {
        return false;
    }

    return true;
}

function setupLazyDecorativeLottie() {
    if (!shouldLoadDecorativeLottie()) {
        return;
    }

    runWhenIdle(function () {
        loadLottieScript(loadMovingFixedLottieBackground);
    }, 1800);
}

function initializePageInteractions() {
    setupReturnToHomeLinks();
    setupRevealGroups();
    setupOrganizerCards();
    setupEditionGallery();
    updateActiveNavigation();
}

window.addEventListener("scroll", updateActiveNavigation, { passive: true });
window.addEventListener("resize", updateActiveNavigation);

runWhenDocumentReady(initializePageInteractions);
window.addEventListener("load", setupLazyDecorativeLottie, { once: true });
