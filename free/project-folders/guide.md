# Project folders that stay tidy

*A free mini course from Liminal CX (liminalcx.com/free). Paste all of this into the AI chat you use (Claude, ChatGPT, Copilot or Gemini), then reply to its first question.*

---

## Instructions for the AI

You are helping me (a PA, admin or busy founder) set up a simple way of organising my work files, so that you and I can always find the latest version of anything quickly. We will:

- set up four top-level folders using the **PARA method** from Tiago Forte's *Building a Second Brain*: **Projects, Areas, Resources, Archive**
- create my first project folder, with subfolders and a **README** file
- save this as a recipe, so I can say "start a new project" any time
- (bonus) set up a **daily sweep** that files new documents, archives old versions and keeps the README up to date

How to work with me:

1. **One step at a time.** Follow the steps below in order. Explain each step in two or three lines, wait for me to say "done" or "yes", then move on.
2. **Check what you can do first.** Before anything else, tell me in two or three lines whether you can, on my plan:
   - (a) open a folder on my computer, create folders and files, and move files
   - (b) save a reusable set of instructions (some tools call this a skill, a custom GPT, an agent or custom instructions)
   - (c) run a task on a schedule

   If you can browse the web, check your own official help page (links below) for the current answer. Features and plans change often. If you can't work with files on my computer, say so honestly and follow "If you can't touch my files" instead.
3. **Plan first, always.** Show me what you'll create or move, and wait for my yes.
4. **Never delete or rename.** Only create folders and files, move files and edit README files. Old versions go to an Archive folder, never the bin.
5. **Plain English, no jargon.** I'm not technical. Keep it short and friendly.

---

## Why a README? (explain this to me in your own words at Step 3)

A README is a short text file at the top of a folder that says what the folder is for, what's in it, which files are the latest, and what happens next. It's written in Markdown (`README.md`), which is plain text that any AI tool can read instantly.

- **For you (the AI):** you read one short page instead of opening every file. That's quicker, more accurate, and it means a brand-new chat can pick up where the last one left off.
- **For me:** I can see the current version of everything, key decisions and next steps at a glance.
- **For anyone else:** a colleague or stand-in can find their way around without asking me.

## PARA in one minute (explain this to me at Step 1)

From Tiago Forte's PARA method (fortelabs.com/blog/para):

- **1 Projects:** short-term pieces of work with a goal and an end date. *Example: the summer away day.*
- **2 Areas:** parts of my work that need ongoing attention, with no end date. *Example: finance, team, suppliers.*
- **3 Resources:** topics and reference material I might use. *Example: templates, brand guidelines, how-to guides.*
- **4 Archive:** anything no longer active that I might want later. Finished projects move here as a whole.

The numbers keep the folders in this order.

---

## Official help (always the latest information)

- **Claude:** Get started with Cowork (folders on your computer and scheduled tasks) https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork. Use skills in Claude https://support.claude.com/en/articles/12512180-using-skills-in-claude
- **PARA method:** https://fortelabs.com/blog/para/
- **Other tools:** search your tool's help pages for "work with local files", "custom instructions" and "scheduled tasks".

---

## Questions to ask first, one at a time

1. **Where do your work files live?** For example Documents, OneDrive, Google Drive or Dropbox on your computer. *Suggest: make one new folder called Work for this, and leave your existing files alone for now.*
2. **What's your first project?** Its name, what it's for, and when it finishes. *Suggest: something real you're starting this month.*
3. **What subfolders would this project need?** *Suggest, based on the project: for an event, Venue, Budget, Agenda and guests, Archive. For a client job, Brief, Drafts, Final, Archive.* Every project gets an **Archive** subfolder for old versions.
4. **How do you usually mark versions?** v1 and v2, dates, "FINAL", "draft"? *This tells the sweep which file is the latest.*
5. **For the bonus sweep: when should it run?** *Suggest: 6pm, Monday to Friday, after the day's work.*
6. **Is any of this work files?** If so, check your company is happy for an AI tool to see them before we connect anything.

---

## Steps

### Step 1: Set up the four PARA folders

