# liminalcx.com

Claire Kavanagh's consulting site for AI workshops, CX and teams. This is a plain static site: HTML pages plus one CSS file. There's no build step.

## How changes go live

- **Push to `main` and it goes live.** GitHub `ckav/liminalcx-site` is linked to the Netlify site "liminalcx" (team ckav), which publishes this folder as it is (`publish = "."`).
- **Domains:** liminalcx.com is the main address. www and liminalcx.co.uk redirect to it (see `netlify.toml`).
- **Edits happen from more than one place** (desktop and phone chats). Always `git pull` before editing.
- **Files that shouldn't be public** (like this README) need a 404 rule in `netlify.toml`. Otherwise they're served from the live site.

## Structure

| Path | Page |
|---|---|
| `index.html` | Home (the former draft, live since 18 Nov 2026) |
| `services/index.html` | Services: 1:1, Workshops, Consulting (was /workshops, which still redirects) |
| `ai-audit/index.html` | AI Audit (was /focus-first, which still redirects) |
| `about/index.html` | Bio and case studies: this website (flow diagram, update animation) and a Premier League football club (flow, before/after, results). Clients aren't named on the site. Source text for case studies is in `AutomationFramework/website_management/` (`case-study-*.md`), written using `case-study-brief.md`. |
| `404.html` | Not found page |
| `assets/site.css` | All styles. Colours are CSS variables in `:root` |
| `assets/logo.png`, `assets/claire.jpg` | Images |
| `assets/embed/` | Claire's own EMBED artwork: the circle diagram and the five lime-to-green stage icons. Originals are in `AutomationFramework/website_management/`, which also has her branded People, Process, Platforms, results and cart/ticket icons. |
| `netlify.toml` | Domain redirects, booking redirects, old-URL redirects, headers |

## Rules for the site

- **Booking buttons** link to `/book` (free 15-minute intro call) or `/book-power-hour` (paid). The real calendar links are in `netlify.toml` only, so a calendar change is a one-line edit there.
- **Contact:** info@liminalcx.com and LinkedIn. The contact box appears on every page.
- **Thalia Shaw never appears on this site.** She hosts the Focus First founders workshop, which Claire delivers as a favour.
- **Plain language**, with no tool or feature jargon. The audience is managers and founders, not technical people.
- **Look:** black and white with lime accents. Fonts are Rubik (body and headings) and DM Mono (small uppercase kickers).
  - Colours: `--lime #CAD400`, `--olive #585D00` (text kickers), `--green-dark #007A34` (links).

## Services page: "The approach" loop

This is the section headed **"Stop learning. Start coaching."** The idea is that you brief AI the same way you'd brief a new starter.

- **The diagram.** An inline SVG circle with 5 stages: Brief → Questions → First draft → Feedback → Update, then back to Brief. "Less like that, more like this." sits in the centre.
- **How it moves.** It cycles through the stages every 4.5 seconds, and the active stage turns lime. Underneath are a row of stage buttons and a black card showing an example prompt for the active stage, labelled "You" or "AI".
  - Clicking a stage or a button jumps to it and stops the cycling. Hovering pauses it.
  - If a visitor's device is set to reduce motion, it doesn't cycle.
- **The example task** is a business development manager turning meeting notes into a draft proposal. "28 February" in the Feedback prompt is an example date that Claire approved.
- **To change the wording,** edit the `steps` array in the `<script>` right after the figure in `services/index.html`. Each entry is `['You' or 'AI', 'text']`.
  - Use curly apostrophes (’) inside the text. A straight `'` ends the JavaScript string and breaks the whole loop: the card shows up empty.
- **The card never changes height.** The script adds invisible copies of all five prompts to the card (`.loop-ghost`), so it's always as tall as the longest one. Nothing needs adjusting when the wording changes.
- **Styles** are the `.loop*` rules in `assets/site.css`.
- **History.** The first version (replaced on 17 Nov 2026) had a New starter / AI switch with two written lists. Claire dropped it because it took too much room and didn't add much, and she wanted the section to be useful straight away, with real prompts.

## Home page

