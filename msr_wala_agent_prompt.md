You are updating the existing website structure/content based on a newly approved PDF content source.

This is a strict implementation task.
Do not improvise.
Do not rewrite copy creatively.
Do not preserve old sections just because they existed before.

Source of truth:
- Use the attached markdown file `msr_wala_new_content.md` as the exact content structure and wording source.
- The content in that file was extracted and normalized from the approved PDF.
- Preserve wording as-is except for minimal formatting for readability.
- Do not invent any new marketing copy, testimonials, claims, case studies, or explanatory text.

Core decisions that are already approved:
- Home stays as a landing page for now.
- Kontakt stays as it currently is.
- Datenschutz stays for now.
- Sections/pages that are not present in the approved structure/content should be removed from the visible IA.
- The current approved visual style of the site stays.
- The task is to adapt the current site to the new approved content structure without changing the overall design direction.

Visible IA to implement:
- Home
- Unternehmen
- Service
- Prozesse
- Galerie
- Kontakt
- Datenschutz

Visible IA to remove from the main user-facing structure:
- Referenzen
- Anfahrt
- Impressum

Implementation rules:
1. Update the visible navigation and page/section structure to match the approved IA above.
2. Keep Home as the landing page.
3. Keep Kontakt as-is structurally.
4. Keep Datenschutz as-is for now.
5. Remove old visible sections/pages that are no longer part of the approved IA.
6. Do not keep old leftover sections in the visible experience.
7. Do not pull old content from legacy files unless strictly needed for technical continuity.
8. Do not rewrite the approved text.
9. Present the approved text cleanly and attractively within the current approved visual system.

Page/section implementation requirements:

UNTERNEHMEN
- Implement these subsections exactly:
  - Über uns
  - Fokus
  - Branchen
  - Hauptsitz
- Use only the text from the markdown file for those subsections.

SERVICE
- Implement these subsections exactly:
  - Schweißreparatur
  - Projekte
  - Rissprüfungen
  - Notreparaturen
  - Neuanfertigung / Umbau
  - Sonstiges
- Use only the approved text from the markdown file.

PROZESSE
- Add a dedicated Prozesse page/section.
- Implement these subsections exactly:
  - Schweißverfahren
  - Schneidarbeiten
  - Risse ausarbeiten
  - Nachbechandlung
  - Rissprüfungen
- Do not bury this under Service.

GALERIE
- Rebuild the gallery around these categories:
  - Pressen Reparaturen
  - Grossprojekte
  - Werkstatt Arbeiten
  - Guss Reparaturen
  - Auftragsschweissen
  - Lohnschweissen
- Use the images currently available in the project as temporary visualization assets.
- Distribute them across categories in a way that looks curated and visually coherent.
- Do not invent captions or project descriptions.
- Build this in a way that still feels premium, elegant, and WordPress-friendly later.
- A nice category-based gallery experience is preferred over one undifferentiated image wall.

Image mapping for the 4 newly provided images:
- Image 1 -> Prozesse / Schneiden
- Image 2 -> Service / Schweißreparatur
- Image 3 -> Prozesse / Schweißverfahren
- Image 4 -> Unternehmen / Hauptsitz

WordPress-friendliness requirements:
- Keep the implementation easy to migrate later into a custom WordPress theme.
- Avoid builder-style coupling.
- Use clean section boundaries and reusable structures.
- Keep content logically separable into future CMS-managed sections.

Do not do:
- no hallucinated content,
- no rewriting into new marketing language,
- no leftover old IA kept visibly just because it already exists,
- no fake references/testimonials,
- no fake gallery captions,
- no content invention.

Deliverables:
- update the visible site IA,
- adapt the content structure to the approved markdown,
- preserve the current approved design system,
- summarize which old visible sections/pages were removed,
- summarize how the new approved structure was implemented.
