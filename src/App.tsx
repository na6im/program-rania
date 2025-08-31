import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { CalendarDays, Dumbbell, ClipboardList, CheckCircle2, RotateCcw, Save, Download } from "lucide-react";

// ------------------------------
// Helpers & Types
// ------------------------------
const WEEK_TO_MENU: Record<number, "A" | "B" | "C" | "D"> = {
  1: "A", 2: "A", 3: "B", 4: "B", 5: "C", 6: "C", 7: "D", 8: "D",
};
const WEEK_TO_SPORT: Record<number, "A" | "B" | "C" | "D"> = WEEK_TO_MENU; // même mapping par simplicité

type Meal = { name: string; items: string; kcal: number; P: number; G: number; L: number };
type DayPlan = { meals: Meal[] };

type MenuVariant = Record<string, DayPlan>; // Lundi..Dimanche

// ------------------------------
// MENUS (A, B, C, D) – d'après les PDF partagés ci-dessus
// Poids cru/cuit indiqué dans le texte
// ------------------------------
const MENU_A: MenuVariant = {
  Lundi: { meals: [
    { name: "Petit-déj.", items: "Flocons avoine 50g, Lait écrémé 200ml, Banane 100g, Amandes 15g", kcal: 400, P: 15, G: 60, L: 12 },
    { name: "Déjeuner", items: "Poulet 120g (cru), Quinoa 70g (cuit), Brocolis 150g, Huile olive 10g", kcal: 450, P: 35, G: 40, L: 15 },
    { name: "Collation", items: "Yaourt nature 125g, Noix 15g", kcal: 200, P: 10, G: 10, L: 12 },
    { name: "Dîner", items: "Omelette 2 œufs, Salade 150g, Pain complet 40g", kcal: 350, P: 25, G: 25, L: 15 },
  ]},
  Mardi: { meals: [
    { name: "Petit-déj.", items: "Pain complet 50g, Fromage frais 0% 50g, Pomme 120g", kcal: 350, P: 15, G: 45, L: 8 },
    { name: "Déjeuner", items: "Poisson blanc 120g (cru), Patate douce 150g, Haricots verts 150g, Huile olive 10g", kcal: 450, P: 35, G: 35, L: 15 },
    { name: "Collation", items: "Pomme 120g, Amandes 15g", kcal: 200, P: 5, G: 20, L: 10 },
    { name: "Dîner", items: "Soupe légumes 300g, Pain complet 40g, Yaourt nature 125g", kcal: 300, P: 12, G: 30, L: 8 },
  ]},
  Mercredi: { meals: [
    { name: "Petit-déj.", items: "Smoothie (Lait 200ml, Fruits rouges 100g, Flocons avoine 30g)", kcal: 350, P: 15, G: 55, L: 8 },
    { name: "Déjeuner", items: "Dinde 120g, Riz complet 70g (cuit), Ratatouille 150g", kcal: 450, P: 35, G: 40, L: 12 },
    { name: "Collation", items: "Carottes 100g, Houmous 30g", kcal: 150, P: 4, G: 15, L: 7 },
    { name: "Dîner", items: "Salade : Thon 100g, Œuf 50g, Maïs 50g, Salade 100g", kcal: 350, P: 25, G: 25, L: 15 },
  ]},
  Jeudi: { meals: [
    { name: "Petit-déj.", items: "Yaourt nature 125g, Muesli 40g, Kiwi 100g", kcal: 350, P: 15, G: 55, L: 7 },
    { name: "Déjeuner", items: "Steak haché 5% 120g (cru), Courgettes 150g, Pâtes complètes 50g (cuit), Huile olive 10g", kcal: 450, P: 35, G: 40, L: 15 },
    { name: "Collation", items: "Pomme 120g, Noix 15g", kcal: 200, P: 5, G: 20, L: 10 },
    { name: "Dîner", items: "Omelette 2 œufs 100g, Champignons 100g, Salade 100g", kcal: 300, P: 20, G: 20, L: 12 },
  ]},
  Vendredi: { meals: [
    { name: "Petit-déj.", items: "Œufs brouillés (2 œufs ~100g), Pain complet 40g, Pomme 120g", kcal: 350, P: 20, G: 40, L: 12 },
    { name: "Déjeuner", items: "Poulet 120g, Lentilles 70g (cuit), Carottes 100g, Huile olive 10g", kcal: 450, P: 35, G: 45, L: 15 },
    { name: "Collation", items: "Fromage blanc 0% 125g, Baies 100g", kcal: 150, P: 10, G: 15, L: 2 },
    { name: "Dîner", items: "Poisson 120g (cru), Épinards 150g, Riz basmati 50g (cuit)", kcal: 350, P: 30, G: 35, L: 10 },
  ]},
  Samedi: { meals: [
    { name: "Petit-déj.", items: "Flocons avoine 50g, Lait écrémé 200ml, Pomme râpée 100g, Cannelle", kcal: 350, P: 15, G: 60, L: 7 },
    { name: "Déjeuner", items: "Dinde 120g, Purée patate douce 150g, Brocolis 150g, Huile olive 10g", kcal: 450, P: 35, G: 40, L: 15 },
    { name: "Collation", items: "Orange 120g, Amandes 15g", kcal: 200, P: 5, G: 20, L: 10 },
    { name: "Dîner", items: "Soupe de courgette 300g, Pain complet 40g, Fromage frais 50g", kcal: 300, P: 12, G: 30, L: 8 },
  ]},
  Dimanche: { meals: [
    { name: "Petit-déj.", items: "Smoothie bowl : Banane 100g, Fraises 100g, Yaourt 125g, Chia 10g", kcal: 350, P: 15, G: 55, L: 10 },
    { name: "Déjeuner", items: "Poisson 120g (cru), Quinoa 70g (cuit), Salade 100g, Huile olive 10g", kcal: 450, P: 35, G: 40, L: 15 },
    { name: "Collation", items: "Pomme 120g, Yaourt nature 125g", kcal: 200, P: 10, G: 25, L: 5 },
    { name: "Dîner", items: "Omelette 2 œufs 100g, Poivron 100g, Champignons 100g, Salade 100g", kcal: 350, P: 25, G: 25, L: 15 },
  ]},
};

