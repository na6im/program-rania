/** --- Types --- */
export type Meal = { name: string; items: string; kcal: number; P: number; G: number; L: number };
type DayPlan = { meals: Meal[] };
type MenuVariant = Record<string, DayPlan>;

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

export const MENUS: Record<"A"|"B"|"C"|"D", MenuVariant> = { A: MENU_A, B: MENU_B, C: MENU_C, D: MENU_D };
