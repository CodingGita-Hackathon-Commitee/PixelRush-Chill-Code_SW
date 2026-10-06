# EventSphere

EventSphere is a campus event discovery and registration web app prototype. It brings student events, college listings, schedules, registration, saved passes, feedback, and profile preferences into one responsive interface.

This project is a front-end demo built with plain HTML, CSS, and JavaScript. It does not require a package install, build step, database, or API account.

## What the app does

- **Discover events:** Browse featured, current, and trending campus events, with a live search for event title, category, and location.
- **Search across the app:** The header search opens matching event results or the college directory. Press Enter to run the search. The Find Colleges page also filters colleges by name or abbreviation.
- **Filter events:** Search and narrow the event list by category, date, price, online or in-person format, distance, and seat availability.
- **View event details:** See event descriptions, dates and times, schedules, speakers, venue details, map previews, capacity, organizer information, and related events.
- **Explore colleges:** Browse the college directory and view events associated with each college.
- **Plan with the calendar:** Review scheduled events in the calendar and agenda views.
- **Register for events:** Select a ticket, enter attendee details, review the registration, and confirm it. The registration flow keeps in-progress form details in the current browser session.
- **Manage registrations:** My Events lists upcoming and past registrations, with sample check-in passes and links to event details and Event Pulse.
- **Share feedback:** Event Pulse lets users vote Yes, No, or Maybe on whether an event should happen again and optionally leave a message.
- **Manage a profile:** Edit personal details, update interests and notification preferences, review activity counts and recent registrations, and export profile data as JSON.

## Pages

| Page | File | Purpose |
| --- | --- | --- |
| Discover | `index.html` | Landing page, event highlights, and live event search |
| Find Colleges | `colleges.html` | College directory and college search |
| College Events | `college-events.html` | Events for a selected college |
| Calendar | `calendar.html` | Calendar and agenda views |
| Event Filters | `filters.html` | Searchable event results and filtering controls |
| Event Details | `event-details.html` | Full event information and registration entry point |
| Registration | `registration.html` | Ticket selection, attendee details, review, and confirmation |
| My Events | `my-events.html` | Upcoming registrations and event history |
| Event Pulse | `event-pulse.html` | Event voting and optional feedback |
| Profile | `profile.html` | Personal information, preferences, activity, and account options |

Many pages accept a query parameter to select their content. For example, `event-details.html?event=basketball`, `registration.html?event=diwali`, and `college-events.html?college=nit`.

## Run locally

The app is static, so it can be served directly from this folder. From a terminal opened in the project directory, run:

```powershell
py -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in a browser. If the Python launcher is unavailable, open `index.html` directly or use another static file server.

## Project files

- `*.html` — page structure and content
- `style.css` — shared navigation, layout, cards, and responsive styles
- `filters.css`, `event-details.css`, `registration.css`, `my-events.css`, `event-pulse.css`, `profile.css` — page-specific styles
- `*.js` — page behavior and demo data
- `global-search.js` — shared header search routing
- `index.js` — live filtering of Discover highlights
- `colleges.js` — live college directory search
- `filters.js` — event search, filter controls, and event results
- `registration.js`, `my-events.js`, `event-pulse.js`, `profile.js`, `calendar.js`, `college-events.js`, `event-details.js` — page interactions

## Demo data and storage

Events, colleges, speakers, and schedules are sample content defined in the front-end files. The dates are set around October 2026. Some values, including the current-day labels and calendar schedule, are demo values rather than a live campus feed.

Browser storage is used to keep demo interactions between page visits:

- `localStorage` stores registrations and ticket details, Event Pulse responses, profile details, interests, and notification preferences.
- `sessionStorage` keeps an unfinished registration form for the active browser session.

Data stays in the browser used to run the project. There is no account service, server-side database, real notification delivery, payment processing, external social account linking, or backend account deletion. Map previews and check-in passes are visual demo elements.

## Technologies

- HTML5
- CSS3 with responsive layouts
- Vanilla JavaScript
- Browser `localStorage` and `sessionStorage`
- Google Fonts (Inter), loaded from Google Fonts when network access is available
