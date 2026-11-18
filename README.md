# Irvine Onnuri Church · 2027 Outreach


Public Korean/English registration frontend for GitHub Pages.


- Website: https://irvine-onnuri.github.io/outreach2027/
- Pages source: main branch, /docs folder.
- Build: Node.js 22.13+; `npm install` then `npm run build`. Commit source and docs together.
- Registration API: https://irvine-outreach-2027.younsang09.chatgpt.site
- Admin: https://irvine-outreach-2027.younsang09.chatgpt.site/admin


The existing server retains registrations, atomic capacity management, waitlists, salted password hashes and the weekly spreadsheet sync. No applicant records or credentials are stored in this repository. Public visitors do not need a ChatGPT account. Administration still uses the existing protected service.


Changing this frontend does not migrate or replace the database. The API allows this GitHub Pages origin only for the public catalog, application and receipt endpoints. Keep the frontend and server validation compatible.

