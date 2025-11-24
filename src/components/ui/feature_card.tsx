import React from "react"
import { ComponentPreview } from "../ComponentPreview" // Adjust path as needed

export const FeatureCard = ({
    icon,
    title,
    description
}: {
    icon: React.ReactNode
    title: string
    description: string
}) => {
    // Create a variable name from the title (e.g. "Easy Integration" -> "EasyIntegration")
    const varName = title.replace(/\s+/g, '')

    return (
        <ComponentPreview
            title=''
            align="start"
            className="h-full"
        >
            <div className="font-mono text-xs sm:text-sm w-full overflow-hidden">

                {/* Line 1: Variable Declaration */}
                <div className="flex items-start">
                    <span className="text-muted-foreground/40 select-none mr-4 w-4 text-right">1</span>
                    <div className="text-wrap wrap-break-word">
                        <span className="text-pink-400">const</span>{" "}
                        <span className="text-blue-400 dark:text-blue-400">{varName}</span>{" "}
                        <span className="text-muted-foreground">=</span>{" "}
                        <span className="text-yellow-600 dark:text-yellow-300">{"{"}</span>
                    </div>
                </div>

                {/* Line 2: Icon Property */}
                <div className="flex items-center group">
                    <span className="text-muted-foreground/40 select-none mr-4 w-4 text-right">2</span>
                    <div className="pl-4 flex items-center gap-2">
                        <span className="text-cyan-600 dark:text-cyan-400">icon</span>:
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-accent/10 text-accent transition-transform group-hover:scale-110">
                            {icon}
                        </span>,
                    </div>
                </div>

                {/* Line 3: Description Property */}
                <div className="flex items-start">
                    <span className="text-muted-foreground/40 select-none mr-4 w-4 text-right pt-0.5">3</span>
                    <div className="pl-4 w-full">
                        <span className="text-cyan-600 dark:text-cyan-400">desc</span>:{" "}
                        <span className="text-accent wrap-break-word leading-relaxed block sm:inline">
                            "{description}"
                        </span>
                    </div>
                </div>

                {/* Line 4: Closing Bracket & Cursor */}
                <div className="flex items-center">
                    <span className="text-muted-foreground/40 select-none mr-4 w-4 text-right">4</span>
                    <div>
                        <span className="text-yellow-600 dark:text-yellow-300">{"}"}</span>
                        <span className="inline-block w-2 h-4 ml-1 align-middle bg-primary/50 animate-pulse" />
                    </div>
                </div>

            </div>
        </ComponentPreview>
    )
}