// components/ui/navbar.tsx
import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Navbar({ className, ...props }: React.ComponentProps<"nav">) {
    return (
    <nav
        className={cn(
        "sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-md",
        className
        )}
        {...props}
    >
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link 
            href="/" 
            className="flex items-center gap-2 group"
        >
            <span className="font-heading text-2xl font-bold tracking-tighter text-white">
            Chamba<span className="text-emerald-400">Hub</span>
            </span>
        </Link>

            {/* Navigation Actions */}
            <div className="flex items-center gap-3">
                {/* Redirect to Login mode */} 
                <Button 
                asChild
                variant="ghost" 
                size="sm"
                className="text-zinc-400 hover:text-white hover:bg-zinc-900"
                >
                    <Link href="/login-register?mode=login">Ingresar</Link>
                </Button>
                
                {/* Redirect to Register mode */}
                <Button 
                asChild
                variant="ghost" 
                size="sm"
                className="text-zinc-400 hover:text-white hover:bg-zinc-900"
                >
                    <Link href="/login-register?mode=register">Registrarse</Link>
                </Button>
                
                <Button 
                variant="default" 
                size="sm"
                className="bg-emerald-900 hover:bg-emerald-700 text-white"
                >
                Para más tarde
                </Button>
            </div>
        </div>
    </nav>
    );
}

export { Navbar };