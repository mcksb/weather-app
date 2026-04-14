export default function Footer() {

    return (
        <section className="flex items-center justify-between p-2 bg-weather-slate-950 text-[12px] sm:text-[14px]">
            <div>
                <a href="https://open-meteo.com/" target="_blank" className="text-weather-slate-400 transition-colors duration-500 hover:text-weather-slate-200">Powered by Open-Meteo</a>
            </div>
            <div className="text-weather-slate-400">
                © {new Date().getFullYear()} MIT Licensed
            </div>
        </section>
    )
}