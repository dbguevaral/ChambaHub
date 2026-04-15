"use client";

import React, { useState, useEffect, Suspense} from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Navbar } from "@/components/ui/navbar";
import { Mail } from "lucide-react"; // Using Lucide for social icons as placeholders

function LoginRegisterForm() {
    const searchParams = useSearchParams();
    // const router = useRouter();

    // Initialize mode based on URL query (?mode=register)
    const initialMode = searchParams.get("mode") === "register" ? "register" : "login";
    const [mode, setMode] = useState<"login" | "register">(initialMode);

    useEffect(() => {
    const currentMode = searchParams.get("mode");
    if (currentMode === "login" || currentMode === "register") {
        setMode(currentMode);
    }
  }, [searchParams]); // This triggers whenever the URL parameters change

    return (     
        <main className="flex items-center justify-center p-4 min-h-[calc(100vh-65px)]">
            <Card className="w-full max-w-md bg-zinc-900 border-zinc-800 shadow-2xl">
            <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold tracking-tight text-white">
                {mode === "login" ? "Bienvenido de nuevo" : "Crea tu cuenta"}
                </CardTitle>
                <CardDescription className="text-zinc-400">
                {mode === "login" 
                    ? "Ingresa tus credenciales para acceder" 
                    : "Únete a ChambaHub y encuentra o brinda servicios"}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Standard Form */}
                <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-zinc-300">Correo o número de celular</Label>
                    <Input 
                    id="email" 
                    placeholder="ejemplo@correo.com" 
                    className="bg-zinc-950 border-zinc-700 text-white"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="pass" className="text-zinc-300">Contraseña</Label>
                    <Input 
                    id="pass" 
                    type="password" 
                    className="bg-zinc-950 border-zinc-700 text-white"
                    />
                </div>

                {mode === "register" && (
                    <>
                    <div className="space-y-2">
                        <Label htmlFor="confirm-pass" className="text-zinc-300">Confirmar contraseña</Label>
                        <Input 
                        id="confirm-pass" 
                        type="password" 
                        className="bg-zinc-950 border-zinc-700 text-white"
                        />
                    </div>
                    <div className="space-y-3 pt-2">
                        <Label className="text-zinc-300">¿Cómo te unirás?</Label>
                        <RadioGroup defaultValue="client" className="flex gap-4">
                        <div className="flex items-center space-x-2 bg-zinc-950 p-3 rounded-md border border-zinc-700 flex-1 justify-center">
                            <RadioGroupItem value="client" id="client" />
                            <Label htmlFor="client" className="cursor-pointer text-zinc-300">Cliente</Label>
                        </div>
                        <div className="flex items-center space-x-2 bg-zinc-950 p-3 rounded-md border border-zinc-700 flex-1 justify-center">
                            <RadioGroupItem value="provider" id="provider" />
                            <Label htmlFor="provider" className="cursor-pointer text-zinc-300">Profesional</Label>
                        </div>
                        </RadioGroup>
                    </div>
                    </>
                )}
                </div>

                {mode === "login" && (
                <div className="flex justify-between items-center text-sm">
                    <button className="text-emerald-400 hover:underline">¿Olvidaste tu contraseña?</button>
                    <button onClick={() => setMode("register")} className="text-emerald-400 hover:underline">
                    ¿Eres nuevo? Regístrate
                    </button>
                </div>
                )}

                <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-6">
                {mode === "login" ? "Ingresar" : "Registrarse"}
                </Button>

                {/* Divider */}
                <div className="relative py-2">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-zinc-800"></span></div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-zinc-900 px-2 text-zinc-500">O continúa con</span>
                </div>
                </div>

                {/* Social Logins */}
                <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="border-zinc-700 bg-zinc-950 text-white hover:bg-zinc-800">
                    Google
                </Button>
                <Button variant="outline" className="border-zinc-700 bg-zinc-950 text-white hover:bg-zinc-800">
                    Facebook
                </Button>
                </div>

                {mode === "register" && (
                <p className="text-center text-sm text-zinc-500 pt-2">
                    ¿Ya tienes cuenta?{" "}
                    <Button onClick={() => setMode("login")} className="text-emerald-400 hover:underline">
                    Inicia sesión
                    </Button>
                </p>
                )}
            </CardContent>
            </Card>
        </main>
    );
}

export default function LoginRegisterPage() {
    return (
        <div className="min-h-screen bg-zinc-950 text-white"> 
            <Navbar />
            {/* This suspense boundary is to fix Vercel Build Error */}
            <Suspense fallback={
                <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
                    <p className="text-zinc-500 italic">Cargando...</p>
                </div>
            }>
            <LoginRegisterForm/>
            </Suspense>
        </div>
    )
}