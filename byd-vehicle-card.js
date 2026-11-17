/*
 * BYD Vehicle Card – a Lovelace card for the hass-byd-vehicle integration
 * (https://github.com/jkaberg/hass-byd-vehicle).
 *
 * Single file, no dependencies, no build step. Entities are discovered
 * automatically from the integration's device; everything can be overridden.
 *
 * MIT License
 */
const VERSION = "0.5.0";

/* ------------------------------------------------------------------ i18n */
const I18N = {
  en: {
    parked: "Parked", driving: "Driving", charging: "Charging", plugged: "Plugged in", offline: "Offline", awake: "Powered on",
    locked: "Locked", unlocked: "Unlocked", battery: "Battery", fuel: "Fuel", range: "Range", ev_range: "electric",
    odometer: "Odometer", inside: "Inside", outside: "Outside", all_closed: "Everything closed", updated: "Updated",
    door_fl: "Front left door", door_fr: "Front right door", door_rl: "Rear left door", door_rr: "Rear right door",
    sliding_door: "Sliding door", win_fl: "Front left window", win_fr: "Front right window", win_rl: "Rear left window", win_rr: "Rear right window",
    trunk: "Trunk", hood: "Hood", sunroof: "Sunroof", sentry: "Sentry", climate: "Climate", climate_on: "Climate on",
    act_lock: "Lock", act_unlock: "Unlock", act_climate: "Climate", act_flash: "Flash", act_find: "Find", act_close_windows: "Close windows",
    act_open_windows: "Open windows", act_open_trunk: "Open trunk", act_close_trunk: "Close trunk", act_refresh: "Refresh", act_start_charging: "Charge now",
    hold: "Hold to activate", sent: "Command sent", failed: "Command failed",
    charging_title: "Charging", not_plugged: "Unplugged", plugged_idle: "Plugged in – not charging", power: "Power", to_full: "To full",
    schedule: "Schedule", schedule_off: "off", price_now: "Price now", full_charge: "Charge to 100%", cheap: "cheap", normal: "normal", expensive: "expensive",
    stats_title: "Trips", today: "Today", week: "7 days", month: "Month", distance: "Distance", charged: "Charged", charge_cost: "Charging cost",
    fuel_used: "Fuel used", fuel_cost: "Fuel cost", cost_100: "Cost / 100 km", ev_100: "100 km electric", fuel_100: "100 km on fuel",
    costs_title: "Running costs", tires: "Tyres", warnings: "Warnings", location: "Location", no_data: "No data yet", more: "More",
    w_tire: "Tyre pressure", w_abs: "ABS", w_srs: "Airbag", w_ect: "Coolant temperature", w_svs: "Service required", w_esp: "Stability control",
    w_eps: "Power steering", w_power_system: "Power system", w_leak: "Rapid tyre leak", w_pwr: "Power warning", w_brake: "Brake system", w_oil: "Oil pressure",
    w_steer: "Steering system", w_chargesys: "Charging system", no_device: "No BYD vehicle found. Install hass-byd-vehicle or set `device`.",
    side_left: "Left side", side_right: "Right side", seat_driver: "Driver seat", seat_pass: "Passenger seat", steering: "Steering wheel", h: "h", min: "min",
  },
  pl: {
    parked: "Zaparkowany", driving: "W trasie", charging: "Ładowanie", plugged: "Podłączony", offline: "Offline", awake: "Włączony",
    locked: "Zamknięty", unlocked: "Otwarty", battery: "Bateria", fuel: "Paliwo", range: "Zasięg", ev_range: "na prądzie",
    odometer: "Przebieg", inside: "Wewnątrz", outside: "Na zewnątrz", all_closed: "Wszystko zamknięte", updated: "Aktualizacja",
    door_fl: "Drzwi przednie lewe", door_fr: "Drzwi przednie prawe", door_rl: "Drzwi tylne lewe", door_rr: "Drzwi tylne prawe",
    sliding_door: "Drzwi przesuwne", win_fl: "Okno przednie lewe", win_fr: "Okno przednie prawe", win_rl: "Okno tylne lewe", win_rr: "Okno tylne prawe",
    trunk: "Bagażnik", hood: "Maska", sunroof: "Szyberdach", sentry: "Wartownik", climate: "Klimatyzacja", climate_on: "Klimatyzacja działa",
    act_lock: "Zamknij", act_unlock: "Otwórz", act_climate: "Klima", act_flash: "Światła", act_find: "Znajdź", act_close_windows: "Zamknij okna",
    act_open_windows: "Otwórz okna", act_open_trunk: "Otwórz bagażnik", act_close_trunk: "Zamknij bagażnik", act_refresh: "Odśwież", act_start_charging: "Ładuj teraz",
    hold: "Przytrzymaj, aby wykonać", sent: "Polecenie wysłane", failed: "Polecenie nieudane",
    charging_title: "Ładowanie", not_plugged: "Odłączony", plugged_idle: "Podłączony – nie ładuje", power: "Moc", to_full: "Do pełna",
    schedule: "Harmonogram", schedule_off: "wył.", price_now: "Cena teraz", full_charge: "Ładowanie do 100%", cheap: "tanio", normal: "średnio", expensive: "drogo",
    stats_title: "Przejazdy", today: "Dziś", week: "7 dni", month: "Miesiąc", distance: "Przebieg", charged: "Naładowano", charge_cost: "Koszt ładowania",
    fuel_used: "Spalone paliwo", fuel_cost: "Koszt paliwa", cost_100: "Koszt / 100 km", ev_100: "100 km na prądzie", fuel_100: "100 km na paliwie",
    costs_title: "Koszty jazdy", tires: "Opony", warnings: "Ostrzeżenia", location: "Lokalizacja", no_data: "Brak danych", more: "Więcej",
    w_tire: "Ciśnienie w oponach", w_abs: "ABS", w_srs: "Poduszka powietrzna", w_ect: "Temperatura płynu", w_svs: "Wymagany serwis", w_esp: "Kontrola stabilności",
    w_eps: "Wspomaganie kierownicy", w_power_system: "Układ zasilania", w_leak: "Szybki wyciek z opony", w_pwr: "Ostrzeżenie zasilania", w_brake: "Układ hamulcowy", w_oil: "Ciśnienie oleju",
    w_steer: "Układ kierowniczy", w_chargesys: "Układ ładowania", no_device: "Nie znaleziono auta BYD. Zainstaluj hass-byd-vehicle albo ustaw `device`.",
    side_left: "Lewa strona", side_right: "Prawa strona", seat_driver: "Fotel kierowcy", seat_pass: "Fotel pasażera", steering: "Kierownica", h: "h", min: "min",
  },
  de: {
    parked: "Geparkt", driving: "Unterwegs", charging: "Lädt", plugged: "Angesteckt", offline: "Offline", awake: "Eingeschaltet",
    locked: "Verriegelt", unlocked: "Entriegelt", battery: "Batterie", fuel: "Kraftstoff", range: "Reichweite", ev_range: "elektrisch",
    odometer: "Kilometerstand", inside: "Innen", outside: "Außen", all_closed: "Alles geschlossen", updated: "Aktualisiert",
    door_fl: "Tür vorne links", door_fr: "Tür vorne rechts", door_rl: "Tür hinten links", door_rr: "Tür hinten rechts",
    sliding_door: "Schiebetür", win_fl: "Fenster vorne links", win_fr: "Fenster vorne rechts", win_rl: "Fenster hinten links", win_rr: "Fenster hinten rechts",
    trunk: "Kofferraum", hood: "Motorhaube", sunroof: "Schiebedach", sentry: "Wächter", climate: "Klima", climate_on: "Klima läuft",
    act_lock: "Verriegeln", act_unlock: "Entriegeln", act_climate: "Klima", act_flash: "Lichthupe", act_find: "Finden", act_close_windows: "Fenster zu",
    act_open_windows: "Fenster auf", act_open_trunk: "Kofferraum auf", act_close_trunk: "Kofferraum zu", act_refresh: "Aktualisieren", act_start_charging: "Jetzt laden",
    hold: "Zum Ausführen gedrückt halten", sent: "Befehl gesendet", failed: "Befehl fehlgeschlagen",
    charging_title: "Laden", not_plugged: "Nicht angesteckt", plugged_idle: "Angesteckt – lädt nicht", power: "Leistung", to_full: "Bis voll",
    schedule: "Zeitplan", schedule_off: "aus", price_now: "Preis jetzt", full_charge: "Laden auf 100%", cheap: "günstig", normal: "normal", expensive: "teuer",
    stats_title: "Fahrten", today: "Heute", week: "7 Tage", month: "Monat", distance: "Strecke", charged: "Geladen", charge_cost: "Ladekosten",
    fuel_used: "Verbrauchter Kraftstoff", fuel_cost: "Kraftstoffkosten", cost_100: "Kosten / 100 km", ev_100: "100 km elektrisch", fuel_100: "100 km mit Kraftstoff",
    costs_title: "Fahrtkosten", tires: "Reifen", warnings: "Warnungen", location: "Standort", no_data: "Noch keine Daten", more: "Mehr",
    w_tire: "Reifendruck", w_abs: "ABS", w_srs: "Airbag", w_ect: "Kühlmitteltemperatur", w_svs: "Service erforderlich", w_esp: "Stabilitätskontrolle",
    w_eps: "Servolenkung", w_power_system: "Antriebssystem", w_leak: "Schneller Druckverlust", w_pwr: "Stromwarnung", w_brake: "Bremssystem", w_oil: "Öldruck",
    w_steer: "Lenksystem", w_chargesys: "Ladesystem", no_device: "Kein BYD-Fahrzeug gefunden. hass-byd-vehicle installieren oder `device` setzen.",
    side_left: "Linke Seite", side_right: "Rechte Seite", seat_driver: "Fahrersitz", seat_pass: "Beifahrersitz", steering: "Lenkrad", h: "h", min: "min",
  },
};

/* --------------------------------------------------------------- car art */
const C = 120; // centre line of the 240x460 viewBox
const BODY_STYLES = {
  suv:       { y0: 40, y1: 420, hw: 74, hood: 104, ws: 42, roofEnd: 346, rearGlass: 28, fd: [166, 256], rd: [256, 336], liftgate: true, rails: true },
  sedan:     { y0: 30, y1: 430, hw: 71, hood: 116, ws: 46, roofEnd: 318, rearGlass: 50, fd: [172, 258], rd: [258, 330], liftgate: false },
  hatchback: { y0: 58, y1: 402, hw: 71, hood: 94,  ws: 42, roofEnd: 340, rearGlass: 28, fd: [174, 256], rd: [256, 330], liftgate: true },
};
const PAINTS = {
  white: "#e9edf2", black: "#1d2026", grey: "#8b929c", silver: "#c3c9d1", blue: "#2f5f9e",
  red: "#a3222b", green: "#3d6b5c", "time-grey": "#6c737d", "arctic-blue": "#9fc3d6", "atlantis-grey": "#515a66",
};