const MENU_B: MenuVariant = {
  Lundi: { meals: [
    { name: "Petit-déj.", items: "Pain complet 50g, Œufs brouillés 100g, Orange 120g", kcal: 380, P: 20, G: 35, L: 14 },
    { name: "Déjeuner", items: "Saumon 120g (cru), Pommes de terre vapeur 150g, Haricots verts 150g, Huile olive 10g", kcal: 460, P: 30, G: 35, L: 20 },
    { name: "Collation", items: "Fromage blanc 0% 125g, Amandes 15g", kcal: 200, P: 12, G: 8, L: 12 },
    { name: "Dîner", items: "Omelette 2 œufs 100g, Courgettes 150g, Pain complet 40g", kcal: 350, P: 23, G: 25, L: 14 },
  ]},
  Mardi: { meals: [
    { name: "Petit-déj.", items: "Flocons avoine 40g, Lait 200ml, Pomme 120g", kcal: 350, P: 12, G: 55, L: 7 },
    { name: "Déjeuner", items: "Poulet 120g, Boulgour 70g (cuit), Brocolis 150g, Huile olive 10g", kcal: 450, P: 35, G: 40, L: 15 },
    { name: "Collation", items: "Yaourt 125g, Noix 15g", kcal: 200, P: 8, G: 12, L: 12 },
    { name: "Dîner", items: "Thon boîte 100g, Tomate 100g, Concombre 100g, Maïs 50g", kcal: 320, P: 25, G: 20, L: 10 },
  ]},
  Mercredi: { meals: [
    { name: "Petit-déj.", items: "Smoothie : Banane 100g, Fraises 100g, Lait 200ml, Flocons 20g", kcal: 340, P: 12, G: 55, L: 6 },
    { name: "Déjeuner", items: "Dinde 120g, Riz basmati 70g (cuit), Carottes 150g, Huile 10g", kcal: 440, P: 35, G: 40, L: 14 },
    { name: "Collation", items: "Fromage blanc 125g, Baies 100g", kcal: 150, P: 10, G: 15, L: 2 },
    { name: "Dîner", items: "Omelette 2 œufs, Champignons 100g, Salade 100g", kcal: 300, P: 20, G: 15, L: 12 },
  ]},
  Jeudi: { meals: [
    { name: "Petit-déj.", items: "Pain 50g, Beurre d’amande 15g, Kiwi 100g", kcal: 360, P: 12, G: 45, L: 12 },
    { name: "Déjeuner", items: "Poisson blanc 120g, Patate douce 150g, Épinards 150g, Huile 10g", kcal: 450, P: 30, G: 40, L: 15 },
    { name: "Collation", items: "Carottes 100g, Houmous 30g", kcal: 150, P: 4, G: 15, L: 7 },
    { name: "Dîner", items: "Dinde 120g, Courgettes 150g, Pain complet 40g", kcal: 350, P: 30, G: 25, L: 10 },
  ]},
  Vendredi: { meals: [
    { name: "Petit-déj.", items: "Avoine 40g, Yaourt 125g, Fruits rouges 100g", kcal: 340, P: 15, G: 50, L: 6 },
    { name: "Déjeuner", items: "Œufs durs (2, ~100g), Lentilles 100g (cuit), Salade 100g, Huile 10g", kcal: 430, P: 28, G: 35, L: 15 },
    { name: "Collation", items: "Pomme 120g, Amandes 15g", kcal: 200, P: 5, G: 20, L: 10 },
    { name: "Dîner", items: "Colin 120g, Riz complet 50g (cuit), Brocolis 150g", kcal: 320, P: 30, G: 25, L: 8 },
  ]},
  Samedi: { meals: [
    { name: "Petit-déj.", items: "Pain 50g, Œuf 50g, Fromage frais 0% 50g", kcal: 320, P: 20, G: 35, L: 7 },
    { name: "Déjeuner", items: "Poulet 120g, Couscous complet 70g (cuit), Légumes vapeur 150g, Huile 10g", kcal: 450, P: 35, G: 40, L: 15 },
    { name: "Collation", items: "Fromage blanc 125g, Noix 15g", kcal: 200, P: 12, G: 8, L: 12 },
    { name: "Dîner", items: "Omelette 2 œufs, Tomates 100g, Concombre 100g, Pain 40g", kcal: 350, P: 25, G: 25, L: 12 },
  ]},
  Dimanche: { meals: [
    { name: "Petit-déj.", items: "Smoothie bowl : Banane 100g, Mangue 100g, Yaourt 125g, Chia 10g", kcal: 350, P: 15, G: 55, L: 10 },
    { name: "Déjeuner", items: "Saumon 120g, Quinoa 70g (cuit), Asperges 150g, Huile 10g", kcal: 460, P: 30, G: 40, L: 20 },
    { name: "Collation", items: "Pomme 120g, Yaourt 125g", kcal: 200, P: 10, G: 25, L: 5 },
    { name: "Dîner", items: "Omelette 2 œufs 100g, Poivron 100g, Champignons 100g, Salade 100g", kcal: 350, P: 25, G: 25, L: 15 },
  ]},
};

