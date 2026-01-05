import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let ctx

function initAnimations() {
  if (ctx) ctx.revert() // Clean up old animations

  const animationsClasses = window.animationsClasses
  if (!animationsClasses) return

  ctx = gsap.context(() => {
    // ---- Hero ----

    // Zoom image when scroll down
    // Check if element exists to avoid GSAP warnings
    if (document.querySelector(`.${animationsClasses.hero.image}`)) {
      gsap.to(`.${animationsClasses.hero.image}`, {
        scale: 1.3,
        scrollTrigger: {
          trigger: `.${animationsClasses.hero.image}`,
          start: 'top 20%',
          end: 'bottom top',
          scrub: 2,
          markers: import.meta.env.MODE === 'development',
        },
      })
    }

    // Reveal text "smooth" and "software" when scroll down
    if (document.querySelector(`.${animationsClasses.hero.smooth}`)) {
      gsap.to(`.${animationsClasses.hero.smooth}`, {
        opacity: 0,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: `.${animationsClasses.hero.smooth}`,
          start: 'top 20%',
          end: 'bottom bottom',
          scrub: true,
          markers: import.meta.env.MODE === 'development',
        },
      })
    }

    if (document.querySelector(`.${animationsClasses.hero.software}`)) {
      gsap.to(`.${animationsClasses.hero.software}`, {
        opacity: 1,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: `.${animationsClasses.hero.software}`,
          start: 'top 20%',
          end: 'bottom bottom',
          scrub: true,
          markers: import.meta.env.MODE === 'development',
        },
      })
    }

    // ---- Content Media ----

    // Zoom image when scroll down
    const contentMediaClasses = [animationsClasses.contentMedia.image1, animationsClasses.contentMedia.image2]
    contentMediaClasses.forEach((className) => {
      const targets = document.querySelectorAll(`.${className} .img-wrapper`)
      targets.forEach((el) => {
        gsap.to(el, {
          scale: 1.2,
          scrollTrigger: {
            trigger: el,
            start: 'top center',
            end: 'bottom center',
            scrub: 2,
            markers: import.meta.env.MODE === 'development',
          },
        })
      })
    })
  })
}

// Support Astro View Transitions
document.addEventListener('astro:page-load', initAnimations)
