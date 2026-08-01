## ADDED Requirements

### Requirement: Legal pages reference new company name
All legal pages SHALL reference "Dari Dev Team" as the company name in body text.

#### Scenario: Aviso Legal identifies new company
- **WHEN** a user visits /aviso-legal
- **THEN** all references to the company SHALL use "Dari Dev Team"

#### Scenario: Política de Privacidad identifies new company
- **WHEN** a user visits /politica-privacidad
- **THEN** the company name in the introduction SHALL be "Dari Dev Team"

### Requirement: Legal pages use new domain
All legal pages SHALL reference `darideveloper.com` for the website and `contact@darideveloper.com` for email.

#### Scenario: Aviso Legal website field
- **WHEN** a user visits /aviso-legal
- **THEN** the website listed in identifying data SHALL be `darideveloper.com`

#### Scenario: Cookies page contact email
- **WHEN** a user visits /configuracion-cookies
- **THEN** the contact email SHALL be `contact@darideveloper.com`

### Requirement: Sitemap page description updated
The sitemap page description for the legal notice SHALL reference the new company name.

#### Scenario: Sitemap entry
- **WHEN** a user visits /sitemap
- **THEN** the Aviso Legal description SHALL reference "Dari Dev Team"

### Requirement: Team references updated
All references to "3S" as team identifier SHALL be replaced with "Dari Dev Team".

#### Scenario: Footer team link
- **WHEN** a user views the footer
- **THEN** the link text "Sobre el Equipo 3S" SHALL be "Sobre Dari Dev Team"

#### Scenario: Homepage body text
- **WHEN** a user visits the homepage
- **THEN** all "En 3S" and "3S" references in prose SHALL be updated to "En Dari Dev Team" and "Dari Dev Team"

#### Scenario: Contact page body text
- **WHEN** a user visits the contact page
- **THEN** the "En 3S" reference in the body SHALL be "En Dari Dev Team"
