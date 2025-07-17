# Giscus Comments Setup Guide

This guide will help you complete the Giscus configuration for your blog comments system.

## Prerequisites

1. Your repository must be public
2. The [Giscus app](https://github.com/apps/giscus) must be installed on your repository
3. Discussions must be enabled in your repository settings

## Setup Steps

### 1. Enable GitHub Discussions

1. Go to your repository: `https://github.com/d00d/fallbrookresearch.com`
2. Click on **Settings** tab
3. Scroll down to **Features** section
4. Check the **Discussions** checkbox to enable it

### 2. Install Giscus App

1. Visit: https://github.com/apps/giscus
2. Click **Install**
3. Choose **Only select repositories**
4. Select `d00d/fallbrookresearch.com`
5. Click **Install**

### 3. Configure Giscus

1. Visit: https://giscus.app
2. Enter your repository: `d00d/fallbrookresearch.com`
3. Select **Discussion Category**: Choose "Announcements" (recommended for blog comments)
4. The tool will generate your configuration

### 4. Update _config.yml

Copy the generated values from giscus.app and update your `_config.yml`:

```yaml
giscus:
  repo: "d00d/fallbrookresearch.com"
  repo_id: "R_kgDOH..." # Copy from giscus.app
  category: "Announcements"
  category_id: "DIC_kwDOH..." # Copy from giscus.app
  mapping: "pathname"
  reactions_enabled: 1
  emit_metadata: 0
  theme: "preferred_color_scheme"
  lang: "en"
```

## Features

- **GitHub Integration**: Comments are stored as GitHub Discussions
- **Modern UI**: Clean, modern interface that matches your site
- **Dark Mode**: Automatically adapts to your site's theme
- **Free**: No cost, no ads, no tracking
- **Reactions**: GitHub-style emoji reactions
- **Moderation**: Use GitHub's moderation tools
- **Markdown Support**: Full markdown support in comments
- **Notifications**: GitHub notifications for new comments

## Testing

After completing the setup:

1. Build your site: `bundle exec jekyll build`
2. Serve locally: `bundle exec jekyll serve`
3. Visit a blog post with `comments: true` in the frontmatter
4. The Giscus comments widget should appear at the bottom

## Troubleshooting

- Ensure your repository is public
- Check that Discussions are enabled
- Verify the Giscus app is installed
- Make sure the repo_id and category_id are correct
- Comments only work on the live site, not localhost (due to CORS)

## Migration Note

All existing Disqus comments have been removed. This is a fresh start with a modern, GitHub-integrated commenting system.