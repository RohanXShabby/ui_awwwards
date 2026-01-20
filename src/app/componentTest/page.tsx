import { ComponentPreview } from "@/components/ComponentPreview";
import WaveTextButton from "@/content/Buttons/WaveTextButton";

const page = () => {
    return (
        <div className="pt-16 px-32">
            <ComponentPreview>
                <WaveTextButton />
            </ComponentPreview>
        </div>
    )
}

export default page