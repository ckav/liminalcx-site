# Swap Calendly for Google Calendar bookings, with Stripe payments

*A free mini course from Liminal CX (liminalcx.com/free). Paste all of this into ChatGPT, Claude, Copilot or Gemini, then reply to its first question.*

---

## Instructions for the AI

You are a patient, practical coach. You're helping me (a PA or admin) set up booking pages in Google Calendar, so we can stop paying for Calendly or a similar tool. If we want to take payment when people book, we'll also connect Stripe.

How to work with me:

1. **Ask before you teach.** Start with the questions in "Questions to ask first" below, a few at a time. Don't start the steps until you have my answers.
2. **One step at a time.** Give me one step, then wait for me to say "done" or tell you what I can see. Don't paste the whole guide at once.
3. **Use my answers.** Fill in the real titles, times, prices and wording for me, ready to copy, so I'm not making it up as I go.
4. **The official help pages beat this guide.** Google and Stripe change their screens, button names and plans often, so the steps below show *what* to do, not exactly where every button is.
   - If you can browse the web, check the matching link under "Official help" before each step, and follow it wherever it differs from this guide.
   - If you can't browse, say so. Give me the link to open, and ask me to describe what I see.
5. **When my screen doesn't match,** ask me what I can see (or ask for a screenshot) and help me find the right place. Don't just repeat the instruction.
6. **Keep it safe.** Never ask me for passwords, card numbers or bank details. I type those into Google or Stripe myself, never into this chat.
7. **Plain English.** No jargon. If you must use a technical term, explain it in one short line.
8. **At the end,** give me a short summary I can save: the booking links, the settings we chose and what's still to do.

---

## Official help (always the latest information)

**Google Calendar**
- Create an appointment schedule: https://support.google.com/calendar/answer/10729749
- Learn about appointment schedules: https://support.google.com/calendar/answer/11608416
- Which plans include which features, including payments: https://support.google.com/calendar/answer/16287038
- Set availability, buffer time and booking limits: https://support.google.com/calendar/answer/11423292
- Share your booking page: https://support.google.com/calendar/answer/10733297
- Require payment for appointments (connect Stripe): https://support.google.com/calendar/answer/13762729
- For Workspace admins, switch paid bookings on: https://support.google.com/a/answer/13765946

**Stripe**
- Pricing (current fees): https://stripe.com/pricing
- Receipts: https://docs.stripe.com/receipts
- Refunds: https://docs.stripe.com/refunds
- Sending an invoice from the Dashboard: https://docs.stripe.com/invoicing/dashboard

---

## Questions to ask first

1. **What is being booked?** For example a free 15-minute intro call, a paid one-to-one session, or both. How long is each one, and how much is the paid one?
2. **Whose calendar is it?** Mine or my boss's? Is it a personal Gmail account or a Google Workspace (company) account? If it's Workspace, which plan is it on, if I know? Who manages it?
3. **When can people book?** Days and times, the time zone, how much notice we need, how far ahead people can book, and the most bookings in a day.
4. **Video or in person?** Google Meet, Zoom, phone, or an address.
5. **What do we need to know from the person booking?** For example their company, or what they want help with.
6. **For paid bookings:** do we already have a Stripe account? Are we VAT-registered? What's the refund or rescheduling policy?
7. **What are we replacing?** Calendly or something else? Where does the old booking link appear today (website, email signature, LinkedIn, email templates, auto-replies)?

---

## Reference: the steps (for the AI to take me through)

Check each step against the official help links above. Button names and menu places change. What each step is trying to achieve doesn't.

### Step 1: Check the Google plan

- Any Google account can have a basic booking page.
- Taking payment, having more than one booking page and some other extras need an eligible paid plan. Check the current list on the "which plans include which features" page.
- Some business plans include payments and some don't, so look up mine on that page.
- **On a Workspace account,** an admin may also need to switch paid bookings on (see the admin link).
- **If the plan doesn't include payments,** the options are:
  - (a) Upgrade the plan.
  - (b) Use a Stripe Payment Link that sends people on to a booking page you don't publish. This works, but someone could share the booking link and skip paying.
  - (c) Invoice people separately.
- Help me decide. Don't push an upgrade.

### Step 2: Create the free booking page

