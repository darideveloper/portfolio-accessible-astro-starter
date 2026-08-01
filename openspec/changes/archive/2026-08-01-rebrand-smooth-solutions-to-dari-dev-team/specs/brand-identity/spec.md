## ADDED Requirements

### Requirement: Site name shows "Dari Dev Team"
All site identity constants SHALL use "Dari Dev Team" as the organization name.

#### Scenario: Site metadata displays new name
- **WHEN** the site metadata is rendered
- **THEN** the organization name SHALL be "Dari Dev Team"

#### Scenario: Title tag uses new name
- **WHEN** the page title is generated
- **THEN** it SHALL include "Dari Dev Team"

### Requirement: Site author is "DariDeveloper"
The site author constant SHALL be "DariDeveloper".

#### Scenario: Author metadata
- **WHEN** author metadata is accessed
- **THEN** it SHALL return "DariDeveloper"

### Requirement: Logo displays new brand
The header logo SHALL display the "Dari Dev Team" branding with the new logo image.

#### Scenario: Logo rendered
- **WHEN** the Logo component renders
- **THEN** the alt text SHALL say "Dari Dev Team"
- **AND** the title tooltip SHALL say "Dari Dev Team"
- **AND** the text below the logo SHALL read "Dari Dev Team"

### Requirement: Footer shows new company name
The footer copyright SHALL display "Dari Dev Team".

#### Scenario: Footer rendered
- **WHEN** the page footer is rendered
- **THEN** the copyright line SHALL contain "Dari Dev Team"

### Requirement: Project author field updated
All project content files SHALL have `author: "Dari Dev Team"` in frontmatter.

#### Scenario: Project author displayed
- **WHEN** a project page is rendered
- **THEN** the author shown SHALL be "Dari Dev Team"

### Requirement: Company description unchanged
The company description text SHALL remain as "software development company that specializes in building custom software solutions for businesses."

#### Scenario: Description preserved
- **WHEN** the site description metadata is accessed
- **THEN** it SHALL match the original text with only the organization name updated
