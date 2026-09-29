<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Render the Caritas BOAZ identity through the shared `BrandName` text component, so every placement stays consistent without image-logo assets.
- De site wordt statisch geprerenderd (alle routes in `vite.config.ts` `pages`, `autoStaticPathsDiscovery: false`) zodat hij op DirectAdmin draait; nieuwe routes moeten daar aan worden toegevoegd.
- Formulierverzending loopt via `POST /api/public/verzend-aanvraag` op de gepubliceerde Lovable-versie (CORS-beperkt tot eigen domeinen), omdat de statische site geen server-side code kan draaien en de Resend-sleutel server-side moet blijven.
