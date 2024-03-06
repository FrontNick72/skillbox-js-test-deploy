export default function initPageMenu() {
    const burger = document.querySelector("[data-sandwich]");
    const body = document.body;
    const headerLogo = document.querySelector("[data-header-logo]");
    const nav = document.querySelector("[data-main-nav]");
    const navItem = document.querySelectorAll('[data-nav-item]'); // массив элементов меню

    const handleClick = (isActive) => {
        body.classList.toggle("scroll-lock", !isActive);
        window.scrollTo(0, 0);

        headerLogo.classList.toggle("is-menu", !isActive);
        nav.classList.toggle("is-active", !isActive);
        burger.classList.toggle("is-active", !isActive);

        if (!isActive) {
            let curr = 0; // индекс в массиве navItem
            const interval = setInterval(function () {
                navItem[curr].classList.toggle("is-active", !isActive);
                if (curr === (navItem.length - 1)) clearInterval(interval);
                curr++;
            }, 200);
        } else {
            navItem.forEach(item => item.classList.remove("is-active"));
        }
    };

    burger.addEventListener("click", (event) =>
        handleClick(event.currentTarget.classList.contains("is-active"))
    );

    document.addEventListener("keydown", (e) => {
        e.preventDefault();
        if (e.code === "Escape") {
            handleClick(true);
        }
    });

    const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
            const width = entry.contentBoxSize && entry.contentBoxSize[0] ?
                entry.contentBoxSize[0].inlineSize :
                entry.contentRect.width;

            if (width >= 1024) {
                handleClick(true);
            }
        }
    });

    resizeObserver.observe(body);
}