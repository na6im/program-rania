import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/Card";
import { Button } from "./components/ui/Button";
import { Input } from "./components/ui/Input";
import { Checkbox } from "./components/ui/Checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/Tabs";
import { Textarea } from "./components/ui/Textarea";
import { Badge } from "./components/ui/Badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

/** --- Mapping semaines -> menus/sport --- */
const WEEK_TO_MENU: Record<number, "A" | "B" | "C" | "D"> = {1:"A",2:"A",3:"B",4:"B",5:"C",6:"C",7:"D",8:"D"};
const WEEK_TO_SPORT: Record<number, "A" | "B" | "C" | "D"> = WEEK_TO_MENU;

/** --- Types --- */
type Meal = { name: string; items: string; kcal: number; P: number; G: number; L: number };
type DayPlan = { meals: Meal[] };
type MenuVariant = Record<string, DayPlan>;

/** --- Menu A (exemple complet). Remplace ensuite MENU_B/C/D par tes variantes si besoin. --- */
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
const MENU_B = MENU_A, MENU_C = MENU_A, MENU_D = MENU_A;
const MENUS: Record<"A"|"B"|"C"|"D", MenuVariant> = { A: MENU_A, B: MENU_B, C: MENU_C, D: MENU_D };

/** --- Sport blocs (post-césarienne: progressif & doux) --- */
const SPORT_A = {
  info: "Sem. 1–2 post-césarienne : intensité douce, pas d'abdos classiques.",
  days: {
    Tous: ["Respiration abdominale profonde 3x10", "Kegel 3x10"],
    Lundi: ["Pont fessier 3x10","Squats lents 3x10","Marche 10–15 min"],
    Mardi: ["Rowing élastique 3x12","Élévations latérales 3x12","Marche/Vélo 15 min"],
    Mercredi: ["Pont fessier 3x12","Squats lents 3x12","Marche 15 min"],
    Jeudi: ["Hypopressive 3x8","Marche/Vélo 10–15 min"],
    Vendredi: ["Pont fessier 3x12","Squats 3x12","Marche 15–20 min"],
    Samedi: ["Rowing 3x12","Élévations latérales 3x12","Marche/Vélo 15 min"],
    Dimanche: ["Étirements doux 10 min"],
  },
};
const SPORT_B = SPORT_A, SPORT_C = SPORT_A, SPORT_D = SPORT_A;
const SPORT_BLOCKS: Record<"A"|"B"|"C"|"D", any> = { A: SPORT_A, B: SPORT_B, C: SPORT_C, D: SPORT_D };

/** --- Storage --- */
const LS_KEY = "coach8w_v1";
type ProgressState = {
  done: Record<string, { meals: boolean[]; workout: boolean[]; notes: string }>;
  metrics: Record<string, { weight?: number; waist?: number; hips?: number }>;
};
function loadState(): ProgressState {
  try { const raw = localStorage.getItem(LS_KEY); return raw ? JSON.parse(raw) : { done:{}, metrics:{} }; } catch { return { done:{}, metrics:{} }; }
}
function saveState(s: ProgressState){ localStorage.setItem(LS_KEY, JSON.stringify(s)); }

