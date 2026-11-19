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
| `about/index.html` | Bio and case studies: this website (flow diagram, update animation) a Premier League football club (flow, before/after, results), and a global merchandise company's multi-store order panel (animated mock-up in `assets/case-studies/order-panel.css` / `.js`, built like the bookings course demo: edit the `scenes` list in the JS and the matching `data-k` elements in the page). Clients aren't named on the site. Source text for case studies is in `AutomationFramework/website_management/` (`case-study-*.md`), written using `case-study-brief.md`. |
| `free/index.html` | Free mini courses: one card per course (in the nav as "Free courses") |
| `free/<course>/` | One course: `index.html` (the page) and `guide.md` (the instructions people paste into their AI chat) |
| `personal-pa/index.html` | **Hidden** paid course sales page: "Build your own Personal PA" (2-hour live course). Not in the nav or sitemap, and noindex (meta tag plus an `X-Robots-Tag` header in `netlify.toml`). It's a self-contained Claude Design export, not built on `site.css`. Source: `AutomationFramework/workshop_variations/life_locker_workshop/Personal PA Course.html` (the folder keeps the old "Life Locker" name, which is only what Claire calls her own one). Still to fill: `[£PRICE]` (2 places), `[DATE]`, `[TIME]`; the Reserve button emails info@liminalcx.com until there's a booking link. |
| `404.html` | Not found page |
| `assets/site.css` | All styles. Colours are CSS variables in `:root` |
| `assets/logo.png`, `assets/claire.jpg` | Images |
| `assets/results/` | Claire's results icons (cost savings, satisfaction, automations), resized to 240px from the 4500px originals in website_management. Used in the Services Results cards. |
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

## Free mini courses (/free/)

Short free courses for PAs and admins. Each course is a set of instructions that people paste into ChatGPT, Claude, Copilot or Gemini. The AI then coaches them through the job one step at a time.
- **The instructions live only in `guide.md`.** The course page loads that file into the copy box, so to change a course you edit `guide.md` and nothing else. The Copy and Download buttons use the same file.
- **The guide has a set shape.** It opens with "Instructions for the AI" (ask first, one step at a time, never ask for passwords or card details, plain English), then "Questions to ask first", then "Reference: the steps", then "When we're finished".
- **To add a course:**
  1. Copy the `free/google-bookings-stripe/` folder and give it a new short name.
  2. Rewrite `guide.md`, then the page text (title, meta tags, "You'll end up with", "You'll need" and the download filename).
  3. Add a card to `free/index.html` and a line to `sitemap.xml`.