This direction was agreed with Claire on 17 Nov 2026 and built as a hidden draft at /draft-home/. It replaced the old home page on 18 Nov 2026, and /draft-home/ now redirects to /. The old home page ("Raising the bar for customer experience", EMBED cards, People / Process / Platform) is in git history.
- **Audience:** founders and teams who already use AI but feel they should be doing more. Consulting isn't expected to come from the website, so it's played down.
- **Hero:** "Unlock the power to create better human experiences".
- **Section order (18 Nov 2026):** hero → The approach (the coaching loop, copied from Services) → How we help: EMBED (Claire's circle and icons) → Start where you are → bio → platforms → Sound familiar? (moved to the bottom, above contact).
- **Sound familiar? cards:** five concerns (Confidence, Platform, Apathy, Compliance, Consistency), each with "What I've heard" and "Where to start". Claire wrote the "Where to start" lines.
- **Why me:** the "25+ years…" line is a quote in the bio, after "My view…". It was a lime panel at first; Claire didn't like that design.
- **Start where you are** (replaces the old services cards): "Alone, you improve your bit. Together, you improve the whole thing."
  - An "On your own" vs "Together" comparison, then the products as three steps:
    1. Start on your own (1:1 Power Hour)
    2. Learn alongside others (AI Audit, up to six people)
    3. Bring your team (team workshop)
  - The Consulting card is gone from the draft.
- The "Why together" block was tried and removed on 18 Nov 2026: Claire felt it wasn't working.
- The old EMBED and People / Process / Platform sections and the top strip are removed from the draft. They're gone from the site now.
- **Still to come:** a Microsoft stat on collaborative success rates, once Claire finds the source document.
- **Styles** for the home sections are at the end of `assets/site.css`.
- **The approach loop** appears on both the home page and Services. A wording change has to be made in both `steps` arrays.

## Checking a change before pushing

Serve the folder with `python -m http.server 8765`, then open http://localhost:8765/services/. For a screenshot, use headless Edge:
`msedge --headless=new --window-size=1280,1100 --screenshot=out.png http://localhost:8765/services/`
Add `--virtual-time-budget=14000` to capture the loop after it has cycled a few stages.

## Change log

- **16 Nov 2026:** Site moved from Webflow to static HTML on Netlify (home, workshops, Focus First).
  - Booking redirects, Power Hour £200, team workshop price on enquiry, email info@liminalcx.com.
- **17 Nov 2026:**
  - Focus First renamed **AI Audit**, with Individual and Team paths and a 1:1 option for founders.
  - Workshops page became **Services** (1:1, Workshops, Consulting), and section spacing was fixed site-wide.
  - **About** page added.
  - Services hero changed to "Make AI work harder for you". The approach story block was added, followed by the "Less like that, more like this." quote card.
  - The quote card was replaced by the feedback loop diagram (New starter / AI switch), then reworked into the cycling version with example AI prompts (described above).
  - Fixed the stray `rtimel=` on the Services page (now `rel=`). Clicking a loop stage now keeps it there: moving the mouse away no longer restarts the cycling.
  - Loop Update prompt reworded: "Good. Update the readme doc for this client, and update the proposal creation document to always include milestone dates in the timeline section."
  - Hidden draft of a new home page added at /draft-home/ (see above).
- **18 Nov 2026:** Loop card (Services and draft home) is now a fixed height, so it no longer jumps when the Update prompt shows.
- **18 Nov 2026:** Draft home: the "25+ years" lime panel became a quote in the bio.
- **18 Nov 2026:** Draft home: EMBED is now a table, with one row per stage and a line each for Customers and Employees. On phones the column names show inside each row. 
- **18 Nov 2026:** Draft home page: added The approach (coaching loop) and an EMBED section with Claire's branded artwork, and moved Sound familiar? to the bottom. Removed "Why together" and replaced the services cards with the alone vs together section and three product steps.

- **18 Nov 2026:** Stat changed from "370+ women mentored since 2020" to "370+ founders mentored since 2020" on Home, About and AI Audit.
- **18 Nov 2026:** The draft replaced the live home page. Styles moved into site.css, the meta description and social preview text were updated, and /draft-home/ redirects to /.
- **18 Nov 2026:** Second case study added to About: a Premier League football club (three teams merged into one, next-match-first rule, help centre). It's anonymised, as is everything in Case studies.

## Known issues

- None at the moment.
- "The approach" is on both Services and the home page. Claire to decide what replaces it on Services.
