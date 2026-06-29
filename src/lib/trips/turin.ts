import type { Trip } from "../types";

import hero from "@/assets/trips/turin/hero.jpg";

// Day header images (user-supplied). Days 5 & 6 keep their existing heroes.
import day1Header from "@/assets/trips/turin/headers/day-1.webp";
import day2Header from "@/assets/trips/turin/headers/day-2.avif";
import day3Header from "@/assets/trips/turin/headers/day-3.jpg";
import day4Header from "@/assets/trips/turin/headers/day-4.jpg";
import day7Header from "@/assets/trips/turin/headers/day-7.jpg";
import day8Header from "@/assets/trips/turin/headers/day-8.jpg";

// Gap photos sourced from Wikimedia Commons (2026-06-28)
import arcoAugustoSusa from "@/assets/trips/turin/arco-augusto-susa.jpg";
import monteCappuccini from "@/assets/trips/turin/monte-cappuccini.jpg";
import villaDellRegina from "@/assets/trips/turin/villa-della-regina.jpg";
import balonFleaMarket from "@/assets/trips/turin/balon-flea-market.jpg";

// Day 1 — Arrival / city centre
import stradaDeTorino from "@/assets/trips/turin/strada-de-torino.jpg";
import piazzaSanCarlo3 from "@/assets/trips/turin/piazza-san-carlo-3.jpg";

// Day 2 — Museo Egizio + royal centre
import egizio2 from "@/assets/trips/turin/egizio-2.jpg";
import piazzaCastello1 from "@/assets/trips/turin/piazza-castello-1.jpg";
import palazzoReale from "@/assets/trips/turin/palazzo-reale.jpg";

// Day 3 — Riverside + aperitivo
import boRiver from "@/assets/trips/turin/bo-river.jpg";
import parcoDelValentino from "@/assets/trips/turin/parco-del-valentino.jpg";
import parcoDelValentino2 from "@/assets/trips/turin/parco-del-valentino-2.jpg";
import aperitivo from "@/assets/trips/turin/aperitivo.jpg";

// Day 4 — Markets + Mole Cinema Museum
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
import superga2 from "@/assets/trips/turin/superga-2.jpg";
import supergaBasilisca from "@/assets/trips/turin/superga-basilisca.jpg";
import tombOfSavoy from "@/assets/trips/turin/tomb-of-the-house-of-savoy.jpg";
import sassiStation from "@/assets/trips/turin/sassi-station.jpg";

