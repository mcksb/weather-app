export default function Header() {

    return (
        <section className="flex items-center justify-between p-4 text-neutral-500 text-[12px] sm:text-[14px]">
            <p>shaun.dev</p>
            <ul className="flex items-center gap-4">
                <li>
                    <a href="https://google.com/" target="_blank">portfolio</a>
                </li>
                <li>
                    <a href="https://github.com/mcksb/" target="_blank">github</a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/smcmahon-dev/" target="_blank">linkedin</a>
                </li>
            </ul>
        </section>
    )
}