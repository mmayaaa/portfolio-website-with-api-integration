// ═══════════════════════════════════════════════════════════
//  MAYA EL MALAH — PORTFOLIO SCRIPT
//
//  ALL APIs ARE FREE — NO KEY NEEDED:
//  • Weather  → Open-Meteo (open-meteo.com)
//  • Quotes   → Quotable API (api.quotable.io)
//  • News     → The Guardian API (free "test" key built-in)
//  • GitHub   → GitHub public REST API (no auth for public repos)
// ═══════════════════════════════════════════════════════════

document.addEventListener("DOMContentLoaded", function () {

  // ──────────────────────────────────────────
  //  SHARED: Navigation (hamburger + theme)
  // ──────────────────────────────────────────
  var hamburger = document.getElementById("hamburger");
  var navLinks  = document.getElementById("navLinks");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        navLinks.classList.remove("open");
      });
    });
  }

  // Theme toggle (dark / light)
  var themeBtn = document.getElementById("themeToggle");
  if (themeBtn) {
    // Persist theme across pages
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark");
      themeBtn.textContent = "☀️ Light";
    }
    themeBtn.addEventListener("click", function () {
      document.body.classList.toggle("dark");
      var isDark = document.body.classList.contains("dark");
      themeBtn.textContent = isDark ? "☀️ Light" : "🌙 Dark";
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  // ──────────────────────────────────────────
  //  HOME PAGE: Welcome Modal
  // ──────────────────────────────────────────
  var modal      = document.getElementById("welcomeModal");
  var closeModal = document.getElementById("closeModalBtn");
  if (modal && closeModal) {
    // Only show once per session
    if (!sessionStorage.getItem("modalSeen")) {
      modal.classList.add("active");
    }
    closeModal.addEventListener("click", function () {
      modal.classList.remove("active");
      sessionStorage.setItem("modalSeen", "1");
    });
  }

  // ──────────────────────────────────────────
  //  SKILLS PAGE: Show/Hide + Add skill tags
  // ──────────────────────────────────────────
  function setupToggle(btnId, contentId) {
    var btn = document.getElementById(btnId);
    var box = document.getElementById(contentId);
    if (!btn || !box) return;
    btn.addEventListener("click", function () {
      var hidden = box.style.display === "none";
      box.style.display = hidden ? "block" : "none";
      btn.textContent   = hidden ? "Hide" : "Show";
    });
  }
  setupToggle("techToggleBtn", "tech-skills");
  setupToggle("proToggleBtn",  "pro-skills");
  setupToggle("expToggleBtn",  "experience-content");
  setupToggle("certsToggleBtn","certs-content");

  function setupAddSkill(inputId, btnId, listId) {
    var input = document.getElementById(inputId);
    var btn   = document.getElementById(btnId);
    var list  = document.getElementById(listId);
    if (!input || !btn || !list) return;

    function addTag() {
      var text = input.value.trim();
      if (!text) { input.focus(); return; }
      var span = document.createElement("span");
      span.className   = "skill-tag";
      span.textContent = text;
      list.appendChild(span);
      input.value = "";
      input.focus();
    }
    btn.addEventListener("click", addTag);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") addTag();
    });
  }
  setupAddSkill("newTechSkill", "addTechSkillBtn", "tech-list");
  setupAddSkill("newProSkill",  "addProSkillBtn",  "pro-list");

  // ──────────────────────────────────────────
  //  PROJECTS PAGE: Expandable project details
  // ──────────────────────────────────────────
  function setupDetails(btnId, detailsId) {
    var btn     = document.getElementById(btnId);
    var details = document.getElementById(detailsId);
    if (!btn || !details) return;
    btn.addEventListener("click", function () {
      var hidden = details.style.display === "none";
      details.style.display = hidden ? "block" : "none";
      btn.textContent       = hidden ? "Hide Details" : "Show Details";
    });
  }
  setupDetails("sikaBtn",    "sika-details");
  setupDetails("maerskBtn",  "maersk-details");
  setupDetails("hsbcBtn",    "hsbc-details");
  setupDetails("mapBtn",     "map-details");
  setupDetails("startupBtn", "startup-details");

  // ──────────────────────────────────────────
  //  CONTACT PAGE: Form Validation
  // ──────────────────────────────────────────
  var submitBtn = document.getElementById("submitFormBtn");
  if (submitBtn) {
    submitBtn.addEventListener("click", function () {
      var name    = document.getElementById("contactName").value.trim();
      var email   = document.getElementById("contactEmail").value.trim();
      var message = document.getElementById("contactMessage").value.trim();

      var nameErr  = document.getElementById("nameError");
      var emailErr = document.getElementById("emailError");
      var msgErr   = document.getElementById("messageError");
      var success  = document.getElementById("formSuccess");

      var nameInput  = document.getElementById("contactName");
      var emailInput = document.getElementById("contactEmail");
      var msgInput   = document.getElementById("contactMessage");

      // Clear previous errors
      nameErr.textContent = emailErr.textContent = msgErr.textContent = "";
      success.textContent = "";
      [nameInput, emailInput, msgInput].forEach(function (el) { el.classList.remove("invalid"); });

      var valid        = true;
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name) {
        nameErr.textContent = "⚠ Name is required.";
        nameInput.classList.add("invalid");
        valid = false;
      }
      if (!email) {
        emailErr.textContent = "⚠ Email is required.";
        emailInput.classList.add("invalid");
        valid = false;
      } else if (!emailPattern.test(email)) {
        emailErr.textContent = "⚠ Please enter a valid email address.";
        emailInput.classList.add("invalid");
        valid = false;
      }
      if (!message) {
        msgErr.textContent = "⚠ Message cannot be empty.";
        msgInput.classList.add("invalid");
        valid = false;
      }
      if (valid) {
        success.textContent = "✅ Thank you! Your message has been sent successfully.";
        nameInput.value = emailInput.value = msgInput.value = "";
        document.getElementById("contactSubject") &&
          (document.getElementById("contactSubject").value = "");
      }
    });
  }

  // ══════════════════════════════════════════
  //  HELPER FUNCTIONS
  // ══════════════════════════════════════════

  function setStatus(id, text) {
    var el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function esc(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g,  "&amp;")
      .replace(/</g,  "&lt;")
      .replace(/>/g,  "&gt;")
      .replace(/"/g,  "&quot;");
  }

  // ══════════════════════════════════════════
  //  API 1 — WEATHER  (index.html)
  //  Open-Meteo: free, no key, fully open
  // ══════════════════════════════════════════

  // WMO weather code → [description, emoji]
  var WMO = {
    0:  ["Clear sky", "☀️"],      1: ["Mainly clear", "🌤"],
    2:  ["Partly cloudy", "⛅"],  3: ["Overcast", "☁️"],
    45: ["Foggy", "🌫"],          48: ["Icy fog", "🌫"],
    51: ["Light drizzle", "🌦"],  53: ["Drizzle", "🌦"],    55: ["Heavy drizzle", "🌧"],
    61: ["Slight rain", "🌧"],    63: ["Rain", "🌧"],        65: ["Heavy rain", "🌧"],
    71: ["Slight snow", "🌨"],    73: ["Snow", "❄️"],        75: ["Heavy snow", "❄️"],
    80: ["Rain showers", "🌦"],   81: ["Rain showers", "🌧"],82: ["Heavy showers", "⛈"],
    95: ["Thunderstorm", "⛈"],   96: ["Thunderstorm", "⛈"],99: ["Thunderstorm", "⛈"]
  };

  var fetchWeatherBtn = document.getElementById("fetchWeatherBtn");
  if (fetchWeatherBtn) {
    fetchWeatherBtn.addEventListener("click", fetchWeather);
    fetchWeather(); // auto-load Cairo on page open
  }

  async function fetchWeather() {
    var cityInput = document.getElementById("weatherCity");
    var resultEl  = document.getElementById("weather-result");
    if (!cityInput || !resultEl) return;

    var city = cityInput.value.trim();
    if (!city) { setStatus("weather-status", "⚠ Please enter a city name."); return; }

    setStatus("weather-status", "Loading…");
    resultEl.innerHTML = "";

    try {
      // Step 1: geocode city → coordinates
      var geoRes = await fetch(
        "https://geocoding-api.open-meteo.com/v1/search?name=" +
        encodeURIComponent(city) + "&count=1&language=en&format=json"
      );
      if (!geoRes.ok) throw new Error("Geocoding service unavailable.");
      var geoData = await geoRes.json();
      if (!geoData.results || geoData.results.length === 0)
        throw new Error("City \"" + city + "\" not found. Try a different spelling.");

      var loc = geoData.results[0];

      // Step 2: fetch live weather
      var wxRes = await fetch(
        "https://api.open-meteo.com/v1/forecast" +
        "?latitude="  + loc.latitude +
        "&longitude=" + loc.longitude +
        "&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code" +
        "&wind_speed_unit=kmh&timezone=auto"
      );
      if (!wxRes.ok) throw new Error("Weather service unavailable.");
      var wxData = await wxRes.json();

      var c   = wxData.current;
      var wmo = WMO[c.weather_code] || ["Unknown", "🌡"];

      setStatus("weather-status", "Live weather for " + esc(loc.name) + ", " + esc(loc.country));

      resultEl.innerHTML =
        "<div class='weather-box'>" +
          "<div class='weather-temp'>" + wmo[1] + " " + Math.round(c.temperature_2m) + "°C</div>" +
          "<div class='weather-desc'>" + esc(wmo[0]) + "</div>" +
          "<div class='weather-meta'>" +
            "<span>🌡 Feels like " + Math.round(c.apparent_temperature) + "°C</span>" +
            "<span>💧 Humidity " + c.relative_humidity_2m + "%</span>" +
            "<span>💨 Wind " + Math.round(c.wind_speed_10m) + " km/h</span>" +
          "</div>" +
        "</div>";

    } catch (err) {
      setStatus("weather-status", "❌ " + err.message);
    }
  }

  // ══════════════════════════════════════════
  //  API 2 — REST COUNTRIES  (skills.html)
  //  restcountries.com — free, no key needed
  // ══════════════════════════════════════════

  var fetchCountryBtn = document.getElementById("fetchCountryBtn");
  if (fetchCountryBtn) {
    fetchCountryBtn.addEventListener("click", fetchCountry);
    // Auto-load Egypt on page open
    document.getElementById("countryInput") && (document.getElementById("countryInput").value = "Egypt");
    fetchCountry();
  }

  async function fetchCountry() {
    var input     = document.getElementById("countryInput");
    var resultsEl = document.getElementById("country-results");
    if (!input || !resultsEl) return;

    var query = input.value.trim();
    if (!query) { setStatus("country-status", "⚠ Please enter a country name."); return; }

    setStatus("country-status", "Loading…");
    resultsEl.innerHTML = "";

    try {
      var res = await fetch(
        "https://restcountries.com/v3.1/name/" + encodeURIComponent(query) +
        "?fields=name,flags,capital,population,region,subregion,languages,currencies,area"
      );
      if (res.status === 404) throw new Error("No country found matching \"" + query + "\".");
      if (!res.ok)            throw new Error("Countries API error: " + res.status);

      var countries = await res.json();
      // Limit to first 6 results
      countries = countries.slice(0, 6);

      setStatus("country-status", "Found " + countries.length + " result(s) for \"" + query + "\"");

      countries.forEach(function (c) {
        // Languages
        var langs = c.languages ? Object.values(c.languages).join(", ") : "N/A";
        // Currency
        var curr  = c.currencies ? Object.values(c.currencies).map(function (x) { return x.name + " (" + (x.symbol || "") + ")"; }).join(", ") : "N/A";
        // Population formatted
        var pop   = c.population ? c.population.toLocaleString() : "N/A";
        // Area formatted
        var area  = c.area ? c.area.toLocaleString() + " km²" : "N/A";

        var div = document.createElement("div");
        div.className = "country-card";
        div.innerHTML =
          "<span class='country-flag'>" + (c.flags && c.flags.emoji ? c.flags.emoji : "🌍") + "</span>" +
          "<h4>" + esc(c.name.common) + "</h4>" +
          "<div class='country-meta'>" +
            "<span>🌐 <strong>" + esc(c.region) + (c.subregion ? " — " + esc(c.subregion) : "") + "</strong></span>" +
            "<span>🏙 Capital: <strong>" + esc((c.capital && c.capital[0]) || "N/A") + "</strong></span>" +
            "<span>👥 Population: <strong>" + esc(pop) + "</strong></span>" +
            "<span>📐 Area: <strong>" + esc(area) + "</strong></span>" +
            "<span>🗣 Language(s): <strong>" + esc(langs) + "</strong></span>" +
            "<span>💰 Currency: <strong>" + esc(curr) + "</strong></span>" +
          "</div>";
        resultsEl.appendChild(div);
      });

    } catch (err) {
      setStatus("country-status", "❌ " + err.message);
    }
  }

  // ══════════════════════════════════════════
  //  API 3 — QUOTES  (projects.html)
  //  Quotable API — free, no key needed
  // ══════════════════════════════════════════

  var BACKUP_QUOTES = [
    { content: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { content: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { content: "The best way to predict the future is to create it.", author: "Peter Drucker" },
    { content: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { content: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { content: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
    { content: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
  ];

  var fetchQuoteBtn = document.getElementById("fetchQuoteBtn");
  if (fetchQuoteBtn) {
    fetchQuoteBtn.addEventListener("click", fetchQuote);
    fetchQuote(); // auto-load on page open
  }

  async function fetchQuote() {
    setStatus("quote-status", "Loading…");
    var quoteEl = document.getElementById("quote-result");
    if (!quoteEl) return;
    quoteEl.style.display = "none";

    try {
      var res = await fetch("https://api.quotable.io/random?tags=inspirational|success|motivation");
      if (!res.ok) throw new Error("status " + res.status);
      var data = await res.json();

      setStatus("quote-status", "");
      quoteEl.innerHTML =
        "<div class='quote-text'>\"" + esc(data.content) + "\"</div>" +
        "<div class='quote-author'>— " + esc(data.author) + "</div>";
      quoteEl.style.display = "block";

    } catch (err) {
      // Silent fallback — use built-in quotes
      var q = BACKUP_QUOTES[Math.floor(Math.random() * BACKUP_QUOTES.length)];
      setStatus("quote-status", "");
      quoteEl.innerHTML =
        "<div class='quote-text'>\"" + esc(q.content) + "\"</div>" +
        "<div class='quote-author'>— " + esc(q.author) + "</div>";
      quoteEl.style.display = "block";
    }
  }

  // ══════════════════════════════════════════
  //  API 4 — NEWS  (projects.html)
  //  The Guardian API — free "test" key built-in
  //  (official demo key provided by The Guardian)
  // ══════════════════════════════════════════

  var fetchNewsBtn = document.getElementById("fetchNewsBtn");
  if (fetchNewsBtn) {
    fetchNewsBtn.addEventListener("click", fetchNews);
    fetchNews(); // auto-load technology news on page open
  }

  async function fetchNews() {
    var categoryEl = document.getElementById("newsCategory");
    var resultsEl  = document.getElementById("news-results");
    if (!categoryEl || !resultsEl) return;

    var category = categoryEl.value;
    setStatus("news-status", "Loading…");
    resultsEl.innerHTML = "";

    try {
      var res = await fetch(
        "https://content.guardianapis.com/search" +
        "?section=" + category +
        "&show-fields=trailText" +
        "&page-size=6" +
        "&order-by=newest" +
        "&api-key=test"
      );
      if (!res.ok) throw new Error("News API error: " + res.status);
      var data = await res.json();

      var articles = data.response && data.response.results;
      if (!articles || articles.length === 0) {
        setStatus("news-status", "No articles found for this category.");
        return;
      }

      setStatus("news-status", "Showing " + articles.length + " latest headlines — " + category);

      articles.forEach(function (article) {
        var desc = "";
        if (article.fields && article.fields.trailText) {
          desc = article.fields.trailText.replace(/<[^>]+>/g, ""); // strip HTML tags
        }

        var li = document.createElement("li");
        li.className = "news-item";
        li.innerHTML =
          "<h4>" + esc(article.webTitle) + "</h4>" +
          (desc ? "<p>" + esc(desc) + "</p>" : "") +
          "<a href='" + esc(article.webUrl) + "' target='_blank' rel='noopener'>Read more →</a>" +
          "<div class='news-source'>📰 The Guardian &nbsp;·&nbsp; " + esc(article.sectionName) + "</div>";
        resultsEl.appendChild(li);
      });

    } catch (err) {
      setStatus("news-status", "❌ " + err.message);
    }
  }

}); // end DOMContentLoaded
