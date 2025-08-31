import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/Card";
import { Button } from "./components/ui/Button";
import { Input } from "./components/ui/Input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/Tabs";
import { Textarea } from "./components/ui/Textarea";
import { Badge } from "./components/ui/Badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { MENUS } from "./Data/menus";
import { SPORT_BLOCKS } from "./Data/workouts";

/** --- Mapping semaines -> menus/sport --- */
const WEEK_TO_MENU: Record<number, "A" | "B" | "C" | "D"> = {1:"A",2:"A",3:"B",4:"B",5:"C",6:"C",7:"D",8:"D"};
const WEEK_TO_SPORT: Record<number, "A" | "B" | "C" | "D"> = WEEK_TO_MENU;

/** --- Types --- */
import type {  ProgressState } from "./types";
const LS_KEY = "coach8w_v1";
function loadState(): ProgressState {
  try { const raw = localStorage.getItem(LS_KEY); return raw ? JSON.parse(raw) : { done:{}, metrics:{} }; } catch { return { done:{}, metrics:{} }; }
}
function saveState(s: ProgressState){ localStorage.setItem(LS_KEY, JSON.stringify(s)); }

/** --- UI helpers --- */
import { SectionTitle } from "./components/SectionTitle";
import { MealRow } from "./components/MealRow";
import { WorkoutRow } from "./components/WorkoutRow";

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
