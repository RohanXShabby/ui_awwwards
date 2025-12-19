"use client";

import React from "react";

const COLOR_ITEMS = [
    { key: "background", label: "--color-background", bg: "bg-background" },
    { key: "foreground", label: "--color-foreground", bg: "bg-foreground" },
    { key: "accent", label: "--color-accent", bg: "bg-accent" },
    { key: "muted-foreground", label: "--color-muted-foreground", bg: "bg-muted-foreground" },
    { key: "card-bg", label: "--color-card-bg", bg: "bg-card-bg" },
    { key: "card-border", label: "--color-card-border", bg: "bg-card-border" },
    { key: "link", label: "--color-link", bg: "bg-link" },
    { key: "success", label: "--color-success", bg: "bg-success" },
    { key: "warning", label: "--color-warning", bg: "bg-warning" },
    { key: "error", label: "--color-error", bg: "bg-error" },
    { key: "info", label: "--color-info", bg: "bg-info" },
] as const;

const lightTextNames = new Set([
    "background",
    "card-bg",
    "card-border",
    "info",
]);

const ThemeShowcase: React.FC = () => {
    return (
        <main className="min-h-screen py-10 px-6 bg-background text-foreground transition-colors duration-300">
            <h1 className="text-3xl font-bold mb-8 text-center">Theme Color Showcase</h1>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {COLOR_ITEMS.map((c) => {
                    const textClass = lightTextNames.has(c.key) ? "text-foreground" : "text-background";
                    return (
                        <section
                            key={c.key}
                            className={`rounded-md border p-4 shadow-md h-40 flex flex-col justify-between transition-all ${c.bg} border-card-border`}
                            aria-label={c.label}
                        >
                            <div>
                                <div className={`text-sm font-semibold mb-2 ${textClass}`}>{c.label}</div>
                                <div className={`text-sm font-semibold mb-2 ${textClass}`}>{`${textClass}`}</div>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className={`rounded-full px-3 py-1 text-xs font-medium ${textClass} border border-transparent`}>
                                    {c.key}
                                </span>
                                <span className={`text-xs opacity-80 ${textClass}`}>preview</span>
                            </div>
                        </section>
                    );
                })}
            </div>
        </main>
    );
};

export default ThemeShowcase;
