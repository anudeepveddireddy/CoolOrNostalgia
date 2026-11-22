# Cool Or Nostalgia — Episode Research Hub

Episode research notes, iPad-friendly live recording cheat sheets, and YouTube description drafts for the **Cool Or Nostalgia** podcast ([YouTube Channel](https://www.youtube.com/@CoolOrNostalgia)).

## Quick Start: Prepping a New Episode

This repo includes a built-in workspace skill at [`.agents/skills/new-episode/SKILL.md`](.agents/skills/new-episode/SKILL.md). To prep a new movie, just ask your agent:

> **"Prep the next episode: *Movie Title* (Year)"**

The workflow automatically:
1. Checks existing episodes in `docs/` for real **Podcast Call-Backs**.
2. Researches Ground Facts (including Rotten Tomatoes scores), production trivia, plot holes, and franchise history.
3. Creates `docs/<Movie_Title_Year>/` with:
   - `index.html` — iPad-ready cheat sheet with sticky Chapter Jump Bar (`1. Intro` → `3. COOL` → `4. NOSTALGIA` → `5. Sequel/Remake` → `Clips & Trivia` → `6. Verdict`) and `A-` / `A+` font controls.
   - `cheatsheet.md` — Markdown mirror of the episode notes.
   - `youtube_description.md` — Ready-to-paste YouTube description & 6-chapter scaffold.
4. Adds the new episode card to [`docs/index.html`](docs/index.html).

## Repository Structure

```text
.
├── .agents/skills/new-episode/SKILL.md   # Automated episode prep workflow
├── docs/                                 # GitHub Pages root
│   ├── index.html                        # Podcast Hub landing page
│   ├── assets/
│   │   ├── cheatsheet.css                # Shared synthwave iPad stylesheet
│   │   ├── cheatsheet.js                 # Chapter scroll-spy, Mermaid init, A-/A+ toggle
│   │   └── template.html                 # Reference HTML skeleton for new episodes
│   └── <Movie_Title_Year>/               # One folder per episode
│       ├── index.html
│       ├── cheatsheet.md
│       └── youtube_description.md
└── podcast_research_agent_prompt.md      # Standalone copy-paste prompt for external LLMs
```
