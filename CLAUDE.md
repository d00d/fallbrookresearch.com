# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Jekyll-based website for Fallbrook Research & Analytics, LLC - a technology and financial consulting services company. The site includes blog posts, services pages, and contact information.

## Development Commands

### Local Development
```bash
# Install dependencies
bundle install

# Serve the site locally with live reload
bundle exec jekyll serve

# Build the site
bundle exec jekyll build
```

### Content Management
```bash
# Create a new post
bundle exec jekyll post "Post Title"

# Create a new draft
bundle exec jekyll draft "Draft Title"

# Publish a draft
bundle exec jekyll publish _drafts/draft-name.md
```

## Architecture

### Jekyll Structure
- `_config.yml` - Main Jekyll configuration with site settings, user info, and Google Analytics
- `_data/navigation.yml` - Navigation menu structure
- `_layouts/` - HTML templates for different page types
- `_includes/` - Reusable HTML components (header, footer, etc.)
- `_posts/` - Blog posts in Markdown format
- `_drafts/` - Draft posts not yet published
- `assets/` - CSS, JS, images, and fonts

### Key Layout Files
- `default.html` - Main layout template that includes all sections
- `post.html` - Blog post layout
- `page.html` - Static page layout
- `blog-layout.html` - Blog listing layout

### Styling
- Uses custom CSS in `assets/css/main.css`
- SCSS source files in `src/styles/` (compiled via external build process)
- Includes FontAwesome and custom fonts

### Content Structure
- Homepage uses `index.html` with default layout
- Blog posts follow Jekyll naming convention: `YYYY-MM-DD-title.md`
- Static pages: `contact.md`, `services.md`, `posts.md`, `thanks.md`

## Deployment

### Netlify (sole deploy target)
- Configured in `netlify.toml`
- Ruby version is read from `.ruby-version` (currently 3.2.2); Netlify's build image installs it automatically via mise
- Build command: `bundle install && bundle exec jekyll build`
- Publish directory: `_site`
- `JEKYLL_ENV=production` is set via `[build.environment]`
- Automatic builds on push to `master`
- Serves the primary domain `www.fallbrookresearch.com` (DNS CNAME → `fallbrookresearch.netlify.com`)

## Site Configuration

### User Settings (_config.yml)
- Site title: "Fallbrook Research"
- Email: rob@fallbrook.com
- Twitter: @Fallbrook_RA
- GitHub: d00d
- Google Analytics ID: UA-117521095-1

### Navigation
Navigation items are defined in `_data/navigation.yml` and include Home, Services, Blog, and Contact sections.

## Dependencies

### Ruby Gems (Gemfile)
- Jekyll 4.3
- jekyll-compose (for content management commands)
- rexml, csv, base64, bigdecimal (compatibility gems)

### Excluded Files
The following are excluded from Jekyll builds: package.json, src, node_modules