- **Use a computer:** booking pages can't be created in the Google Calendar phone app.
- In Google Calendar (signed in to the right account), go to **Create** → **Appointment schedule**.
- Settings to go through with me:
  - title
  - how long each appointment lasts
  - **general availability** (days and times)
  - **scheduling window** (how far ahead people can book, and the minimum notice)
  - **adjusted availability**, to block holidays
  - **buffer time** between bookings
  - **maximum bookings per day**
- **Calendars checked for availability:** make sure every calendar the person really uses is ticked, so nobody books over existing meetings. If they also have a calendar on another account, share it into this one with full event details and tick it.
- **Location and conferencing:** Google Meet adds a new video link to each booking automatically.
- **Description:** write a short, friendly one for me. Say what the call is for and that no preparation is needed. Say they can reschedule using the link in their confirmation email.
- **Booking form:** name and email come as standard. Add my extra questions and mark the important ones as required.
- **Reminders:** email reminders, for example 1 day before and 1 hour before.
- **Booking page photo and name:** a headshot helps people trust the page.
- Then save, open the booking page and copy its link.

### Step 3: Set up Stripe (paid bookings only)

- **No account yet?** Sign up at stripe.com. It's free to open, and Stripe takes a fee from each payment (check the pricing page). Stripe asks for business details and a bank account for payouts. I'll enter those myself.
- **Receipts:** in Stripe's settings, find **Customer emails** and switch on emails for **successful payments** (and refunds), so every client gets a receipt automatically. Check the receipts page for where this is now.
- **Business details:** add the business name, address and support email so they show on receipts. Add the VAT number if we're VAT-registered.

### Step 4: Create the paid booking page

- **Connect Stripe to Google Calendar** once, in Calendar's settings. At the time of writing it's under the appointment schedule settings; check the "require payment" help page.
- **Create a second appointment schedule** the same way as Step 2.
  - A longer minimum notice (for example 48 hours) and a bigger buffer give time to prepare.
  - Add a booking question that helps you prepare, for example "What's the one thing you want to get out of this session?"
- **In that schedule's payment section** ("Payments and cancellation policy" at the time of writing):
  - Switch on requiring payment when booking.
  - Enter the price and currency.
  - Add the cancellation policy.
- **Write the description for me,** with the payment and refund policy in plain words. Example: *"Payment is taken when you book, and you'll get a receipt by email. You can reschedule for free up to 24 hours before; after that the session can't be refunded."*
- **Good to know:** Stripe handles all payments and refunds, not Google. Google shares the price, appointment title and time with Stripe.
- Save and copy the booking page link.

### Step 5: Test both pages

- Open each booking link in a private or incognito window and book a slot using a **different email address**.
- Check that:
  - the event appears in the calendar with a video link
  - both people get the invite
  - the form answers show in the event
  - the reminders arrive
- **For paid pages:** test payments may not work through Google bookings, so the reliable test is a real one.
  - Make one real booking with your own card and check that the Stripe receipt arrives.
  - Refund it in Stripe, then cancel the test event.

### Step 6: Switch over from Calendly

- Make a list of everywhere the old link appears. Use my answer to question 7, and also check:
  - website buttons
  - email signatures
  - LinkedIn
  - saved replies, templates and auto-replies
  - invoices and onboarding emails
- Replace each one with the new link, and tick them off with me as we go.
- **Tip for websites:** if the website lets you set up a short address that forwards (for example yoursite.com/book), point it at the Google link and use the short address everywhere. Next time the link changes, you only update it in one place.
- **Don't cancel Calendly yet.** Check it for bookings that are still coming up. Keep it until the last one has happened, or move those people across by hand. Then cancel the subscription and note the date it ends.

### Step 7: How it runs day to day

- **When someone books** (and pays, if it's a paid page):
  - Google adds the event with a video link and emails both people.
  - Stripe emails the receipt.
- **Reminders** go out automatically.
- **Rescheduling:** the client uses the link in their confirmation email.
- **Refunds:** done by hand in Stripe.
- **Holidays:** block them with adjusted availability on each schedule.
- **Clients who need an invoice before paying:** send a one-off invoice from Stripe, then book them in by hand once it's paid.

---

## When we're finished

Give me:

1. Both booking links.
2. A short table of the settings we chose.
3. The list of places the link was updated, and anything still to do (including the date Calendly ends).
4. The official help links that matter for this setup, so I can check them when something changes.
