import {
    renderCourses
} from "./render";

export function initFilter() {
    const links = document.querySelectorAll('[data-filter="link"]');

    const handleClick = event => {
        event.preventDefault();
        const target = event.currentTarget;
        const hash = target.hash;

        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }

        history.replaceState(null, "", hash);
        links.forEach(filter => filter.classList.remove('is-active'));
        target.classList.add('is-active');
        renderCourses(hash);
    }

    links.forEach(link => link.addEventListener('click', handleClick));
}