const MENU_C: MenuVariant = {
  Lundi: { meals: [
    { name: "Petit-déj.", items: "Porridge (Avoine 40g, Lait 200ml, Poire 100g)", kcal: 350, P: 12, G: 55, L: 7 },
    { name: "Déjeuner", items: "Dinde 120g, Riz sauvage 70g (cuit), Courgettes 150g, Huile 10g", kcal: 440, P: 35, G: 40, L: 14 },
    { name: "Collation", items: "Yaourt 125g, Noisettes 15g", kcal: 200, P: 8, G: 12, L: 12 },
    { name: "Dîner", items: "Omelette 2 œufs, Poivrons 100g, Salade 100g", kcal: 320, P: 22, G: 18, L: 14 },
  ]},
  Mardi: { meals: [
    { name: "Petit-déj.", items: "Pain complet 50g, Fromage frais 0% 50g, Kiwi 100g", kcal: 330, P: 15, G: 40, L: 7 },
    { name: "Déjeuner", items: "Saumon 120g, Quinoa 70g (cuit), Asperges 150g, Huile 10g", kcal: 460, P: 30, G: 40, L: 20 },
    { name: "Collation", items: "Pomme 120g, Amandes 15g", kcal: 200, P: 5, G: 20, L: 10 },
    { name: "Dîner", items: "Thon 100g, Concombre 100g, Tomates 100g, Pain 40g", kcal: 330, P: 25, G: 25, L: 8 },
  ]},
  Mercredi: { meals: [
    { name: "Petit-déj.", items: "Smoothie (Lait 200ml, Ananas 100g, Banane 100g, Avoine 20g)", kcal: 340, P: 12, G: 55, L: 6 },
    { name: "Déjeuner", items: "Poulet 120g, Patate douce 150g, Haricots verts 150g, Huile 10g", kcal: 450, P: 35, G: 40, L: 15 },
    { name: "Collation", items: "Fromage blanc 125g, Baies 100g", kcal: 150, P: 10, G: 15, L: 2 },
    { name: "Dîner", items: "Œufs durs (2), Salade 100g, Concombre 100g", kcal: 280, P: 20, G: 10, L: 12 },
  ]},
  Jeudi: { meals: [
    { name: "Petit-déj.", items: "Muesli 40g, Lait 200ml, Pomme 100g", kcal: 350, P: 12, G: 55, L: 7 },
    { name: "Déjeuner", items: "Colin 120g, Boulgour 70g (cuit), Brocolis 150g, Huile 10g", kcal: 430, P: 32, G: 40, L: 13 },
    { name: "Collation", items: "Carottes 100g, Houmous 30g", kcal: 150, P: 4, G: 15, L: 7 },
    { name: "Dîner", items: "Dinde 120g, Champignons 100g, Courgettes 100g", kcal: 320, P: 28, G: 20, L: 8 },
  ]},
  Vendredi: { meals: [
    { name: "Petit-déj.", items: "Pain 50g, Œuf 50g, Fromage frais 50g", kcal: 320, P: 18, G: 35, L: 8 },
    { name: "Déjeuner", items: "Poulet 120g, Couscous complet 70g (cuit), Carottes 150g, Huile 10g", kcal: 450, P: 35, G: 40, L: 15 },
    { name: "Collation", items: "Yaourt 125g, Noix 15g", kcal: 200, P: 8, G: 10, L: 14 },
    { name: "Dîner", items: "Poisson blanc 120g, Riz complet 50g (cuit), Épinards 150g", kcal: 320, P: 28, G: 28, L: 7 },
  ]},
  Samedi: { meals: [
    { name: "Petit-déj.", items: "Smoothie bowl : Banane 100g, Poire 100g, Yaourt 125g, Chia 10g", kcal: 350, P: 15, G: 55, L: 10 },
    { name: "Déjeuner", items: "Dinde 120g, Lentilles 100g (cuit), Courgettes 150g, Huile 10g", kcal: 430, P: 32, G: 38, L: 12 },
    { name: "Collation", items: "Orange 120g, Amandes 15g", kcal: 200, P: 5, G: 20, L: 10 },
    { name: "Dîner", items: "Omelette 2 œufs, Tomates 100g, Concombre 100g", kcal: 300, P: 22, G: 18, L: 10 },
  ]},
  Dimanche: { meals: [
    { name: "Petit-déj.", items: "Porridge (Avoine 40g, Lait 200ml, Fruits rouges 100g)", kcal: 330, P: 12, G: 52, L: 6 },
    { name: "Déjeuner", items: "Saumon 120g, Quinoa 70g (cuit), Courgettes 150g, Huile 10g", kcal: 460, P: 30, G: 40, L: 20 },
    { name: "Collation", items: "Pomme 120g, Fromage blanc 125g", kcal: 200, P: 12, G: 25, L: 4 },
    { name: "Dîner", items: "Omelette 2 œufs, Poivrons 100g, Champignons 100g, Salade 100g", kcal: 340, P: 25, G: 22, L: 12 },
  ]},
};

