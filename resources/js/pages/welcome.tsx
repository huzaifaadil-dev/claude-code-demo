import { Head } from '@inertiajs/react';
import arrow from './assets/hero/arrow.svg';
import avatar from './assets/hero/avatar.png';
import avatarRing from './assets/hero/avatar-ring.svg';
import facebookIcon from './assets/hero/facebook-icon.png';
import glowPurple from './assets/hero/glow-purple.svg';
import logo from './assets/hero/logo.svg';
import underline from './assets/hero/underline.svg';

export default function Welcome() {
    return (
        <>
            <Head title="Ibrahim Memon — Software Engineer" />
            <div className="relative min-h-screen overflow-hidden bg-brand-975 text-white">
                <img
                    src={glowPurple}
                    alt=""
                    className="pointer-events-none absolute top-[220px] left-1/2 hidden w-[385px] -translate-x-[60%] opacity-80 lg:block"
                />

                <header className="relative z-10 bg-brand-950 shadow-[0px_6px_22px_-3px_rgba(0,0,0,0.1)]">
                    <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-12">
                        <img src={logo} alt="Logo" className="h-[39px] w-[35px]" />
                        <ul className="hidden items-center gap-14 font-heading text-[20px] font-semibold tracking-[0.4px] md:flex">
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href="#about">About</a>
                            </li>
                            <li>
                                <a href="#lab">Lab</a>
                            </li>
                        </ul>
                    </nav>
                </header>

                <main className="relative z-10 mx-auto grid max-w-7xl gap-16 px-6 pt-20 pb-28 lg:grid-cols-[280px_1fr] lg:gap-24 lg:px-12 lg:pt-28">
                    <div className="relative mx-auto flex w-[258px] flex-col items-center lg:mx-0">
                        <div className="absolute -top-[52px] left-1/2 flex w-[245px] -translate-x-1/2 items-center justify-center text-center font-display text-[19px] whitespace-nowrap">
                            <span>
                                Hello! I Am{' '}
                                <span className="text-brand-600">Ibrahim Memon</span>
                            </span>
                        </div>
                        <img
                            src={arrow}
                            alt=""
                            className="pointer-events-none absolute -top-[8px] left-[10px] w-[92px] -translate-y-full"
                        />
                        <div className="relative h-[259px] w-[258px]">
                            <img src={avatarRing} alt="" className="absolute inset-0 h-full w-full" />
                            <img
                                src={avatar}
                                alt="Ibrahim Memon"
                                className="absolute top-[6px] left-1/2 h-[223px] w-[165px] -translate-x-1/2 object-cover"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-10">
                        <div>
                            <p className="font-display text-[17px] tracking-[0.34px] underline underline-offset-4">
                                A Designer who
                            </p>
                            <h2 className="font-display text-[34px] leading-[1.2] tracking-[1px] lg:text-[50px]">
                                Judges a book by its{' '}
                                <span className="relative inline-block text-brand-600">
                                    cover
                                    <img
                                        src={underline}
                                        alt=""
                                        className="pointer-events-none absolute top-1/2 left-1/2 w-[140%] max-w-none -translate-x-1/2 -translate-y-1/2 -rotate-[4.74deg]"
                                    />
                                </span>
                                ...
                            </h2>
                            <p className="mt-2 font-display text-[11px] tracking-[0.22px]">
                                Because if the cover does not impress you what else can?
                            </p>
                        </div>

                        <h1 className="font-display text-[34px] tracking-[1px] lg:text-[50px]">
                            {"I'm a Software Engineer."}
                        </h1>

                        <p className="flex flex-wrap items-center gap-2 font-display text-[21px] tracking-[0.42px]">
                            {"Currently, I'm a Software Engineer at"}
                            <img src={facebookIcon} alt="" className="h-[20px] w-[20px]" />
                            <span className="text-social-facebook">Facebook</span>,
                        </p>

                        <p className="max-w-2xl font-display text-[22px] leading-[1.6] tracking-[0.44px]">
                            A self-taught UI/UX designer, functioning in the industry for 3+ years now. I make
                            meaningful and delightful digital products that create an equilibrium between user needs
                            and business goals.
                        </p>
                    </div>
                </main>
            </div>
        </>
    );
}
