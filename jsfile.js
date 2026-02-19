function toggler() {
    const icon = document.querySelector('#toggler');
    const menu = document.querySelector('.header');
    if (icon.innerHTML.trim() == 'menu') {
        icon.innerHTML = 'close';
        menu.style.transform = 'translateY(0%)';
    } else {
        icon.innerHTML = 'menu';
        menu.style.transform = 'translateY(-200%)';
    }
}