- **Course 1: Swap Calendly for Google Calendar bookings** (`free/google-bookings-stripe/`, the folder keeps its old name so live links still work). Since 18 Nov 2026 it covers booking pages, testing and the switch-over only; payments moved to course 3. It's a general version of `AutomationFramework/website_management/liminalcx-booking-setup.md`, with Claire's own details taken out.
- **Keep guides evergreen.** Each guide has an "Official help" list of the provider's own help pages, and tells the AI to check them before each step, because button names and plans change. The steps describe *what* to do; where a screen name is given, it's marked "at the time of writing". The course page shows the same links.
- **The animation** ("See it first") on the bookings course is a drawn illustration of the Google Calendar screens, not a recording: `demo.css` (styles, all `.gd-*`) and `demo.js` (the `scenes` list: one caption and one set of cursor actions per step). It's built at 760×500 and scaled to fit, so it looks the same on phones. It pauses when scrolled out of view, has Pause/Play and step buttons, and doesn't move if the visitor's device is set to reduce motion. To change a step, edit its scene in `demo.js` and the matching `data-k` elements in `index.html`.
- **Course 2: Daily email and calendar sweep** (`free/daily-sweep/`). The AI asks set-up questions one at a time, each with a suggested answer (for example drafts or list only, what to ignore, the "waiting on others" list). It writes the sweep instructions, tests them on today's inbox, then schedules them in the person's own AI tool. If the tool can't schedule, it becomes a one-click morning routine instead. The sweep only reads, and writes drafts only if asked. The page has an animated chat showing the one-at-a-time questions and a sample of the 6am email (styles inline in the page). Official help links cover Gemini, Microsoft 365 Copilot, ChatGPT and Claude.
- **Course 3: Connect Stripe and take payment before booking** (`free/booking-payments/`). It covers: the Google plan check (and admin switch), connecting Stripe in Calendar Settings → General → Appointment schedules, and "Payments and cancellation policy" on each booking page (Require payment when booking, amount, currency, cancellation policy). Then confirmations and reminders, Stripe receipts, a real-payment test with a refund, and day-to-day refunds. The AI asks one question at a time, including whether they have Stripe already, whether they have products (not needed: Google charges the amount typed in) and how confident they are with Stripe. It deliberately doesn't teach Stripe product setup. The page has two drawn screens based on Claire's own Calendar settings (styles inline).
- **Course 4: Sort out a messy folder** (`free/organise-a-folder/`). Based on Claire's ClaudeIntro session 3 slides 55–58 and her own CoworkTest family-photo test. The AI checks it can open folders, then: test folder of copies → connect the folder → plan first (nothing moves) → steer it → move, duplicates set aside, README → check together → save as a "folder organiser" (a skill in Claude) → test it on a second folder. It never renames or deletes. If the tool can't open folders, the guide falls back to a by-hand plan from pasted file names. The "See it first" animation is inline in the page (`.of-*` styles, `scenes` array in the script): 13 of Claire's real photo thumbnails move from a messy grid into family folders, with a chat beside them. Thumbnails and Claire's two screenshots (before folder, Kavanagh folder) are in `free/organise-a-folder/img/`. Family names appear on the page with Claire's OK.
- **Course 5: Project folders that stay tidy** (`free/project-folders/`). Sets up four PARA top-level folders (1 Projects, 2 Areas, 3 Resources, 4 Archive, from Tiago Forte's *Building a Second Brain*, credited and linked to fortelabs.com/blog/para), a top-level README, and a first project with subfolders, an Archive subfolder and its own README.md (template in the guide). It saves a "new project" recipe ("Start a new project called [name]"), and the bonus is a daily sweep (suggested 6pm weekdays) that files new or misplaced files, moves superseded versions to the project's Archive, and updates the README's Latest versions / Last updated / Needs you. Finished projects move whole to 4 Archive. Never renames or deletes. The page explains why a README helps (the AI reads one page instead of every file). The "See it first" animation is a drawn folder tree plus chat (`.pf-*` styles; `scenes` array in the script; tree rows show between their `data-in` and `data-out` scenes, and `data-hot` highlights them). The example project, a summer team away day, is made up.
- **Words worth knowing** (`free/explainers/`), first card on /free/. Platform-agnostic explainers in five groups: Files your AI can read (README, Markdown, Second brain), Teaching your AI (Context, Memory, Projects, Skills), Connecting (Connectors, API, MCP), AI that does things (Agents, Scheduled tasks), Staying safe (Bad actors, Making things up). Each is a `<details class="ex">` with an id, so `/free/explainers/#readme` opens that one; inside: In plain English, Think of it as, Why it matters to you, a lime "Names differ" note where tools use different words (hedged "at the time of writing"), a black "Try asking your AI" box and "See it in action" links to courses. Skills and MCP are described as open standards started by Anthropic (checked on agentskills.io and modelcontextprotocol.io, 18 Nov 2026). Basics like "LLM" and "prompt" are left out on purpose. The page has a find box and Open all / Close all (`.ex-*` styles inline). Its guide.md has the AI explain each word using the person's own job and tool, then write them a Markdown glossary. To add a word: copy a `<details>` block into the right group, give it a new id, and add a line to the guide's list. The folder courses link to the matching explainers.
- **The /free/ page:**
  - Cards sit in `.grid.courses`. Each black top is the same height across a row (CSS subgrid), whatever wraps inside it.
  - **Platform filter:** each card has `data-platforms="Google Calendar, Stripe"` (comma-separated). The filter pills above the cards are built from those, with counts, so a new platform gets its pill automatically. Keep the platform names spelled the same on every card.
  - `?platform=Stripe` opens the page already filtered.
- **Home page links:** a lime "Free mini courses" strip sits after "Start where you are" (`.free-band` in `index.html`), with a "See all free courses" button. **The course links build themselves:** a script reads the cards on /free/ (title, `data-platforms` and set-up time) and shows the first 4 in the order they appear there. The links written in the page are only a fallback if that fails, so there's no need to update them for each new course. To put a course on the home page, move its card nearer the top of /free/.
- **Paid plans:** each course page says "You'll likely need a paid plan" where it applies.
- `netlify.toml` serves `/free/*.md` as UTF-8 markdown, so curly quotes and other special characters display properly.
- **Styles:** the "Free mini courses" rules at the end of `assets/site.css`.

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
- **18 Nov 2026:** Case study result headings on About can now wrap ("Peaks absorbed" was spilling out of its box). Bio stats still stay on one line.
- **18 Nov 2026:** Football club case study: added Claire's "Classic fan journey" diagram (`assets/case-studies/fan-journey.png`, shown at its own 774px width and clickable to open).

- **18 Nov 2026:** Added Free mini courses at /free/, with the first course (Google Calendar bookings with Stripe, replacing Calendly). "Free courses" added to the nav on every page, and both pages added to the sitemap.
- **18 Nov 2026:** Bookings course: added the animated walk-through and the Official help links (Google and Stripe). The guide now tells the AI to check the official pages and covers the Workspace admin switch. Plan facts were corrected: Google One plans don't include paid bookings.
- **18 Nov 2026:** Bookings course: the hero line now reads "Free mini courses · Google Calendar · Stripe · Time to set up: 30 to 60 minutes". "What you need" pills (Google Workspace (paid plan), Stripe account, Any AI chat) sit above the title. The /free/ card shows its pills above the title too. "You'll need" now says a paid Workspace plan is required for payments.
- **18 Nov 2026:** Added the second free course, Daily email and calendar sweep (/free/daily-sweep/), with a card on /free/ and a sitemap entry.
- **18 Nov 2026:** Split payments out of the Calendly course into a new course 3, Connect Stripe and take payment before booking (/free/booking-payments/). Course 1's animation no longer shows payment (5 steps). Added "likely need a paid plan" notes, a card on /free/ and a sitemap entry.
- **18 Nov 2026:** /free/: course card tops are now equal height, and there's a platform filter (built from each card's `data-platforms`).

