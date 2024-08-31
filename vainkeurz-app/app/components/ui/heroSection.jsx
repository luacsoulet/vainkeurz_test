import '@/app/styles/animate-background.css'

export default function HeroSection({ title }) {
    return (
        <div className="background-animation p-5 rounded-lg w-max relative min-h-[200px]">
            <h1 className="text-5xl absolute bottom-4 left-4">{title}</h1>
        </div>
    );
}

