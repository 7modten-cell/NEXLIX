document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const mobileNav = document.getElementById("mobileNav");
  menuBtn?.addEventListener("click", () => mobileNav.classList.toggle("open"));

  document.querySelectorAll(".filter").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
      button.classList.add("active");
      const filter = button.dataset.filter;
      document.querySelectorAll(".content-card").forEach(card => {
        card.hidden = filter !== "الكل" && card.dataset.kind !== filter;
      });
    });
  });

  document.querySelectorAll("[data-category]").forEach(link => {
    link.addEventListener("click", () => {
      const id = link.dataset.category;
      const mapping = {matches:"مباريات مباشرة",tv:"تلفزيون",movies:"أفلام",series:"مسلسلات"};
      const filter = mapping[id];
      document.querySelectorAll(".filter").forEach(b => {
        const active = b.dataset.filter === filter;
        b.classList.toggle("active", active);
      });
      document.querySelectorAll(".content-card").forEach(card => card.hidden = card.dataset.kind !== filter);
    });
  });

  document.querySelectorAll(".dot").forEach(dot => dot.addEventListener("click", () => {
    document.querySelectorAll(".dot").forEach(d => d.classList.remove("selected"));
    dot.classList.add("selected");
    const art = document.querySelector(".hero-art");
    const palettes = [
      ["#253a72","#10152b","#290d19"],
      ["#6b251d","#16101b","#3b1424"],
      ["#164e58","#101a2c","#1c1837"],
      ["#34324d","#11111b","#4b1520"]
    ];
    const p = palettes[Number(dot.dataset.slide)] || palettes[0];
    art.style.background = `radial-gradient(ellipse at 55% 80%,${p[0]} 0,${p[1]} 40%,transparent 70%),linear-gradient(130deg,#090b17,${p[1]} 55%,${p[2]})`;
  }));
});
