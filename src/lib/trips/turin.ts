import type { Trip } from "../types";

import hero from "@/assets/trips/turin/hero.jpg";

// Gap photos sourced from Wikimedia Commons (2026-06-28)
import mautoImg from "@/assets/trips/turin/mauto.jpg";
import arcoAugustoSusa from "@/assets/trips/turin/arco-augusto-susa.jpg";
import monteCappuccini from "@/assets/trips/turin/monte-cappuccini.jpg";
import villaDellRegina from "@/assets/trips/turin/villa-della-regina.jpg";
import balonFleaMarket from "@/assets/trips/turin/balon-flea-market.jpg";

// Day 1 — Arrival / city centre
import viaRomaTorino from "@/assets/trips/turin/via-roma-torino.jpg";
import stradaDeTorino from "@/assets/trips/turin/strada-de-torino.jpg";
import piazzaSanCarlo3 from "@/assets/trips/turin/piazza-san-carlo-3.jpg";

// Day 2 — Museo Egizio + royal centre
import egizio1 from "@/assets/trips/turin/egizio-1.jpg";
import egizio2 from "@/assets/trips/turin/egizio-2.jpg";
import piazzaCastello1 from "@/assets/trips/turin/piazza-castello-1.jpg";
import palazzoReale from "@/assets/trips/turin/palazzo-reale.jpg";

// Day 3 — Riverside + aperitivo
import boRiver from "@/assets/trips/turin/bo-river.jpg";
import parcoDelValentino from "@/assets/trips/turin/parco-del-valentino.jpg";
import parcoDelValentino2 from "@/assets/trips/turin/parco-del-valentino-2.jpg";
import aperitivo from "@/assets/trips/turin/aperitivo.jpg";

// Day 4 — Markets + Mole Cinema Museum
import cinemaMuseum1 from "@/assets/trips/turin/cinema-museum-1.jpg";
import portaPalazzo2 from "@/assets/trips/turin/porta-palazzo-2.jpg";
import portaPalazzoB from "@/assets/trips/turin/porta-palazzo-b.webp";
import cinemaMuseum2 from "@/assets/trips/turin/cinema-museum-2.jpg";
import quadrilatero from "@/assets/trips/turin/quadrilatero.jpg";

// Day 5 — Sacra di San Michele + Lago Grande
import sacraDiSanMichele from "@/assets/trips/turin/sacra-di-san-michele.jpg";
import sacra3 from "@/assets/trips/turin/sacra-3.jpg";
import mortrera from "@/assets/trips/turin/mortrera.jpg";
import lacsDavcgliana2 from "@/assets/trips/turin/lacs-davcgliana-2.jpg";
import picnic from "@/assets/trips/turin/picnic.jpg";

// Day 7 — Superga + Sassi rack tram
import supergaImg from "@/assets/trips/turin/superga.jpg";
import superga2 from "@/assets/trips/turin/superga-2.jpg";
import supergaBasilisca from "@/assets/trips/turin/superga-basilisca.jpg";
import tombOfSavoy from "@/assets/trips/turin/tomb-of-the-house-of-savoy.jpg";
import sassiStation from "@/assets/trips/turin/sassi-station.jpg";

// Day 8 — Departure
import panino from "@/assets/trips/turin/panino.jpg";