/** --- UI helpers --- */
function SectionTitle({ title }:{title:string}){
  return <div className="flex items-center gap-2 mb-2"><h3 className="text-lg font-semibold">{title}</h3></div>;
}
function MealRow({ meal, idx, checked, onToggle }:{ meal: Meal; idx:number; checked:boolean; onToggle:(i:number)=>void }){
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
function WorkoutRow({ text, idx, checked, onToggle }:{ text:string; idx:number; checked:boolean; onToggle:(i:number)=>void }){
  return <div className="flex items-center justify-between py-2 border-b last:border-b-0"><div className="text-sm">{text}</div><Checkbox checked={checked} onCheckedChange={() => onToggle(idx)} /></div>;
}

/** --- App --- */
export default function App(){
  const [week, setWeek] = useState<number>(1);
  const [day, setDay] = useState<string>("Lundi");
  const days = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];
  const [state, setState] = useState<ProgressState>(() => loadState());
  useEffect(()=>saveState(state), [state]);

  const menuKey = WEEK_TO_MENU[week];
  const sportKey = WEEK_TO_SPORT[week];
  const todayMeals = MENUS[menuKey][day].meals;

  const sportDaily = useMemo(()=>{
    const block = SPORT_BLOCKS[sportKey];
    const common = block.days.Tous as string[];
    const specific = block.days[day as keyof typeof block.days] as string[] | undefined;
    return [...common, ...(specific ?? [])];
  }, [sportKey, day]);

  const doneKey = `w${week}-${day}`;
  const base = { meals: Array(todayMeals.length).fill(false), workout: Array(sportDaily.length).fill(false), notes: "" };
  const doneEntry = state.done[doneKey] ?? base;

  const totals = todayMeals.reduce((a,m)=>({ kcal:a.kcal+m.kcal, P:a.P+m.P, G:a.G+m.G, L:a.L+m.L}), {kcal:0,P:0,G:0,L:0});

  // const chartData = Array.from({length:8}).map((_,i)=>{
  //   const w = i+1; const m = state.metrics[`w${w}`]; return { name:`S${w}`, poids: m?.weight ?? null };
  // });

  function toggleMeal(i:number){
    setState(prev=>{ const b = prev.done[doneKey] ?? base; const meals=[...b.meals]; meals[i]=!meals[i]; return {...prev, done:{...prev.done, [doneKey]:{...b, meals}}}; });
  }
  function toggleWorkout(i:number){
    setState(prev=>{ const b = prev.done[doneKey] ?? base; const workout=[...b.workout]; workout[i]=!workout[i]; return {...prev, done:{...prev.done, [doneKey]:{...b, workout}}}; });
  }
  function setNotes(v:string){
    setState(prev=>{ const b = prev.done[doneKey] ?? base; return {...prev, done:{...prev.done, [doneKey]:{...b, notes:v}}}; });
  }
  function resetDay(){ setState(prev=>({...prev, done:{...prev.done, [doneKey]: base }})); }
  function saveWeekMetrics(partial: Partial<{weight:number; waist:number; hips:number}>){
    setState(prev=>({...prev, metrics:{...prev.metrics, [`w${week}`]:{...prev.metrics[`w${week}`], ...partial}}}));
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Carnet 8 semaines – Alimentation & Sport</h1>
          <div className="flex items-center gap-2">
            <select className="rounded-xl border px-3 py-2" value={String(week)} onChange={(e)=>setWeek(Number(e.target.value))}>
              {Array.from({length:8}).map((_,i)=> <option key={i} value={String(i+1)}>Semaine {i+1} ({WEEK_TO_MENU[i+1]})</option>)}
            </select>
            <select className="rounded-xl border px-3 py-2" value={day} onChange={(e)=>setDay(e.target.value)}>
              {days.map(d=> <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge>Menu {menuKey}</Badge>
          <Badge>Bloc sport {sportKey}</Badge>
          {week <= 2 && (<Badge className="bg-amber-100 border-amber-200 text-amber-700">Post-césarienne : intensité douce</Badge>)}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle>Programme alimentaire – {day}</CardTitle></CardHeader>
            <CardContent>
              <SectionTitle title="Repas du jour" />
              <div className="divide-y">
                {todayMeals.map((m,i)=> <MealRow key={i} meal={m} idx={i} checked={!!doneEntry.meals[i]} onToggle={toggleMeal} />)}
              </div>
              <div className="flex items-center justify-between mt-4 text-sm">
                <div className="opacity-70">Totaux journaliers</div>
                <div className="font-medium">{totals.kcal} kcal · P:{totals.P}g · G:{totals.G}g · L:{totals.L}g</div>
              </div>
              <div className="mt-4"><Button onClick={resetDay}>Réinitialiser</Button></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Programme sportif – {day}</CardTitle></CardHeader>
            <CardContent>
              <SectionTitle title="Séances" />
              <div className="divide-y">
                {sportDaily.map((t,i)=> <WorkoutRow key={i} text={t} idx={i} checked={!!doneEntry.workout[i]} onToggle={toggleWorkout} />)}
              </div>
              <div className="mt-4">
                <SectionTitle title="Notes du jour" />
                <Textarea value={doneEntry.notes} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>)=>setNotes(e.target.value)} placeholder="Sommeil, énergie, douleurs, faim…" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader><CardTitle>Suivi hebdomadaire – Semaine {week}</CardTitle></CardHeader>
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
                    <Input type="number" step="0.1" value={state.metrics[`w${week}`]?.weight ?? ""} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>saveWeekMetrics({weight: Number(e.target.value)})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm opacity-80">Tour de taille (cm)</label>
                    <Input type="number" step="0.5" value={state.metrics[`w${week}`]?.waist ?? ""} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>saveWeekMetrics({waist: Number(e.target.value)})} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm opacity-80">Tour de hanches (cm)</label>
                    <Input type="number" step="0.5" value={state.metrics[`w${week}`]?.hips ?? ""} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>saveWeekMetrics({hips: Number(e.target.value)})} />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="poids" className="mt-4">
                <div className="h-64 w-full">
                  <ResponsiveContainer>
                    <LineChart data={Array.from({length:8}).map((_,i)=>({ name:`S${i+1}`, poids: state.metrics[`w${i+1}`]?.weight ?? null }))} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
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
                <Button onClick={()=>{
                  const blob = new Blob([JSON.stringify(state,null,2)], {type: "application/json"});
                  const url = URL.createObjectURL(blob); const a = document.createElement("a");
                  a.href=url; a.download="progression_8_semaines.json"; a.click(); URL.revokeObjectURL(url);
                }}>Exporter la progression (JSON)</Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-xs opacity-70 text-center">⚠️ Après césarienne : progresser doucement, éviter les crunchs. Demander l'avis médical si doute.</div>
      </div>
    </div>
  );
}
