![Infinite Game logo](/readme/logo.webp "Infinite Game Logo")

# Infinite: A Browser Game

**[Infinite](https://infinite.melodyho.dev)** is a browser puzzle game in which users can continuously expand the galaxy by matching edges of hexagonal tiles. It's designed to always give valid moves, so the game and the resulting galaxy is *infinite*.

**Play here:** <https://infinite.melodyho.dev>

![Infinite Game screenshot](/readme/screenshot.webp "Infinite Game Screenshot")

## Making Of

**Technology:** HTML, CSS, JavaScript, Express, Jest

### Hexagonal Grid

Hexagonal SVGs are positioned absolutely, utilizing a 2-dimensional coordinate system.

### Dynamically Expanding Gameboard

Tiles are appended to a shared parent element when placed. The boundaries of the gameboard are defined by the panning boundaries, which are recalculated and thus expanded each time a tile is placed.

### Guaranteed Valid Move

When the next tile is produced, a random location on the board is chosen, and the required edges for that location are generated. The remaining edges are then filled in randomly. This approach ensures the existence of at least one valid move (i.e., at the randomly selected location). However, the user has the flexibility to place the tile anywhere on the board, as long as its edges match those of the adjacent tiles.

## Known Issues

- In **Microsoft Edge**, the hover-menu for visual search that appears next to images will lead to errors. Users are advised to either disable visual search or switch to a different browser.

## Features Roadmap

- **Game Save**: Allow users to continue the same game in separate sessions.
- **Zen Mode**: Allow users to hide the overlay.

## Inspiration

Inspired by *[Dorfromantik](https://toukana.com/dorfromantik/ "Dorfromantik official website")*
and physical infinity puzzles.

## Copyright

© 2024 Melody Ho. All rights reserved.

## Creator

**Melody Ho**  
<melodyho.contact@gmail.com>  
[Portfolio](https://www.melodyho.dev) | [GitHub](https://www.github.com/melody-ho) | [LinkedIn](https://www.linkedin.com/in/melodyho-dev)