const MENU_D: MenuVariant = {
  Lundi: { meals: [
    { name: "Petit-déj.", items: "Pain 50g, Beurre cacahuète 15g, Banane 100g", kcal: 370, P: 13, G: 50, L: 12 },
    { name: "Déjeuner", items: "Poulet 120g, Riz complet 70g (cuit), Épinards 150g, Huile 10g", kcal: 440, P: 35, G: 40, L: 14 },
    { name: "Collation", items: "Yaourt 125g, Amandes 15g", kcal: 200, P: 10, G: 12, L: 12 },
    { name: "Dîner", items: "Omelette 2 œufs, Courgettes 150g, Pain 40g", kcal: 340, P: 22, G: 25, L: 12 },
  ]},
  Mardi: { meals: [
    { name: "Petit-déj.", items: "Avoine 40g, Lait 200ml, Poire 100g", kcal: 340, P: 12, G: 55, L: 6 },
    { name: "Déjeuner", items: "Saumon 120g, Quinoa 70g (cuit), Asperges 150g, Huile 10g", kcal: 460, P: 30, G: 40, L: 20 },
    { name: "Collation", items: "Fromage blanc 125g, Noix 15g", kcal: 200, P: 12, G: 10, L: 14 },
    { name: "Dîner", items: "Œufs durs (2), Salade 100g, Concombre 100g", kcal: 280, P: 20, G: 12, L: 10 },
  ]},
  Mercredi: { meals: [
    { name: "Petit-déj.", items: "Smoothie (Banane 100g, Kiwi 100g, Lait 200ml, Avoine 20g)", kcal: 340, P: 12, G: 55, L: 6 },
    { name: "Déjeuner", items: "Poulet 120g, Couscous complet 70g (cuit), Légumes vapeur 150g, Huile 10g", kcal: 450, P: 35, G: 40, L: 15 },
    { name: "Collation", items: "Orange 120g, Amandes 15g", kcal: 200, P: 5, G: 20, L: 10 },
    { name: "Dîner", items: "Colin 120g, Brocolis 150g, Riz basmati 50g (cuit)", kcal: 320, P: 28, G: 25, L: 7 },
  ]},
  Jeudi: { meals: [
    { name: "Petit-déj.", items: "Pain 50g, Fromage frais 0% 50g, Fraises 100g", kcal: 330, P: 15, G: 42, L: 6 },
    { name: "Déjeuner", items: "Dinde 120g, Lentilles 100g (cuit), Carottes 150g, Huile 10g", kcal: 430, P: 32, G: 38, L: 12 },
    { name: "Collation", items: "Yaourt 125g, Noisettes 15g", kcal: 200, P: 10, G: 12, L: 12 },
    { name: "Dîner", items: "Omelette 2 œufs, Tomates 100g, Concombre 100g", kcal: 300, P: 22, G: 18, L: 10 },
  ]},
  Vendredi: { meals: [
    { name: "Petit-déj.", items: "Muesli 40g, Lait 200ml, Mangue 100g", kcal: 350, P: 12, G: 55, L: 7 },
    { name: "Déjeuner", items: "Saumon 120g, Pommes de terre 150g, Épinards 150g, Huile 10g", kcal: 460, P: 30, G: 38, L: 20 },
    { name: "Collation", items: "Pomme 120g, Fromage blanc 125g", kcal: 200, P: 12, G: 25, L: 4 },
    { name: "Dîner", items: "Thon 100g, Courgettes 150g, Pain 40g", kcal: 320, P: 25, G: 20, L: 8 },
  ]},
  Samedi: { meals: [
    { name: "Petit-déj.", items: "Smoothie bowl : Banane 100g, Ananas 100g, Yaourt 125g, Chia 10g", kcal: 350, P: 15, G: 55, L: 10 },
    { name: "Déjeuner", items: "Poulet 120g, Riz basmati 70g (cuit), Brocolis 150g, Huile 10g", kcal: 440, P: 35, G: 40, L: 14 },
    { name: "Collation", items: "Carottes 100g, Houmous 30g", kcal: 150, P: 4, G: 15, L: 7 },
    { name: "Dîner", items: "Omelette 2 œufs, Champignons 100g, Salade 100g", kcal: 300, P: 22, G: 15, L: 10 },
  ]},
  Dimanche: { meals: [
    { name: "Petit-déj.", items: "Porridge (Avoine 40g, Lait 200ml, Fruits rouges 100g)", kcal: 330, P: 12, G: 52, L: 6 },
    { name: "Déjeuner", items: "Dinde 120g, Quinoa 70g (cuit), Asperges 150g, Huile 10g", kcal: 440, P: 32, G: 40, L: 14 },
    { name: "Collation", items: "Pomme 120g, Amandes 15g", kcal: 200, P: 5, G: 20, L: 10 },
    { name: "Dîner", items: "Omelette 2 œufs, Poivrons 100g, Courgettes 100g, Salade 100g", kcal: 340, P: 25, G: 22, L: 12 },
  ]},
};

