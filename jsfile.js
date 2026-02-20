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

window.onload = () => {
    const filters = document.querySelectorAll('#filters div');
    const cards = document.querySelectorAll('#gallery .article-card');

    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            const tag = filter.id;

            cards.forEach(card => {
                console.log(card.dataset.category, tag);
                card.classList.add('inactive');
                card.classList.remove('active');

                if (tag === 'all' || card.dataset.category === tag) {
                    card.classList.remove('inactive');
                    card.classList.add('active');
                }
            });
        });
    });
};