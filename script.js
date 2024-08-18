function toggleNav() {
    document.querySelector('.nav-links').classList.toggle('mobile-hidden');
    document.querySelector('.hamburger-nav').classList.toggle('hamburger-active');

    const links = document.querySelector('.nav-links').querySelectorAll('.link');
    if (links[0].classList.contains('button-mobile-hidden')) {
        links.forEach(element => {
            element.classList.remove('button-mobile-hidden');
        });
    } else {
        setTimeout(function() {
            links.forEach(element => {
                element.classList.add('button-mobile-hidden');
            });
        }, 350);
    }

    
}

function closeNav() {
    document.querySelector('.nav-links').classList.add('mobile-hidden');
    document.querySelector('.hamburger-nav').classList.add('hamburger-active');

    setTimeout(function() {
        const links = document.querySelector('.nav-links').querySelectorAll('.link');
        links.forEach(element => {
            element.classList.add('button-mobile-hidden');
        });
    }, 350);
}
