const menuButton = document.querySelector(".menu-btn");
const navigation = document.querySelector(".nav");

if (menuButton && navigation) {
  const mobileView = window.matchMedia("(max-width: 820px)");
  const submenuGroup = navigation.querySelector(".has-sub");
  const submenuLink = submenuGroup ? submenuGroup.querySelector(":scope > a") : null;
  const submenu = submenuGroup ? submenuGroup.querySelector(":scope > .sub") : null;

  if (!navigation.id) navigation.id = "site-navigation";
  menuButton.setAttribute("aria-controls", navigation.id);
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "메뉴 열기");

  if (submenuLink && submenu) {
    if (!submenu.id) submenu.id = "intro-submenu";
    submenuLink.setAttribute("aria-controls", submenu.id);
    if (mobileView.matches) submenuLink.setAttribute("aria-expanded", "false");
  }

  function closeSubmenu() {
    if (submenuGroup) submenuGroup.classList.remove("is-open");
    if (submenuLink) {
      if (mobileView.matches) submenuLink.setAttribute("aria-expanded", "false");
      else submenuLink.removeAttribute("aria-expanded");
    }
  }

  function closeMenu() {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "메뉴 열기");
    closeSubmenu();
  }

  menuButton.addEventListener("click", () => {
    if (navigation.classList.contains("open")) {
      closeMenu();
    } else {
      navigation.classList.add("open");
      menuButton.setAttribute("aria-expanded", "true");
      menuButton.setAttribute("aria-label", "메뉴 닫기");
    }
  });

  if (submenuLink) {
    submenuLink.addEventListener("click", event => {
      if (!mobileView.matches) return;
      event.preventDefault();
      const isOpen = submenuGroup.classList.toggle("is-open");
      submenuLink.setAttribute("aria-expanded", String(isOpen));
    });
  }

  document.addEventListener("click", event => {
    if (mobileView.matches && !menuButton.contains(event.target) && !navigation.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });

  if (mobileView.addEventListener) mobileView.addEventListener("change", closeMenu);
  else mobileView.addListener(closeMenu);
}
