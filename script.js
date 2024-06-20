function toggleNav() {
    document.querySelector('.nav-links').classList.toggle('mobile-hidden');
    document.querySelector('.hamburger-nav').classList.toggle('hamburger-active');
}

function closeNav() {
    document.querySelector('.nav-links').classList.add('mobile-hidden');
    document.querySelector('.hamburger-nav').classList.add('hamburger-active');
}
