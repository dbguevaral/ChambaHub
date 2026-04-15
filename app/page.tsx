"use client";

import React, { useState, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/ui/navbar";
import { Calendar } from "@/components/ui/calendar";
import { ProfessionalList } from "@/components/ui/professional-list"; // Import the new component
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { addDays, format, isSameDay, differenceInDays } from "date-fns";
import { es } from "date-fns/locale";

export default function Home() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState<string>("");
  const [showResults, setShowResults] = useState(false); // State to toggle professional list
  
  const resultsRef = useRef<HTMLDivElement>(null);

  const presets = [
    { label: "Hoy", value: 0 },
    { label: "Mañana", value: 1 },
    { label: "En 3 días", value: 3 },
    { label: "En 5 días", value: 5 },
    { label: "En 1 semana", value: 7 },
    { label: "En 2 semanas", value: 14 },
    { label: "En 1 mes", value: 30 }
  ];

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const today = new Date();
      const diff = differenceInDays(selectedDate, today);
      
      if (diff >= 60) {
        const confirmFuture = window.confirm("¿Estás seguro que quieres agendar una cita dentro de 2 meses?");
        if (!confirmFuture) return;
      }
    }
    setDate(selectedDate);
    setTime(""); 
  };

  const handlePresetClick = (days: number) => {
    const targetDate = addDays(new Date(), days);
    handleDateSelect(targetDate);
  };

  const availableHours = useMemo(() => {
    if (!date) return [];
    const isToday = isSameDay(date, new Date());
    const currentHour = new Date().getHours();
    const startHour = isToday ? Math.max(8, currentHour + 3) : 8;
    const hours = [];
    for (let h = startHour; h <= 20; h++) {
      hours.push(h);
    }
    return hours;
  }, [date]);

  const handleConfirmSelection = () => {
    setShowResults(true);
    setIsOpen(false);
    // Smooth scroll to results after a short delay to allow state to update
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-emerald-500/30">
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col min-h-[calc(100vh-65px)] items-center justify-center px-4 py-12">
        <div className="max-w-3xl mx-auto text-center pb-4">
          <h1 className="mb-6 text-5xl md:text-7xl font-bold tracking-tighter">
            Encuentra el profesional perfecto
            <span className="text-emerald-400"> para tu chamba</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto">
            Conecta con plomeros, electricistas, pintores y más. Elige fecha y ubicación. Reserva de forma rápida y segura.
          </p>
        </div>

        {/* Search Card */}
        <Card className="bg-zinc-900 border-zinc-800 shadow-2xl max-w-3xl mx-auto w-full mb-12">
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              <div className="space-y-1.5">
                <label htmlFor="service" className="text-sm text-zinc-400 mb-1 block">
                  ¿Qué servicio estás buscando?
                </label>
                <Input 
                  id="service"
                  className="bg-zinc-950 border-zinc-700 h-12 text-white" 
                  placeholder="Profesión o servicio"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="location" className="text-sm text-zinc-400 mb-1 block">
                  ¿Dónde?
                </label>
                <Input
                  id="location"
                  className="bg-zinc-950 border-zinc-700 h-12 text-white" 
                  placeholder="Distrito"
                />
              </div>

              <div className="space-y-1.5 md:pt-6">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      size="lg" 
                      className="w-full h-12 text-base font-medium bg-emerald-900 hover:bg-emerald-700 transition-colors"
                    >
                      Elegir fecha
                    </Button>
                  </DialogTrigger>
                  
                  <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-[95vw] md:max-w-175 p-0 overflow-hidden">
                    <div className="max-h-[80vh] overflow-y-auto p-6">
                      <DialogHeader className="mb-4">
                        <DialogTitle className="text-xl font-bold text-emerald-400">
                          Elige el día para reservar
                        </DialogTitle>
                        <DialogDescription className="text-zinc-400">
                          Selecciona una fecha (mínimo 3 horas de antelación para hoy) y hora disponible.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="bg-zinc-950 p-2 rounded-md border border-zinc-800 flex-1 flex justify-center">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={handleDateSelect}
                            locale={es}
                            disabled={(d) => d < new Date(new Date().setHours(0,0,0,0))}
                            className="rounded-md bg-zinc-950 text-white"
                            classNames={{
                              day_today: "bg-zinc-800 text-white",
                              day_selected: "bg-emerald-600 text-white hover:bg-emerald-600 focus:bg-emerald-600",
                            }}
                          />
                        </div>
                        <div className="flex flex-col gap-2 w-full md:w-40">
                          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Accesos rápidos</p>
                          {presets.map((preset) => (
                            <Button
                              key={preset.label}
                              variant="outline"
                              className="justify-start border-zinc-800 bg-zinc-950 hover:bg-white hover:text-zinc-950 text-xs"
                              onClick={() => handlePresetClick(preset.value)}
                            >
                              {preset.label}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 flex flex-col gap-4">
                        <div className="space-y-2">
                          <label className={`text-sm ${!date ? 'text-zinc-600' : 'text-zinc-400'}`}>
                            {availableHours.length === 0 && date 
                              ? "No hay horarios disponibles para hoy." 
                              : "¿A qué hora empezaría el trabajo?"}
                          </label>
                          <Select disabled={!date || availableHours.length === 0} onValueChange={setTime} value={time}>
                            <SelectTrigger className="bg-zinc-950 border-zinc-800 text-white">
                              <SelectValue placeholder="Selecciona la hora" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-950 border-zinc-800 text-white">
                              {availableHours.map((hour) => (
                                <SelectItem key={hour} value={`${hour}:00`} className="focus:bg-zinc-800">
                                  {hour}:00 {hour < 12 ? 'AM' : 'PM'}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <Button 
                          disabled={!date || !time}
                          className={`w-full h-12 text-base font-bold transition-all ${
                            date && time 
                            ? "bg-emerald-900 hover:bg-emerald-700 text-white" 
                            : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                          }`}
                          onClick={handleConfirmSelection}
                        >
                          Elegir
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Task 14: Results Section */}
        {showResults && (
          <div ref={resultsRef} className="w-full max-w-5xl mx-auto mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">Profesionales disponibles</h2>
                <p className="text-zinc-400">
                  Mostrando resultados para el {date && format(date, "d 'de' MMMM", { locale: es })} a las {time}
                </p>
              </div>
            </div>
            <ProfessionalList />
          </div>
        )}
      </section>
    </div>
  );
}