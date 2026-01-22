import { ComponentPreview } from "@/components/ComponentPreview";
import PulseButton from "@/content/Buttons/PulseButton";
import WaveTextButton from "@/content/Buttons/WaveTextButton";

const page = () => {
    return (
        <div className="pt-16 px-32">
            <ComponentPreview>
                <WaveTextButton text="Wave Button" />
                <PulseButton text="Pulse Button" />
            </ComponentPreview>
        </div>
    )
}

export default page