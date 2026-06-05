# Contributing to beout.ai

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/beout.ai_Project.git`
3. Start the dev server: `PHP_CLI_SERVER_WORKERS=4 php -S localhost:8000`

## Development Workflow

### Branch Naming
- `feature/description` — for new features
- `fix/description` — for bug fixes
- `i18n/description` — for translation updates
- `docs/description` — for documentation changes

### Code Style

**PHP:**
- `declare(strict_types=1)` at the top of every file
- Use `<?=` for short echo
- Use `htmlspecialchars()` for all user-facing output
- No external dependencies or frameworks

**CSS:**
- CSS custom properties in `:root`
- Responsive-first approach with `clamp()` for typography
- Include `[dir="rtl"]` rules for Arabic support
- Test on mobile (375px), tablet (768px), and desktop (1024px+)

**JavaScript:**
- Vanilla ES6 only — no frameworks, no npm, no bundlers
- Use `DOMContentLoaded` as the entry point
- Use `const`/`let` — no `var`
- Use `async`/`await` for API calls

### Adding a New Language

1. Copy `includes/lang/en.php` to `includes/lang/XX.php`
2. Translate all string values
3. Set `lang_code`, `lang_dir` (`ltr` or `rtl`), and `lang_toggle`
4. Add the language code to `config.php` in the `in_array()` check
5. Add CSS RTL rules if needed

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` — new feature
- `fix:` — bug fix
- `i18n:` — translation changes
- `docs:` — documentation
- `style:` — CSS/formatting changes
- `perf:` — performance improvements
- `refactor:` — code restructuring

## Pull Request Checklist

- [ ] Tested on PHP 8.2+
- [ ] Tested on mobile, tablet, and desktop
- [ ] No new external dependencies
- [ ] All text is in language files, not hardcoded
- [ ] RTL works correctly (if applicable)
- [ ] SEO meta tags are correct
- [ ] No console errors in browser
- [ ] `.htaccess` rules are updated if needed

## Questions?

Email: contact@beout.ai