function carSvg(style, opts) {
  const g = BODY_STYLES[style] || BODY_STYLES.suv;
  const { y0, y1, hw } = g;
  const hoodBase = y0 + g.hood, wsTop = hoodBase + g.ws, roofEnd = g.roofEnd, rgB = roofEnd + g.rearGlass;
  const rw = hw - 21, bw = hw - 9;
  const [fd0, fd1] = g.fd, [rd0, rd1] = g.rd;
  const fa = y0 + 68, ra = y1 - 76;
  const L = (dx) => C - dx, R = (dx) => C + dx;

  const body = `M${L(hw - 16)},${y0 + 10} Q${C},${y0 - 6} ${R(hw - 16)},${y0 + 10}
    C${R(hw - 4)},${y0 + 16} ${R(hw)},${y0 + 34} ${R(hw)},${y0 + 60} L${R(hw)},${y1 - 56}
    C${R(hw)},${y1 - 28} ${R(hw - 4)},${y1 - 12} ${R(hw - 18)},${y1 - 6} Q${C},${y1 + 4} ${L(hw - 18)},${y1 - 6}
    C${L(hw - 4)},${y1 - 12} ${L(hw)},${y1 - 28} ${L(hw)},${y1 - 56} L${L(hw)},${y0 + 60}
    C${L(hw)},${y0 + 34} ${L(hw - 4)},${y0 + 16} ${L(hw - 16)},${y0 + 10} Z`;
  const hood = `M${L(hw - 11)},${y0 + 24} Q${C},${y0 + 5} ${R(hw - 11)},${y0 + 24} L${R(bw)},${hoodBase + 2} Q${C},${hoodBase - 10} ${L(bw)},${hoodBase + 2} Z`;
  const windshield = `M${L(bw - 2)},${hoodBase + 5} Q${C},${hoodBase - 7} ${R(bw - 2)},${hoodBase + 5} L${R(rw)},${wsTop} Q${C},${wsTop - 5} ${L(rw)},${wsTop} Z`;
  const roof = `M${L(rw)},${wsTop} Q${C},${wsTop - 5} ${R(rw)},${wsTop} L${R(rw - 2)},${roofEnd} Q${C},${roofEnd + 5} ${L(rw - 2)},${roofEnd} Z`;
  const rearGlass = `M${L(rw - 2)},${roofEnd} Q${C},${roofEnd + 5} ${R(rw - 2)},${roofEnd} L${R(bw - 3)},${rgB} Q${C},${rgB + 7} ${L(bw - 3)},${rgB} Z`;
  const trunk = `M${L(bw - 3)},${rgB} Q${C},${rgB + 7} ${R(bw - 3)},${rgB} L${R(hw - 13)},${y1 - 13} Q${C},${y1 - 3} ${L(hw - 13)},${y1 - 13} Z`;
  const trunkOrigin = g.liftgate ? roofEnd : rgB;

  const side = (s) => {
    const X = (dx) => C + s * dx;
    const id = s < 0 ? "l" : "r";
    const fGlass = `${X(bw)},${fd0 + 8} ${X(rw + 1)},${wsTop + 5} ${X(rw + 1)},${fd1 - 2} ${X(bw)},${fd1 - 2}`;
    const rGlass = `${X(bw)},${rd0 + 2} ${X(rw + 1)},${rd0 + 2} ${X(rw + 1)},${Math.min(rd1, roofEnd) - 3} ${X(bw)},${rd1 - 5}`;
    const quarter = rd1 < roofEnd - 6
      ? `<polygon class="glass" points="${X(bw)},${rd1 + 1} ${X(rw + 1)},${rd1 + 1} ${X(rw + 1)},${roofEnd - 2} ${X(bw - 1)},${Math.min(rgB - 8, roofEnd + 6)}"/>` : "";
    const sill = (a, b) => `<path class="paint seam" d="M${X(hw)},${a} L${X(bw)},${a} L${X(bw)},${b} L${X(hw)},${b} Z"/>`;
    const handle = (y) => `<line class="handle" x1="${X(hw - 3.5)}" y1="${y}" x2="${X(hw - 3.5)}" y2="${y + 9}"/>`;
    const mirror = `<path class="paint seam" d="M${X(hw - 1)},${fd0 + 4} L${X(hw + 12)},${fd0 + 1} Q${X(hw + 15)},${fd0 + 5} ${X(hw + 12)},${fd0 + 10} L${X(hw - 1)},${fd0 + 13} Z"/>`;
    return `
      <path class="interior" d="M${X(hw - 1)},${fd0} L${X(rw)},${fd0} L${X(rw)},${rd1} L${X(hw - 1)},${rd1} Z"/>
      <rect class="seat" x="${Math.min(X(rw + 3), X(bw + 4))}" y="${fd0 + 30}" width="${bw - rw + 1}" height="34" rx="4"/>
      <rect class="seat" x="${Math.min(X(rw + 3), X(bw + 4))}" y="${rd0 + 22}" width="${bw - rw + 1}" height="34" rx="4"/>
      ${quarter}
      <g class="door" data-part="door_f${id}" style="transform-origin:${X(hw)}px ${fd0}px">
        ${sill(fd0, fd1)}${mirror}${handle(fd1 - 20)}
        <polygon class="glass win" data-part="win_f${id}" style="transform-origin:${X(bw)}px ${fd0}px" points="${fGlass}"/>
        <polygon class="winframe" points="${fGlass}"/>
      </g>
      <g class="door" data-part="door_r${id}" style="transform-origin:${X(hw)}px ${rd0}px">
        ${sill(rd0, rd1)}${handle(rd1 - 20)}
        <polygon class="glass win" data-part="win_r${id}" style="transform-origin:${X(bw)}px ${rd0}px" points="${rGlass}"/>
        <polygon class="winframe" points="${rGlass}"/>
      </g>
      <rect class="wheel" x="${X(hw + 2) - 5}" y="${fa - 22}" width="10" height="44" rx="4"/>
      <rect class="wheel" x="${X(hw + 2) - 5}" y="${ra - 22}" width="10" height="44" rx="4"/>
      <path class="headlight" d="M${X(hw - 9)},${y0 + 27} Q${X(hw - 13)},${y0 + 14} ${X(hw - 36)},${y0 + 9.5} L${X(hw - 34)},${y0 + 14} Q${X(hw - 18)},${y0 + 18} ${X(hw - 13)},${y0 + 29} Z"/>
      <path class="beam" d="M${X(hw - 12)},${y0 + 14} L${X(hw + 14)},${y0 - 40} L${X(hw - 60)},${y0 - 40} L${X(hw - 36)},${y0 + 8} Z"/>`;
  };

  // charge port + cable
  const port = opts.port || "rear_right";
  const ps = port.endsWith("left") ? -1 : 1;
  const py = port.startsWith("front") ? fd0 - 16 : rd1 + 10;
  const px = C + ps * hw;
  const cable = `M${px + ps * 3},${py} c${ps * 22},2 ${ps * 30},26 ${ps * 26},52 s${ps * 2},46 ${ps * 22},60`;

  const sunY = wsTop + 12, sunH = Math.min(62, (roofEnd - wsTop) * 0.42);
  const lockY = Math.round(sunY + sunH + (roofEnd - sunY - sunH) / 2);
  const rails = g.rails
    ? `<line class="rail" x1="${L(rw - 5)}" y1="${wsTop + 16}" x2="${L(rw - 6)}" y2="${roofEnd - 14}"/><line class="rail" x1="${R(rw - 5)}" y1="${wsTop + 16}" x2="${R(rw - 6)}" y2="${roofEnd - 14}"/>` : "";

  return `
  <svg class="car" viewBox="0 0 240 460" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="paint" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stop-color="var(--paint-d)"/><stop offset=".22" stop-color="var(--paint)"/>
        <stop offset=".5" stop-color="var(--paint-l)"/><stop offset=".78" stop-color="var(--paint)"/><stop offset="1" stop-color="var(--paint-d)"/>
      </linearGradient>
      <linearGradient id="glassg" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="#3a4a63"/><stop offset=".45" stop-color="#121a28"/><stop offset="1" stop-color="#27344a"/>
      </linearGradient>
      <linearGradient id="shine" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
      </linearGradient>
      <radialGradient id="glow"><stop offset="0" stop-color="var(--glow)" stop-opacity=".8"/><stop offset="1" stop-color="var(--glow)" stop-opacity="0"/></radialGradient>
      <filter id="soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="5"/></filter>
    </defs>
    <ellipse class="glow" cx="${C}" cy="232" rx="118" ry="222" fill="url(#glow)"/>
    <g class="road"><line x1="14" y1="-40" x2="14" y2="500"/><line x1="226" y1="-40" x2="226" y2="500"/></g>
    <path class="shadow" d="${body}" filter="url(#soft)"/>
    <path class="paint bodyshell" d="${body}"/>
    <path class="enginebay" d="${hood}"/>
    <path class="cargo" d="${g.liftgate ? rearGlass + " " + trunk : trunk}"/>
    <path class="taillight" d="M${L(hw - 12)},${y1 - 10} Q${C},${y1 - 1} ${R(hw - 12)},${y1 - 10}"/>
    <g data-part="hood" class="lid" style="transform-origin:${C}px ${hoodBase}px">
      <path class="paint seam" d="${hood}"/>
      <path class="crease" d="M${L(26)},${y0 + 18} Q${L(34)},${hoodBase - 40} ${L(44)},${hoodBase - 4} M${R(26)},${y0 + 18} Q${R(34)},${hoodBase - 40} ${R(44)},${hoodBase - 4}"/>
      <path d="${hood}" fill="url(#shine)" opacity=".5"/>
    </g>
    <path class="glass" d="${windshield}"/>
    ${side(-1)}${side(1)}
    <path class="paint roof seam" d="${roof}"/>
    ${rails}
    <rect class="opening" x="${L(rw - 12)}" y="${sunY}" width="${(rw - 12) * 2}" height="${sunH}" rx="6"/>
    <rect class="glass sun" data-part="sunroof" style="transform-origin:${C}px ${sunY + sunH}px" x="${L(rw - 12)}" y="${sunY}" width="${(rw - 12) * 2}" height="${sunH}" rx="6"/>
    <g data-part="trunk" class="lid" style="transform-origin:${C}px ${trunkOrigin}px">
      ${g.liftgate ? `<path class="glass" d="${rearGlass}"/>` : ""}
      <path class="paint seam" d="${trunk}"/>
    </g>
    ${g.liftgate ? "" : `<path class="glass" d="${rearGlass}"/>`}
    <g class="air" transform="translate(${C},${wsTop + 8})">
      <path d="M-22,0 q11,-9 22,0 t22,0"/><path d="M-22,9 q11,-9 22,0 t22,0"/><path d="M-22,18 q11,-9 22,0 t22,0"/>
    </g>
    <g class="lockicon" transform="translate(${C},${lockY})">
      <circle r="15"/>
      <path class="shackle" d="M-5,-2 v-4 a5,5 0 0 1 10,0 v4"/>
      <rect x="-7.5" y="-2" width="15" height="11" rx="2.5"/>
    </g>
    <g class="cable">
      <path class="cord" d="${cable}"/><path class="flow" d="${cable}"/>
      <rect class="plug" x="${px - (ps < 0 ? 9 : -1)}" y="${py - 5}" width="8" height="10" rx="2.5"/>
    </g>
    <circle class="portdot" cx="${px - ps * 3}" cy="${py}" r="2.6"/>
  </svg>`;
}

/* ------------------------------------------------- animated side photo */
// Outlines (in source-image pixels) of the moving parts on BYD's official
// side render ("picMainUrl", 1050x420, nose pointing left).
const SIDE_MODELS = {
  seal_u: {
    w: 1050, h: 420,
    door_f: { hinge: 375, poly: [[375,172],[393,160],[398,145],[425,143],[445,131],[480,108],[530,94],[570,91],[577,95],[577,313],[397,313],[387,290],[375,260]] },
    win_f: [[410,161],[445,134],[480,111],[530,98],[566,95],[566,164]],
    door_r: { hinge: 577, poly: [[577,95],[600,92],[700,95],[738,102],[762,148],[786,172],[768,222],[748,240],[725,262],[712,295],[708,313],[577,313]] },
    win_r: [[600,98],[700,99],[735,104],[757,150],[700,160],[600,164]],
    hood: { pivot: [366,168], angle: 26, poly: [[372,160],[300,168],[240,179],[180,192],[146,202],[168,208],[240,198],[300,189],[374,177]] },
    trunk: { pivot: [842,104], angle: -62, poly: [[835,98],[898,104],[902,112],[946,150],[963,200],[958,216],[938,214],[934,162],[874,126],[840,113]] },
    wheels: [[289,310,58],[790,310,58]],
    port: [835,195], headlight: [176,208], taillight: [906,184],
  },
};

