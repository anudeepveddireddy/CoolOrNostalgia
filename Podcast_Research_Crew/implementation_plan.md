# Multi-Agent Podcast Research System

## Goal
Build a Python-based multi-agent system that completely automates deep-dive research for the "CoolOrNostalgia" podcast and generates production-ready Markdown and HTML cheat sheets. We will use a framework like **CrewAI**, which allows us to assign distinct roles, goals, and backstories to each AI agent.

## Proposed Agents

To get the best possible research and formatting, I suggest breaking the workload across these **7 specialized agents**:

### 1. The Historian (Data Gatherer)
- **Role**: Film Historian & Fact Checker
- **Goal**: Gather highly accurate, baseline facts about the movie.
- **Task**: Find the release date, budget, box office performance, runtime (theatrical vs. director's cut), main cast, key crew, and production studios.
- **Output**: A structured summary of the "Ground Facts".

### 2. The Deep-Diver (Trivia Specialist)
- **Role**: Behind-the-Scenes Detective
- **Goal**: Hunt down obscure trivia, production controversies, and weird casting facts.
- **Task**: Scour the internet for video essay summaries, behind-the-scenes drama, lawsuits (like Stephen King's), actor debuts, and bizarre stories that make for great podcast banter.
- **Output**: A list of highly engaging, lesser-known trivia facts.

### 3. The Critic (Analyst)
- **Role**: Pop-Culture Critic & Legacy Analyst
- **Goal**: Analyze the cultural footprint of the film.
- **Task**: Analyze critical consensus vs. audience reception, the movie's influences (and what it influenced later), differences between theatrical and director's cuts, and finally, deliver a verdict on the "Cool or Nostalgia Factor."
- **Output**: Thematic analysis and reception data.

### 4. The Adversarial Reviewer
- **Role**: Contrarian Film Critic
- **Goal**: Provide a heavily biased, contrarian take on the movie's legacy and the research gathered.
- **Task**: Challenge the findings of The Critic. If the consensus is that the movie is good, argue why it's overrated. If the consensus is bad, find a reason why it's a misunderstood masterpiece. 
- **Output**: A "Contrarian Take" section to spark debate on the podcast.

### 5. The Call-Backs Finder
- **Role**: Franchise & Lore Archivist
- **Goal**: Connect the current movie to past episodes of the podcast.
- **Task**: Review the gathered research and compare it against previously covered movies (e.g., *The Lawnmower Man*, *Masters of the Universe*). Find shared actors, directors, thematic overlaps, or competing box-office trends.
- **Output**: A "Podcast Call-Backs" section with references to past discussions.

### 6. The Entertainment-Factor Agent
- **Role**: Podcast Producer & Content Strategist
- **Goal**: Evaluate the research for maximum entertainment value and suggest specific talking points.
- **Task**: Review all gathered facts, trivia, and reviews. Highlight the funniest, most bizarre, or most controversial points. Suggest specific discussion prompts or "deep dives" for the host to focus on.
- **Output**: A "Host's Talking Points" summary highlighting the most entertaining angles.

### 7. The Web Developer (Synthesizer)
- **Role**: UI/UX Developer & Technical Writer
- **Goal**: Compile all research and generate the final cheat sheets.
- **Task**: Take the compiled research from all 6 previous agents. Format everything perfectly into the beautiful, dark-themed HTML layout (including the new sections for the Contrarian Take, Call-Backs, and Talking Points) and the raw Markdown version. Create the movie's directory and save the files inside it.
- **Output**: The final `CheatSheet.html` and `CheatSheet.md` files.

---

## User Review Required

> [!IMPORTANT]
> 1. **Agent Setup**: Does this **7-agent structure** look good to you, or would you like to add/modify any of the roles?
> 2. **Framework**: I propose using **CrewAI** in Python, as it perfectly handles this kind of sequential "assembly line" workflow. Does that work for you?
> 3. **API Keys**: To run this script locally, you will need to provide an LLM API key (like OpenAI or Anthropic) and a Search API key (like Serper.dev) so the agents can browse the web. Are you comfortable setting those up in a `.env` file?

## Proposed Changes

### Automation Script
#### [NEW] `research_crew.py`
A Python script that:
- Initializes the 7 CrewAI agents.
- Defines the 7 distinct Tasks.
- Gives the agents access to web-searching tools.
- Runs the crew sequentially and outputs the final files into a dynamically created folder (e.g., `MovieTitle_Year/`).

#### [NEW] `requirements.txt`
Dependencies needed to run the script: `crewai`, `crewai_tools`, and `python-dotenv`.

## Verification Plan
1. Write the Python script based on the exact formatting you liked for *The Lawnmower Man*.
2. Provide instructions on how to set up the API keys.
3. Have you run a test execution on a new movie (e.g., "The Matrix" or "Masters of the Universe") to verify it generates the folder and HTML/MD files correctly.
