import { phoneClean } from './contact'

// Service categories
export type ServiceCategory =
    | 'development'
    | 'ecommerce'
    | 'analytics'
    | 'seo'
    | 'automation'
    | 'consulting'
    | 'maintenance'
    | 'marketing'

// Service interface
export interface Service {
    id: string
    name: string
    shortName?: string // For forms/compact displays
    description?: string
    icon?: string // Lucide icon name
    category: ServiceCategory
    whatsappMessage?: string // Custom WhatsApp message
    formValue?: string // Value for form submissions
    formName?: string // Name attribute for forms
    groups?: string[] // Which groups this service belongs to: 'homepage', 'footer-primary', 'footer-seo', 'contact-form'
}

// Helper function to create WhatsApp links
export const createWhatsAppLink = (message: string): string => {
    const phone = phoneClean.replace('+52', '521')
    const encodedMessage = encodeURIComponent(message)
    return `https://api.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`
}

// All service definitions
export const services: Service[] = [
    // Main Development Services
    {
        id: 'custom-platforms',
        name: 'Plataformas a medida',
        description:
            'Creamos software diseñado exclusivamente para tu empresa, resolviendo esos problemas específicos que las herramientas genéricas no cubren.',
        icon: 'lucide:layers',
        category: 'development',
        whatsappMessage: 'Hola, me interesa conocer más sobre Plataformas a medida',
        groups: ['homepage'],
    },
    {
        id: 'web-development',
        name: 'Desarrollo Web a medida',
        shortName: 'Desarrollo Web a medida',
        category: 'development',
        whatsappMessage: 'Hola, me interesa conocer más sobre Desarrollo Web a medida',
        formValue: 'web',
        formName: 'web-development',
        groups: ['footer-primary', 'contact-form'],
    },
    {
        id: 'intelligent-dashboards',
        name: 'Paneles de control inteligentes',
        description:
            'Visualiza el estado de tu negocio en tiempo real con tableros sencillos que transforman datos en decisiones claras.',
        icon: 'lucide:layout-dashboard',
        category: 'analytics',
        whatsappMessage: 'Hola, me interesa conocer más sobre Paneles de control inteligentes',
        groups: ['homepage'],
    },
    {
        id: 'dashboards-control',
        name: 'Dashboards de Control',
        shortName: 'Dashboard / Panel de Datos (Django)',
        category: 'analytics',
        whatsappMessage: 'Hola, me interesa conocer más sobre Dashboards de Control',
        formValue: 'dashboard',
        formName: 'dashboard',
        groups: ['footer-primary', 'contact-form'],
    },
    {
        id: 'professional-stores',
        name: 'Tiendas online profesionales',
        description:
            'Creamos tu canal de ventas en internet, diseñado para ser fácil de gestionar y, sobre todo, para vender más.',
        icon: 'lucide:shopping-cart',
        category: 'ecommerce',
        whatsappMessage: 'Hola, me interesa conocer más sobre Tiendas online profesionales',
        groups: ['homepage'],
    },
    {
        id: 'ecommerce-stores',
        name: 'E-commerce y Tiendas',
        shortName: 'Tienda Online / E-commerce',
        category: 'ecommerce',
        whatsappMessage: 'Hola, me interesa conocer más sobre E-commerce y Tiendas',
        formValue: 'ecommerce',
        formName: 'ecommerce',
        groups: ['footer-primary', 'contact-form'],
    },
    {
        id: 'mobile-apps',
        name: 'Apps Móviles',
        category: 'development',
        whatsappMessage: 'Hola, me interesa conocer más sobre Apps Móviles',
        groups: ['footer-primary'],
    },
    {
        id: 'landing-pages',
        name: 'Páginas de venta (Landings)',
        description:
            'Diseñamos webs directas y persuasivas, enfocadas en un solo objetivo: que tus clientes te contacten o compren al instante.',
        icon: 'lucide:target',
        category: 'marketing',
        whatsappMessage: 'Hola, me interesa conocer más sobre Páginas de venta (Landings)',
        groups: ['homepage'],
    },
    {
        id: 'product-catalogs',
        name: 'Catálogos de productos',
        description:
            'Presenta tu oferta de forma elegante y organizada para que tus clientes encuentren lo que buscan sin complicaciones.',
        icon: 'lucide:grid',
        category: 'ecommerce',
        whatsappMessage: 'Hola, me interesa conocer más sobre Catálogos de productos',
        groups: ['homepage'],
    },
    {
        id: 'search-visibility',
        name: 'Visibilidad en buscadores',
        description:
            'No solo creamos tu web; hacemos que aparezca en los primeros resultados para que tus clientes ideales te encuentren a ti.',
        icon: 'lucide:search',
        category: 'seo',
        whatsappMessage: 'Hola, me interesa conocer más sobre Visibilidad en buscadores',
        groups: ['homepage'],
    },
    {
        id: 'technical-peace',
        name: 'Tranquilidad técnica',
        description:
            'Nos ocupamos de que tu web esté siempre activa, segura y rápida. Olvídate de los errores técnicos para siempre.',
        icon: 'lucide:shield-check',
        category: 'maintenance',
        whatsappMessage: 'Hola, me interesa conocer más sobre Tranquilidad técnica',
        groups: ['homepage'],
    },
    {
        id: 'task-automation',
        name: 'Automatización de tareas',
        description:
            'Hacemos que la tecnología trabaje por ti. Ahorra horas de trabajo manual delegando procesos repetitivos al software inteligente.',
        icon: 'lucide:zap',
        category: 'automation',
        whatsappMessage: 'Hola, me interesa conocer más sobre Automatización de tareas',
        groups: ['homepage'],
    },
    {
        id: 'process-automation',
        name: 'Automatización de Procesos',
        shortName: 'Automatización de procesos',
        category: 'automation',
        whatsappMessage: 'Hola, me interesa conocer más sobre Automatización de Procesos',
        formValue: 'automation',
        formName: 'automation',
        groups: ['footer-primary', 'contact-form'],
    },
    {
        id: 'improvement-consulting',
        name: 'Consultoría de mejora',
        description:
            'Analizamos lo que ya tienes para decirte cómo hacerlo más eficiente, moderno y mucho más rentable.',
        icon: 'lucide:lightbulb',
        category: 'consulting',
        whatsappMessage: 'Hola, me interesa conocer más sobre Consultoría de mejora',
        groups: ['homepage'],
    },
    {
        id: 'tech-consulting',
        name: 'Consultoría Tecnológica',
        category: 'consulting',
        whatsappMessage: 'Hola, me interesa conocer más sobre Consultoría Tecnológica',
        groups: ['footer-primary'],
    },
    // SEO and Strategy Services
    {
        id: 'seo-audit',
        name: 'Auditoría SEO Gratuita',
        category: 'seo',
        whatsappMessage: 'Hola, me interesa solicitar una Auditoría SEO Gratuita',
        groups: ['footer-seo'],
    },
    {
        id: 'google-positioning',
        name: 'Posicionamiento en Google',
        category: 'seo',
        whatsappMessage: 'Hola, me interesa conocer más sobre Posicionamiento en Google',
        groups: ['footer-seo'],
    },
    {
        id: 'speed-optimization',
        name: 'Optimización de Velocidad',
        category: 'seo',
        whatsappMessage: 'Hola, me interesa conocer más sobre Optimización de Velocidad',
        groups: ['footer-seo'],
    },
    {
        id: 'seo-traffic',
        name: 'Optimización SEO y Tráfico',
        category: 'seo',
        whatsappMessage: 'Hola, me interesa conocer más sobre Optimización SEO y Tráfico',
        formValue: 'seo',
        formName: 'seo',
        groups: ['contact-form'],
    },
    {
        id: 'persuasive-copywriting',
        name: 'Copywriting Persuasivo',
        category: 'marketing',
        whatsappMessage: 'Hola, me interesa conocer más sobre Copywriting Persuasivo',
        groups: ['footer-seo'],
    },
    {
        id: 'content-strategy',
        name: 'Estrategia de Contenidos',
        category: 'marketing',
        whatsappMessage: 'Hola, me interesa conocer más sobre Estrategia de Contenidos',
        groups: ['footer-seo'],
    },
]

// Helper functions
export function getServiceById(id: string): Service | undefined {
    return services.find((service) => service.id === id)
}

export function getServicesByCategory(category: ServiceCategory): Service[] {
    return services.filter((service) => service.category === category)
}

export function getServicesByGroup(group: string): Service[] {
    return services.filter((service) => service.groups?.includes(group))
}

export function createServiceWhatsAppLink(service: Service): string {
    if (!service.whatsappMessage) {
        throw new Error(`Service ${service.id} does not have a WhatsApp message`)
    }
    return createWhatsAppLink(service.whatsappMessage)
}

// Service groups for easy access
export const serviceGroups = {
    homepage: getServicesByGroup('homepage'),
    footerPrimary: getServicesByGroup('footer-primary'),
    footerSeo: getServicesByGroup('footer-seo'),
    contactForm: getServicesByGroup('contact-form'),
}

