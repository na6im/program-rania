const SPORT_A = {
  info: "Sem. 1–2 post-césarienne : doux, pas de pression abdominale.",
  days: {
    Tous: ["Respiration abdominale profonde 3x10", "Kegel 3x10"],
    Lundi: ["Pont fessier 3x10", "Squats lents 3x10", "Marche rapide 10–15 min"],
    Mardi: ["Rowing élastique 3x12", "Élévations latérales 3x12", "Vélo/Marche 15 min"],
    Mercredi: ["Pont fessier 3x12", "Squats lents 3x12", "Marche poussette 15 min"],
    Jeudi: ["Rowing élastique 3x12", "Respiration hypopressive 3x8", "Vélo/Marche 10–15 min"],
    Vendredi: ["Pont fessier 3x12", "Squats 3x12", "Marche rapide 15–20 min"],
    Samedi: ["Rowing élastique 3x12", "Élévations latérales 3x12", "Vélo/Marche 15 min"],
    Dimanche: ["Étirements doux 10 min"],
  },
};
const SPORT_B = {
  info: "Sem. 3–4 : + volume, cardio 20–25 min.",
  days: {
    Tous: ["Respiration/hypopressive 3x12", "Kegel 3x12"],
    Lundi: ["Pont fessier 3x12", "Squats 3x12", "Marche rapide 20 min"],
    Mardi: ["Rowing 3x15", "Élévations latérales 3x15", "Vélo/Marche 20 min"],
    Mercredi: ["Pont fessier 3x15", "Squats 3x15", "Marche 20–25 min"],
    Jeudi: ["Rowing 3x15", "Hypopressive 3x10", "Vélo/Marche 20 min"],
    Vendredi: ["Pont fessier 3x15", "Squats 3x15", "Marche 25 min"],
    Samedi: ["Rowing 3x15", "Élévations latérales 3x15", "Vélo/Marche 20–25 min"],
    Dimanche: ["Étirements doux 15 min"],
  },
};
const SPORT_C = {
  info: "Sem. 5–6 : + élastiques bas du corps, fractionné doux.",
  days: {
    Tous: ["Hypopressive 3x12", "Kegel 3x15"],
    Lundi: ["Squats élastique 3x12", "Pont fessier élastique 3x12", "Fractionné 1’/1’ 20 min"],
    Mardi: ["Rowing 3x15", "Élévations latérales 3x15", "Vélo/Marche 25 min"],
    Mercredi: ["Squats élastique 3x15", "Fentes arrière 3x10/jambe", "Fractionné doux 20–25 min"],
    Jeudi: ["Rowing 3x15", "Kickbacks fessiers élastique 3x12/jambe", "Vélo/Marche 25 min"],
    Vendredi: ["Pont fessier élastique 3x15", "Squats 3x15", "Fractionné 1’/1’ 25 min"],
    Samedi: ["Rowing 3x15", "Élévations frontales 3x15", "Vélo/Marche 25–30 min"],
    Dimanche: ["Étirements doux 15 min"],
  },
};
const SPORT_D = {
  info: "Sem. 7–8 : intensité + (toujours doux côté abdos).",
  days: {
    Tous: ["Hypopressive/abdominale profonde 3x15", "Kegel 3x15"],
    Lundi: ["Squats élastique 4x12", "Pont fessier élastique 4x12", "Fractionné 25–30 min"],
    Mardi: ["Rowing 4x15", "Élévations latérales 4x15", "Vélo/Marche 30 min"],
    Mercredi: ["Squats élastique 4x15", "Fentes arrière 3x12/jambe", "HIIT doux 30s/30s x10"],
    Jeudi: ["Rowing 4x15", "Kickbacks fessiers 3x12/jambe", "Marche/Vélo 30–35 min"],
    Vendredi: ["Pont fessier élastique 4x15", "Squats 4x15", "Fractionné 30 min"],
    Samedi: ["Rowing 4x15", "Élévations frontales 4x15", "HIIT doux 30s/30s x12"],
    Dimanche: ["Étirements complets 20 min"],
  },
};
export const SPORT_BLOCKS: Record<"A" | "B" | "C" | "D", any> = { A: SPORT_A, B: SPORT_B, C: SPORT_C, D: SPORT_D };
