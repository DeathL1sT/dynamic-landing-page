/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const sections = document.getElementsByTagName("section");
const backToTop = document.getElementById("backToTop");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

function addNavMenuSection(section) {
  const navbarList = document.getElementById("navbar__list");
  const navbarItem = document.createElement("li");

  const anchor = document.createElement("a");
  anchor.innerHTML = section.getAttribute("data-nav");
  anchor.className = "menu__link";
  anchor.setAttribute("href", "#" + section.id);

  // Scroll to section on link click
  anchor.addEventListener("click", (e) => {
    e.preventDefault();
    section.scrollIntoView({ behavior: "smooth" });
  });

  navbarItem.appendChild(anchor);
  navbarList.appendChild(navbarItem);
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
function populateNavMenu() {
  for (const section of sections) {
    addNavMenuSection(section);
  }
}

populateNavMenu();

/**
 * End Main Functions
 * Begin Events
 *
 */

// Set sections as active
// Add class 'active' to section when near top of viewport
document.addEventListener("scroll", () => {
  // show or hide the backToTop button according to scrolling.
  if (window.scrollY > sections[0].offsetTop) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }

  for (const section of sections) {
    const anchor = document.querySelector(`.menu__link[href="#${section.id}"]`);

    const scrollTopMinus = window.scrollY + 70;

    if (
      section.offsetTop <= scrollTopMinus &&
      section.offsetTop + section.offsetHeight > scrollTopMinus
    ) {
      section.classList.add("your-active-class");
      anchor.classList.add("active");
    } else {
      section.classList.remove("your-active-class");
      anchor.classList.remove("active");
    }
  }
});

// back to top
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
