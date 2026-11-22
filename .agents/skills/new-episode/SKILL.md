---
name: new-episode
description: >-
  Research a movie for the Cool Or Nostalgia podcast and generate the iPad-ready
  HTML cheat sheet, Markdown notes, YouTube description draft, and hub index card
  aligned to the channel's 6-chapter episode format.
---

# Cool Or Nostalgia — New Episode Prep Skill

Use this workflow whenever the user asks to prep, research, or create notes/cheat sheets for a new movie episode of the **Cool Or Nostalgia** podcast (`https://www.youtube.com/@CoolOrNostalgia`).

## Show Format Context (Keep Notes Tight & Scannable)
- **Hosts (4):** Jeffrey, Michael, Andy, and Mike (The Deuce).
- **Episode Length:** ~35–48 minutes (biweekly). Keep bullets concise with **bold lead-ins** so the host can scan them on an iPad mid-conversation without reading walls of text.
- **Standard 6-Chapter Run-of-Show:**
  1. `Intro` (quick, informal 30-second synopsis)
  2. `Who's seen it before?`
  3. `What was COOL?` (craft, practical/visual effects, pacing, performances, themes that still hold up)
  4. `What was NOSTALGIA?` (dated/campy elements, nitpicks, plot holes, logic debates)
  5. `Sequel/Remake ideas` (each host pitches a modern follow-up, reboot, or spinoff)
  6. `Cool vs. Nostalgia results` (binary round-table vote: **Cool** vs. **Just Nostalgia** — no numeric score)
- **Clip Strategy (`CON-MEN CLIPS`):** The channel also cuts 4–6 minute horizontal clips built around punchy standalone debate questions (e.g., *"Is Batman Returns a Secret Christmas Movie?"*).

---

## Step-by-Step Workflow

### Step 1: Check Existing Episodes for Real Call-Backs
Before researching, list the movie folders inside `docs/` (ignoring `docs/assets/`). Note previously covered movies so you can surface **authentic Podcast Call-Backs** (shared actors, directors, producers, composers, studios, themes, or box-office matchups).

### Step 2: Deep-Dive Research
Use web search to verify accurate facts and hunt for entertaining, non-obvious details:
- **Ground Facts:** Release date, budget, domestic/worldwide box office (and opening weekend competition), runtime, director, writers, key SFX/music crew, studios, main cast, and **Rotten Tomatoes Critic & Audience scores** (the channel cites these in descriptions).
- **What Holds Up (COOL):** Practical effects, cinematography, score, standout performances, pacing, thematic relevance today.
- **What Aged / Nitpicks (NOSTALGIA):** Dated CGI/fashion/dialogue, pacing dips, 3–5 fun plot holes or logic leaps with punchy podcast banter angles.
- **Production Trivia & Versions:** Behind-the-scenes drama, missed castings, studio interference, lawsuits, director's cuts vs. theatrical cuts, deleted scenes.
- **Sequel / Remake Landscape:** Existing sequels, reboots, TV spinoffs, or canceled projects — plus 2–3 original, fun pitch seeds for the panel to riff on.
- **Clip-Worthy Debate Hooks:** 2–3 standalone "hot take" questions that could easily become a 4–6 minute *CON-MEN CLIPS* video.

### Step 3: Create the Episode Folder & Files
Use the standardized folder name: `docs/<Movie_Title_Year>/` (underscores, no punctuation; e.g., `docs/Hackers_1995/`).

Generate these **3 files** inside `docs/<Movie_Title_Year>/`:

1. **`cheatsheet.md`** — Clean Markdown mirror of the episode notes, organized in the exact 6-chapter flow:
   - Title & Tagline
   - `1. 30-Second Intro Synopsis` (+ optional concise Mermaid plot flow)
   - `2. The Case for COOL (What Holds Up)`
   - `3. The Case for NOSTALGIA (Aged Elements, Camp & Plot Holes)`
   - `4. Sequel / Remake Pitch Fuel` (franchise history + 2–3 creative pitches)
   - `5. Clip-Worthy Debate Hooks (CON-MEN CLIPS)`
   - `6. Rapid-Fire Trivia, Cuts & Past-Episode Call-Backs`
   - `7. Verdict Prep & Contrarian Take`
   - `Ground Facts` (including RT Critic & Audience scores)

2. **`index.html`** — Built directly from `docs/assets/template.html`:
   - Links `../assets/cheatsheet.css` and `../assets/cheatsheet.js` (do **not** duplicate CSS inline).
   - Preserves the sticky `.chapter-nav` jump bar and `A-` / `A+` iPad font controls.
   - Places Ground Facts (with Rotten Tomatoes score pills) in the sticky `.sidebar`.
   - Keeps Mermaid diagram tucked inside `<details class="flow-toggle">` so it doesn't push Chapter 3 (*COOL*) off-screen on an iPad.

3. **`youtube_description.md`** — Ready-to-paste YouTube description matching the channel's exact template:
   ```markdown
   [1-sentence hook question about the movie]

   🧊 [2-3 sentence production/box-office/RT trivia paragraph]

   🔥 [2-3 sentence panel discussion teaser]

   Drop your verdict in the comments before you hit the results — is [Movie Title] genuinely COOL or JUST NOSTALGIA?

   📖 CHAPTERS 📖
   0:00 Intro
   XX:XX Who's seen it before?
   XX:XX What was COOL?
   XX:XX What was NOSTALGIA?
   XX:XX Sequel/Remake ideas
   XX:XX Cool vs. Nostalgia results

   🎧 Listen on audio platforms
   Spotify: [Add link]
   Apple Podcasts: [Add link]
   RSS: [Add link]

   Join Jeffrey, Michael, Andy, and Mike (The Deuce) every two weeks on Is It Cool or Just Nostalgia as we revisit classic movies to find out if they still hold up — or if it's just nostalgia talking. Subscribe for new episodes and clips!

   #CoolOrNostalgia #[MovieHashtag] #MoviePodcast
   ```

### Step 4: Update the Podcast Hub (`docs/index.html`)
Add a new `<a href="<Movie_Title_Year>/index.html" class="movie-card">` entry at the **top** of `.movie-grid` in `docs/index.html` (so the newest episode is immediately visible at the top on an iPad).

### Step 5: Verify
- Confirm all 3 files exist in `docs/<Movie_Title_Year>/`.
- Confirm `docs/index.html` links cleanly to `<Movie_Title_Year>/index.html`.
- Briefly report any standout trivia or call-backs found so the host is ready to hit record.