function sideScene(url, M, interior = {}) {
  const X = (x) => (x / M.w * 100).toFixed(2) + "%", Y = (y) => (y / M.h * 100).toFixed(2) + "%";
  const poly = (pts) => `polygon(${pts.map(([x, y]) => `${X(x)} ${Y(y)}`).join(",")})`;
  const flat = (pts) => { const top = Math.min(...pts.map((q) => q[1])); return poly(pts.map(([x]) => [x, top])); };
  const bg = `background-image:url('${url}')`;
  const cabin = (k) => {
    const im = interior[k];
    if (!im || !im.url) return `<div class="hole" data-sp="${k}" style="clip-path:${poly(M[k].poly)}"></div>`;
    const xs = M[k].poly.map((q) => q[0]), ys = M[k].poly.map((q) => q[1]);
    const x0 = Math.min(...xs), y0 = Math.min(...ys), bw = Math.max(...xs) - x0, bh = Math.max(...ys) - y0;
    const local = M[k].poly.map(([x, y]) => `${((x - x0) / bw * 100).toFixed(2)}% ${((y - y0) / bh * 100).toFixed(2)}%`).join(",");
    return `<div class="hole photo" data-sp="${k}" style="inset:auto;left:${X(x0)};top:${Y(y0)};width:${X(bw)};height:${Y(bh)};clip-path:polygon(${local})">
      <div class="ly" style="background:url('${im.url}') ${im.position || "center"}/cover no-repeat;${im.flip ? "transform:scaleX(-1)" : ""}"></div></div>`;
  };
  const door = (k, w) => `
    ${cabin(k)}
    <div class="part door" data-sp="${k}" style="transform-origin:${X(M[k].hinge)} 50%">
      <div class="ly" style="${bg};clip-path:${poly(M[k].poly)}"></div>
      <div class="ly winopen" data-sp="${w}" style="--c:${flat(M[w])};--o:${poly(M[w])}"></div>
    </div>`;
  const lid = (k) => `
    <div class="hole" data-sp="${k}" style="clip-path:${poly(M[k].poly)}"></div>
    <div class="part lid" data-sp="${k}" style="transform-origin:${X(M[k].pivot[0])} ${Y(M[k].pivot[1])};--a:${M[k].angle}deg">
      <div class="ly" style="${bg};clip-path:${poly(M[k].poly)}"></div></div>`;
  const wheel = ([x, y, r]) => `<div class="ly wheel" style="${bg};clip-path:ellipse(${X(r)} ${Y(r)} at ${X(x)} ${Y(y)});transform-origin:${X(x)} ${Y(y)}"></div>`;
  const lamp = (k, c) => `<i class="lamp ${c}" style="left:${X(M[k][0])};top:${Y(M[k][1])}"></i>`;
  const [px, py] = M.port;
  const cable = `M${px},${py} c6,70 30,150 52,186 s60,24 ${M.w - px - 52},22`;
  return `<div class="scene" style="aspect-ratio:${M.w}/${M.h}">
    <div class="ly base" style="${bg}"></div>
    ${lid("hood")}${lid("trunk")}${door("door_r", "win_r")}${door("door_f", "win_f")}
    <svg class="ly olines" viewBox="0 0 ${M.w} ${M.h}" preserveAspectRatio="none">
      ${["door_f", "door_r"].map((k) => `<polygon data-sp="${k}" points="${M[k].poly.map((q) => q.join(",")).join(" ")}"/>`).join("")}</svg>
    ${M.wheels.map(wheel).join("")}
    ${lamp("headlight", "head")}${lamp("taillight", "tail")}
    <svg class="ly scable" viewBox="0 0 ${M.w} ${M.h}" preserveAspectRatio="none">
      <path class="cord" d="${cable}"/><path class="flow" d="${cable}"/>
      <circle class="pring" cx="${px}" cy="${py}" r="20"/><circle class="pdot" cx="${px}" cy="${py}" r="9"/>
    </svg>
  </div>`;
}

