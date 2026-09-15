(() => {
  const NEXT_TEXTS = [
    "tovább", "tovabb",
    "következő", "kovetkezo",
    "folytatás", "folytatas",
    "next", "continue"
  ];

  const STOP_TEXTS = [
    "teszt", "kvíz", "kviz",
    "fejezetzáró", "fejezetzaro",
    "modulzáró", "modulzaro",
    "vizsga", "quiz", "test", "exam",
    "értékelés", "ertekeles"
  ];

  const norm = s =>
    (s || "").replace(/\s+/g, " ").trim().toLowerCase();

  const hasAny = (text, words) =>
    words.some(w => norm(text).includes(w));

  function run() {
    const body = norm(document.body.innerText);

    if (hasAny(body, STOP_TEXTS)) {
      console.log("eTitan Assistant: teszt/vizsga jellegű oldal — megálltam.");
      return;
    }

    const elements = [
      ...document.querySelectorAll("button"),
      ...document.querySelectorAll("a"),
      ...document.querySelectorAll("input[type='button']"),
      ...document.querySelectorAll("input[type='submit']")
    ];

    const next = elements.find(el => {
      const text = norm(el.innerText || el.value || el.getAttribute("aria-label"));
      return text && hasAny(text, NEXT_TEXTS);
    });

    if (next) {
      console.log("eTitan Assistant: tovább gomb.");
      next.click();
    } else {
      console.log("eTitan Assistant: nem találtam tovább gombot.");
    }
  }

  setTimeout(run, 1500);
})();