- **18 Nov 2026:** Services Results cards now use Claire's own icons in place of the £ / + / ↻ circles. Note: the cost savings icon shows $, not £.

- **18 Nov 2026:** Services Team workshop tagline changed from "AI for the routine. EI for the human." to "Unlock your team’s time." There's no "EI" left on the site.
- **18 Nov 2026:** Services Results heading changed from "Delivering success, every time" to "Delivering value".
- **18 Nov 2026:** Services Consulting EMBED cards now use Claire's stage icons (from `assets/embed/`) in place of the black letter boxes.

- **18 Nov 2026:** Third case study added to About: a global merchandise company, with 50+ online stores in one order panel beside the ticket. It includes a low-fidelity animated mock-up (no real names or data) and the line "How AI would help today", because the project was done without AI.

- **18 Nov 2026:** Home "Start where you are" replaced with Claude Design's version: an On your own → Together bar, and three cards with line icons (1:1 Power Hour, AI implementation workshop, Team AI Audit; the last is tinted). Styles are the `.sw-*` rules in site.css; the old `.vs` / `.path` rules are removed. The product names and copy came from the design, and Claire plans to tweak the copy later. Links: 1:1 → /services/#one-to-one, workshop → /ai-audit/, Team AI Audit → /services/#workshops. Source file: `AutomationFramework/website_management/start-where-you-are.html`.

- **18 Nov 2026:** Added the hidden "Build your own Personal PA" paid course page at /personal-pa/ (noindex, not in nav or sitemap). Contact email set to info@liminalcx.com; price, date and time are still placeholders, and Reserve emails info@ for now.