/* ----------------------------------------------------------------- style */
const CSS = `
:host{display:block;--acc:#22d3ee;--ok:#34e0a1;--warn:#ffb020;--bad:#ff5d6c;--fuel:#f6a440}
ha-card{position:relative;overflow:hidden;border:none;border-radius:var(--ha-card-border-radius,24px);color:var(--t1);
  background:var(--bg);font-family:var(--paper-font-body1_-_font-family,inherit);-webkit-tap-highlight-color:transparent}
.dark{--bg:radial-gradient(120% 60% at 50% 0%,#1b2740 0%,#0d1322 55%,#090d18 100%);--t1:#f2f5fa;--t2:#9aa6ba;--t3:#64708a;
  --panel:rgba(255,255,255,.055);--panel-b:rgba(255,255,255,.09);--track:rgba(255,255,255,.1);--int:#0a0d14;--shadow:rgba(0,0,0,.55)}
.light{--bg:radial-gradient(120% 60% at 50% 0%,#ffffff 0%,#eef2f8 60%,#e4e9f2 100%);--t1:#131a2a;--t2:#56627a;--t3:#8b95a8;
  --panel:rgba(16,28,60,.045);--panel-b:rgba(16,28,60,.09);--track:rgba(16,28,60,.1);--int:#1a2030;--shadow:rgba(20,30,60,.3);
  --acc:#0891b2;--ok:#0e9f6e;--warn:#c97a00;--bad:#d92d4a;--fuel:#c27815}
.wrap{padding:18px 16px 16px;display:flex;flex-direction:column;gap:14px}
.num{font-variant-numeric:tabular-nums;letter-spacing:-.02em}
[data-more]{cursor:pointer}
[data-slot]:empty{display:none}
/* header */
.head{display:flex;align-items:flex-start;justify-content:space-between;gap:10px}
.title{font-size:21px;font-weight:700;line-height:1.15;letter-spacing:-.01em}
.sub{font-size:12px;color:var(--t2);margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.head>div:first-child{min-width:0}
.title{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.status{display:inline-flex;align-items:center;gap:6px;padding:6px 11px;border-radius:999px;font-size:12.5px;font-weight:600;
  background:var(--panel);border:1px solid var(--panel-b);white-space:nowrap}
.status i{width:8px;height:8px;border-radius:50%;background:var(--sc,var(--t3));box-shadow:0 0 10px var(--sc,transparent)}
.status.charging{--sc:var(--ok)}.status.driving,.status.awake{--sc:var(--acc)}.status.plugged{--sc:var(--warn)}.status.offline{--sc:var(--bad)}
.status.charging i,.status.driving i{animation:pulse 1.4s ease-in-out infinite}
/* stage: animated side photo + stills */
.stage{position:relative;margin:22px -6px -8px;cursor:pointer}
.stage::before{content:"";position:absolute;left:8%;right:8%;bottom:4%;height:24%;border-radius:50%;background:radial-gradient(closest-side,var(--pg,var(--acc)),transparent);opacity:.3;filter:blur(6px);transition:background .5s}
.stage.charging{--pg:var(--ok)}.stage.charging::before{animation:glow 2.2s ease-in-out infinite}
.stage.alert{--pg:var(--warn)}
.stage .view{transition:opacity .25s,transform .25s;aspect-ratio:2.2;display:grid;align-items:center}
.stage.swap .view{opacity:0;transform:scale(.97)}
.scene{position:relative;width:100%;filter:drop-shadow(0 12px 12px rgba(0,0,0,.35))}
.stage[data-view="r"] .scene{transform:scaleX(-1)}
.stage:not([data-view="l"]):not([data-view="r"]) .scene{display:none}
.still{display:none;width:100%;height:100%;min-height:0;object-fit:contain;border-radius:16px;position:relative;filter:drop-shadow(0 14px 14px rgba(0,0,0,.35))}
.stage[data-view="p"] .still{display:block}
.ly{position:absolute;inset:0;background-size:100% 100%;background-repeat:no-repeat}
.part{position:absolute;inset:0;visibility:hidden;transition:transform 1.1s cubic-bezier(.3,1.25,.5,1),filter .6s,visibility 0s 1.2s}
.part.vis{visibility:visible;transition:transform 1.1s cubic-bezier(.3,1.25,.5,1),filter .6s,visibility 0s}
.part.door{transform:perspective(700px) rotateY(0deg)}
.part.door.open{transform:perspective(700px) rotateY(-79deg);filter:brightness(1.12) drop-shadow(-5px 3px 5px rgba(0,0,0,.55))}
.part.lid.open{transform:rotate(var(--a));filter:brightness(1.1)}
.hole{position:absolute;inset:0;background:linear-gradient(180deg,#141922 0%,#39435a 30%,#4b566e 52%,#2a3140 74%,#0d1118 100%);opacity:0;transition:opacity .35s}
.hole.open{opacity:1}
.hole.photo{background:#0d1118}.hole.photo::after{content:"";position:absolute;inset:0;box-shadow:inset 0 0 14px 4px rgba(0,0,0,.75)}
.winopen{background:linear-gradient(180deg,#93a7c2,#5f728d);clip-path:var(--c);transition:clip-path 1.3s cubic-bezier(.4,0,.2,1);opacity:.92}
.winopen.open{clip-path:var(--o)}
.wheel{display:none}.scene.driving .wheel{display:block;animation:spin .55s linear infinite}
.base{transition:filter .5s}.scene.anyopen .base{filter:brightness(.82)}
.olines polygon{fill:none;stroke:var(--warn);stroke-width:1.2;vector-effect:non-scaling-stroke;stroke-linejoin:round;opacity:0;transition:opacity .4s}
.olines polygon.open{opacity:.85;animation:warnpulse 1.6s ease-in-out infinite}
.lamp{position:absolute;width:15%;aspect-ratio:1;border-radius:50%;transform:translate(-50%,-50%);opacity:0;transition:opacity .4s;pointer-events:none}
.lamp.head{background:radial-gradient(closest-side,rgba(255,255,255,.95),rgba(190,225,255,.45) 35%,transparent)}
.lamp.tail{background:radial-gradient(closest-side,rgba(255,60,70,.95),rgba(255,40,50,.4) 35%,transparent);width:11%}
.scene.on .lamp{opacity:.75}
.scene.flash .lamp{animation:lamp .45s steps(1) 6}
.scable{opacity:0;transition:opacity .5s;overflow:visible}
.stage[data-view="r"] .scene.plugged .scable{opacity:1}
.scable .cord{stroke-width:11}.scable .flow{stroke-width:5;stroke-dasharray:12 26}
.scene.charging .scable .flow{opacity:1;animation:flow2 .9s linear infinite reverse}
.pdot{fill:var(--ok)}.pring{fill:none;stroke:var(--ok);stroke-width:3;opacity:0;transform-box:fill-box;transform-origin:center}
.scene.charging .pring{animation:ring 1.6s ease-out infinite}
.dots{display:flex;justify-content:center;gap:5px;margin-top:6px;position:relative}
.dots i{width:5px;height:5px;border-radius:50%;background:var(--t3);opacity:.5}.dots i.sel{background:var(--acc);opacity:1}.dots i.warn{background:var(--warn);opacity:1;box-shadow:0 0 6px var(--warn)}.dots i.warn.sel{outline:1.5px solid var(--acc);outline-offset:1.5px}
.sidelbl{position:absolute;top:-14px;left:0;right:0;text-align:center;font-size:10.5px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--t3)}
/* hero */
.hero{position:relative;display:grid;grid-template-columns:1fr minmax(0,47%) 1fr;align-items:stretch;margin:-6px 0 -4px}
.car{width:100%;height:auto;display:block;overflow:visible;--glow:var(--acc)}
.col{position:relative;display:flex;flex-direction:column;justify-content:center;min-width:0;z-index:1}
.col.r{align-items:flex-end;text-align:right}
.big{font-size:38px;font-weight:700;line-height:1}
.big small{font-size:17px;font-weight:600;color:var(--t2);margin-left:1px}
.lbl{font-size:10.5px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--t3);margin-bottom:5px;display:flex;align-items:center;gap:4px}
.col.r .lbl{justify-content:flex-end}
.lbl ha-icon{--mdc-icon-size:14px}
.hint{font-size:12.5px;color:var(--t2);margin-top:6px}
.vbar{height:5px;border-radius:3px;background:var(--track);margin-top:8px;width:78px;max-width:100%;overflow:hidden;position:relative}
.vbar b{position:absolute;inset:0 auto 0 0;border-radius:3px;background:var(--bc,var(--acc));transition:width .8s cubic-bezier(.2,.8,.2,1)}
.col.r .vbar b{inset:0 0 0 auto}
.vbar.chg b::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.75),transparent);animation:shimmer 1.6s linear infinite}
.tire{position:absolute;font-size:11.5px;font-weight:600;color:var(--t2);padding:3px 8px;border-radius:999px;background:var(--panel);border:1px solid var(--panel-b);white-space:nowrap}
.tire.low{color:var(--warn);border-color:var(--warn)}
.col.l .tire{right:2px}.col.r .tire{left:2px}
.tire.f{top:19%}.tire.b{bottom:13%}
/* car parts */
.paint{fill:url(#paint)}.bodyshell{stroke:rgba(0,0,0,.35);stroke-width:.8}
.seam{stroke:rgba(0,0,0,.38);stroke-width:.8;stroke-linejoin:round}
.roof{filter:brightness(1.06)}
.shadow{fill:var(--shadow);transform:translateY(7px)}
.glass{fill:url(#glassg);stroke:rgba(0,0,0,.5);stroke-width:.7}
.winframe{fill:none;stroke:transparent;stroke-width:1.2;stroke-dasharray:3 2.5}
.interior,.enginebay,.cargo,.opening{fill:var(--int)}
.seat{fill:#3a4152}
.wheel{fill:#101319}.handle{stroke:rgba(255,255,255,.55);stroke-width:1.4;stroke-linecap:round}
.rail{stroke:rgba(0,0,0,.45);stroke-width:2.2;stroke-linecap:round}
.crease{fill:none;stroke:rgba(0,0,0,.22);stroke-width:.9}
.headlight{fill:#eaf6ff;opacity:.75;transition:opacity .2s}
.beam{fill:#dff3ff;opacity:0;filter:url(#soft);pointer-events:none}
.taillight{fill:none;stroke:#ff2d3d;stroke-width:3.4;stroke-linecap:round;opacity:.8}
.door,.lid,.win,.sun{transition:transform .9s cubic-bezier(.3,1.3,.5,1),opacity .6s}
.door.open[data-part$="l"]{transform:rotate(34deg)}.door.open[data-part$="r"]{transform:rotate(-34deg)}
.door.open .seam,.lid.open .seam{stroke:var(--warn);stroke-width:1.6;animation:warnpulse 1.6s ease-in-out infinite}
.lid.open[data-part="hood"]{transform:scaleY(.52)}.lid.open[data-part="trunk"]{transform:scaleY(.5)}
.win.open{transform:scaleX(.12);opacity:.5}
.win.open+.winframe{stroke:var(--acc);animation:warnpulse 1.6s ease-in-out infinite}
.sun.open{transform:scaleY(.25)}
.lid.open{filter:brightness(1.25)}
.opening{opacity:.0}.car.sunopen .opening{opacity:1;stroke:var(--acc);stroke-width:1.2;stroke-dasharray:3 2.5}
.lockicon circle{fill:rgba(0,0,0,.28)}
.lockicon rect{fill:var(--lc,#fff)}.lockicon .shackle{fill:none;stroke:var(--lc,#fff);stroke-width:2.4;stroke-linecap:round;transition:transform .45s cubic-bezier(.3,1.5,.5,1);transform-origin:5px -2px}
.car.unlocked .lockicon{--lc:var(--warn)}.car.unlocked .shackle{transform:rotate(38deg) translateY(-1.5px)}
.car.nolock .lockicon{display:none}
.air{opacity:0;transition:opacity .5s}.air path{fill:none;stroke:var(--airc,#7dd3fc);stroke-width:2;stroke-linecap:round}
.car.climate .air{opacity:1}.car.climate .air path{animation:air 1.8s ease-in-out infinite}
.car.climate .air path:nth-child(2){animation-delay:.25s}.car.climate .air path:nth-child(3){animation-delay:.5s}
.car.heat{--airc:#ffb37a}
.cable{opacity:0;transition:opacity .5s}.car.plugged .cable{opacity:1}
.cord{fill:none;stroke:#2a3242;stroke-width:5;stroke-linecap:round}.light .cord{stroke:#5b6781}
.flow{fill:none;stroke:var(--ok);stroke-width:2.2;stroke-linecap:round;stroke-dasharray:5 11;opacity:0}
.car.charging .flow{opacity:1;animation:flow .9s linear infinite reverse}
.plug{fill:#3b4558}.car.charging .plug{fill:var(--ok)}
.portdot{fill:var(--t3);opacity:.0}.car.hasport:not(.plugged) .portdot{opacity:.7}
.car.charging{--glow:var(--ok)}.car.alert{--glow:var(--warn)}
.glow{opacity:.5;transition:opacity .6s}.car.charging .glow,.car.alert .glow{animation:glow 2.2s ease-in-out infinite}
.road{opacity:0;transition:opacity .5s}.road line{stroke:var(--t3);stroke-width:2;stroke-dasharray:26 30;stroke-linecap:round}
.car.driving .road{opacity:.6}.car.driving .road line{animation:road .5s linear infinite}
.car.driving .headlight,.car.on .headlight{opacity:1}.car.driving .beam{opacity:.22}
.car.flash .headlight{animation:blink .45s steps(1) 6}.car.flash .beam{animation:blinkbeam .45s steps(1) 6}
.car.flash .taillight{animation:blink .45s steps(1) 6}
/* strips & chips */
.strip{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.cell{background:var(--panel);border:1px solid var(--panel-b);border-radius:16px;padding:10px 6px 9px;text-align:center;min-width:0}
.cell ha-icon{--mdc-icon-size:18px;color:var(--t3)}
.cell .v{font-size:15px;font-weight:650;margin-top:3px;white-space:nowrap}
.cell .k{font-size:10.5px;color:var(--t3);margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.chips{display:flex;flex-wrap:wrap;gap:6px;justify-content:center}
.chip{display:inline-flex;align-items:center;gap:5px;font-size:12px;font-weight:600;padding:5px 10px;border-radius:999px;background:var(--panel);border:1px solid var(--panel-b);color:var(--t2)}
.chip ha-icon{--mdc-icon-size:15px}
.chip.ok{color:var(--ok)}.chip.warn{color:var(--warn);border-color:color-mix(in srgb,var(--warn) 45%,transparent)}
.chip.bad{color:var(--bad);border-color:color-mix(in srgb,var(--bad) 45%,transparent)}.chip.acc{color:var(--acc)}
/* actions */
.acts{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;margin:0 -16px;padding:2px 16px;justify-content:safe center}
.acts::-webkit-scrollbar{display:none}
.act{flex:0 0 auto;width:62px;display:flex;flex-direction:column;align-items:center;gap:6px;background:none;border:0;color:var(--t2);font:inherit;font-size:10.5px;font-weight:600;padding:0;cursor:pointer;touch-action:pan-x pan-y;user-select:none;-webkit-user-select:none}
.act span.t{line-height:1.15;text-align:center;max-width:62px}
.ring{position:relative;width:52px;height:52px;border-radius:50%;display:grid;place-items:center;background:var(--panel);border:1px solid var(--panel-b);color:var(--t1);transition:transform .15s,background .3s}
.ring ha-icon{--mdc-icon-size:23px}
.act.on .ring{background:color-mix(in srgb,var(--acc) 22%,transparent);border-color:var(--acc);color:var(--acc)}
.act.warn .ring{background:color-mix(in srgb,var(--warn) 18%,transparent);border-color:var(--warn);color:var(--warn)}
.act.busy .ring{animation:pulse 1s ease-in-out infinite}
.ring>svg{position:absolute;inset:-3px;width:58px;height:58px;transform:rotate(-90deg);pointer-events:none}
.ring>svg circle{fill:none;stroke:var(--acc);stroke-width:3;stroke-linecap:round;stroke-dasharray:170;stroke-dashoffset:170}
.act.holding .ring{transform:scale(.93)}
.act.holding .ring>svg circle{transition:stroke-dashoffset var(--hold,900ms) linear;stroke-dashoffset:0}
/* panels */
.panel{background:var(--panel);border:1px solid var(--panel-b);border-radius:20px;padding:14px}
.ph{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:11px}
.ph h3{white-space:nowrap;margin:0;font-size:13px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--t2);display:flex;align-items:center;gap:7px}
.ph h3 ha-icon{--mdc-icon-size:17px;color:var(--acc)}
.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px 12px}
.grid.c3{grid-template-columns:repeat(3,1fr)}
.kv .k{font-size:11px;color:var(--t3);font-weight:600}
.kv .v{font-size:18px;font-weight:700;margin-top:1px}
.kv .v small{font-size:12px;font-weight:600;color:var(--t2);margin-left:2px}
.kv .v.s{font-size:15px}
.badge{font-size:10.5px;font-weight:700;padding:2px 7px;border-radius:999px;margin-left:5px;vertical-align:2px;text-transform:uppercase;letter-spacing:.04em}
.badge.cheap{background:color-mix(in srgb,var(--ok) 20%,transparent);color:var(--ok)}
.badge.normal{background:var(--track);color:var(--t2)}
.badge.expensive{background:color-mix(in srgb,var(--bad) 20%,transparent);color:var(--bad)}
.soc{position:relative;height:30px;border-radius:10px;background:var(--track);overflow:hidden;margin-bottom:12px}
.soc b{position:absolute;inset:0 auto 0 0;border-radius:10px;background:linear-gradient(90deg,color-mix(in srgb,var(--bc) 70%,#000),var(--bc));transition:width 1s cubic-bezier(.2,.8,.2,1)}
.soc.chg b::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,transparent 0,rgba(255,255,255,.45) 50%,transparent 100%);background-size:60% 100%;background-repeat:no-repeat;animation:sweep 1.8s linear infinite}
.soc span{position:absolute;inset:0;display:flex;align-items:center;justify-content:space-between;padding:0 11px;font-size:13px;font-weight:700;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.5)}
.light .soc span{color:var(--t1);text-shadow:none}
.tabs{display:flex;background:var(--track);border-radius:999px;padding:2px}
.tabs button{white-space:nowrap;border:0;background:none;color:var(--t2);font:inherit;font-size:12px;font-weight:600;padding:5px 11px;border-radius:999px;cursor:pointer}
.tabs button.sel{background:var(--acc);color:#04121a}
.chart{display:flex;align-items:flex-end;gap:3px;height:74px;margin-top:14px}
.bar{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;gap:4px;cursor:pointer;min-width:0}
.bar i{display:block;width:100%;max-width:26px;min-height:2px;border-radius:4px 4px 2px 2px;background:color-mix(in srgb,var(--acc) 45%,transparent);transition:height .7s cubic-bezier(.2,.8,.2,1)}
.bar.sel i,.bar:hover i{background:var(--acc)}
.bar u{font-size:9.5px;color:var(--t3);text-decoration:none;white-space:nowrap}
.cap{font-size:11.5px;color:var(--t2);margin-top:9px;text-align:center;min-height:15px}
.rows{display:flex;flex-direction:column}
.row{display:flex;align-items:center;gap:10px;padding:8px 0;border-top:1px solid var(--panel-b);font-size:14px}
.row:first-child{border-top:0;padding-top:0}.row:last-child{padding-bottom:0}
.row ha-icon{--mdc-icon-size:19px;color:var(--t3);flex:none}
.row .n{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--t2)}
.row .s{font-weight:650;white-space:nowrap}
.map{border-radius:16px;overflow:hidden;height:190px;isolation:isolate}
.map>*{height:100%}
.toast{position:absolute;left:50%;bottom:18px;transform:translate(-50%,30px);opacity:0;background:rgba(10,14,24,.92);color:#fff;font-size:13px;font-weight:600;padding:9px 16px;border-radius:999px;transition:all .3s;pointer-events:none;z-index:5;white-space:nowrap;border:1px solid rgba(255,255,255,.12)}
.toast.show{transform:translate(-50%,0);opacity:1}
.empty{padding:28px 18px;text-align:center;color:var(--t2);font-size:14px}
@keyframes pulse{50%{opacity:.35}}
@keyframes spin{to{transform:rotate(-360deg)}}
@keyframes lamp{0%{opacity:1}50%{opacity:0}}
@keyframes flow2{to{stroke-dashoffset:-38}}
@keyframes ring{0%{opacity:.9;transform:scale(.6)}100%{opacity:0;transform:scale(2.4)}}
@keyframes warnpulse{50%{stroke-opacity:.35}}
@keyframes glow{0%,100%{opacity:.35}50%{opacity:.85}}
@keyframes flow{to{stroke-dashoffset:-16}}
@keyframes road{to{stroke-dashoffset:-56}}
@keyframes air{0%,100%{opacity:.15;transform:translateY(0)}50%{opacity:.9;transform:translateY(3px)}}
@keyframes blink{50%{opacity:.15}}
@keyframes blinkbeam{0%{opacity:.5}50%{opacity:0}}
@keyframes shimmer{from{transform:translateX(-100%)}to{transform:translateX(100%)}}
@keyframes sweep{from{background-position:-80% 0}to{background-position:220% 0}}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
`;

