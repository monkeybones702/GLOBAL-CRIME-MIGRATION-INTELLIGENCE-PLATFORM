## Overview
A web platform visualizing global crime and migration metrics (75/25 focus). Includes an interactive map integrating CCTV/news footage and links to source articles.

## Proposed Architecture
- **Frontend**: React + TypeScript + Tailwind CSS + D3.js (or Leaflet/Mapbox for mapping) for interactive visualization.
- **Backend**: Express.js server for data orchestration, media feed processing, and Gemini API interactions.

## Phases
1. **Infrastructure**: Set up backend server, project dependencies, and environment configuration.
2. **Data Model**: Define schema/structure for crime/migration data and media references (links/embeds).
3. **Frontend Implementation**: Build interactive world map dashboard. Implement overlay layer for CCTV/news media feeds and article links.
4. **AI Integration**: Implement Gemini API for processing and generating insights from raw media feeds.

## Open Questions & Assumptions
- **Assumption**: We will use D3.js or a mapping library for the interactive map.
- **Assumption**: Data sources will include RSS/news feeds and structured JSON for crime/migration events.

Please provide feedback on this updated plan to proceed with implementation.
