export default function Header() {

    return (
        <section className="flex items-center bg-weather-slate-900 justify-between p-4 text-neutral-500 text-[12px] sm:text-[14px]">
            <p className="text-weather-slate-50">smcmahon.dev</p>
            <ul className="flex items-center gap-4 text-weather-slate-400">
                <li>
                    <a href="https://smcmahon.dev/" target="_blank" className="transition-colors duration-500 hover:text-weather-slate-200">portfolio</a>
                </li>
                <li>
                    <a href="https://github.com/mcksb/" target="_blank" className="transition-colors duration-500 hover:text-weather-slate-200">github</a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/smcmahon-dev/" target="_blank" className="transition-colors duration-500 hover:text-weather-slate-200">linkedin</a>
                </li>
            </ul>
        </section>
    )
}