export const TURIN: Trip = {
  id: "001",
  slug: "turin",
  caseNumber: "FILES 001",
  codename: "Operazione Torino",
  title: "Operazione Torino",
  destination: "Turin & Piedmont, Italy",
  dates: "1–8 July 2026",
  startISO: "2026-07-01",
  endISO: "2026-07-08",
  duration: 8,
  status: "upcoming",
  tagline: "First trip together. No one panic.",
  classification: "TOP TIRAMISÙ",
  exchangeNote: "Prices in DKK · 1 EUR ≈ 7.47 DKK",
  heroImage: hero,
  base: {
    address: "Corso Dante 72, Turin",
    metro: "Dante",
    supermarkets: ["Prestofresco", "Carrefour Express", "Pam Local"],
  },
  flights: {
    out: "CPH 06:25 → TRN 08:35 · Wed 1 Jul",
    in: "TRN 09:05 → CPH 11:10 · Wed 8 Jul",
  },
  travelers: [
    { name: "Apurva", emoji: "🕵️", role: "Field Agent", color: "amber", initials: "AP" },
    { name: "Clara", emoji: "🍷", role: "Cultural Attaché", color: "pink", initials: "CL" },
  ],
  days: [
    {
      n: 1,
      weekday: "Wed",
      date: "1 Jul",
      title: "The arrival",
      label: "TOUCHDOWN",
      sticker: "amber",
      vibe: "soft · jet-lagged · no-plan",
      lead: "both",
      summary:
        "You land mid-morning, stash the bags at Porta Susa, and let the city introduce itself slowly. The whole morning is deliberately open — coffee, a piazza, a long lunch — until the apartment opens at 15:00.",
      transitFromBase:
        "Arrival day — you travel from the airport to the base, so there is no outbound trip from Corso Dante yet. The airport-to-city steps are in the anchors below.",
      anchors: [
        {
          label: "Flight CPH → TRN",
          time: "06:25",
          type: "flight",
          detail:
            "Your flight leaves Copenhagen (CPH) at 06:25 and lands in Turin (TRN) at 08:35.",
          booking: "na",
        },
        {
          label: "Airport train → Porta Susa",
          type: "transit",
          detail:
            "At the airport, take the SFM regional train (SFM = the airport regional train line) from Torino Aeroporto toward Asti/Alba and ride it to Porta Susa station (about 30 minutes, 3.70 € per person).",
          booking: "na",
        },
        {
          label: "Drop bags at Radical Storage, Porta Susa",
          type: "transit",
          detail:
            "Leave your luggage at the Radical Storage left-luggage point at Porta Susa station — book and pay for your slot in the Radical Storage app first, then you are free to wander hands-empty.",
          booking: "na",
        },
        {
          label: "Apartment check-in, Corso Dante 72",
          time: "15:00",
          type: "transit",
          detail:
            "Check-in opens at 15:00 at Corso Dante 72 (Dante metro). From Porta Susa, take the metro toward Bengasi and get off at Dante (~8 min); the apartment is a short walk from the station.",
          booking: "na",
        },
      ],
      ideas: [
        {
          name: "Open morning — roam, coffee, a piazza, lunch",
          why: "Day one is intentionally unplanned. After the bag drop, just wander the arcades, sit for a coffee, find a piazza and a long lunch. No schedule, no rush — let the jet lag settle.",
          area: "Centro / Quadrilatero",
          mapsQuery: "Piazza Castello, Torino",
        },
        {
          name: "Supermarket run near the base",
          why: "Stock the apartment for breakfasts and snacks. Three supermarkets sit close to Corso Dante 72: Prestofresco, Carrefour Express and Pam Local.",
          area: "Corso Dante",
          tip: "Pick whichever is nearest and open — all three carry the basics.",
          mapsQuery: "supermarket Corso Dante, Torino",
        },
      ],
      photos: [
        { src: stradaDeTorino, alt: "A grand arcaded street in Turin's historic centre" },
        { src: piazzaSanCarlo3, alt: "Piazza San Carlo — Turin's elegant baroque 'drawing-room' square" },
      ],
      intel: [
        "Don't overbook day one. Drop the bags at Porta Susa first, then wander until the 15:00 apartment check-in — there's no need to plan anything before then.",
      ],
      heroImage: viaRomaTorino,
    },
    {
      n: 2,
      weekday: "Thu",
      date: "2 Jul",
      title: "Egyptian gold",
      label: "EGYPT IN ITALY",
      sticker: "wine",
      vibe: "ancient · ornate · arcaded",
      lead: "Apurva",
      summary:
        "Booked into the Museo Egizio at 10:00 — the second-largest Egyptian collection on Earth. Afterwards, drift through the royal heart of the city: grand squares, baroque churches and arcaded avenues.",
      transitFromBase:
        "From Corso Dante 72, walk to Dante metro and take the metro toward Fermi; get off at Porta Nuova (3 stops, ~5 min), then walk up Via Roma into the centre.",
      anchors: [
        {
          label: "Museo Egizio",
          time: "10:00",
          type: "ticket",
          detail:
            "Your booked 10:00 entry to the Museo Egizio (the Egyptian Museum) at Via Accademia delle Scienze 6. It holds the second-largest collection of Egyptian antiquities in the world.",
          booking: "booked",
          bookingLink: "https://museitorino.it/",
          confirmationKey: "egizio-conf",
        },
      ],
      ideas: [
        {
          name: "Piazza San Carlo",
          why: "Turin's elegant 'drawing-room' square, framed by twin baroque churches and grand arcaded cafés.",
          area: "Centro",
          mapsQuery: "Piazza San Carlo, Torino",
          photo: { src: piazzaSanCarlo3, alt: "Piazza San Carlo — Turin's baroque square lined with arcaded cafés" },
        },
        {
          name: "Piazza Castello & Palazzo Reale",
          why: "The royal heart of the city: the Savoy palace (Palazzo Reale) on its grand square. The courtyard is free to wander; the palace interior is ticketed.",
          area: "Centro",
          cost: "Palazzo Reale ~17 € pp",
          mapsQuery: "Palazzo Reale, Torino",
          photo: { src: palazzoReale, alt: "Palazzo Reale — the Savoy royal palace on Piazza Castello" },
        },
        {
          name: "Via Roma arcades",
          why: "Turin's main shopping avenue runs entirely under elegant covered arcades — welcome shade on a hot day, linking Porta Nuova to Piazza Castello.",
          area: "Centro",
          mapsQuery: "Via Roma, Torino",
        },
        {
          name: "Lunch at a tavola calda",
          why: "A 'tavola calda' is a casual Italian counter where you point at freshly cooked dishes — a quick, cheap, no-fuss lunch near the museum.",
          area: "Centro",
          tip: "Point at what looks good; you usually pay by plate or by weight.",
          mapsQuery: "tavola calda centro Torino",
        },
      ],
      photos: [
        { src: egizio2, alt: "Inside the Museo Egizio — one of the world's greatest Egyptian collections" },
        { src: piazzaCastello1, alt: "Piazza Castello — the grand royal square at the heart of Turin" },
        { src: palazzoReale, alt: "Palazzo Reale — the Savoy royal palace fronting Piazza Castello" },
        { src: piazzaSanCarlo3, alt: "Piazza San Carlo — Turin's baroque 'drawing-room' square" },
      ],
      intel: [
        "Aperitivo was invented in Turin — order one drink in the early evening and the free snacks that come with it are basically dinner.",
      ],
      heroImage: egizio1,
    },
    {
      n: 3,
      weekday: "Fri",
      date: "3 Jul",
      title: "Motor city",
      label: "MOTOR CITY",
      sticker: "teal",
      vibe: "mechanical · riverside · slow-evening",
      lead: "Apurva",
      summary:
        "Turin is Italy's car capital, and today leans into it at the National Automobile Museum down in Lingotto. Then an easy riverside walk by the Po and an unhurried aperitivo to close the day.",
      transitFromBase:
        "From Corso Dante 72, walk to Dante metro and take the metro toward Bengasi; get off at Lingotto (~4 min) — the museum is a short, signposted walk from the station.",
      anchors: [
        {
          label: "National Automobile Museum (MAUTO)",
          time: "10:00–19:00",
          type: "ticket",
          detail:
            "The National Automobile Museum (Museo Nazionale dell'Automobile, also called MAUTO). It's open 10:00–19:00 and tickets are about 15 € per person. It isn't pre-booked — buy online beforehand or at the door.",
          booking: "toBook",
          bookingLink: "https://www.museoauto.com/",
        },
        {
          label: "Metro to the museum",
          type: "transit",
          detail:
            "From Dante take the metro toward Bengasi and get off at Lingotto (~4 min); follow the signs from the station to the museum.",
          booking: "na",
        },
      ],
      ideas: [
        {
          name: "Give MAUTO two to three hours",
          why: "The National Automobile Museum (MAUTO) is one of the best car museums in the world — give it two to three hours to do the collection justice.",
          area: "Lingotto",
          cost: "15 € pp",
          mapsQuery: "Museo Nazionale dell'Automobile, Torino",
          photo: { src: mautoImg, alt: "Inside the Museo Nazionale dell'Automobile (MAUTO) — one of the world's great car museums", credit: "FrDr / Wikimedia Commons (CC BY-SA 4.0)" },
        },
        {
          name: "Riverside walk along the Po",
          why: "The Po river runs close to Lingotto; a flat, shady riverside stroll is an easy way to unwind after the museum.",
          area: "Lingotto / Po",
          mapsQuery: "Lungo Po, Torino",
        },
        {
          name: "Aperitivo to close the day",
          why: "Wind down with an aperitivo — order a drink in the early evening and graze the snacks that come with it. Two well-rated spots are Caffè Bellini and L'Aperitivo DiVino.",
          area: "Centro / Lingotto",
          mapsQuery: "Caffè Bellini, Torino",
        },
      ],
      photos: [
        { src: boRiver, alt: "The Po river at Turin — the riverside walk near Lingotto and the MAUTO" },
        { src: parcoDelValentino, alt: "Parco del Valentino — Turin's riverside park along the Po" },
        { src: parcoDelValentino2, alt: "Parco del Valentino in summer near the Po riverbank" },
        { src: aperitivo, alt: "Turin-style aperitivo — the city's beloved early-evening ritual" },
      ],
      intel: [
        "Lingotto's old Fiat factory has an iconic car test-track on its roof — look up a photo before you go so you recognise it.",
      ],
      heroImage: mautoImg,
    },
    {
      n: 4,
      weekday: "Sat",
      date: "4 Jul",
      title: "Market raid",
      label: "MARKET RAID",
      sticker: "amber",
      vibe: "early · bustling · cinematic",
      lead: "both",
      summary:
        "An early start for the markets — Porta Palazzo and the Saturday-only Balôn flea market — then a leisurely middle of the day in the old lanes, and a booked 15:00 climb up the Mole for the Cinema Museum and the panoramic lift.",
      transitFromBase:
        "From Corso Dante 72, walk to Dante metro and take the metro toward Fermi; get off at Porta Nuova (~5 min), then walk into the centre toward the markets and, later, the Mole.",
      anchors: [
        {
          label: "Balôn flea market + Porta Palazzo market",
          time: "from 07:00",
          type: "market",
          detail:
            "Two markets sit side by side near Porta Palazzo: the huge daily Porta Palazzo food-and-goods market, and the Balôn flea market (Saturdays only). Both get going around 07:00 and are best early.",
          booking: "na",
        },
        {
          label: "Mole — Cinema Museum + panoramic lift",
          time: "15:00",
          type: "ticket",
          detail:
            "Your booked 15:00 entry to the National Cinema Museum inside the Mole Antonelliana, including the glass panoramic lift to the top for the city view.",
          booking: "booked",
          bookingLink: "https://www.museocinema.it/",
          confirmationKey: "mole-conf",
        },
        {
          label: "Metro into the centre",
          type: "transit",
          detail:
            "From Dante take the metro toward Fermi to Porta Nuova (~5 min), then walk into the centre toward the markets and the Mole.",
          booking: "na",
        },
      ],
      ideas: [
        {
          name: "Cake, coffee & lunch in the Quadrilatero",
          why: "The Quadrilatero Romano is the old grid of narrow lanes packed with bakeries, cafés and casual lunch spots — the place to refuel between the morning markets and the afternoon Mole.",
          area: "Quadrilatero",
          mapsQuery: "Quadrilatero Romano, Torino",
        },
        {
          name: "Via Garibaldi stroll",
          why: "One of Europe's longest pedestrian streets, running straight from Piazza Castello — an easy, car-free walk back across the centre.",
          area: "Centro",
          mapsQuery: "Via Garibaldi, Torino",
        },
      ],
      photos: [
        { src: portaPalazzo2, alt: "Porta Palazzo market — Europe's largest open-air market" },
        { src: portaPalazzoB, alt: "Porta Palazzo market stalls on a busy Saturday morning" },
        { src: balonFleaMarket, alt: "Balôn flea market — Turin's Saturday antiques and vintage market", credit: "Orologiaiopazzo / Wikimedia Commons (Public domain)" },
        { src: cinemaMuseum2, alt: "Inside the National Cinema Museum in the Mole Antonelliana" },
        { src: quadrilatero, alt: "The Quadrilatero Romano — Turin's historic grid of narrow lanes and cafés" },
      ],
      intel: [
        "Carry your ID — you need it for the Mole. The markets are best before 09:00, and remember the Balôn flea market only runs on Saturday.",
      ],
      heroImage: cinemaMuseum1,
    },
    {
      n: 5,
      weekday: "Sun",
      date: "5 Jul",
      title: "The abbey job",
      label: "THE ABBEY JOB",
      sticker: "wine",
      vibe: "mountainside · monastic · lakeside",
      lead: "Apurva",
      summary:
        "A day trip out to the Sacra di San Michele — the cliff-top abbey that inspired *The Name of the Rose* — reached by train to Avigliana and a fixed-time shuttle up the mountain. Cool off afterwards with a swim at Lago Grande.",
      transitFromBase:
        "From Corso Dante 72, walk to Dante metro and take the metro toward Fermi; get off at Porta Nuova (~6 min) for the regional train — see the anchors for the train and shuttle times.",
      anchors: [
        {
          label: "Metro to Porta Nuova",
          type: "transit",
          detail:
            "From Dante take the metro toward Fermi to Porta Nuova (~6 min) to reach the regional-train platforms.",
          booking: "na",
        },
        {
          label: "Train Porta Nuova → Avigliana",
          time: "07:45 / 08:45 / 09:15 / 09:45 / 10:45",
          type: "ticket",
          detail:
            "Regional train from Porta Nuova toward Susa/Bardonecchia/Modane; get off at Avigliana (~30 min). Useful departures: 07:45, 08:45, 09:15, 09:45, 10:45. Buy the train + shuttle BUNDLE in the Trenitalia app.",
          booking: "toBook",
          bookingLink: "https://www.trenitalia.com/",
        },
        {
          label: "Avigliana shuttle up to the Sacra",
          time: "ONLY 09:00 / 10:00 / 14:00 / 16:00",
          type: "shuttle",
          detail:
            "A shuttle bus runs from Avigliana up to the Sacra di San Michele at fixed times only: 09:00, 10:00, 14:00 and 16:00. There's no easy alternative up, so plan your train to connect with one of these.",
          booking: "na",
        },
        {
          label: "Shuttle back down from the Sacra",
          time: "ONLY 09:30 / 10:30 / 14:30 / 16:30 / 18:30",
          type: "shuttle",
          detail:
            "The return shuttle from the Sacra down to Avigliana also runs at fixed times only: 09:30, 10:30, 14:30, 16:30 and 18:30. Note your slot before you head up.",
          booking: "na",
        },
      ],
      ideas: [
        {
          name: "Sacra di San Michele",
          why: "A dramatic 10th-century abbey perched on Mount Pirchiriano — the building that inspired Umberto Eco's novel *The Name of the Rose*. The views over the valley are the reward for the climb.",
          area: "Mount Pirchiriano / Avigliana",
          mapsQuery: "Sacra di San Michele",
          photo: { src: sacraDiSanMichele, alt: "Sacra di San Michele — the 10th-century abbey perched on Mount Pirchiriano above Val di Susa" },
        },
        {
          name: "Lago Grande di Avigliana — swim & picnic",
          why: "A clear lake near Avigliana for a swim and a picnic. From the centre it's about a 20–25 minute walk: head down Corso Torino, then continue along Corso Laghi to the Baia Grande beach area.",
          area: "Avigliana",
          tip: "Bring flip-flops, a towel and a backpack for your lake things.",
          mapsQuery: "Baia Grande, Lago Grande di Avigliana",
          photo: { src: lacsDavcgliana2, alt: "Lago Grande di Avigliana — clear summer waters below the Sacra di San Michele" },
        },
      ],
      photos: [
        { src: sacra3, alt: "Sacra di San Michele — detail of the cliff-top abbey above Val di Susa" },
        { src: mortrera, alt: "The Mortrera woodland trail up to the Sacra di San Michele" },
        { src: lacsDavcgliana2, alt: "Lago Grande di Avigliana — the clear lake near Avigliana" },
        { src: picnic, alt: "Picnic at the lake — a relaxed end to a day in the hills" },
      ],
      intel: [
        "Buy the train + shuttle BUNDLE in the Trenitalia app — it's cheaper and simpler. Bring flip-flops, a towel and a backpack so you can stop at the lake on the way.",
      ],
      heroImage: sacraDiSanMichele,
    },
    {
      n: 6,
      weekday: "Mon",
      date: "6 Jul",
      title: "Roman holiday",
      label: "ROMAN HOLIDAY",
      sticker: "teal",
      vibe: "alpine · ancient · unhurried",
      lead: "both",
      summary:
        "An easy train ride up the valley to Susa, a small Alpine town that was once a Roman stronghold. Wander its arch, amphitheatre, old gate and cathedral at your own pace — the only thing to pin down is the train home.",
      transitFromBase:
        "From Corso Dante 72, walk to Dante metro and take the metro toward Fermi; get off at Porta Nuova (~6 min) for the regional train to Susa.",
      anchors: [
        {
          label: "Metro to Porta Nuova",
          type: "transit",
          detail:
            "From Dante take the metro toward Fermi to Porta Nuova (~6 min) to reach the regional-train platforms.",
          booking: "na",
        },
        {
          label: "Train Porta Nuova → Susa",
          type: "ticket",
          detail:
            "Regional train from Porta Nuova to Susa (about 1 hour 6 minutes). Buy it in the Trenitalia app or at the station.",
          booking: "toBook",
          bookingLink: "https://www.trenitalia.com/",
        },
        // RESEARCH at build time: Susa → Torino Porta Nuova return times via trenitalia.com / SFM.
        // Trains run roughly hourly into the evening; verify exact times before the trip.
        {
          label: "Return train Susa → Porta Nuova",
          time: "≈ hourly to ~20:00",
          type: "transit",
          detail: "Verify exact times in the Trenitalia app the morning of. ~1h06.",
          booking: "na",
        },
      ],
      ideas: [
        {
          name: "Arch of Augustus (Arco di Augusto)",
          why: "A well-preserved Roman triumphal arch from around 9–8 BC, still standing in the old town of Susa.",
          area: "Susa",
          mapsQuery: "Arco di Augusto, Susa",
          photo: { src: arcoAugustoSusa, alt: "Arco di Augusto — the Roman triumphal arch standing in Susa since 9–8 BC", credit: "Duvilar (Lorenzo Rossetti) / Wikimedia Commons (CC BY-SA 3.0)" },
        },
        {
          name: "The Roman amphitheatre",
          why: "The remains of Susa's Roman amphitheatre — a quiet reminder that this little Alpine town was once a Roman outpost.",
          area: "Susa",
          mapsQuery: "Anfiteatro Romano, Susa",
        },
        {
          name: "Porta Savoia",
          why: "An ancient Roman city gate, later built into Susa's medieval defences.",
          area: "Susa",
          mapsQuery: "Porta Savoia, Susa",
        },
        {
          name: "Susa Cathedral (San Giusto)",
          why: "The 11th-century Cathedral of San Giusto, with its tall bell tower, anchors the centre of town.",
          area: "Susa",
          mapsQuery: "Cattedrale di San Giusto, Susa",
        },
        {
          name: "Lunch in town",
          why: "Susa is small and walkable — pick a trattoria in the centre for a relaxed mountain-town lunch between sights.",
          area: "Susa",
          mapsQuery: "ristorante centro Susa",
        },
      ],
      photos: [],
      intel: [
        "Keep the day loose — the only thing to nail down is your train home. Check the Susa → Porta Nuova return times before you wander off.",
      ],
      heroImage: arcoAugustoSusa,
    },
    {
      n: 7,
      weekday: "Tue",
      date: "7 Jul",
      title: "Local heroes",
      label: "LOCAL HEROES",
      sticker: "amber",
      vibe: "panoramic · uphill · proud",
      lead: "Clara",
      summary:
        "The home-turf day: the hills across the river, viewpoints over the whole city, and the historic rack tram up to the grand Basilica of Superga. A big walking day, paced around the keeper view from the top.",
      transitFromBase:
        "From Corso Dante 72, walk to Dante metro and take the metro toward Fermi to Porta Nuova (~5 min), then catch bus 52 or 66 to the Crimea stop (~6 min) on the hill side of the river.",
      anchors: [
        {
          label: "Metro + bus toward Crimea",
          type: "transit",
          detail:
            "From Dante take the metro toward Fermi to Porta Nuova (~5 min), then catch bus 52 or 66 and get off at the Crimea stop (~6 min) to start the hillside loop.",
          booking: "na",
        },
        {
          label: "Sassi–Superga rack tram (Cremagliera)",
          type: "ticket",
          detail:
            "The historic Sassi–Superga rack railway (the 'Cremagliera') climbs from Sassi station up to the Basilica of Superga (~18 min up). Buy tickets at Sassi station or through GTT, the city transport company.",
          booking: "toBook",
          bookingLink: "https://www.gtt.to.it/",
        },
      ],
      ideas: [
        {
          name: "Monte dei Cappuccini viewpoint",
          why: "A small hill with a church and one of the best free panoramas of Turin and the Alps, just across the river from the centre.",
          area: "Monte dei Cappuccini",
          mapsQuery: "Monte dei Cappuccini, Torino",
          photo: { src: monteCappuccini, alt: "Santa Maria al Monte dei Cappuccini — the hilltop church with panoramic views over Turin", credit: "GJo / Wikimedia Commons (CC BY-SA 3.0)" },
        },
        {
          name: "Villa della Regina",
          why: "A 17th-century royal villa with terraced Italian gardens climbing the hillside and looking back over the city.",
          area: "Collina",
          cost: "~5 € pp",
          mapsQuery: "Villa della Regina, Torino",
          photo: { src: villaDellRegina, alt: "Villa della Regina — the terraced gardens of the 17th-century royal villa on Turin's hillside", credit: "Zairon / Wikimedia Commons (CC BY-SA 4.0)" },
        },
        {
          name: "Walk to the Gran Madre, then bus to Sassi",
          why: "From the hill it's about a 14-minute walk down to the Gran Madre di Dio church by the river; from there bus 61 reaches the Sassi rack-tram station in about 13 minutes.",
          area: "Gran Madre / Sassi",
          mapsQuery: "Gran Madre di Dio, Torino",
          photo: { src: sassiStation, alt: "Sassi station — the lower terminus of the Cremagliera historic rack tram up to Superga" },
        },
        {
          name: "Basilica di Superga + Royal Tombs",
          why: "The grand hilltop basilica, reached by the rack tram (~18 min up), holds the royal tombs of the House of Savoy and a sweeping view over the city and mountains.",
          area: "Superga",
          mapsQuery: "Basilica di Superga",
          photo: { src: supergaBasilisca, alt: "The Basilica di Superga — Turin's grand hilltop church holding the Royal Tombs of the House of Savoy" },
        },
        {
          name: "Lunch near Sassi",
          why: "Grab lunch around the Sassi station before or after riding the rack tram up to Superga.",
          area: "Sassi",
          mapsQuery: "ristorante Sassi Torino",
        },
      ],
      photos: [
        { src: superga2, alt: "Basilica di Superga rising above the hills east of Turin" },
        { src: supergaBasilisca, alt: "The grand baroque facade of the Basilica di Superga" },
        { src: tombOfSavoy, alt: "The Royal Tombs of the House of Savoy inside the Basilica di Superga" },
        { src: sassiStation, alt: "Sassi station — the starting point of the historic rack tram to Superga" },
      ],
      intel: [
        "It's a big walking day, so pace yourself. The panorama from Superga is the keeper photo of the trip.",
      ],
      heroImage: supergaImg,
    },
    {
      n: 8,
      weekday: "Wed",
      date: "8 Jul",
      title: "Departure",
      label: "ARRIVEDERCI, AMORE",
      sticker: "wine",
      vibe: "early · wistful · over-packed",
      lead: "both",
      summary:
        "A pre-dawn start to catch the airport train and the morning flight home. If timing allows, one last bicerin before you go — but the 06:13 train is the thing that matters.",
      transitFromBase:
        "Departure day — you leave the base before dawn for the airport. The metro and airport-train steps are in the anchors below.",
      anchors: [
        {
          label: "Wake-up",
          time: "~04:45",
          type: "transit",
          detail: "Set an alarm for about 04:45 — it's an early start to make the airport train.",
          booking: "na",
        },
        {
          label: "Metro Dante → Porta Susa",
          time: "05:54",
          type: "transit",
          detail:
            "Take the 05:54 metro from Dante toward Fermi to Porta Susa, which brings you straight into Porta Susa railway station.",
          booking: "na",
        },
        {
          label: "Airport train Porta Susa → Torino Airport",
          time: "06:13",
          type: "transit",
          detail:
            "Board the 06:13 SFM regional train from Porta Susa to Torino Aeroporto (about 30 minutes). This is the train to catch.",
          booking: "na",
        },
        {
          label: "Flight TRN → CPH",
          time: "09:05",
          type: "flight",
          detail:
            "Your flight home leaves Turin (TRN) at 09:05 and lands in Copenhagen (CPH) at 11:10.",
          booking: "na",
        },
      ],
      ideas: [
        {
          name: "A last bicerin at Caffè Al Bicerin",
          why: "If there's time before the airport, the historic Caffè Al Bicerin serves the bicerin — Turin's classic layered drink of espresso, chocolate and cream.",
          area: "Centro",
          tip: "Only if your timing is comfortable — don't risk the train for it.",
          mapsQuery: "Caffè Al Bicerin, Torino",
        },
      ],
      photos: [],
      intel: [
        "Pack the wine and oils in your CHECKED bag, not your carry-on. Leave early — the 06:13 train is the one you must make.",
      ],
      heroImage: panino,
    },
  ],
  food: [
    { name: "Tarì – Cake Lab Viennoiserie", hours: "Wed–Fri 08–15 · Sat 09–15 · Sun 09–13 · Mon–Tue closed" },
    {
      name: "Tisaneria della Consolata",
      hours: "Tue–Thu 16:30–19:30 & 21:30–00:00 · Fri–Sat to 01:00 · Sun 15:30–20:00 · Mon closed",
    },
    { name: "Caffè Elena", hours: "Sun–Fri 08–14 · Sat 08–15 · Wed closed" },
    { name: "Caffè Al Bicerin", hours: "Thu–Sun & Mon–Tue 08:30–19:30 · Wed closed" },
    { name: "Take-away street food", hours: "All days ~12:00–20:30" },
  ],
  packing: [
    "Train + shuttle bundle ticket (Trenitalia app)",
    "Flip-flops",
    "Towel",
    "Backpack for Lago Grande",
    "ID (carry for the Mole, Day 4)",
    "Refillable water bottle",
  ],
  tips: {
    transit: [
      "GTT runs Turin's metro, trams and city buses — a multi-day GTT pass can pay off, though single tickets are also fine.",
      "Regional trains for the day trips (Avigliana, Susa) are separate from the city network and cheap — buy them in the Trenitalia app.",
      "Free public drinking fountains — the green bull-headed 'toret' fountains — are all over the city, so refill your bottle as you go.",
    ],
    food: [
      "At the markets, the best produce and the flea-market finds go before 09:00 — arrive early.",
      "Aperitivo is a Turin institution: buy one drink in the early evening and the snacks that come with it are generous enough to be dinner.",
    ],
    weather: [
      "Early July is hot — around 28–32 °C and often humid.",
      "Save the indoor museums for the hottest part of the afternoon.",
      "Carry water and refill at the toret fountains; the heat sneaks up on you.",
    ],
  },
  budget: [
    { cat: "Airport trains (in + out)", amt: 110 },
    { cat: "Museo Egizio (booked)", amt: 270 },
    { cat: "Automobile museum (15 € pp)", amt: 225 },
    { cat: "Mole Cinema Museum + lift (booked)", amt: 255 },
    { cat: "Sacra train + shuttle bundle", amt: 250 },
    { cat: "Susa day-trip train", amt: 180 },
    { cat: "Sassi–Superga rack tram", amt: 135 },
    { cat: "GTT city travel", amt: 270 },
  ],
  budgetTotalDkk: "≈ 1,900 DKK couple (fixed costs)",
  memories: [
    { caption: "FILE EMPTY — to be developed", img: null },
    { caption: "FILE EMPTY — to be developed", img: null },
    { caption: "FILE EMPTY — to be developed", img: null },
    { caption: "FILE EMPTY — to be developed", img: null },
  ],
};
