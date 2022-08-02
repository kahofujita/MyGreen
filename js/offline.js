function updateOnlineStatus() {

    const main = document.querySelector('main');

    if (!navigator.onLine) {
        main.innerHTML = "";

        const p = document.createElement('p');
        const div = document.createElement('div');

        div.classList.add('offline-wrapper');
        p.classList.add('offline-message');

        p.innerText = "You're offline. Please reconnect and refresh the page"

        div.appendChild(p)
        main.appendChild(div)

        main.style.cssText = 'display: block';

        const navDesktop = document.querySelector('.menu-desktop ul');
        navDesktop.innerHTML = "";

        const footer = document.querySelector('.footer');
        footer.innerHTML = "";

        const search = document.querySelector('.search-wrapper');
        search.style.cssText = 'display: none';
    }
}

document.addEventListener("DOMContentLoaded", function () {
    updateOnlineStatus();
    window.addEventListener('offline', updateOnlineStatus);
});
