(() => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".primary-nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
    }));
    document.addEventListener("click", event => {
      if (!nav.contains(event.target) && !menuButton.contains(event.target)) {
        nav.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation menu");
      }
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const dateInput = document.getElementById("travel-date");
  if (dateInput) {
    const now = new Date();
    const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    dateInput.min = localDate;
    dateInput.value = localDate;
  }

  const from = document.getElementById("from");
  const destination = document.getElementById("destination");
  const routeError = document.getElementById("route-error");
  const form = document.getElementById("booking-form");
  const phoneNumber = "252637762739";

  function validateRoute() {
    const invalid = from && destination && from.value === destination.value;
    if (routeError) routeError.hidden = !invalid;
    if (destination) destination.setCustomValidity(invalid ? "Choose a different destination from your departure city." : "");
    return !invalid;
  }
  if (from && destination) {
    from.addEventListener("change", validateRoute);
    destination.addEventListener("change", validateRoute);
  }
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      if (!validateRoute() || !form.reportValidity()) return;
      const formData = new FormData(form);
      const name = String(formData.get("customer-name") || "").trim();
      const message = [
        "Hello Star Bus, I would like to enquire about booking a trip.",
        "",
        "Departure: " + formData.get("from"),
        "Destination: " + formData.get("destination"),
        "Travel date: " + formData.get("travel-date"),
        "Passengers: " + formData.get("passengers"),
        ...(name ? ["Name: " + name] : []),
        "",
        "Please confirm the current departure time, fare and availability. Thank you."
      ].join("\n");
      window.location.href = "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(message);
    });
  }
})();