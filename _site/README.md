# Fallbrook Research & Analytics

[![Jekyll](https://img.shields.io/badge/Jekyll-4.3-red.svg)](https://jekyllrb.com/)
[![Ruby](https://img.shields.io/badge/Ruby-3.0+-red.svg)](https://www.ruby-lang.org/en/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A modern, responsive Jekyll website for Fallbrook Research & Analytics, LLC - a technology and financial consulting services company specializing in cloud solutions, data analytics, and digital transformation.

## 🚀 Quick Start

### Prerequisites

- Ruby 3.0+
- Bundler
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/fallbrookresearch.com.git
   cd fallbrookresearch.com
   ```

2. **Install dependencies**
   ```bash
   bundle install
   ```

3. **Run the development server**
   ```bash
   bundle exec jekyll serve
   ```

4. **Open your browser**
   ```
   http://localhost:4000
   ```

## 📁 Project Structure

```
fallbrookresearch.com/
├── _config.yml          # Jekyll configuration
├── _data/
│   └── navigation.yml   # Navigation menu structure
├── _includes/           # Reusable HTML components
│   ├── head.html
│   ├── header.html
│   ├── footer.html
│   └── ...
├── _layouts/            # Page templates
│   ├── default.html
│   ├── post.html
│   ├── blog-layout.html
│   └── ...
├── _posts/              # Blog posts (Markdown)
├── _drafts/             # Draft posts
├── assets/              # Static assets
│   ├── css/
│   ├── js/
│   ├── img/
│   └── fonts/
├── _site/               # Generated site (ignored in git)
└── README.md
```

## ✨ Features

### Core Features
- **Responsive Design** - Mobile-first, works on all devices
- **Blog System** - Jekyll-powered blog with post categories
- **Contact Forms** - Integrated contact form with validation
- **SEO Optimized** - Meta tags, structured data, sitemap
- **Analytics** - Google Analytics integration

### Modern Enhancements
- **🌙 Dark Mode Toggle** - System preference detection with manual override
- **🔤 Modern Typography** - Inter + Source Code Pro font pairing
- **⚡ Performance Optimized** - Fast loading, optimized assets
- **🎨 Smooth Animations** - CSS transitions and hover effects

### Technical Features
- **Jekyll 4.3** - Latest Jekyll version
- **Liquid Templates** - Dynamic content rendering
- **Sass/SCSS** - CSS preprocessing
- **Particle.js** - Interactive background animations
- **FontAwesome** - Icon library integration

## 🛠️ Development

### Content Management

#### Creating Posts
```bash
# Create a new post
bundle exec jekyll post "Your Post Title"

# Create a draft
bundle exec jekyll draft "Draft Title"

# Publish a draft
bundle exec jekyll publish _drafts/draft-name.md
```

#### Post Structure
```yaml
---
layout: post
title: "Your Post Title"
date: 2024-01-01
feature-img: "header-image.jpg"
comments: true
---

Your content here...
```

### Customization

#### Site Configuration
Edit `_config.yml` to customize:
- Site title and description
- Social media links
- Google Analytics ID
- Contact information

#### Navigation
Edit `_data/navigation.yml` to modify the navigation menu:
```yaml
- name: Home
  link: /#main
  highlight: true
- name: Services
  link: /services
  highlight: true
```

#### Styling
- Main styles: `assets/css/main.css`
- SCSS source: `src/styles/`
- Color scheme: CSS custom properties in `:root`

### Dark Mode
The site includes a fully functional dark mode toggle:
- **Button**: Fixed position toggle in top-right corner
- **Persistence**: Theme preference saved in localStorage
- **System Detection**: Respects user's system preference
- **Smooth Transitions**: CSS transitions for theme switching

## 🚀 Deployment

### Netlify (Recommended)
1. Connect your repository to Netlify
2. Build command: `bundle exec jekyll build`
3. Publish directory: `_site`
4. Ruby version: 3.0.0 (configured in `netlify.toml`)

### Vercel
1. Import project to Vercel
2. Framework preset: Jekyll
3. Build command: `bundle exec jekyll build`
4. Output directory: `_site`

### GitHub Pages
1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Choose source: GitHub Actions or branch
4. Site will be available at `https://yourusername.github.io/repository-name`

## 📝 Content Guidelines

### Blog Posts
- Use descriptive titles and meta descriptions
- Include feature images (stored in `assets/img/post-headers/`)
- Add relevant tags and categories
- Write in Markdown format
- Include reading time estimates

### Images
- Optimize images before uploading
- Use descriptive alt text
- Store in appropriate subdirectories under `assets/img/`
- Consider using WebP format for better performance

## 🔧 Configuration

### Environment Variables
- `JEKYLL_ENV`: Set to `production` for production builds
- `GOOGLE_ANALYTICS_ID`: Your GA tracking ID

### Build Commands
```bash
# Development
bundle exec jekyll serve

# Production build
JEKYLL_ENV=production bundle exec jekyll build

# Build with drafts
bundle exec jekyll serve --drafts

# Live reload
bundle exec jekyll serve --livereload
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Follow existing code formatting
- Use meaningful commit messages
- Test changes locally before submitting
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Jekyll](https://jekyllrb.com/) - Static site generator
- [Particle.js](https://vincentgarreau.com/particles.js/) - Interactive particles
- [FontAwesome](https://fontawesome.com/) - Icons
- [Google Fonts](https://fonts.google.com/) - Typography
- [Inter](https://rsms.me/inter/) - Primary font
- [Source Code Pro](https://adobe-fonts.github.io/source-code-pro/) - Code font

## 📞 Support

- **Website**: [fallbrookresearch.com](https://fallbrookresearch.com)
- **Email**: rob@fallbrookresearch.com
- **Twitter**: [@Fallbrook_RA](https://twitter.com/Fallbrook_RA)

---

<p align="center">
Made with ❤️ by <a href="https://fallbrookresearch.com">Fallbrook Research & Analytics</a>
</p>
