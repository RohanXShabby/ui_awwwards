export const FeatureCard = ({
    icon,
    title,
    description
}: {
    icon: React.ReactNode
    title: string
    description: string
}) => {
    return (
        <div className="group text-center p-6 sm:p-8 rounded-lg border border-card-border bg-card-bg/20 backdrop-blur-lg transition-all duration-300 hover:border-accent/50 hover:shadow-lg pointer-events-auto">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                {icon}
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                {title}
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {description}
            </p>
        </div>
    )
}
