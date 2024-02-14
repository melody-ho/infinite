![Infinite Game logo](/readme/logo.webp "Infinite Game Logo")

# Infinite: A Browser Game

**[Infinite](https://infinite.melodyho.dev)** is a browser puzzle game in which users can continuously expand the galaxy by matching edges of hexagonal tiles. It's designed to always give valid moves, so the game and the resulting galaxy is *infinite*.

**Play Here:** <https://infinite.melodyho.dev>

![Infinite Game screenshot](/readme/screenshot.webp "Infinite Game Screenshot")

## Making Of

**Technology:** HTML, CSS, JavaScript, Express

### Hexagonal Grid

Hexagonal SVGs are positioned absolutely, utilizing a 2-dimensional coordinate system.

### Dynamically Expanding Gameboard

Tiles are dynamically added to a single parent element. The boundaries of the gameboard are defined by the panning boundaries, which are dynamically calculated each time a tile is added.

### Guaranteed Valid Move

When the next tile is generated, a random location on the board is chosen to ensure a valid placement. Initially, the required edges for that location are generated, and subsequently, the remaining edges are filled in randomly. This approach ensures the existence of at least one valid move. However, the player has the flexibility to place the tile anywhere on the board, as long as its edges match those of the adjacent tiles.

## Known Issues

- In **Microsoft Edge**, the hover menu for visual search that appears next to images will lead to errors. Please either disable visual search or consider using a different browser.

## Features Roadmap

- Game Save: Allow users to continue same game in separate sessions.
- Zen mode: Allow users to hide the overlay.

## Inspiration

Inspired by *[Dorfromantik](https://toukana.com/dorfromantik/ "Dorfromantik official website")*
and physical infinity puzzles.

## Copyright

© 2024 Melody Ho. All rights reserved.

## Creator

**Melody Ho**  
<melodyho.contact@gmail.com>  
[Portfolio](https://www.melodyho.dev) | [GitHub](https://www.github.com/melody-ho) | [LinkedIn](https://www.linkedin.com/in/melodyho-dev)
