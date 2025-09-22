// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Skill bar animation
const skillBars = document.querySelectorAll('.skill-progress');

const animateSkillBars = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = `${entry.target.dataset.progress}%`;
        }
    });
};

const skillObserver = new IntersectionObserver(animateSkillBars, { threshold: 0.5 });
skillBars.forEach(bar => skillObserver.observe(bar));

// Smooth scrolling for navigation
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


