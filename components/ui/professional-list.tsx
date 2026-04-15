"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, Star } from "lucide-react";

interface Professional {
    id: number;
    name: string;
    rating: number; // 1 to 5
    priceRange: number; // 1 to 3 representing $, $$, $$$
}

const initialProfessionals: Professional[] = [
    { id: 1, name: "Juan Pérez - Plomería", rating: 4.8, priceRange: 2 },
    { id: 2, name: "Electricidad García", rating: 4.5, priceRange: 3 },
    { id: 3, name: "Pinturas Rápidas Lima", rating: 4.2, priceRange: 1 },
    { id: 4, name: "Carlos Soto (Albañil)", rating: 4.9, priceRange: 2 },
    { id: 5, name: "Reparaciones Express", rating: 3.8, priceRange: 1 },
];

type SortKey = "name" | "rating" | "priceRange";

export function ProfessionalList() {
    const [professionals, setProfessionals] = useState<Professional[]>(initialProfessionals);
    const [sortKey, setSortKey] = useState<SortKey>("rating");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

    const handleSort = (key: SortKey) => {
        const isAsc = sortKey === key && sortOrder === "asc";
        setSortOrder(isAsc ? "desc" : "asc");
        setSortKey(key);
    };

    const sortedProfessionals = useMemo(() => {
        return [...professionals].sort((a, b) => {
        let comparison = 0;
        if (sortKey === "name") {
            comparison = a.name.localeCompare(b.name);
        } else {
            comparison = a[sortKey] - b[sortKey];
        }
        return sortOrder === "asc" ? comparison : -comparison;
        });
    }, [professionals, sortKey, sortOrder]);

    const SortIcon = ({ column }: { column: SortKey }) => {
        if (sortKey !== column) return <ChevronDown className="ml-1 h-4 w-4 opacity-50" />;
        return sortOrder === "asc" ? (
        <ChevronUp className="ml-1 h-4 w-4 text-emerald-400" />
        ) : (
        <ChevronDown className="ml-1 h-4 w-4 text-emerald-400" />
        );
    };

    const renderStars = (rating: number) => {
        return (
        <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
            <Star
                key={i}
                className={`h-4 w-4 ${
                i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-zinc-600"
                }`}
            />
            ))}
            <span className="ml-2 text-sm text-zinc-400">{rating}</span>
        </div>
        );
    };

    const renderPrice = (price: number) => {
        return (
        <span className="text-zinc-300 font-medium">
            {"$".repeat(price)}
            <span className="text-zinc-600">{"$".repeat(3 - price)}</span>
        </span>
        );
    };

    return (
        <div className="w-full bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-zinc-900 border-b border-zinc-800">
                        <th className="p-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">#</th>
                        <th 
                            className="p-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                            onClick={() => handleSort("name")}
                        >
                            <div className="flex items-center">Nombre / Empresa <SortIcon column="name" /></div>
                        </th>
                        <th 
                            className="p-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                            onClick={() => handleSort("rating")}
                        >
                            <div className="flex items-center">Calificación <SortIcon column="rating" /></div>
                        </th>
                        <th 
                            className="p-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
                            onClick={() => handleSort("priceRange")}
                        >
                            <div className="flex items-center">Rango de Precio <SortIcon column="priceRange" /></div>
                        </th>
                        <th className="p-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider text-right">Acción</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                        {sortedProfessionals.map((pro, index) => (
                        <tr key={pro.id} className="hover:bg-zinc-900/50 transition-colors">
                            <td className="p-4 text-sm text-zinc-500">{index + 1}</td>
                            <td className="p-4 text-sm font-medium text-white">{pro.name}</td>
                            <td className="p-4">{renderStars(pro.rating)}</td>
                            <td className="p-4">{renderPrice(pro.priceRange)}</td>
                            <td className="p-4 text-right">
                            <Button 
                                size="sm"
                                className="bg-emerald-900 hover:bg-emerald-500 text-white font-bold px-4"
                            >
                                Contratar
                            </Button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}