/* --------------------------------------------------------------- helpers */
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const num = (v) => { const n = parseFloat(v); return Number.isFinite(n) ? n : null; };
const dayKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const DEFAULT_ACTIONS = ["lock", "climate", "flash_lights", "find_car", "close_windows", "trunk", "force_poll"];
const WARNINGS = {
  tirepressure_system: "w_tire", rapid_tire_leak: "w_leak", abs_warning: "w_abs", srs: "w_srs", ect: "w_ect", svs: "w_svs", esp: "w_esp",
  eps: "w_eps", power_system: "w_power_system", pwr: "w_pwr", braking_system: "w_brake", oil_pressure_system: "w_oil",
  steering_system: "w_steer", charging_system: "w_chargesys",
};

// Demo mode: cycles through states without touching the car (config `demo: true`).
const DEMO_STEPS = [
  {}, { locked: false }, { locked: false, open: ["door_fl"] }, { locked: false, open: ["door_fl", "door_rl"] },
  { locked: false, open: ["door_fl", "door_rl", "win_fl", "win_rl"] }, { locked: false, open: ["trunk"] }, { locked: false, open: ["trunk", "hood"] },
  { locked: false, open: ["door_fr", "win_rr", "sunroof"] }, {}, { plugged: true }, { plugged: true, charging: true, soc: 42 },
  { plugged: true, charging: true, soc: 58 }, { plugged: true, charging: true, soc: 74, climate: true }, { climate: true }, { driving: true }, { driving: true },
];

class BydVehicleCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._cache = {};
    this._tab = "today";
    this._stats = null;
  }

  static getStubConfig() { return { body_style: "suv", car_color: "grey" }; }

  static getConfigForm() {
    const ent = (domain) => ({ entity: domain ? { domain } : {} });
    return {
      schema: [
        { name: "device", selector: { device: { integration: "byd_vehicle" } } },
        { name: "name", selector: { text: {} } },
        { type: "grid", name: "", schema: [
          { name: "body_style", selector: { select: { mode: "dropdown", options: Object.keys(BODY_STYLES) } } },
          { name: "car_color", selector: { select: { mode: "dropdown", custom_value: true, options: Object.keys(PAINTS) } } },
          { name: "charge_port", selector: { select: { mode: "dropdown", options: ["rear_right", "rear_left", "front_right", "front_left"] } } },
          { name: "appearance", selector: { select: { mode: "dropdown", options: ["dark", "light", "auto"] } } },
          { name: "battery_capacity", selector: { number: { min: 0, max: 150, step: 0.1, mode: "box", unit_of_measurement: "kWh" } } },
          { name: "charging_loss", selector: { number: { min: 0, max: 40, step: 1, mode: "box", unit_of_measurement: "%" } } },
          { name: "price_fixed", selector: { number: { min: 0, step: 0.001, mode: "box" } } },
          { name: "price_entity", selector: ent("sensor") },
          { name: "fuel_tank", selector: { number: { min: 0, max: 150, step: 1, mode: "box", unit_of_measurement: "L" } } },
          { name: "fuel_price", selector: { number: { min: 0, step: 0.01, mode: "box" } } },
          { name: "fuel_price_entity", selector: ent() },
          { name: "currency", selector: { text: {} } },
        ] },
        { name: "side_photo", selector: { text: {} } },
        { name: "side_model", selector: { select: { mode: "dropdown", options: Object.keys(SIDE_MODELS) } } },
        { name: "interior_front", selector: { text: {} } },
        { name: "interior_rear", selector: { text: {} } },
        { name: "photo", selector: { text: {} } },
        { name: "show_map", selector: { boolean: {} } },
        { name: "extra_entities", selector: { entity: { multiple: true } } },
      ],
      computeLabel: (s) => ({
        device: "BYD vehicle (empty = first found)", name: "Name", body_style: "Body style", car_color: "Paint (name or #hex)",
        charge_port: "Charge port", appearance: "Appearance", battery_capacity: "Battery capacity", charging_loss: "Charging losses",
        price_fixed: "Fixed price per kWh", price_entity: "Dynamic price entity (per kWh)", fuel_tank: "Fuel tank", fuel_price: "Fuel price per litre",
        fuel_price_entity: "Fuel price entity", currency: "Currency", show_map: "Show map", photo: "Extra still photo URL (optional)", interior_front: "Interior photo behind front doors (optional)", interior_rear: "Interior photo behind rear doors (optional)", side_photo: "Side render URL (BYD picMainUrl) – animated", side_model: "Model outline for the side render", extra_entities: "Extra entities",
      }[s.name] || s.name),
    };
  }

  setConfig(config) {
    this._config = {
      body_style: "suv", car_color: "grey", charge_port: "rear_right", appearance: "dark", charging_loss: 10,
      show_map: true, hold_time: 900, pressure_unit: "bar", tire_low: 2.0, ignore_warnings: ["pwr"], ...config,
    };
    this._built = false;
    this._cache = {};
    clearInterval(this._demoT); this._demoT = null; this._demoStep = 0;
    if (this.isConnected) this.connectedCallback();
    if (this._hass) this._render();
  }

  set hass(hass) {
    const first = !this._hass;
    this._hass = hass;
    if (!this._config) return;
    if (first || !this._built) { this._discover(); this._render(); this._loadStats(); return; }
    const sig = this._signature();
    if (sig !== this._sig) { this._sig = sig; this._update(); this._scheduleStats(); }
    if (this._mapEl) this._mapEl.hass = hass;
  }

  getCardSize() { return 14; }
  getGridOptions() { return { columns: 12, min_columns: 6 }; }

  disconnectedCallback() { clearInterval(this._timer); this._timer = null; clearInterval(this._demoT); this._demoT = null; }
  connectedCallback() {
    if (!this._timer) this._timer = setInterval(() => { this._loadStats(); this._update(); }, 300000);
    if (this._config?.demo && !this._demoT) this._demoT = setInterval(() => { this._demoStep = (this._demoStep || 0) + 1; this._update(); }, this._config.demo_interval || 2600);
  }

  /* ------------------------------------------------------- discovery */
  _discover() {
    const h = this._hass, map = {};
    let dev = this._config.device;
    const ents = Object.values(h.entities || {}).filter((e) => e.platform === "byd_vehicle");
    if (!dev && ents.length) dev = ents.find((e) => e.device_id)?.device_id;
    for (const e of ents) {
      if (e.device_id !== dev || !e.translation_key) continue;
      if (!map[e.translation_key] || h.states[e.entity_id]) map[e.translation_key] = e.entity_id;
    }
    Object.assign(map, this._config.entities || {});
    this._e = map;
    this._device = dev;
    const d = h.devices?.[dev];
    this._name = this._config.name || d?.name_by_user || d?.name || "BYD";
    const lang = (h.locale?.language || h.language || "en").split("-")[0];
    this._t = { ...I18N.en, ...(I18N[lang] || {}), ...(this._config.labels || {}) };
    this._lang = h.locale?.language || h.language || "en";
  }

  _signature() {
    const s = this._hass.states, ids = [...Object.values(this._e), ...this._watch()];
    let out = "";
    for (const id of ids) { const st = s[id]; out += st ? st.state + (st.attributes.temperature ?? "") + "|" : "-|"; }
    return out;
  }

  _watch() {
    const c = this._config;
    return [c.price_entity, c.fuel_price_entity, c.power_entity, ...Object.values(c.stats || {}),
      ...(c.extra_entities || []).map((x) => (typeof x === "string" ? x : x.entity))].filter(Boolean);
  }

  /* ---------------------------------------------------- state access */
  _st(key) { const id = this._e[key]; return id ? this._hass.states[id] : undefined; }
  _raw(key) { const st = this._st(key); return st && !["unknown", "unavailable", ""].includes(st.state) ? st.state : null; }
  _n(key) { return num(this._raw(key)); }
  _on(key) { return this._raw(key) === "on"; }
  _has(key) { return this._raw(key) !== null; }
  _unit(key, d = "") { return this._st(key)?.attributes.unit_of_measurement || d; }
  _ext(id) { const st = id && this._hass.states[id]; return st && !["unknown", "unavailable"].includes(st.state) ? st : null; }

  _fmt(v, d = 0) {
    if (v === null || v === undefined || !Number.isFinite(+v)) return "–";
    return new Intl.NumberFormat(this._lang, { minimumFractionDigits: d, maximumFractionDigits: d }).format(+v);
  }
  _money(v, d = 2) { return v === null || !Number.isFinite(v) ? "–" : `${this._fmt(v, d)} ${this._currency()}`; }
  _currency() {
    if (this._config.currency) return this._config.currency;
    const u = this._ext(this._config.price_entity)?.attributes.unit_of_measurement;
    return u ? u.split("/")[0].trim() : "€";
  }
  _price() {
    const p = this._ext(this._config.price_entity);
    if (p && num(p.state) !== null) return num(p.state);
    return num(this._config.price_fixed);
  }
  _fuelPrice() {
    const p = this._ext(this._config.fuel_price_entity);
    if (p && num(p.state)) return num(p.state);
    return num(this._config.fuel_price);
  }
  _ago(iso) {
    const t = Date.parse(iso); if (!t) return "";
    const m = Math.round((t - Date.now()) / 60000);
    const rtf = new Intl.RelativeTimeFormat(this._lang, { numeric: "auto", style: "short" });
    if (Math.abs(m) < 60) return rtf.format(m, "minute");
    if (Math.abs(m) < 1440) return rtf.format(Math.round(m / 60), "hour");
    return rtf.format(Math.round(m / 1440), "day");
  }

  _model() {
    const t = this._t;
    const lockSt = this._raw("lock");
    const locked = lockSt ? lockSt === "locked" || lockSt === "locking" : this._has("is_locked") ? !this._on("is_locked") : null;
    const parts = {
      door_fl: this._on("left_front_door"), door_fr: this._on("right_front_door"),
      door_rl: this._on("left_rear_door") || this._on("sliding_door"), door_rr: this._on("right_rear_door"),
      win_fl: this._on("left_front_window"), win_fr: this._on("right_front_window"),
      win_rl: this._on("left_rear_window"), win_rr: this._on("right_rear_window"),
      trunk: this._on("trunk_lid"), hood: this._on("forehold"), sunroof: this._on("skylight"),
    };
    const open = Object.keys(parts).filter((k) => parts[k]);
    const charging = this._on("is_charging");
    const plugged = charging || this._on("is_charger_connected");
    const speed = this._n("speed") || 0;
    const on = this._on("vehicle_state");
    const offline = this._has("is_online") && !this._on("is_online");
    const status = charging ? "charging" : on && speed > 0 ? "driving" : offline ? "offline" : on ? "awake" : plugged ? "plugged" : "parked";
    const cl = this._st("climate");
    const climateOn = cl ? !["off", "unavailable", "unknown"].includes(cl.state) : this._on("car_on");
    let power = null;
    const pe = this._ext(this._config.power_entity);
    if (pe) power = Math.abs(num(pe.state) || 0) / (pe.attributes.unit_of_measurement === "W" ? 1000 : 1);
    else if (this._n("battery_power") !== null) power = Math.abs(this._n("battery_power"));
    const model = { t, locked, parts, open, charging, plugged, speed, on, offline, status, cl, climateOn, power,
      soc: this._n("elec_percent"), fuel: this._n("oil_percent") };
    if (this._config.demo) {
      const d = DEMO_STEPS[(this._demoStep || 0) % DEMO_STEPS.length];
      for (const k in parts) parts[k] = (d.open || []).includes(k);
      Object.assign(model, { locked: d.locked !== false, open: d.open || [], charging: !!d.charging, plugged: !!d.plugged, climateOn: !!d.climate,
        on: !!d.driving, speed: d.driving ? 87 : 0, power: d.charging ? 6.8 : 0, soc: d.soc ?? model.soc ?? 64, offline: false,
        status: d.charging ? "charging" : d.driving ? "driving" : d.plugged ? "plugged" : "parked" });
    }
    return model;
  }

  /* ----------------------------------------------------------- render */
  _render() {
    const c = this._config, root = this.shadowRoot;
    if (!this._e) this._discover();
    const dark = c.appearance === "auto" ? this._hass.themes?.darkMode !== false : c.appearance !== "light";
    const paint = PAINTS[c.car_color] || c.car_color || PAINTS.grey;
    if (!Object.keys(this._e).length) {
      root.innerHTML = `<style>${CSS}</style><ha-card class="${dark ? "dark" : "light"}"><div class="empty">${esc(this._t.no_device)}</div></ha-card>`;
      return;
    }
    const car = c.image
      ? `<img class="car" src="${esc(c.image)}" alt="">`
      : carSvg(c.body_style, { port: c.charge_port });
    const stills = [].concat(c.photos || c.photo || []).filter(Boolean);
    const M = c.side_photo ? (typeof c.side_model === "object" ? c.side_model : SIDE_MODELS[c.side_model || "seal_u"]) : null;
    this._views = [...(M ? ["l", "r"] : []), ...stills.map((_, i) => "p" + i)];
    this._stills = stills;
    this._view = this._views[0];
    const photo = this._views.length ? `<div class="stage" data-photo="1" data-view="${this._view[0]}">
      <div class="sidelbl"></div>
      <div class="view">${M ? sideScene(esc(c.side_photo), M, { door_f: this._interior(c.interior_front), door_r: this._interior(c.interior_rear) }) : ""}<img class="still" src="${esc(stills[0] || "")}" alt=""></div>
      ${this._views.length > 1 ? `<div class="dots">${this._views.map((_, i) => `<i class="${i ? "" : "sel"}"></i>`).join("")}</div>` : ""}</div>` : "";
    root.innerHTML = `<style>${CSS}</style>
    <ha-card class="${dark ? "dark" : "light"}" style="--paint:${esc(paint)};--paint-l:color-mix(in srgb,${esc(paint)} 78%,#fff);--paint-d:color-mix(in srgb,${esc(paint)} 62%,#000)">
      <div class="wrap">
        <div class="head" data-slot="head"></div>
        ${photo}
        <div class="hero"><div class="col l" data-slot="left"></div>${car}<div class="col r" data-slot="right"></div></div>
        <div class="chips" data-slot="chips"></div>
        <div class="acts" data-slot="acts"></div>
        <div class="strip" data-slot="strip"></div>
        <div data-slot="charge"></div>
        <div data-slot="stats"></div>
        <div data-slot="costs"></div>
        <div data-slot="warn"></div>
        <div data-slot="extra"></div>
        <div data-slot="map"></div>
      </div>
      <div class="toast"></div>
    </ha-card>`;
    this._built = true;
    this._cache = {};
    this._mapEl = null;
    this._bind();
    this._sig = this._signature();
    this._update();
    if (c.show_map && this._e.location) this._buildMap();
  }

  _interior(v) {
    if (!v) return null;
    const o = typeof v === "string" ? { url: v } : v;
    return { ...o, url: esc(o.url) };
  }

  _slot(name, html) {
    if (this._cache[name] === html) return;
    this._cache[name] = html;
    const el = this.shadowRoot.querySelector(`[data-slot="${name}"]`);
    if (el) el.innerHTML = html;
  }

  _update() {
    if (!this._built || !this._hass) return;
    const m = this._model(), t = m.t, e = this._e, c = this._config;
    const svg = this.shadowRoot.querySelector("svg.car");
    if (svg) {
      svg.querySelectorAll("[data-part]").forEach((el) => el.classList.toggle("open", !!m.parts[el.dataset.part]));
      const heat = m.cl && num(m.cl.attributes.temperature) !== null && num(m.cl.attributes.current_temperature) !== null
        && m.cl.attributes.temperature > m.cl.attributes.current_temperature;
      const cls = { unlocked: m.locked === false, nolock: m.locked === null, climate: m.climateOn, heat, plugged: m.plugged, charging: m.charging,
        driving: m.status === "driving", on: m.on, alert: m.open.length > 0 && !m.charging, sunopen: m.parts.sunroof, hasport: this._has("is_charger_connected") };
      for (const k in cls) svg.classList.toggle(k, !!cls[k]);
    }
    const stage = this.shadowRoot.querySelector(".stage");
    if (stage) {
      stage.classList.toggle("charging", m.charging);
      stage.classList.toggle("alert", m.open.length > 0 && !m.charging);
      const sc = stage.querySelector(".scene");
      if (sc) {
        const key = m.open.join() + m.plugged;
        if (key !== this._openKey) { // follow the action: show the side where something just changed
          this._openKey = key;
          const left = m.open.some((k) => k.endsWith("l")), right = m.open.some((k) => k.endsWith("r"));
          const want = left ? "l" : right || m.plugged ? "r" : null;
          if (want && this._view[0] !== "p" && want !== this._view) this._setView(want, true);
          else if (want && this._view[0] === "p" && (left || right)) this._setView(want, true);
        }
        this._paintScene(m);
      }
    }
    /* header */
    const upd = this._raw("last_updated");
    this._slot("head", `
      <div><div class="title">${esc(this._name)}</div>
        <div class="sub" ${e.last_updated ? `data-more="${e.last_updated}"` : ""}>${m.locked === null ? "" : `${m.locked ? t.locked : t.unlocked} · `}${upd ? `${t.updated} ${esc(this._ago(upd))}` : ""}</div></div>
      <div class="status ${m.status}"><i></i>${t[m.status]}${m.status === "driving" ? ` · ${this._fmt(m.speed)} km/h` : m.charging && m.power ? ` · ${this._fmt(m.power, 1)} kW` : ""}</div>`);

    /* hero columns */
    const tire = (key, pos) => {
      let v = this._n(key); if (v === null) return "";
      const u = this._unit(key, "kPa");
      let bar = u === "kPa" ? v / 100 : u === "psi" ? v / 14.504 : v;
      const low = bar < c.tire_low;
      const txt = c.pressure_unit === "kPa" ? `${this._fmt(bar * 100)} kPa` : c.pressure_unit === "psi" ? `${this._fmt(bar * 14.504)} psi` : `${this._fmt(bar, 1)} bar`;
      return `<div class="tire ${pos} ${low ? "low" : ""}" data-more="${e[key]}">${txt}</div>`;
    };
    const evr = this._n("ev_endurance");
    const rangeAll = this._n("endurance_mileage") ?? this._n("endurance_mileage_v2");
    const fuelRange = this._n("oil_endurance");
    const isPhev = m.fuel !== null;
    const socColor = m.charging ? "var(--ok)" : m.soc !== null && m.soc < 15 ? "var(--bad)" : "var(--acc)";
    this._slot("left", `${tire("left_front_tire_pressure", "f")}
      <div data-more="${e.elec_percent || ""}">
        <div class="lbl"><ha-icon icon="${m.charging ? "mdi:battery-charging" : "mdi:battery"}"></ha-icon>${t.battery}</div>
        <div class="big num">${this._fmt(m.soc)}<small>%</small></div>
        <div class="vbar ${m.charging ? "chg" : ""}" style="--bc:${socColor}"><b style="width:${m.soc ?? 0}%"></b></div>
        <div class="hint num">${evr !== null ? `${this._fmt(evr)} km ${t.ev_range}` : !isPhev && rangeAll !== null ? `${this._fmt(rangeAll)} km` : c.battery_capacity && m.soc !== null ? `${this._fmt(c.battery_capacity * m.soc / 100, 1)} kWh` : "&nbsp;"}</div>
      </div>${tire("left_rear_tire_pressure", "b")}`);
    this._slot("right", `${tire("right_front_tire_pressure", "f")}
      ${isPhev ? `<div data-more="${e.oil_percent}">
        <div class="lbl">${t.fuel}<ha-icon icon="mdi:gas-station"></ha-icon></div>
        <div class="big num">${this._fmt(m.fuel)}<small>%</small></div>
        <div class="vbar" style="--bc:var(--fuel);margin-left:auto"><b style="width:${m.fuel}%"></b></div>
        <div class="hint num">${fuelRange !== null ? `${this._fmt(fuelRange)} km` : "&nbsp;"}</div>
      </div>` : `<div data-more="${e.total_mileage || ""}">
        <div class="lbl">${t.odometer}<ha-icon icon="mdi:counter"></ha-icon></div>
        <div class="big num" style="font-size:26px">${this._fmt(this._n("total_mileage"))}<small>km</small></div>
      </div>`}${tire("right_rear_tire_pressure", "b")}`);

    /* chips */
    const chips = [];
    if (m.open.length) for (const k of m.open) chips.push(`<span class="chip warn"><ha-icon icon="${k.startsWith("win") ? "mdi:window-open-variant" : k === "sunroof" ? "mdi:car-select" : k === "trunk" ? "mdi:car-back" : k === "hood" ? "mdi:car-outline" : "mdi:car-door"}"></ha-icon>${t[k] || k}</span>`);
    else if (m.locked !== false) chips.push(`<span class="chip ok"><ha-icon icon="mdi:shield-check"></ha-icon>${t.all_closed}</span>`);
    if (m.locked === false) chips.push(`<span class="chip warn" data-more="${e.lock || e.is_locked}"><ha-icon icon="mdi:lock-open-variant"></ha-icon>${t.unlocked}</span>`);
    if (m.climateOn) chips.push(`<span class="chip acc" data-more="${e.climate || ""}"><ha-icon icon="mdi:fan"></ha-icon>${t.climate_on}${m.cl?.attributes.temperature ? ` · ${m.cl.attributes.temperature}°` : ""}</span>`);
    if (this._on("sentry_status")) chips.push(`<span class="chip" data-more="${e.sentry_status}"><ha-icon icon="mdi:cctv"></ha-icon>${t.sentry}</span>`);
    for (const [k, ic] of [["driver_seat_heat", "mdi:car-seat-heater"], ["passenger_seat_heat", "mdi:car-seat-heater"], ["driver_seat_ventilation", "mdi:car-seat-cooler"], ["passenger_seat_ventilation", "mdi:car-seat-cooler"]]) {
      const v = this._raw(k); if (v && v !== "off") chips.push(`<span class="chip acc" data-more="${e[k]}"><ha-icon icon="${ic}"></ha-icon>${k.startsWith("driver") ? t.seat_driver : t.seat_pass}</span>`);
    }
    if (this._on("steering_wheel_heat")) chips.push(`<span class="chip acc" data-more="${e.steering_wheel_heat}"><ha-icon icon="mdi:steering"></ha-icon>${t.steering}</span>`);
    this._slot("chips", chips.join(""));

    /* actions */
    const defs = {
      lock: e.lock && { icon: m.locked ? "mdi:lock" : "mdi:lock-open-variant", label: m.locked ? t.act_unlock : t.act_lock, cls: m.locked ? "" : "warn", more: e.lock },
      climate: e.climate && { icon: "mdi:fan", label: t.act_climate, cls: m.climateOn ? "on" : "", more: e.climate },
      flash_lights: e.flash_lights && { icon: "mdi:car-light-high", label: t.act_flash },
      find_car: e.find_car && { icon: "mdi:bullhorn-outline", label: t.act_find },
      close_windows: e.close_windows && { icon: "mdi:window-closed-variant", label: t.act_close_windows },
      open_windows: e.open_windows && { icon: "mdi:window-open-variant", label: t.act_open_windows },
      trunk: (e.open_trunk || e.close_trunk) && { icon: "mdi:car-back", label: m.parts.trunk ? t.act_close_trunk : t.act_open_trunk, cls: m.parts.trunk ? "warn" : "" },
      start_charging: e.start_charging && { icon: "mdi:ev-station", label: t.act_start_charging },
      force_poll: e.force_poll && { icon: "mdi:refresh", label: t.act_refresh },
    };
    this._slot("acts", (c.actions || DEFAULT_ACTIONS).filter((a) => defs[a]).map((a) => `
      <button class="act ${defs[a].cls || ""}" data-act="${a}" ${defs[a].more ? `data-actmore="${defs[a].more}"` : ""}>
        <span class="ring"><ha-icon icon="${defs[a].icon}"></ha-icon><svg viewBox="0 0 58 58"><circle cx="29" cy="29" r="27"/></svg></span>
        <span class="t">${defs[a].label}</span></button>`).join(""));

    /* info strip */
    const cells = [];
    const cell = (key, icon, val, label) => val !== null && cells.push(`<div class="cell" data-more="${e[key] || ""}"><ha-icon icon="${icon}"></ha-icon><div class="v num">${val}</div><div class="k">${label}</div></div>`);
    cell("endurance_mileage", "mdi:map-marker-distance", rangeAll !== null ? `${this._fmt(rangeAll)} km` : null, t.range);
    cell("total_mileage", "mdi:counter", this._n("total_mileage") !== null ? `${this._fmt(this._n("total_mileage"))} km` : null, t.odometer);
    cell("temp_in_car", "mdi:car-seat", this._n("temp_in_car") !== null ? `${this._fmt(this._n("temp_in_car"))}°` : null, t.inside);
    cell("temp_out_car", "mdi:thermometer", this._n("temp_out_car") !== null ? `${this._fmt(this._n("temp_out_car"))}°` : null, t.outside);
    this._slot("strip", cells.slice(0, 4).join(""));
    const strip = this.shadowRoot.querySelector('[data-slot="strip"]');
    if (strip) strip.style.gridTemplateColumns = `repeat(${Math.max(1, Math.min(4, cells.length))},1fr)`;

    this._renderCharge(m);
    this._renderStats(m);
    this._renderCosts(m);
    this._renderWarnings(m);
    this._renderExtra();
  }

  _renderCharge(m) {
    const t = m.t, e = this._e, c = this._config;
    if (m.soc === null) return this._slot("charge", "");
    const kv = [];
    const hh = this._n("full_hour") ?? this._n("remaining_hours"), mm = this._n("full_minute") ?? this._n("remaining_minutes");
    if (m.charging || m.plugged) kv.push(`<div class="kv" data-more="${c.power_entity || e.battery_power || ""}"><div class="k">${t.power}</div><div class="v num">${m.charging && m.power !== null ? this._fmt(m.power, 1) : "0"}<small>kW</small></div></div>`);
    if (m.charging && (hh > 0 || mm > 0)) kv.push(`<div class="kv" data-more="${e.full_hour || e.remaining_hours || ""}"><div class="k">${t.to_full}</div><div class="v num">${hh > 0 ? `${hh}<small>${t.h}</small> ` : ""}${mm ?? 0}<small>${t.min}</small></div></div>`);
    const s0 = this._raw("scheduled_charge_start_time") || this._raw("start_time"), s1 = this._raw("scheduled_charge_end_time") || this._raw("end_time");
    if (s0 && s1) {
      const en = this._has("scheduled_charge_enabled") ? this._on("scheduled_charge_enabled") : this._on("schedule_enabled");
      kv.push(`<div class="kv" data-more="${e.schedule_enabled || e.scheduled_charge_enabled || ""}"><div class="k">${t.schedule}</div><div class="v s num">${s0.slice(0, 5)}–${s1.slice(0, 5)}${en ? "" : ` <small>(${t.schedule_off})</small>`}</div></div>`);
    }
    const price = this._price();
    if (price !== null) {
      kv.push(`<div class="kv" ${c.price_entity ? `data-more="${c.price_entity}"` : ""}><div class="k">${t.price_now}</div><div class="v s num">${this._fmt(price, 2)}<small>${this._currency()}/kWh</small>${this._stats?.level ? `<span class="badge ${this._stats.level}">${t[this._stats.level]}</span>` : ""}</div></div>`);
      if (c.battery_capacity && m.soc < 100) {
        const kwh = c.battery_capacity * (100 - m.soc) / 100 * (1 + c.charging_loss / 100);
        kv.push(`<div class="kv"><div class="k">${t.full_charge}</div><div class="v s num">${this._money(kwh * price)}<small>${this._fmt(kwh, 1)} kWh</small></div></div>`);
      }
    }
    const label = m.charging ? t.charging : m.plugged ? t.plugged_idle : t.not_plugged;
    const color = m.charging ? "var(--ok)" : m.soc < 15 ? "var(--bad)" : "var(--acc)";
    this._slot("charge", `<div class="panel">
      <div class="ph"><h3><ha-icon icon="mdi:ev-station"></ha-icon>${t.charging_title}</h3>
        <span class="chip ${m.charging ? "ok" : m.plugged ? "warn" : ""}" data-more="${e.is_charger_connected || e.is_charging || ""}"><ha-icon icon="${m.plugged ? "mdi:power-plug" : "mdi:power-plug-off"}"></ha-icon>${label}</span></div>
      <div class="soc ${m.charging ? "chg" : ""}" style="--bc:${color}" data-more="${e.elec_percent}"><b style="width:${m.soc}%"></b>
        <span><em style="font-style:normal">${this._fmt(m.soc)}%</em><em style="font-style:normal">${c.battery_capacity ? `${this._fmt(c.battery_capacity * m.soc / 100, 1)} / ${this._fmt(c.battery_capacity, 1)} kWh` : ""}</em></span></div>
      ${kv.length ? `<div class="grid">${kv.join("")}</div>` : ""}</div>`);
  }

  _renderStats(m) {
    const t = m.t, c = this._config, s = this._stats, ov = c.stats || {};
    if (!s && !Object.keys(ov).length) return this._slot("stats", "");
    const days = s?.days || {};
    const today = dayKey(new Date());
    const keys = Object.keys(days).sort();
    const pick = this._tab === "today" ? [today] : this._tab === "week" ? keys.slice(-7) : keys.filter((k) => k.slice(0, 7) === today.slice(0, 7));
    const sum = (f) => { let a = null; for (const k of pick) { const v = days[k]?.[f]; if (v !== undefined && v !== null) a = (a || 0) + v; } return a; };
    const o = (name) => { if (this._tab === "week") return null; const st = this._ext(ov[`${name}_${this._tab}`]); return st ? num(st.state) : null; };
    const km = o("distance") ?? sum("km"), kwh = o("energy") ?? sum("kwh"), cost = o("cost") ?? sum("cost");
    const fl = o("fuel") ?? sum("fuel"), fcost = o("fuel_cost") ?? sum("fuelCost");
    const total = (cost || 0) + (fcost || 0);
    const kv = [];
    const add = (k, v, u, d) => v !== null && kv.push(`<div class="kv"><div class="k">${k}</div><div class="v num">${this._fmt(v, d)}<small>${u}</small></div></div>`);
    add(t.distance, km, "km", km !== null && km < 100 ? 1 : 0);
    add(t.charged, kwh, "kWh", 1);
    add(t.charge_cost, cost, this._currency(), 2);
    add(t.fuel_used, fl, "L", 1);
    add(t.fuel_cost, fcost, this._currency(), 2);
    if (km > 0 && (cost !== null || fcost !== null)) add(t.cost_100, total / km * 100, this._currency(), 2);
    let chart = "";
    if (this._tab !== "today" && pick.length > 1) {
      const max = Math.max(1, ...pick.map((k) => days[k]?.km || 0));
      const wd = new Intl.DateTimeFormat(this._lang, { weekday: "short" });
      chart = `<div class="chart">${pick.map((k, i) => {
        const d = new Date(k + "T12:00:00"), v = days[k]?.km || 0;
        const lab = this._tab === "week" ? wd.format(d) : (d.getDate() % 5 === 0 || i === 0 ? d.getDate() : "");
        return `<div class="bar ${k === this._day ? "sel" : ""}" data-day="${k}"><i style="height:${Math.round(v / max * 100)}%"></i><u>${lab}&#8203;</u></div>`;
      }).join("")}</div><div class="cap num">${this._day && days[this._day] ? this._dayCaption(this._day, days[this._day]) : ""}</div>`;
    }
    this._slot("stats", `<div class="panel">
      <div class="ph"><h3><ha-icon icon="mdi:chart-timeline-variant"></ha-icon>${t.stats_title}</h3>
        <div class="tabs">${["today", "week", "month"].map((k) => `<button data-tab="${k}" class="${k === this._tab ? "sel" : ""}">${t[k]}</button>`).join("")}</div></div>
      ${kv.length ? `<div class="grid c3">${kv.join("")}</div>` : `<div class="cap">${t.no_data}</div>`}${chart}</div>`);
  }

  _dayCaption(k, d) {
    const df = new Intl.DateTimeFormat(this._lang, { weekday: "short", day: "numeric", month: "numeric" });
    const p = [df.format(new Date(k + "T12:00:00")), `${this._fmt(d.km || 0, 0)} km`];
    if (d.kwh) p.push(`${this._fmt(d.kwh, 1)} kWh`);
    if (d.cost) p.push(this._money(d.cost));
    if (d.fuel) p.push(`${this._fmt(d.fuel, 1)} L`);
    return p.join(" · ");
  }

  _renderCosts(m) {
    const t = m.t, c = this._config, price = this._price(), fp = this._fuelPrice();
    const evc = this._n("lifetime_avg_ev_consumption") ?? this._n("total_consumption");
    const fc = num(c.fuel_consumption) ?? this._n("last_50km_avg_fuel_consumption");
    const kv = [];
    if (price !== null && evc) {
      const v = evc * price * (1 + c.charging_loss / 100);
      kv.push(`<div class="kv"><div class="k">${t.ev_100}</div><div class="v num">${this._fmt(v, 2)}<small>${this._currency()}</small></div><div class="k num">${this._fmt(evc, 1)} kWh/100 km</div></div>`);
    }
    if (fp && fc && m.fuel !== null) {
      kv.push(`<div class="kv"><div class="k">${t.fuel_100}</div><div class="v num">${this._fmt(fc * fp, 2)}<small>${this._currency()}</small></div><div class="k num">${this._fmt(fc, 1)} L/100 km</div></div>`);
    }
    this._slot("costs", kv.length ? `<div class="panel"><div class="ph"><h3><ha-icon icon="mdi:cash-multiple"></ha-icon>${t.costs_title}</h3></div><div class="grid">${kv.join("")}</div></div>` : "");
  }

  _renderWarnings(m) {
    const t = m.t, ign = this._config.ignore_warnings || [];
    const rows = Object.keys(WARNINGS).filter((k) => !ign.includes(k) && this._on(k)).map((k) =>
      `<div class="row" data-more="${this._e[k]}"><ha-icon icon="mdi:alert" style="color:var(--bad)"></ha-icon><span class="n" style="color:var(--t1)">${t[WARNINGS[k]]}</span></div>`);
    this._slot("warn", rows.length ? `<div class="panel" style="border-color:color-mix(in srgb,var(--bad) 50%,transparent)"><div class="ph"><h3><ha-icon icon="mdi:alert-circle" style="color:var(--bad)"></ha-icon>${t.warnings}</h3></div><div class="rows">${rows.join("")}</div></div>` : "");
  }

  _renderExtra() {
    const list = this._config.extra_entities || [];
    const rows = list.map((x) => {
      const o = typeof x === "string" ? { entity: x } : x, st = this._hass.states[o.entity];
      if (!st) return "";
      const dom = o.entity.split(".")[0];
      let val;
      try { val = this._hass.formatEntityState ? this._hass.formatEntityState(st) : st.state; } catch (_) { val = st.state; }
      if (!this._hass.formatEntityState && st.attributes.unit_of_measurement) val += " " + st.attributes.unit_of_measurement;
      const icon = o.icon || st.attributes.icon || { input_boolean: "mdi:toggle-switch-outline", switch: "mdi:toggle-switch-outline", input_select: "mdi:format-list-bulleted", select: "mdi:format-list-bulleted", input_number: "mdi:ray-vertex", input_datetime: "mdi:calendar-clock", automation: "mdi:robot", script: "mdi:script-text" }[dom] || "mdi:circle-small";
      const on = ["on"].includes(st.state);
      return `<div class="row" data-more="${o.entity}"><ha-icon icon="${icon}" ${on ? 'style="color:var(--acc)"' : ""}></ha-icon><span class="n">${esc(o.name || st.attributes.friendly_name || o.entity)}</span><span class="s num">${esc(val)}</span></div>`;
    }).join("");
    this._slot("extra", rows ? `<div class="panel">${this._config.extra_title ? `<div class="ph"><h3><ha-icon icon="mdi:tune-variant"></ha-icon>${esc(this._config.extra_title)}</h3></div>` : ""}<div class="rows">${rows}</div></div>` : "");
  }

  async _buildMap() {
    try {
      const helpers = await window.loadCardHelpers?.();
      if (!helpers) return;
      const el = helpers.createCardElement({ type: "map", entities: [this._e.location], default_zoom: 15, auto_fit: true, aspect_ratio: "16:9", ...(this._config.map || {}) });
      el.hass = this._hass;
      const slot = this.shadowRoot.querySelector('[data-slot="map"]');
      if (!slot) return;
      slot.innerHTML = `<div class="map"></div>`;
      slot.firstChild.appendChild(el);
      this._mapEl = el;
    } catch (err) { /* map is optional */ }
  }

  /* ----------------------------------------------------------- events */
  _bind() {
    const root = this.shadowRoot;
    root.addEventListener("click", (ev) => {
      const path = ev.composedPath();
      for (const el of path) {
        if (!(el instanceof Element)) continue;
        if (el.dataset.tab) { this._tab = el.dataset.tab; this._day = null; return this._renderStats(this._model()); }
        if (el.dataset.day) { this._day = this._day === el.dataset.day ? null : el.dataset.day; return this._renderStats(this._model()); }
        if (el.dataset.photo) return this._nextPhoto(el);
        if (el.dataset.act) return; // handled by pointer events
        if (el.dataset.more) return this._more(el.dataset.more);
        if (el === root.host) break;
      }
    });
    let timer = null, btn = null, fired = false, x0 = 0, y0 = 0;
    const cancel = () => { clearTimeout(timer); timer = null; if (btn) btn.classList.remove("holding"); };
    root.addEventListener("pointerdown", (ev) => {
      btn = ev.composedPath().find((el) => el instanceof Element && el.dataset.act);
      if (!btn) return;
      fired = false; x0 = ev.clientX; y0 = ev.clientY;
      btn.style.setProperty("--hold", this._config.hold_time + "ms");
      btn.classList.add("holding");
      const b = btn;
      timer = setTimeout(() => { fired = true; cancel(); this._run(b.dataset.act, b); }, this._config.hold_time);
    });
    root.addEventListener("pointermove", (ev) => { if (timer && Math.hypot(ev.clientX - x0, ev.clientY - y0) > 10) { cancel(); fired = true; } });
    root.addEventListener("pointerup", () => {
      if (!btn) return;
      const wasTimer = !!timer; cancel();
      if (wasTimer && !fired) { if (btn.dataset.actmore && btn.dataset.act === "climate") this._more(btn.dataset.actmore); else this._toast(this._t.hold); }
      btn = null;
    });
    root.addEventListener("pointercancel", cancel);
    root.addEventListener("pointerleave", cancel);
    root.addEventListener("contextmenu", (ev) => { if (ev.composedPath().some((el) => el instanceof Element && el.dataset?.act)) ev.preventDefault(); });
  }

  _paintScene(m) {
    const stage = this.shadowRoot.querySelector(".stage"), sc = stage?.querySelector(".scene");
    if (!sc) return;
    const side = this._view === "r" ? "r" : "l";
    const st = { door_f: m.parts["door_f" + side], door_r: m.parts["door_r" + side], win_f: m.parts["win_f" + side], win_r: m.parts["win_r" + side], hood: m.parts.hood, trunk: m.parts.trunk };
    sc.querySelectorAll("[data-sp]").forEach((el) => el.classList.toggle("open", !!st[el.dataset.sp]));
    sc.querySelectorAll(".part").forEach((el) => {
      const w = el.querySelector(".winopen");
      el.classList.toggle("vis", !!st[el.dataset.sp] || !!(w && st[w.dataset.sp]));
    });
    sc.classList.toggle("anyopen", Object.values(st).some(Boolean));
    for (const [k, v] of Object.entries({ plugged: m.plugged, charging: m.charging, driving: m.status === "driving", on: m.on })) sc.classList.toggle(k, !!v);
    stage.querySelectorAll(".dots i").forEach((d, i) => {
      const v = this._views[i];
      d.classList.toggle("warn", (v === "l" || v === "r") && m.open.some((k) => k.endsWith(v)));
    });
    const lbl = stage.querySelector(".sidelbl");
    if (lbl) lbl.textContent = this._view === "l" ? this._t.side_left : this._view === "r" ? this._t.side_right : "";
  }

  _setView(v, instant) {
    const stage = this.shadowRoot.querySelector(".stage");
    if (!stage || !this._views.includes(v)) return;
    const apply = () => {
      this._view = v;
      stage.dataset.view = v[0];
      if (v[0] === "p") stage.querySelector(".still").src = this._stills[+v.slice(1)];
      stage.querySelectorAll(".dots i").forEach((d, i) => d.classList.toggle("sel", i === this._views.indexOf(v)));
      this._paintScene(this._model());
      stage.classList.remove("swap");
    };
    if (instant) return apply();
    stage.classList.add("swap");
    setTimeout(apply, 230);
  }

  _nextPhoto() {
    if (this._views.length < 2) return;
    this._setView(this._views[(this._views.indexOf(this._view) + 1) % this._views.length]);
  }

  _more(entityId) {
    if (!entityId) return;
    this.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId }, bubbles: true, composed: true }));
  }

  _toast(msg) {
    const el = this.shadowRoot.querySelector(".toast"); if (!el) return;
    el.textContent = msg; el.classList.add("show");
    clearTimeout(this._toastT); this._toastT = setTimeout(() => el.classList.remove("show"), 2200);
  }

  async _run(act, btn) {
    const e = this._e, m = this._model(), h = this._hass;
    const press = (id) => h.callService("button", "press", { entity_id: id });
    const map = {
      lock: () => h.callService("lock", m.locked ? "unlock" : "lock", { entity_id: e.lock }),
      climate: () => h.callService("climate", m.climateOn ? "turn_off" : "turn_on", { entity_id: e.climate }),
      flash_lights: () => press(e.flash_lights), find_car: () => press(e.find_car),
      close_windows: () => press(e.close_windows), open_windows: () => press(e.open_windows),
      trunk: () => press(m.parts.trunk && e.close_trunk ? e.close_trunk : e.open_trunk || e.close_trunk),
      start_charging: () => press(e.start_charging), force_poll: () => press(e.force_poll),
    };
    if (!map[act]) return;
    if (this._config.demo) return this._toast("Demo");
    this.dispatchEvent(new CustomEvent("haptic", { detail: "success", bubbles: true, composed: true }));
    const svg = this.shadowRoot.querySelector("svg.car");
    const scn = this.shadowRoot.querySelector(".scene");
    if (scn && (act === "flash_lights" || act === "find_car")) { scn.classList.remove("flash"); void scn.offsetWidth; scn.classList.add("flash"); setTimeout(() => scn.classList.remove("flash"), 3000); }
    if (svg && (act === "flash_lights" || act === "find_car")) { svg.classList.remove("flash"); void svg.getBoundingClientRect(); svg.classList.add("flash"); setTimeout(() => svg.classList.remove("flash"), 3000); }
    btn?.classList.add("busy");
    try { await map[act](); this._toast(this._t.sent); }
    catch (err) { this._toast(`${this._t.failed}: ${err?.message || err}`); }
    finally { setTimeout(() => this.shadowRoot.querySelector(`[data-act="${act}"]`)?.classList.remove("busy"), 1500); }
  }

  /* ------------------------------------------------------- statistics */
  _scheduleStats() {
    clearTimeout(this._statsT);
    this._statsT = setTimeout(() => this._loadStats(), 20000);
  }

  async _loadStats() {
    const h = this._hass, e = this._e, c = this._config;
    if (!h?.callWS || !e || this._loading) return;
    if (!e.total_mileage && !e.elec_percent) return;
    this._loading = true;
    try {
      const start = new Date(); start.setHours(0, 0, 0, 0); start.setDate(start.getDate() - 31);
      const days = {};
      const day = (k) => (days[k] = days[k] || {});
      for (let d = new Date(start); d <= new Date(); d.setDate(d.getDate() + 1)) day(dayKey(d));

      if (e.total_mileage) {
        const r = await h.callWS({ type: "recorder/statistics_during_period", start_time: start.toISOString(), statistic_ids: [e.total_mileage], period: "day", types: ["change"] });
        for (const p of r?.[e.total_mileage] || []) day(dayKey(new Date(p.start))).km = Math.max(0, p.change || 0);
      }
      const ids = [e.elec_percent, e.oil_percent, c.price_entity, c.fuel_price_entity].filter(Boolean);
      let level = null;
      if (ids.length) {
        const r = await h.callWS({ type: "history/history_during_period", start_time: start.toISOString(), end_time: new Date().toISOString(), entity_ids: ids, minimal_response: true, no_attributes: true, significant_changes_only: false });
        const series = (id) => (r?.[id] || []).map((p) => [(p.lu ?? p.lc) * 1000, num(p.s)]).filter((p) => p[1] !== null && p[0]);
        const priceAt = (list, ts, fallback) => { let v = fallback; for (const [t, p] of list) { if (t > ts) break; v = p; } return v; };
        const prices = c.price_entity ? series(c.price_entity) : [], fprices = c.fuel_price_entity ? series(c.fuel_price_entity) : [];
        const loss = 1 + (c.charging_loss || 0) / 100;
        if (e.elec_percent && c.battery_capacity) {
          let prev = null;
          for (const [ts, v] of series(e.elec_percent)) {
            if (prev !== null && v > prev) {
              const kwh = (v - prev) / 100 * c.battery_capacity * loss, d = day(dayKey(new Date(ts)));
              d.kwh = (d.kwh || 0) + kwh;
              const p = priceAt(prices, ts, num(c.price_fixed));
              if (p !== null) d.cost = (d.cost || 0) + kwh * p;
            }
            prev = v;
          }
        }
        if (e.oil_percent && c.fuel_tank) {
          let prev = null;
          for (const [ts, v] of series(e.oil_percent)) {
            if (prev !== null && v < prev) {
              const l = (prev - v) / 100 * c.fuel_tank, d = day(dayKey(new Date(ts)));
              d.fuel = (d.fuel || 0) + l;
              const p = priceAt(fprices, ts, num(c.fuel_price)) || this._fuelPrice();
              if (p) d.fuelCost = (d.fuelCost || 0) + l * p;
            }
            prev = v;
          }
        }
        if (prices.length > 3) {
          const recent = prices.filter((p) => p[0] > Date.now() - 86400000).map((p) => p[1]);
          const now = this._price();
          if (recent.length > 3 && now !== null) {
            const lo = Math.min(...recent), hi = Math.max(...recent);
            if (hi - lo > 1e-6) { const x = (now - lo) / (hi - lo); level = x < 0.34 ? "cheap" : x > 0.66 ? "expensive" : "normal"; }
          }
        }
      }
      this._stats = { days, level };
      this._update();
    } catch (err) {
      console.warn("byd-vehicle-card: statistics unavailable", err);
    } finally { this._loading = false; }
  }
}

if (!customElements.get("byd-vehicle-card")) customElements.define("byd-vehicle-card", BydVehicleCard);
window.customCards = window.customCards || [];
if (!window.customCards.some((c) => c.type === "byd-vehicle-card")) {
  window.customCards.push({ type: "byd-vehicle-card", name: "BYD Vehicle Card", preview: true,
    description: "Animated vehicle card for the hass-byd-vehicle integration", documentationURL: "https://github.com/jkaberg/hass-byd-vehicle" });
}
console.info(`%c BYD-VEHICLE-CARD %c v${VERSION} `, "background:#22d3ee;color:#04121a;font-weight:700", "background:#0d1322;color:#fff");