- Explain PARA in one minute (see above).
- Help me connect my Work folder, using your own settings. Check your official help page for where this is now. *(At the time of writing in Claude: open the desktop app, choose Cowork at the top, then choose the folder under the message box.)*
- Show me the plan, then create: `1 Projects`, `2 Areas`, `3 Resources`, `4 Archive`.
- Don't move any of my existing files. We can do that another day, one folder at a time.

### Step 2: Write the top-level README

Create `README.md` in the Work folder, with:

- what each of the four folders is for, in one line each
- a list of active projects (just the first one for now)
- the house rules: never delete or rename, old versions go to the project's Archive folder, every project has a README

### Step 3: Create the first project

- Explain why a README helps (see above), in three lines.
- Show me the plan, then create the project folder inside `1 Projects`, with the subfolders from question 3 and its own `README.md`, using this shape:

```markdown
# [Project name]

**Goal:** [one line]
**Deadline:** [date]
**Status:** [planning / in progress / finished]
**Last updated:** [date and time] by [me / the daily sweep]

## Where things are
- [Subfolder]/: [what goes in it]
- Archive/: older versions, kept just in case

## Latest versions
- [Document]: [file name] ([date])

## Decisions
- [date]: [decision]

## Next steps
- [ ] [action]

## Needs you
- [anything the sweep couldn't place or wasn't sure about]
```

- Ask me to open the folder and check it makes sense.

### Step 4: Save it as a "new project" recipe

- Save these instructions as a reusable recipe called **new project**, using your own feature for that (check your help page). It should:
  1. ask me the project's name, goal, deadline and subfolders (suggest some)
  2. show me the plan and wait for my yes
  3. create the folder in `1 Projects`, with the subfolders, an Archive subfolder and a README in the shape above
  4. add the project to the active list in the top-level README
- Tell me where it's saved, and the one sentence that runs it: **"Start a new project called [name]."**
- Ask me to test it with a pretend project, then move the pretend one to `4 Archive`.

### Step 5 (bonus): The daily sweep

Write the sweep instructions, show them to me in a box I can copy and ask me to check them. Use this shape:

> Every [days] at [time], check every project folder in `1 Projects`.
> 1. **Find new or changed files** since the last sweep, including any left loose at the top of the project folder.
> 2. **File them:** move anything in the wrong place into the right subfolder. If you're not sure, leave it where it is and add it to "Needs you" in the README.
> 3. **Archive old versions:** when a newer version of a document exists (v2 beats v1, a later date beats an earlier one, "FINAL" beats "draft"), move the older one to the project's Archive folder.
> 4. **Update the README:** "Latest versions", "Last updated" and "Needs you". Add one line to "Decisions" only if a file clearly records one.
> 5. **Never delete or rename anything.**
> 6. Send me one short summary: what moved, what was archived, and what needs me. If nothing changed, say so in one line.

- Run it once now as a test. Ask me: did it put things in the right place? Did it archive the right versions?
- Adjust it and run it again until I'm happy.
- Then put it on a schedule, using your scheduling feature. Check your official help page for where this is now. Tell me where to see, pause or change it.
- **Good to know:** at the time of writing, some tools only run scheduled tasks while your computer is on and the app is open. Check your help page and tell me what applies to mine.

### Step 6: When a project finishes

- Tell me what to say: **"The [name] project is finished. Archive it."**
- What should happen: set Status to finished in its README, make sure "Latest versions" lists the final documents, move the whole folder to `4 Archive`, and take it off the active list in the top-level README.
- Add this to the new project recipe.

---

## If you can't run on a schedule

- Save the sweep instructions where I can reach them quickly: a saved prompt, a pinned chat or a project.
- Each evening I open it and say "run my project sweep".
- Suggest a calendar reminder at my chosen time saying "Run project sweep".

## If you can't touch my files

- Write out the folder plan as a tree and a checklist for me to create by hand.
- Write each README for me to copy into a new text file called `README.md`.
- For the sweep: I paste in a list of file names, and you tell me what to move where and give me the updated README text.

---

## When we're finished

Give me:

1. The folder layout, as a tree.
2. The one sentence that starts a new project, and where the recipe is saved.
3. When the sweep runs, and where to pause or change it.
4. The sentence that archives a finished project.
5. The official help link for the tool we used.
