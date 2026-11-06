document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const mobileNav = document.getElementById("mobileNav");
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");
  const cards = [...document.querySelectorAll(".content-card")];
  const filters = [...document.querySelectorAll(".filter")];

  let currentFilter = "الكل";

  menuBtn?.addEventListener("click", () => {
    mobileNav?.classList.toggle("open");
  });

  function applyFilter(filter) {
    currentFilter = filter;

    filters.forEach(button => {
      button.classList.toggle("active", button.dataset.filter === filter);
    });

    cards.forEach(card => {
      const matchesFilter = filter === "الكل" || card.dataset.kind === filter;
      const query = searchInput?.value.trim().toLowerCase() || "";
      const matchesSearch = !query ||
        card.dataset.title.toLowerCase().includes(query) ||
        card.dataset.kind.toLowerCase().includes(query);

      card.hidden = !(matchesFilter && matchesSearch);
    });
  }

  filters.forEach(button => {
    button.addEventListener("click", () => {
      applyFilter(button.dataset.filter);
      searchResults.innerHTML = "";
    });
  });

  document.querySelectorAll("[data-category]").forEach(link => {
    link.addEventListener("click", () => {
      const mapping = {
        matches: "مباريات مباشرة",
        tv: "تلفزيون",
        movies: "أفلام",
        series: "مسلسلات"
      };

      const filter = mapping[link.dataset.category];
      if (filter) applyFilter(filter);
      mobileNav?.classList.remove("open");
    });
  });

  document.querySelectorAll("[data-nav-filter]").forEach(link => {
    link.addEventListener("click", () => {
      applyFilter(link.dataset.navFilter);
      mobileNav?.classList.remove("open");
    });
  });

  document.getElementById("showAll")?.addEventListener("click", () => {
    applyFilter("الكل");
  });

  searchInput?.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();

    cards.forEach(card => {
      const matchesFilter = currentFilter === "الكل" || card.dataset.kind === currentFilter;
      const matchesSearch = !query ||
        card.dataset.title.toLowerCase().includes(query) ||
        card.dataset.kind.toLowerCase().includes(query);

      card.hidden = !(matchesFilter && matchesSearch);
    });

    if (!query) {
      searchResults.innerHTML = "";
      return;
    }

    const count = cards.filter(card => !card.hidden).length;
    searchResults.innerHTML = `
      <div class="search-panel">
        <div class="search-panel-head">
          <b>نتائج البحث</b>
          <button type="button" id="closeSearch">إغلاق ×</button>
        </div>
        <p class="empty-search">${count ? `تم العثور على ${count} نتيجة.` : "لا توجد نتائج مطابقة لعبارة البحث."}</p>
      </div>`;

    document.getElementById("closeSearch")?.addEventListener("click", () => {
      searchInput.value = "";
      searchResults.innerHTML = "";
      applyFilter(currentFilter);
    });
  });

  document.querySelectorAll(".dot").forEach(dot => {
    dot.addEventListener("click", () => {
      document.querySelectorAll(".dot").forEach(item => item.classList.remove("selected"));
      dot.classList.add("selected");

      const palettes = [
        ["#913768", "#10152b", "#290d19"],
        ["#6b251d", "#16101b", "#3b1424"],
        ["#164e58", "#101a2c", "#1c1837"],
        ["#34324d", "#11111b", "#4b1520"]
      ];

      const palette = palettes[Number(dot.dataset.slide)] || palettes[0];
      const art = document.querySelector(".hero-art");

      if (art) {
        art.style.background =
          `radial-gradient(ellipse at 55% 80%,${palette[0]} 0,${palette[1]} 40%,transparent 70%),linear-gradient(130deg,#090b17,${palette[1]} 55%,${palette[2]})`;
      }
    });
  });

  document.getElementById("profileBtn")?.addEventListener("click", () => {
    alert("قسم الحساب الشخصي قيد التطوير.");
  });

  document.getElementById("mobileProfile")?.addEventListener("click", event => {
    event.preventDefault();
    alert("قسم الحساب الشخصي قيد التطوير.");
  });

  document.querySelectorAll(".play-button").forEach(button => {
    button.addEventListener("click", () => {
      alert("لا يوجد رابط بث مضاف لهذا المحتوى حتى الآن.");
    });
  });
});
