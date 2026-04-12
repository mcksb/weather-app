export default function Footer() {

    return (
        <section className="flex items-center justify-between p-2 text-neutral-500 text-[12px] sm:text-[14px]">
            <div>
                <a href="https://open-meteo.com/" target="_blank">Powered by Open-Meteo</a>
            </div>
            <div>
                © {new Date().getFullYear()} MIT Licensed
            </div>
        </section>
    )
}