const MENUS: Record<"A" | "B" | "C" | "D", MenuVariant> = { A: MENU_A, B: MENU_B, C: MENU_C, D: MENU_D };

// ------------------------------
// SPORT blocks
// ------------------------------
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
const SPORT_BLOCKS: Record<"A" | "B" | "C" | "D", any> = { A: SPORT_A, B: SPORT_B, C: SPORT_C, D: SPORT_D };

// ------------------------------
// Storage
// ------------------------------
const LS_KEY = "coach8w_v1";

type ProgressState = {
  // completion flags per week/day
  done: Record<string, { meals: boolean[]; workout: boolean[]; notes: string }>; // key: `w{week}-{day}`
  // weekly metrics
  metrics: Record<string, { weight?: number; waist?: number; hips?: number }>; // key: `w{week}`
};

function loadState(): ProgressState {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return { done: {}, metrics: {} };
    return JSON.parse(raw);
  } catch {
    return { done: {}, metrics: {} };
  }
}
function saveState(s: ProgressState) {
  localStorage.setItem(LS_KEY, JSON.stringify(s));
}

// ------------------------------
// UI Components
// ------------------------------
function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
  );
}

function MealRow({ meal, idx, checked, onToggle }:{ meal: Meal; idx: number; checked: boolean; onToggle: (i:number)=>void }){
  return (
    <div className="flex items-start justify-between py-2 border-b last:border-b-0">
      <div className="pr-4">
        <div className="font-medium">{meal.name}</div>
        <div className="text-sm opacity-80">{meal.items}</div>
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <div className="text-sm text-right">
          <div>{meal.kcal} kcal</div>
          <div className="opacity-70">P:{meal.P}g · G:{meal.G}g · L:{meal.L}g</div>
        </div>
        <Checkbox checked={checked} onCheckedChange={() => onToggle(idx)} />
      </div>
    </div>
  );
}