- **18 Nov 2026:** Fourth case study added to About: giffgaff, the only named one (Claire worked there in-house). It includes Claire's 11 member flows diagram (`assets/case-studies/member-flows.png`), two story cards (Recommended plan and Extra SIM) with illustrative text messages labelled as illustrative, and the results (99% self-service, 70+ NPS, 50% from referral, 4 million+ members). There's no AI section. Always write "giffgaff" in lower case, and "members", not customers. Styles: `assets/case-studies/giffgaff.css`. The Case studies intro now says giffgaff is the exception to the no-names rule.

- **18 Nov 2026:** Added the fourth free course, Sort out a messy folder (/free/organise-a-folder/), with an animated walk-through using Claire's own family photos, her before/after screenshots, a card on /free/ and a sitemap entry.
- **18 Nov 2026:** Added the fifth free course, Project folders that stay tidy (/free/project-folders/): PARA folders, a README per project, a "new project" recipe and a bonus daily sweep that archives old versions. Card on /free/ and sitemap entry added.
- **18 Nov 2026:** Project folders course: guide.md now includes a PARA cheat sheet section (four folders with examples, the "where does a file go?" questions, tips and five rules, paraphrased from Tiago Forte's cheat sheet and credited). Subfolders are only created when there is a file for them (his never-create-an-empty-folder rule). The page has a matching where-does-it-go flowchart and rules card. The animation now adds Venue, Agenda and Archive folders during the sweep. Forte's PDF is not hosted: the page links to fortelabs.com.
- **18 Nov 2026:** Added Words worth knowing (/free/explainers/): plain-English explainers with expandable entries, a find box, deep links per word and a guide.md. First card on /free/, sitemap entry, and "new to these words?" links from the two folder courses.
- **18 Nov 2026:** New photo of Claire (at the kitchen counter, on the phone) replaces assets/claire.jpg on Home and About. Cropped from a 1080x720 landscape original to 576x720 so she sits in the 4:5 frame; img width/height updated. It is also the og:image for sharing.
- **18 Nov 2026:** New quote on Home and About (bio quote and About hero lede): "AI, if you're not careful, takes more of your time than it gives back." Added Claire's Time, scope, resource triangle (inline SVG, `.tsr` styles) as its own full-width section straight after the bio on both pages. The line under the kicker is placeholder copy. The small labels are hard to read on phones.
- **18 Nov 2026:** Two mobile case studies added to About, before giffgaff: an all-digital mobile network (in development, not launched: vendor selection, prototypes, contract review) and a travel eSIM business (re-platform and support tickets with customer details added automatically). The network card has an animated prototype mock-up (`assets/case-studies/mobile-proto.css` / `.js`, `.mp-*` styles, edit the `scenes` list in the JS); the eSIM card has a drawn ticket (`.tk-*`). Both are illustrations built for the site, not the client’s prototypes, which stay private in AutomationFramework. The client and its brand are never named; markets show as Market A to D.
- **18 Nov 2026:** About: "This website" case study rewritten as "built on my laptop, updated from my phone". Part 1 (16 Nov, laptop): what Claire gave Claude (saved Webflow pages, Webflow content exports, product notes, booking plan, logo/photo/artwork) → what it built → GitHub → Netlify → liminalcx.com. Part 2 (phone): the existing chat animation plus a real timeline of 17 Nov phone updates from git history. Results use git figures: 12 updates from the phone on 17 Nov (11:52 to 14:39), 44 changes in three days. A <!-- PHONE-SCREENSHOTS --> marker in the page is where Claire's real phone screenshots go (`.wb-shots` styles are ready). Styles: `.wb*` in the page.
- **18 Nov 2026:** Travel eSIM case study rewritten as product launch support, through a product development lens: research (buying scenarios), design (12 customer journeys) and clickable prototypes, made much quicker with AI. The drawn ticket was replaced by a three-step illustration (research card, destination search, sending eSIMs to family), `.pd-*` styles in `assets/case-studies/mobile-proto.css`. "Much quicker" is used instead of a time figure until Claire confirms one.
- **18 Nov 2026:** Home page: added the Free mini courses strip (links to all three courses and /free/) after "Start where you are".
- **18 Nov 2026:** Travel eSIM case study rebuilt from Claire’s two diagrams: "A travel eSIM service, mapped and working in six weeks" (requirements captured and a working service in six weeks; the public launch came later). "One journey, six flows" is an animated diagram (`.fl-*` styles in `assets/case-studies/mobile-proto.css`, scenes in `assets/case-studies/journey-flow.js`), and "Where automation could help each team" is six team cards (`.tm-*`), labelled as opportunities, not all built. The note says the original development partner didn’t build all the self-service and the business moved to a new partner: keep it neutral, never criticise the developers on the site.
- **18 Nov 2026:** Home page: the Free mini courses links are now built from the /free/ cards (first 4), so new courses appear automatically.
- **18 Nov 2026:** Organise a folder: fixed the "Siser" typo to "Sister" in the Jean Murray animation label and in the Kavanagh folder screenshot (label repainted in the image). The real file in CoworkTest is still spelled "Siser".
- **18 Nov 2026:** /free/ intro line changed from "for PAs and admins" to "for anyone who wants to recapture more of their time", plus a line on illustrating new ways of using existing tools.

- **19 Nov 2026:** About page reworked to lead with seniority (plan: `AutomationFramework/website_management/about-page-plan.md`). New bio (three mobile launches, giffgaff board member, TPO US launch, interim Global CMO kept vague), new stats, a "What I bring" block with a career strip, and the Time/scope/resource triangle moved to Services (above contact). Case studies reordered: giffgaff, digital network, football club, travel eSIM, merchandise; each has a lime "The decision" line and a "My role" note; "How AI helped" became "What AI made possible" on two. The website study is demoted to a "How I work" strip at the end (file lists and time log removed).

- **19 Nov 2026:** About bio stats put back to the home page set (Claire didn't like the title boxes), with "people mentored" on both pages. giffgaff case study rebuilt in the slide format (styles `.sl-*` in the About page): situation, decision, what stayed with people and my role on the left, four big numbers on the right, then the 11-flow diagram with three cards tying flows to outcomes, and the two text messages folded into a "See the two messages" details block.

- **19 Nov 2026:** About bio: added that Claire studied information systems (database and web design) alongside marketing in the late 1990s, as the foundation for the technical side of her work and for AI.

- **19 Nov 2026:** About case studies are now tabs: a sticky row of pills (built from each article's `data-tab` label, so a new study gets a pill automatically) shows one study at a time, with previous/next at the foot of each. Links like `/about/#giffgaff` open that tab. Without JavaScript, all studies show in order. Showing a tab fires a `resize` event so the animations size themselves.

- **19 Nov 2026:** The other four client case studies rebuilt in the slide format (situation, decision, what stayed with people, my role; four numbers on the right). Each has a hero visual of the decision, built in HTML: the 11 → 7 → 1 vendor funnel (`.funnel`), three teams into one (`.merge`), the six-week timeline (`.tl`) and 52 stores before/after (`.stores`). The animations now sit inside "See…" details blocks; opening one fires a `resize` so it sizes itself. The merchandise study's "How AI would help today" moved into My role. The website study is unchanged.

- **19 Nov 2026:** Travel eSIM six-flow diagram re-laid out so no lines cross: "Compare and buy" sits centred under the two pre-purchase boxes, "Step-by-step setup" is centred above "Reviews and referrals", and "Fix connection problems" moved right to make room.

- **19 Nov 2026:** Removed the lime top border from the team cards (`.tm-c`) in the travel eSIM study; they now have the same thin border all round.

## Known issues

- None at the moment.
- Home "Start where you are": the section title and product names are still to be settled with Claire, and the page names (AI Audit, Team workshop) don't match the card names yet.
- "The approach" is on both Services and the home page. Claire to decide what replaces it on Services.
