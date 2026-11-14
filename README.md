# Readable Beyond20 Cards

A Foundry VTT v13/v14 module that makes Beyond20 roll cards readable when the chat log is dark.

Beyond20 colors its card text for a light background: a dark gray title, black roll values, and dark
green, red and blue for crits and fumbles. When the chat log uses Foundry's dark theme (for dnd5e, the
denim chat cards), that text almost disappears. This module switches those colors to light ones whenever
the chat is dark. The light theme is left as it is.

It is a stopgap until Beyond20 fixes this itself
([Beyond20 issue 1409](https://github.com/kakaroto/Beyond20/issues/1409)). Once that ships, turn this
module off.

## What changes on a dark chat log

- The card title and normal roll values use the theme's own text colors (gold and off-white under dnd5e).
- Crits, fumbles and "crit and fumble" rolls use light green, light red and light blue.
- Discarded dice (advantage/disadvantage) use the theme's secondary text color.
- The hover breakdown keeps its parchment background and its original dark text.

## Which theme counts

Foundry has separate theme settings for the Interface and for Applications, and dnd5e adds its own
Chat Log Theme setting. The module follows whichever of these sits closest to the chat log, the same
way dnd5e does. For example, with Interface set to Light and Applications set to Dark, the sidebar chat
is light, so the cards keep Beyond20's normal colors.

## Install

In Foundry (or The Forge's Bazaar), choose **Install Module** and paste this manifest URL:

```
https://github.com/breweries-wa/foundry-readable-beyond20-cards/releases/latest/download/module.json
```

Then enable it in the world. It works whether Beyond20 reaches Foundry through the browser extension
alone or through the Beyond20 Foundry module as well. Each player sees the fix in their own browser
whatever theme they have chosen, so only the GM needs to enable it.

The module is CSS only and has no settings.