// Day 8 — Departure
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
    { name: "Apurva", role: "Field Agent", initials: "AP" },
    { name: "Clara", role: "Field Agent", initials: "CL" },
  ],
  days: [
    {
      n: 1,
      weekday: "Wed",
      date: "1 Jul",
      title: "The arrival",
      label: "TOUCHDOWN",
      sticker: "amber",
      shape: "transit",
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
          startMin: 385,
          type: "flight",
          order: 1,
          timeLock: true,
          detail:
            "Your flight leaves Copenhagen (CPH) at 06:25 and lands in Turin (TRN) at 08:35.",
          booking: "na",
        },
        {
          label: "Airport train → Porta Susa",
          type: "transit",
          order: 2,
          detail:
            "At the airport, take the SFM regional train from Torino Aeroporto toward Asti/Alba; get off at Porta Susa (about 30 min, 3.70 € per person). Departures at 9:17 or 9:30.",
          booking: "na",
        },
        {
          label: "Drop bags at Radical Storage, Porta Susa",
          type: "transit",
          order: 3,
          detail:
            "Leave your luggage at the Radical Storage left-luggage point at Porta Susa station — book and pay for your slot in the Radical Storage app first, then you are free to wander hands-empty.",
          booking: "na",
        },
        {
          label: "Apartment check-in, Corso Dante 72",
          time: "15:00",
          startMin: 900,
          type: "transit",
          order: 6,
          timeLock: true,
          detail:
            "Check-in opens at 15:00 at Corso Dante 72 (Dante metro). From Porta Susa, take the metro toward Bengasi and get off at Dante (~8 min); the apartment is a short walk from the station.",
          booking: "na",
        },
      ],
      ideas: [
        {
          name: "Free time until check-in",
          why: "Bags dropped — explore the centre, coffee, a piazza, lunch, and hang out until the 15:00 check-in.",
          area: "Centro / Quadrilatero",
          mapsQuery: "Piazza Castello, Torino",
          order: 4,
          section: "UNTIL CHECK-IN",
        },
        {
          name: "Supermarket run near the base",
          why: "Stock the apartment for breakfasts and snacks. Three supermarkets sit close to Corso Dante 72: Prestofresco, Carrefour Express and Pam Local.",
          area: "Corso Dante",
          tip: "Pick whichever is nearest and open — all three carry the basics.",
          mapsQuery: "supermarket Corso Dante, Torino",
          order: 5,
          section: "UNTIL CHECK-IN",
          optional: true,
        },
      ],
      photos: [
        { src: stradaDeTorino, alt: "A grand arcaded street in Turin's historic centre" },
        { src: piazzaSanCarlo3, alt: "Piazza San Carlo — Turin's elegant baroque 'drawing-room' square" },
      ],
      intel: [
        "Don't overbook day one. Drop the bags at Porta Susa first, then wander until the 15:00 apartment check-in — there's no need to plan anything before then.",
      ],
      heroImage: day1Header,
    },
    {
      n: 2,
      weekday: "Thu",
      date: "2 Jul",
      title: "Egyptian gold",
      label: "EGYPT IN ITALY",
      sticker: "wine",
      shape: "anchored",
      vibe: "ancient · ornate · arcaded",
      lead: "Apurva",
      summary:
        "Booked into the Museo Egizio at 10:00 — the second-largest Egyptian collection on Earth. Afterwards, drift through the royal heart of the city: grand squares, baroque churches and arcaded avenues.",
      transitFromBase:
        "From Corso Dante 72, walk to Dante metro and take the metro toward Fermi; get off at Porta Nuova (3 stops, ~5 min), then walk up Via Roma into the centre.",
      anchors: [
        {
          label: "To the centre",
          type: "transit",
          order: 1,
          section: "MORNING",
          detail:
            "Leave around 9:15 — Dante metro toward Fermi to Porta Nuova (~5 min), then walk Via Roma → Piazza San Carlo → Via Accademia delle Scienze to the museum.",
          booking: "na",
        },
        {
          label: "Museo Egizio",
          time: "10:00",
          startMin: 600,
          type: "ticket",
          order: 2,
          section: "MORNING",
          detail:
            "Your booked 10:00 entry to the Museo Egizio (the Egyptian Museum) at Via Accademia delle Scienze 6. It holds the second-largest collection of Egyptian antiquities in the world.",
          booking: "booked",
          bookingLink: "https://museitorino.it/",
          confirmationKey: "egizio-conf",
          mapsQuery: "Museo Egizio, Torino",
        },
      ],
      ideas: [
        {
          name: "Lunch at a tavola calda",
          why: "A 'tavola calda' is a casual Italian counter where you point at freshly cooked dishes — a quick, cheap, no-fuss lunch near the museum.",
          area: "Centro",
          tip: "Point at what looks good; you usually pay by plate or by weight.",
          mapsQuery: "tavola calda centro Torino",
          kind: "food",
          order: 3,
          section: "MIDDAY",
        },
        {
          name: "Piazza San Carlo",
          why: "Turin's elegant 'drawing-room' square, framed by twin baroque churches and grand arcaded cafés.",
          area: "Centro",
          mapsQuery: "Piazza San Carlo, Torino",
          photo: { src: piazzaSanCarlo3, alt: "Piazza San Carlo — Turin's baroque square lined with arcaded cafés" },
          order: 4,
          section: "AFTERNOON",
        },
        {
          name: "Piazza Castello & Palazzo Reale",
          why: "The royal heart of the city: the Savoy palace (Palazzo Reale) on its grand square. The courtyard is free to wander; the palace interior is ticketed.",
          area: "Centro",
          cost: "Palazzo Reale ~17 € pp",
          mapsQuery: "Palazzo Reale, Torino",
          photo: { src: palazzoReale, alt: "Palazzo Reale — the Savoy royal palace on Piazza Castello" },
          order: 5,
          section: "AFTERNOON",
        },
        {
          name: "Via Roma arcades",
          why: "Turin's main shopping avenue runs entirely under elegant covered arcades — welcome shade on a hot day, linking Porta Nuova to Piazza Castello.",
          area: "Centro",
          mapsQuery: "Via Roma, Torino",
          order: 6,
          section: "AFTERNOON",
          optional: true,
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
      heroImage: day2Header,
    },
    {
      n: 3,
      weekday: "Fri",
      date: "3 Jul",
      title: "Motor city",
      label: "MOTOR CITY",
      sticker: "amber",
      shape: "anchored",
      vibe: "mechanical · riverside · slow-evening",
      lead: "Apurva",
      summary:
        "Turin is Italy's car capital, and today leans into it at the National Automobile Museum down in Lingotto. Then an easy riverside walk by the Po and an unhurried aperitivo to close the day.",
      transitFromBase:
        "From Corso Dante 72, walk to Dante metro and take the metro toward Bengasi; get off at Lingotto (~4 min) — the museum is a short, signposted walk from the station.",
      anchors: [
        {
          label: "To Lingotto",
          type: "transit",
          order: 1,
          section: "MORNING",
          detail:
            "Dante metro → Lingotto (dir Bengasi, ~4 min), then a 10–15 min walk to the museum.",
          booking: "na",
        },
        {
          label: "National Automobile Museum (MAUTO)",
          time: "10:00–19:00",
          startMin: 600,
          type: "ticket",
          order: 2,
          section: "MORNING",
          duration: "~2–3h",
          detail:
            "The National Automobile Museum (Museo Nazionale dell'Automobile, also called MAUTO). It's open 10:00–19:00 and tickets are about 15 € per person. Buy online beforehand or at the door.",
          booking: "toBook",
          bookingLink: "https://www.museoauto.com/",
          confirmationKey: "mauto-conf",
          mapsQuery: "Museo Nazionale dell'Automobile, Torino",
        },
      ],
      ideas: [
        {
          name: "Lunch around Lingotto",
          why: "Have lunch near Lingotto station after the museum — plenty of casual options in the area.",
          area: "Lingotto",
          mapsQuery: "ristorante Lingotto, Torino",
          kind: "food",
          order: 3,
          section: "MIDDAY",
        },
        {
          name: "Riverside walk along the Po",
          why: "The Po river runs close to Lingotto; a flat, shady riverside stroll is an easy way to unwind after the museum.",
          area: "Lingotto / Po",
          mapsQuery: "Lungo Po, Torino",
          order: 4,
          section: "AFTERNOON",
        },
        {
          name: "Aperitivo to close the day",
          why: "Wind down with an aperitivo — order a drink in the early evening and graze the snacks that come with it. Two well-rated spots are Caffè Bellini and L'Aperitivo DiVino.",
          area: "Centro / Lingotto",
          mapsQuery: "Caffè Bellini, Torino",
          kind: "food",
          order: 5,
          section: "EVENING",
          optional: true,
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
      heroImage: day3Header,
    },
    {
      n: 4,
      weekday: "Sat",
      date: "4 Jul",
      title: "Market raid",
      label: "MARKET RAID",
      sticker: "amber",
      shape: "anchored",
      vibe: "early · bustling · cinematic",
      lead: "both",
      summary:
        "An early start for the markets — Porta Palazzo and the Saturday-only Balôn flea market — then a leisurely middle of the day in the old lanes, and a booked 15:00 climb up the Mole for the Cinema Museum and the panoramic lift.",
      transitFromBase:
        "From Corso Dante 72, walk to Dante metro and take the metro toward Fermi; get off at Porta Nuova (~5 min), then walk into the centre toward the markets and, later, the Mole.",
      anchors: [
        {
          label: "To the markets",
          type: "transit",
          order: 1,
          section: "MORNING",
          detail:
            "Dante metro → Porta Nuova (dir Fermi, ~5 min), then walk Via Roma → Piazza Castello → Via Garibaldi to the markets.",
          booking: "na",
        },
        {
          label: "Balôn flea market + Porta Palazzo market",
          time: "from 07:00",
          startMin: 420,
          type: "market",
          order: 2,
          section: "MORNING",
          detail:
            "Two markets sit side by side near Porta Palazzo: the huge daily Porta Palazzo food-and-goods market, and the Balôn flea market (Saturdays only). Both get going around 07:00 and are best early.",
          booking: "na",
          mapsQuery: "Porta Palazzo, Torino",
        },
        {
          label: "Mole — Cinema Museum + panoramic lift",
          time: "15:00",
          startMin: 900,
          type: "ticket",
          order: 5,
          section: "AFTERNOON",
          detail:
            "Your booked 15:00 entry to the National Cinema Museum inside the Mole Antonelliana, including the glass panoramic lift to the top for the city view. Carry your ID.",
          booking: "booked",
          bookingLink: "https://www.museocinema.it/",
          confirmationKey: "mole-conf",
          mapsQuery: "Mole Antonelliana, Torino",
        },
      ],
      ideas: [
        {
          name: "Cake, coffee & lunch in the Quadrilatero",
          why: "The Quadrilatero Romano is the old grid of narrow lanes packed with bakeries, cafés and casual lunch spots — the place to refuel between the morning markets and the afternoon Mole.",
          area: "Quadrilatero",
          mapsQuery: "Quadrilatero Romano, Torino",
          kind: "food",
          order: 3,
          section: "MIDDAY",
        },
        {
          name: "Via Garibaldi stroll",
          why: "One of Europe's longest pedestrian streets, running straight from Piazza Castello — an easy, car-free walk back across the centre.",
          area: "Centro",
          mapsQuery: "Via Garibaldi, Torino",
          order: 4,
          section: "MIDDAY",
          optional: true,
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
      heroImage: day4Header,
    },
    {
      n: 5,
      weekday: "Sun",
      date: "5 Jul",
      title: "The abbey job",
      label: "THE ABBEY JOB",
      sticker: "wine",
      shape: "anchored",
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
          order: 2,
          section: "GETTING THERE",
          detail:
            "From Dante take the metro toward Fermi to Porta Nuova (~6 min) to reach the regional-train platforms.",
          booking: "na",
        },
        {
          label: "Train Porta Nuova → Avigliana",
          time: "07:45 / 08:45 / 09:15 / 09:45 / 10:45",
          startMin: 465,
          type: "ticket",
          order: 3,
          section: "GETTING THERE",
          timeLock: true,
          detail:
            "Regional train from Porta Nuova toward Susa/Bardonecchia/Modane; get off at Avigliana (~30 min). Useful departures: 07:45, 08:45, 09:15, 09:45, 10:45. Buy the train + shuttle BUNDLE in the Trenitalia app.",
          booking: "toBook",
          bookingLink: "https://www.trenitalia.com/",
          confirmationKey: "sacra-train-conf",
          mapsQuery: "Stazione di Avigliana",
        },
        {
          label: "Avigliana shuttle up to the Sacra",
          time: "ONLY 09:00 / 10:00 / 14:00 / 16:00",
          startMin: 540,
          type: "shuttle",
          order: 4,
          section: "GETTING THERE",
          timeLock: true,
          detail:
            "A shuttle bus runs from Avigliana up to the Sacra di San Michele at fixed times only: 09:00, 10:00, 14:00 and 16:00. There's no easy alternative up, so plan your train to connect with one of these.",
          booking: "na",
          mapsQuery: "Sacra di San Michele",
        },
        {
          label: "Shuttle back down from the Sacra",
          time: "ONLY 09:30 / 10:30 / 14:30 / 16:30 / 18:30",
          startMin: 570,
          type: "shuttle",
          order: 6,
          section: "AFTER THE SACRA",
          timeLock: true,
          detail:
            "The return shuttle from the Sacra down to Avigliana also runs at fixed times only: 09:30, 10:30, 14:30, 16:30 and 18:30. Note your slot before you head up.",
          booking: "na",
          mapsQuery: "Sacra di San Michele",
        },
        {
          label: "Train Avigliana → Porta Nuova, home",
          type: "transit",
          order: 8,
          section: "HOME",
          detail:
            "Walk back to Avigliana station and take the regional train to Porta Nuova (~30 min), then the metro home to Dante.",
          booking: "na",
          mapsQuery: "Stazione di Avigliana",
        },
      ],
      ideas: [
        {
          name: "Make lunch from home",
          why: "Pack a lunch before you leave — the abbey and lake day is long and food options on the route are limited.",
          area: "Corso Dante",
          mapsQuery: "",
          kind: "food",
          order: 1,
          section: "BEFORE YOU GO",
          optional: true,
        },
        {
          name: "Sacra di San Michele",
          why: "A dramatic 10th-century abbey perched on Mount Pirchiriano — the building that inspired Umberto Eco's novel *The Name of the Rose*. The views over the valley are the reward for the climb.",
          area: "Mount Pirchiriano / Avigliana",
          mapsQuery: "Sacra di San Michele",
          kind: "viewpoint",
          photo: { src: sacraDiSanMichele, alt: "Sacra di San Michele — the 10th-century abbey perched on Mount Pirchiriano above Val di Susa" },
          order: 5,
          section: "THE SACRA",
        },
        {
          name: "Lago Grande di Avigliana — swim & picnic",
          why: "Walk Corso Torino → Corso Laghi (~20–25 min) down to the lakeside — swim & picnic. A clear lake near Avigliana, the cool-down reward after the abbey.",
          area: "Avigliana",
          tip: "Bring flip-flops, a towel and a backpack for your lake things.",
          mapsQuery: "Baia Grande, Lago Grande di Avigliana",
          photo: { src: lacsDavcgliana2, alt: "Lago Grande di Avigliana — clear summer waters below the Sacra di San Michele" },
          order: 7,
          section: "AFTER THE SACRA",
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
      sticker: "wine",
      shape: "route",
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
          order: 1,
          detail:
            "From Dante take the metro toward Fermi to Porta Nuova (~6 min) to reach the regional-train platforms.",
          booking: "na",
        },
        {
          label: "Train Porta Nuova → Susa",
          type: "ticket",
          order: 2,
          detail:
            "Regional train from Porta Nuova to Susa (about 1 hour 6 minutes). Buy it in the Trenitalia app or at the station.",
          booking: "toBook",
          bookingLink: "https://www.trenitalia.com/",
          confirmationKey: "susa-train-conf",
          mapsQuery: "Susa, TO",
        },
        // RESEARCH at build time: Susa → Torino Porta Nuova return times via trenitalia.com / SFM.
        // Trains run roughly hourly into the evening; verify exact times before the trip.
        {
          label: "Return train Susa → Porta Nuova",
          time: "≈ hourly to ~20:00",
          startMin: 1200,
          type: "transit",
          order: 8,
          detail: "Verify exact times in the Trenitalia app the morning of. ~1h06.",
          booking: "na",
        },
      ],
      ideas: [
        {
          name: "Make lunch from home",
          why: "Pack a lunch before you set off — Susa is a small mountain town, and a picnic is the easy, cheap way to eat well between the ruins.",
          area: "Corso Dante",
          mapsQuery: "",
          kind: "food",
          optional: true,
          order: 0,
        },
        {
          name: "Arch of Augustus (Arco di Augusto)",
          why: "A well-preserved Roman triumphal arch from around 9–8 BC, still standing in the old town of Susa.",
          area: "Susa",
          mapsQuery: "Arco di Augusto, Susa",
          photo: { src: arcoAugustoSusa, alt: "Arco di Augusto — the Roman triumphal arch standing in Susa since 9–8 BC", credit: "Duvilar (Lorenzo Rossetti) / Wikimedia Commons (CC BY-SA 3.0)" },
          order: 3,
        },
        {
          name: "The Roman amphitheatre",
          why: "The remains of Susa's Roman amphitheatre — a quiet reminder that this little Alpine town was once a Roman outpost.",
          area: "Susa",
          mapsQuery: "Anfiteatro Romano, Susa",
          order: 4,
        },
        {
          name: "Porta Savoia",
          why: "An ancient Roman city gate, later built into Susa's medieval defences.",
          area: "Susa",
          mapsQuery: "Porta Savoia, Susa",
          order: 5,
        },
        {
          name: "Susa Cathedral (San Giusto)",
          why: "The 11th-century Cathedral of San Giusto, with its tall bell tower, anchors the centre of town.",
          area: "Susa",
          mapsQuery: "Cattedrale di San Giusto, Susa",
          order: 6,
        },
        {
          name: "Lunch in town",
          why: "Susa is small and walkable — pick a trattoria in the centre for a relaxed mountain-town lunch between sights.",
          area: "Susa",
          mapsQuery: "ristorante centro Susa",
          kind: "food",
          optional: true,
          order: 7,
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
      shape: "route",
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
          order: 1,
          detail:
            "From Dante take the metro toward Fermi to Porta Nuova (~5 min), then catch bus 52 or 66 and get off at the Crimea stop (~6 min) to start the hillside loop.",
          booking: "na",
        },
        {
          label: "Sassi–Superga rack tram (Cremagliera)",
          type: "ticket",
          order: 6,
          detail:
            "The historic Sassi–Superga rack railway (the 'Cremagliera') climbs from Sassi station up to the Basilica of Superga (~18 min up). Buy tickets at Sassi station or through GTT, the city transport company.",
          booking: "toBook",
          bookingLink: "https://www.gtt.to.it/",
          confirmationKey: "superga-tram-conf",
          mapsQuery: "Stazione Sassi, Torino",
        },
      ],
      ideas: [
        {
          name: "Monte dei Cappuccini viewpoint",
          why: "A small hill with a church and one of the best free panoramas of Turin and the Alps, just across the river from the centre.",
          area: "Monte dei Cappuccini",
          mapsQuery: "Monte dei Cappuccini, Torino",
          kind: "viewpoint",
          photo: { src: monteCappuccini, alt: "Santa Maria al Monte dei Cappuccini — the hilltop church with panoramic views over Turin", credit: "GJo / Wikimedia Commons (CC BY-SA 3.0)" },
          order: 2,
        },
        {
          name: "Villa della Regina",
          why: "A 17th-century royal villa with terraced Italian gardens climbing the hillside and looking back over the city.",
          area: "Collina",
          cost: "~5 € pp",
          mapsQuery: "Villa della Regina, Torino",
          photo: { src: villaDellRegina, alt: "Villa della Regina — the terraced gardens of the 17th-century royal villa on Turin's hillside", credit: "Zairon / Wikimedia Commons (CC BY-SA 4.0)" },
          order: 3,
        },
        {
          name: "Walk to the Gran Madre, then bus to Sassi",
          why: "From the hill it's about a 14-minute walk down to the Gran Madre di Dio church by the river; from there bus 61 reaches the Sassi rack-tram station in about 13 minutes.",
          area: "Gran Madre / Sassi",
          mapsQuery: "Gran Madre di Dio, Torino",
          photo: { src: sassiStation, alt: "Sassi station — the lower terminus of the Cremagliera historic rack tram up to Superga" },
          order: 4,
        },
        {
          name: "Lunch near Sassi",
          why: "Grab lunch around the Sassi station before riding the rack tram up to Superga.",
          area: "Sassi",
          mapsQuery: "ristorante Sassi Torino",
          kind: "food",
          order: 5,
        },
        {
          name: "Basilica di Superga + Royal Tombs",
          why: "The grand hilltop basilica, reached by the rack tram (~18 min up), holds the royal tombs of the House of Savoy and a sweeping view over the city and mountains.",
          area: "Superga",
          mapsQuery: "Basilica di Superga",
          kind: "viewpoint",
          photo: { src: supergaBasilisca, alt: "The Basilica di Superga — Turin's grand hilltop church holding the Royal Tombs of the House of Savoy" },
          order: 7,
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
      heroImage: day7Header,
    },
    {
      n: 8,
      weekday: "Wed",
      date: "8 Jul",
      title: "Departure",
      label: "ARRIVEDERCI, AMORE",
      sticker: "wine",
      shape: "transit",
      vibe: "early · wistful · over-packed",
      lead: "both",
      summary:
        "A pre-dawn start to catch the airport train and the morning flight home. The 06:13 train from Porta Susa is the only thing that matters today.",
      transitFromBase:
        "Departure day — you leave the base before dawn for the airport. The metro and airport-train steps are in the anchors below.",
      anchors: [
        {
          label: "Wake-up",
          time: "~04:45",
          startMin: 285,
          type: "transit",
          order: 1,
          timeLock: true,
          detail: "Set an alarm for about 04:45 — it's an early start to make the airport train.",
          booking: "na",
        },
        {
          label: "Metro Dante → Porta Susa",
          time: "05:54",
          startMin: 354,
          type: "transit",
          order: 2,
          timeLock: true,
          detail:
            "Take the 05:54 metro from Dante toward Fermi to Porta Susa, which brings you straight into Porta Susa railway station.",
          booking: "na",
        },
        {
          label: "Airport train Porta Susa → Torino Airport",
          time: "06:13",
          startMin: 373,
          type: "transit",
          order: 3,
          timeLock: true,
          detail:
            "Board the 06:13 SFM regional train from Porta Susa to Torino Aeroporto (about 30 minutes). This is the train to catch.",
          booking: "na",
        },
        {
          label: "Flight TRN → CPH",
          time: "09:05",
          startMin: 545,
          type: "flight",
          order: 4,
          timeLock: true,
          detail:
            "Your flight home leaves Turin (TRN) at 09:05 and lands in Copenhagen (CPH) at 11:10.",
          booking: "na",
        },
      ],
      ideas: [],
      photos: [],
      intel: [
        "Pack the wine and oils in your CHECKED bag, not your carry-on. Leave early — the 06:13 train is the one you must make.",
      ],
      heroImage: day8Header,
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
    "Sun hat",
    "Sunscreen",
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
      "Early July in Turin is hot — roughly 30–35 °C, humid, and hotter in a heatwave.",
      "On city days, save the indoor museums for the 13:00–16:00 peak and walk the arcaded streets (Via Roma) for shade.",
      "On the day-trips (Sacra, Susa, Superga) you're outdoors in the heat — start early, wear a hat, and carry water.",
      "Refill free at the green bull-head 'toret' fountains all over the city.",
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
  memories: [],
};
