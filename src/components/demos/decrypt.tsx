import DecryptedText from "@/content/decrypt_text/decrypt"

const decrypt = () => {
    return (
        <div className="flex items-center justify-evenly border border-muted-foreground py-4 rounded-2xl">
            <h1 className="font-bold">Decrypt Text : </h1>
            {/* Example 1: Defaults (hover to decrypt) */}
            <div className="border cursor-pointer py-2 px-2 rounded-2xl">
                <DecryptedText text="Hover me!" />
            </div>
            {/* Example 2: Customized speed and characters */}
            <div className="border cursor-pointer py-2 px-2 rounded-2xl">
                <DecryptedText
                    text="Customize me"
                    speed={100}
                    maxIterations={20}
                    characters="ABCD1234!?"
                    className="revealed"
                    parentClassName="all-letters"
                    encryptedClassName="encrypted"
                />
            </div>
            {/* Example 3: Animate on view (runs once) */}
            <div className="border cursor-pointer py-2 px-2 rounded-2xl">
                <DecryptedText
                    text="This text animates when in view"
                    animateOn="view"
                    revealDirection="center"
                />
            </div>
        </div>
    )
}

export default decrypt
