
(() => {
  const openingScreen = document.getElementById("openingScreen");
  const envelope = document.getElementById("envelope");
  const waxSeal = document.getElementById("waxSeal");
  const mainContent = document.getElementById("mainContent");
  const petalField = document.getElementById("petalField");

  let opened = false;

  function createPetals() {
    if (!petalField || petalField.childElementCount) return;
    for (let i = 0; i < 14; i++) {
      const p = document.createElement("i");
      p.className = "petal";
      p.style.setProperty("--x", `${Math.random() * 100}%`);
      p.style.setProperty("--size", `${7 + Math.random() * 8}px`);
      p.style.setProperty("--duration", `${8 + Math.random() * 7}s`);
      p.style.setProperty("--delay", `${Math.random() * 7}s`);
      p.style.setProperty("--drift", `${-40 + Math.random() * 80}px`);
      p.style.setProperty("--rotate", `${Math.random() * 180}deg`);
      petalField.appendChild(p);
    }
  }

  function openInvitation() {
    if (opened) return;
    opened = true;

    envelope.classList.remove("seal-celebrate");
    void envelope.offsetWidth;
    envelope.classList.add("seal-celebrate");

    setTimeout(() => envelope.classList.add("direct-open"), 120);

    setTimeout(() => {
      openingScreen.classList.add("done");
      document.body.classList.add("invitation-open");
      mainContent.setAttribute("aria-hidden", "false");
      mainContent.classList.add("ready");
      createPetals();

      document.querySelectorAll(".hero .reveal").forEach((el, i) => {
        setTimeout(() => el.classList.add("visible"), i * 85);
      });
    }, 760);
  }

  if (waxSeal) {
    waxSeal.addEventListener("pointerdown", () => {
      if (!opened) {
        envelope.classList.remove("seal-celebrate");
        void envelope.offsetWidth;
        envelope.classList.add("seal-celebrate");
      }
    }, {passive:true});
    waxSeal.addEventListener("click", openInvitation);
  }

  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add("visible"));
  }

  const target = new Date("2026-10-10T18:00:00+03:00").getTime();
  const days = document.getElementById("days");
  const hours = document.getElementById("hours");
  const minutes = document.getElementById("minutes");
  const seconds = document.getElementById("seconds");

  function tick() {
    let diff = Math.max(0, target - Date.now());
    const d = Math.floor(diff / 86400000); diff %= 86400000;
    const h = Math.floor(diff / 3600000); diff %= 3600000;
    const m = Math.floor(diff / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    if (days) days.textContent = String(d).padStart(2, "0");
    if (hours) hours.textContent = String(h).padStart(2, "0");
    if (minutes) minutes.textContent = String(m).padStart(2, "0");
    if (seconds) seconds.textContent = String(s).padStart(2, "0");
  }
  tick();
  setInterval(tick, 1000);
})();
