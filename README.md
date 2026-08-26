# Karlspace

AI automation systems for small businesses — portfolio site and case studies.

Live: https://portfolio-nine-lilac-50.vercel.app

## What's here

A static site presenting four build case studies:

| Case study | File |
|---|---|
| Booking agent | `case-study-booking-agent.html` |
| Analytics dashboard | `case-study-dashboard.html` |
| Outreach pixel | `case-study-outreach-pixel.html` |
| WhatsApp agent | `case-study-whatsapp-agent.html` |

Plus `saas-builder-prompts.html`, a prompt-chain product page.

## Stack

Plain HTML, CSS and JavaScript — no framework, no build step. Deployed on
Vercel via `vercel.json`.

## Running locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Structure

```
index.html            landing page
index.css / index.js  shared styles and behaviour
case-study-*.html     individual case studies
dashboard-assets/     images and media
vercel.json           deploy config
robots.txt
```