function WorkoutRow({ text, idx, checked, onToggle }:{ text: string; idx: number; checked: boolean; onToggle: (i:number)=>void }){
  return (
    <div className="flex items-center justify-between py-2 border-b last:border-b-0">
      <div className="text-sm">{text}</div>
      <Checkbox checked={checked} onCheckedChange={() => onToggle(idx)} />
    </div>
  );
}

// ------------------------------
// Main App
// ------------------------------
export default function App(){
  const [week, setWeek] = useState<number>(1);
  const [day, setDay] = useState<string>("Lundi");
  const days = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];

  const [state, setState] = useState<ProgressState>(() => loadState());
  useEffect(() => saveState(state), [state]);

  const menuKey = WEEK_TO_MENU[week];
  const sportKey = WEEK_TO_SPORT[week];
  const todayMeals = MENUS[menuKey][day].meals;

  const sportDaily = useMemo(() => {
    const block = SPORT_BLOCKS[sportKey];
    const common = block.days.Tous as string[];
    const specific = block.days[day as keyof typeof block.days] as string[] | undefined;
    return [...common, ...(specific ?? [])];
  }, [sportKey, day]);

  const doneKey = `w${week}-${day}`;
  const doneEntry = state.done[doneKey] ?? { meals: Array(todayMeals.length).fill(false), workout: Array(sportDaily.length).fill(false), notes: "" };

  // Totals
  const totals = todayMeals.reduce((acc, m) => ({
    kcal: acc.kcal + m.kcal, P: acc.P + m.P, G: acc.G + m.G, L: acc.L + m.L
  }), { kcal: 0, P: 0, G: 0, L: 0 });

  // Weight chart data from metrics
  const chartData = Array.from({length:8}).map((_,i) => {
    const w = i+1;
    const m = state.metrics[`w${w}`];
    return { name: `S${w}`, poids: m?.weight ?? null };
  });

  function toggleMeal(i:number){
    setState(prev => {
      const base = prev.done[doneKey] ?? { meals: Array(todayMeals.length).fill(false), workout: Array(sportDaily.length).fill(false), notes: "" };
      const meals = [...base.meals];
      meals[i] = !meals[i];
      return { ...prev, done: { ...prev.done, [doneKey]: { ...base, meals } } };
    });
  }
  function toggleWorkout(i:number){
    setState(prev => {
      const base = prev.done[doneKey] ?? { meals: Array(todayMeals.length).fill(false), workout: Array(sportDaily.length).fill(false), notes: "" };
      const workout = [...base.workout];
      workout[i] = !workout[i];
      return { ...prev, done: { ...prev.done, [doneKey]: { ...base, workout } } };
    });
  }
  function setNotes(v:string){
    setState(prev => {
      const base = prev.done[doneKey] ?? { meals: Array(todayMeals.length).fill(false), workout: Array(sportDaily.length).fill(false), notes: "" };
      return { ...prev, done: { ...prev.done, [doneKey]: { ...base, notes: v } } };
    });
  }
  function resetDay(){
    setState(prev => ({ ...prev, done: { ...prev.done, [doneKey]: { meals: Array(todayMeals.length).fill(false), workout: Array(sportDaily.length).fill(false), notes: "" } } }));
  }

  function saveWeekMetrics(partial: Partial<{weight:number; waist:number; hips:number}>){
    setState(prev => ({ ...prev, metrics: { ...prev.metrics, [`w${week}`]: { ...prev.metrics[`w${week}`], ...partial } } }));
  }

  function exportJSON(){
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `progression_8_semaines.json`;
    a.click(); URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ClipboardList className="w-7 h-7" />
            <h1 className="text-2xl font-bold">Carnet 8 semaines – Alimentation & Sport</h1>
          </div>
          <div className="flex items-center gap-2">
            <Select value={String(week)} onValueChange={(v)=>setWeek(Number(v))}>
              <SelectTrigger className="w-[140px]"><SelectValue placeholder="Semaine" /></SelectTrigger>
              <SelectContent>
                {Array.from({length:8}).map((_,i)=> (
                  <SelectItem key={i} value={String(i+1)}>Semaine {i+1} ({WEEK_TO_MENU[i+1]})</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={day} onValueChange={(v)=>setDay(v)}>
              <SelectTrigger className="w-[160px]"><SelectValue placeholder="Jour" /></SelectTrigger>
              <SelectContent>
                {days.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Info badges */}
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary"><CalendarDays className="w-4 h-4 mr-1" /> Menu {menuKey}</Badge>
          <Badge variant="secondary"><Dumbbell className="w-4 h-4 mr-1" /> Bloc sport {sportKey}</Badge>
          {week <= 2 && (
            <Badge className="bg-amber-100 text-amber-700 border-amber-200">Post-césarienne : intensité douce, pas d'abdos classiques</Badge>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Alimentation */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Programme alimentaire – {day}</CardTitle>
            </CardHeader>
            <CardContent>
              <SectionTitle icon={<ClipboardList className="w-4 h-4" />} title="Repas du jour" />
              <div className="divide-y">
                {todayMeals.map((m, i) => (
                  <MealRow key={i} meal={m} idx={i} checked={!!doneEntry.meals[i]} onToggle={toggleMeal} />
                ))}
              </div>
              <div className="flex items-center justify-between mt-4 text-sm">
                <div className="opacity-70">Totaux journaliers</div>
                <div className="font-medium">{totals.kcal} kcal · P:{totals.P}g · G:{totals.G}g · L:{totals.L}g</div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <Button size="sm" variant="outline" onClick={resetDay}><RotateCcw className="w-4 h-4 mr-1"/>Réinitialiser la journée</Button>
              </div>
            </CardContent>
          </Card>

          {/* Sport */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Programme sportif – {day}</CardTitle>
            </CardHeader>
            <CardContent>
              <SectionTitle icon={<Dumbbell className="w-4 h-4" />} title={`Séances (${SPORT_BLOCKS[sportKey].info})`} />
              <div className="divide-y">
                {sportDaily.map((t, i) => (
                  <WorkoutRow key={i} text={t} idx={i} checked={!!doneEntry.workout[i]} onToggle={toggleWorkout} />
                ))}
              </div>
              <div className="mt-4">
                <SectionTitle icon={<CheckCircle2 className="w-4 h-4" />} title="Notes du jour" />
                <Textarea value={doneEntry.notes} onChange={(e)=>setNotes(e.target.value)} placeholder="Comment s'est passée la journée ? Sommeil, énergie, douleurs, faim…" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Suivi hebdo & Poids */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Suivi hebdomadaire – Semaine {week}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="metriques">
              <TabsList>
                <TabsTrigger value="metriques">Mesures</TabsTrigger>
                <TabsTrigger value="poids">Courbe de poids</TabsTrigger>
                <TabsTrigger value="export">Exporter</TabsTrigger>
              </TabsList>
              <TabsContent value="metriques" className="mt-4">
                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-sm opacity-80">Poids (kg)</label>
                    <Input type="number" step="0.1" value={state.metrics[`w${week}`]?.weight ?? ""} onChange={(e)=>saveWeekMetrics({ weight: Number(e.target.value) })} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm opacity-80">Tour de taille (cm)</label>
                    <Input type="number" step="0.5" value={state.metrics[`w${week}`]?.waist ?? ""} onChange={(e)=>saveWeekMetrics({ waist: Number(e.target.value) })} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm opacity-80">Tour de hanches (cm)</label>
                    <Input type="number" step="0.5" value={state.metrics[`w${week}`]?.hips ?? ""} onChange={(e)=>saveWeekMetrics({ hips: Number(e.target.value) })} />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="poids" className="mt-4">
                <div className="h-64 w-full">
                  <ResponsiveContainer>
                    <LineChart data={chartData} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={["auto","auto"]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="poids" strokeWidth={2} dot />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="export" className="mt-4">
                <div className="flex items-center gap-2">
                  <Button onClick={exportJSON}><Download className="w-4 h-4 mr-1"/>Exporter la progression (JSON)</Button>
                  <div className="text-sm opacity-70">Les données sont sauvegardées automatiquement dans votre navigateur (localStorage).</div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-xs opacity-70 text-center">⚠️ Après césarienne : progresser doucement, éviter les crunchs et la pression abdominale. Demander l'avis médical en cas de doute.</div>
      </div>
    </div>
  );
}

