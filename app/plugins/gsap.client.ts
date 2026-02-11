import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import type { default as LenisType } from 'lenis';

export default defineNuxtPlugin(() => {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.defaults({
        markers: process.env.NODE_ENV === 'development'
    });

    const lenis: LenisType = new Lenis({
        easing: (x: number) => 1 - Math.pow(1 - x, 5),
        anchors: true,
    });

    lenis.on('scroll', (lenis: LenisType) => {
        ScrollTrigger.update();
    });

    gsap.ticker.add((time: number) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return {
        provide: {
            lenis: lenis,
            gsap: gsap,
            ScrollTrigger: ScrollTrigger,
        }
    };
});
