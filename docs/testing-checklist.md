# DiverPlanner Testing Checklist

This checklist covers functional behavior, UI, SEO, responsive layout, and analytics observability for DiverPlanner.

## 1. Global Smoke Test

Test:
- Open `/` successfully.
- Open `/guide` successfully.
- Open `/about` successfully.
- Open `/faq` successfully.
- Refresh each page and confirm it does not 404.
- Top navigation `Planner / Guide / About / FAQ` works.
- Footer links `Farming Guide / About / FAQ / Feedback` work.
- No obvious console errors.
- `npm run build` succeeds.

Acceptance:
- All pages return normal HTTP responses.
- SPA routes refresh correctly.
- No blank page.
- No JavaScript runtime errors.

## 2. Planner Homepage Functional Test

### 2.1 Recipe List

Cases:
- Default page shows recipe cards.
- Each page shows 6 recipes.
- Click next page and confirm recipe list changes.
- Click previous page and confirm it returns.
- Current page number displays correctly.
- Last page disables next.
- First page disables previous.

Analytics:
- Implemented: `recipe_page_change`
- Parameters: `page`, `direction`, `result_count`

### 2.2 Search

Cases:
- Search by Chinese recipe name.
- Search by English recipe name.
- Search by ingredient name.
- Search with no results and confirm empty state.
- Clear search and confirm list restores.

Analytics:
- Implemented: `recipe_search`
- Parameters: `search_term`, `result_count`

### 2.3 Type Filter

Cases:
- `全部` shows all recipes.
- `赚钱` only shows matching recipes.
- `升级` only shows matching recipes.
- `节日备货` only shows matching recipes.
- `懒人经营` only shows matching recipes.
- `测试` only shows matching recipes.
- Search plus type filter works together.

Analytics:
- Implemented: `recipe_filter_click`
- Parameters: `filter_name`, `result_count`

### 2.4 Unlocked Facilities

Cases:
- Default Fish Farm / Vegetable Farm / Seaweed Farm states are correct.
- Disable Fish Farm and confirm fish recommendations change reasonably.
- Disable Vegetable Farm and confirm crop recommendations change reasonably.
- Disable Seaweed Farm and confirm seaweed recommendations change reasonably.
- Facility names do not repeat.
- There are not multiple duplicated Fish Farm entries.

Analytics:
- Implemented: `facility_toggle`
- Parameters: `facility_name`, `enabled`

### 2.5 Recipe Selection

Cases:
- Select one recipe checkbox and confirm selected visual state.
- Selected count updates.
- Unselect and confirm selected count decreases.
- Select multiple recipes and confirm summary changes.
- Enable selected-only view and confirm only selected recipes display.
- Disable selected-only view and confirm normal list restores.

Analytics:
- Implemented: `recipe_select`
- Parameters: `recipe_id`, `recipe_name_cn`, `recipe_name_en`, `selected_count`, `price`
- Implemented: `recipe_unselect`
- Parameters: `recipe_id`, `recipe_name_cn`, `recipe_name_en`, `selected_count`, `price`
- Implemented: `selected_only_toggle`
- Parameters: `enabled`, `selected_count`

### 2.6 Plan Summary

Cases:
- With no selected recipe, summary shows 0.
- After recipe selection, verify:
  - Recipe count is correct.
  - Fish Farm count is correct.
  - Vegetable Farm count is correct.
  - Seaweed Farm count is correct.
  - Manual material count is correct.
- Unselect recipes and confirm summary updates.

### 2.7 Recommendation Area

Cases:
- With no selected recipe, compact tips display.
- Select a recipe requiring fish and confirm Fish Farm recommendation appears.
- Select a recipe requiring crops and confirm farm recommendation appears.
- Select a recipe requiring seaweed and confirm Seaweed Farm recommendation appears.
- Select a recipe requiring manual materials and confirm manual collection appears.
- Recommendation cards do not render duplicated entries.
- Large recommendation lists do not overflow visually.

### 2.8 Copy Plan

Cases:
- Select recipes and click `复制规划`.
- Clipboard content exists.
- Copied content includes selected recipes, fish needs, crop needs, seaweed needs, and manual materials.
- With no selected recipe, behavior is reasonable.

Analytics:
- Implemented: `copy_plan`
- Parameters: `selected_count`, `fish_requirement_count`, `crop_requirement_count`, `seaweed_requirement_count`, `manual_requirement_count`

### 2.9 Export TXT

Cases:
- Select recipes and click `导出 TXT`.
- TXT file downloads.
- Filename is reasonable.
- File content is complete.
- With no selected recipe, behavior is reasonable.

Analytics:
- Implemented: `export_txt`
- Parameters: `selected_count`, `fish_requirement_count`, `crop_requirement_count`, `seaweed_requirement_count`, `manual_requirement_count`

### 2.10 Collapsible Help Panels

Cases:
- `如何使用` expands and collapses.
- `推荐评分说明` expands and collapses.
- Expanded content does not overflow on mobile.

Analytics:
- Implemented: `info_panel_toggle`
- Parameters: `panel_name`, `expanded`

## 3. Guide Page Test

Page: `/guide`

Cases:
- Hero displays correctly.
- Contents anchors jump to matching sections.
- Farming Systems Overview cards display correctly.
- Learn more links jump to matching areas.
- Quick Strategy displays correctly.
- Best Fish table works on desktop.
- Best Fish table does not overflow on mobile.
- Use the Planner CTA navigates to `/`.
- Short FAQ displays correctly.
- Read full FAQ navigates to `/faq`.
- Footer works.

Analytics:
- Implemented: `guide_contents_click`
- Parameters: `section_name`, `target_id`
- Implemented: `guide_learn_more_click`
- Parameters: `section_name`, `target_id`
- Implemented: `guide_cta_click`
- Parameters: `cta_name`, `destination`
- Implemented: `guide_faq_click`
- Parameters: `question`

## 4. About Page Test

Page: `/about`

Cases:
- Hero displays correctly.
- What Is DiverPlanner displays correctly.
- Why This Tool Was Created displays correctly.
- Feature card count is correct.
- Data Accuracy displays correctly.
- Unofficial Fan Tool Disclaimer displays correctly.
- Chinese and English disclaimers do not overflow.
- Send Feedback button works.
- Open Planner navigates to `/`.
- Read Farming Guide navigates to `/guide`.
- Footer works.

Analytics:
- Implemented: `about_cta_click`
- Parameters: `cta_name`, `destination`
- Implemented: `feedback_click`
- Parameters: `source_page`, `location`

## 5. FAQ Page Test

Page: `/faq`

### 5.1 Basic Display

Cases:
- Hero displays correctly.
- Last Updated displays correctly.
- Contents includes:
  - About DiverPlanner
  - Recipe Planning
  - Fish Farm
  - Vegetable Farm and Rice Farm
  - Seaweed Farm
  - Accuracy and Feedback

### 5.2 Contents

Cases:
- Click each Contents pill and confirm it jumps to the correct section.
- On mobile, pills wrap and do not overflow.

Analytics:
- Implemented: `faq_contents_click`
- Parameters: `section_name`, `target_id`

### 5.3 Accordion

Cases:
- First question in each section is expanded by default.
- Click a collapsed question and confirm it expands.
- Click an expanded question and confirm it collapses.
- Expanded answer text is correct.
- `aria-expanded` updates correctly.
- `+` and `-` visual state updates correctly.
- Expand all opens all answers.
- Collapse all closes all answers.
- Mobile layout works.

Analytics:
- Implemented: `faq_toggle`
- Parameters: `question`, `section_name`, `expanded`
- Implemented: `faq_expand_all`
- Parameters: `page_path`
- Implemented: `faq_collapse_all`
- Parameters: `page_path`

### 5.4 FAQ CTA

Cases:
- Send Feedback works.
- Open Planner navigates to `/`.
- Read Farming Guide navigates to `/guide`.
- Footer works.

Analytics:
- Implemented: `faq_cta_click`
- Parameters: `cta_name`, `destination`
- Implemented: `feedback_click`
- Parameters: `source_page`, `location`

## 6. Feedback Entry Test

Cases:
- Footer Feedback is clickable.
- About page Send Feedback is clickable.
- FAQ page Send Feedback is clickable.
- If `VITE_FEEDBACK_URL` is configured, feedback opens in a new tab.
- If `VITE_FEEDBACK_URL` is missing, fallback mailto opens.
- Source can distinguish footer, about, and FAQ feedback clicks.

Analytics:
- Implemented: `feedback_click`
- Parameters: `source_page`, `location`
- Implemented for configured external feedback URL: `outbound_click`
- Parameters: `url`, `link_label`, `source_page`

Acceptance:
- GA4 DebugView shows feedback events.
- Clarity session recordings show feedback clicks.

## 7. OG Sharing Card Test

Pages:
- `/`
- `/guide`
- `/about`
- `/faq`

Cases:
- Each page has `og:title`.
- Each page has `og:description`.
- Each page has `og:type`.
- Each page has `og:url`.
- Each page has `og:image`.
- Each page has `twitter:card`.
- Each page has `twitter:title`.
- Each page has `twitter:description`.
- Each page has `twitter:image`.
- `og:url` matches canonical.
- `og:image` uses an absolute URL.
- Share preview title and description are clear and non-empty.

Suggested external tools:
- Facebook Sharing Debugger
- Twitter Card Validator
- LinkedIn Post Inspector
- Discord or Slack link preview

## 8. SEO Base Test

Pages:
- `/`
- `/guide`
- `/about`
- `/faq`

Cases:
- Every page has a unique title.
- Every page has a unique meta description.
- Every page has correct canonical URL.
- Every page has exactly one H1.
- H2/H3 hierarchy is reasonable.
- Images have meaningful or intentionally empty `alt`.
- Internal links are clickable.
- FAQ page has FAQPage JSON-LD.
- FAQ page has BreadcrumbList JSON-LD.
- Existing Guide/About schemas are not broken.
- `view-source:` includes base homepage meta.
- Runtime DOM includes per-route meta after SPA navigation.
- `sitemap.xml` includes main pages.
- `robots.txt` does not block main pages.

## 9. Analytics Verification

### 9.1 GA4 Loading

Cases:
- GA4 script loads when `VITE_GA_MEASUREMENT_ID` is configured.
- GA4 DebugView shows `page_view`.
- SPA route changes send `page_view` for:
  - `/`
  - `/guide`
  - `/about`
  - `/faq`

Acceptance:
- Each page sends at least one `page_view`.
- `page_location` is correct.
- `page_title` is correct.

### 9.2 Clarity Loading

Cases:
- Clarity script loads in production when `VITE_CLARITY_PROJECT_ID` is configured.
- Clarity dashboard receives a session.
- Clicks, scrolls, and page changes are visible in replay.

### 9.3 Cloudflare Web Analytics

Cases:
- Cloudflare Web Analytics beacon exists if enabled in Cloudflare.
- Page visits appear in Cloudflare Analytics.
- Path stats distinguish `/`, `/guide`, `/about`, and `/faq`.

### 9.4 Core Event Checklist

Planner:
- Implemented: `recipe_search`
- Implemented: `recipe_filter_click`
- Implemented: `facility_toggle`
- Implemented: `recipe_select`
- Implemented: `recipe_unselect`
- Implemented: `selected_only_toggle`
- Implemented: `recipe_page_change`
- Implemented: `copy_plan`
- Implemented: `export_txt`
- Implemented: `info_panel_toggle`

Guide:
- Implemented: `guide_contents_click`
- Implemented: `guide_learn_more_click`
- Implemented: `guide_cta_click`
- Implemented: `guide_faq_click`

About:
- Implemented: `about_cta_click`
- Implemented: `feedback_click`

FAQ:
- Implemented: `faq_contents_click`
- Implemented: `faq_toggle`
- Implemented: `faq_expand_all`
- Implemented: `faq_collapse_all`
- Implemented: `faq_cta_click`
- Implemented: `feedback_click`

Global:
- Implemented: `nav_click`
- Implemented: `footer_link_click`
- Implemented for configured feedback URL: `outbound_click`

### 9.5 GA4 Event Verification

Setup:
- Open the site with `?debug_analytics=1`, for example `/?debug_analytics=1`.
- Open DevTools Network and filter by `g/collect`.
- Open GA4 DebugView for the `G-2VJHRFY4ZF` property.
- Confirm each event request includes `send_to=G-2VJHRFY4ZF` or equivalent GA destination data.

Expected Network result:
- `https://www.google-analytics.com/g/collect` appears after page views and tracked interactions.
- Requests are not blocked by browser extensions, DNS filtering, proxy rules, or consent tools.
- In local development or `?debug_analytics=1`, requests include debug mode data and appear in DebugView.

Homepage `/`:
- Open `/` and expect `page_view` with `page_path=/`, `page_title`, `page_location`.
- Search `大米` and expect `recipe_search` with `search_term=大米`, `result_count`.
- Click `赚钱` and expect `recipe_filter_click` with `filter_name=赚钱`, `result_count`.
- Select a recipe and expect `recipe_select` with `recipe_id`, `recipe_name_cn`, `recipe_name_en`, `selected_count`, `price`.
- Unselect a recipe and expect `recipe_unselect` with the same recipe fields.
- Toggle `只看已选菜谱` and expect `selected_only_toggle` with `enabled`, `selected_count`.
- Click next page and expect `recipe_page_change` with `page`, `direction=next`, `result_count`.
- Click `复制规划` and expect `copy_plan` with requirement counts.
- Click `导出 TXT` and expect `export_txt` with requirement counts.
- Expand `如何使用` and expect `info_panel_toggle` with `panel_name=how_to_use`, `expanded=true`.
- Expand `推荐评分说明` and expect `info_panel_toggle` with `panel_name=score_rules`, `expanded=true`.

Guide `/guide`:
- Open `/guide` and expect `page_view` with `page_path=/guide`.
- Click any Contents pill and expect `guide_contents_click` with `section_name`, `target_id`.
- Click a `Learn more` link and expect `guide_learn_more_click` with `section_name`, `target_id`.
- Click `Start Planning` and expect `guide_cta_click` with `cta_name=Start Planning`, `destination=/`.
- Click `Read full FAQ` and expect `guide_cta_click` with `cta_name=Read full FAQ`, `destination=/faq`.

About `/about`:
- Open `/about` and expect `page_view` with `page_path=/about`.
- Click `Open Planner` and expect `about_cta_click` with `cta_name=Open Planner`, `destination=/`.
- Click `Read Farming Guide` and expect `about_cta_click` with `cta_name=Read Farming Guide`, `destination=/guide`.
- Click `Send Feedback` and expect `feedback_click` with `source_page=/about`, `location=about`.

FAQ `/faq`:
- Open `/faq` and expect `page_view` with `page_path=/faq`.
- Click any Contents pill and expect `faq_contents_click` with `section_name`, `target_id`.
- Expand a FAQ item and expect `faq_toggle` with `question`, `section_name`, `expanded=true`.
- Collapse a FAQ item and expect `faq_toggle` with `question`, `section_name`, `expanded=false`.
- Click `Expand all` and expect `faq_expand_all` with `page_path=/faq`.
- Click `Collapse all` and expect `faq_collapse_all` with `page_path=/faq`.
- Click `Send Feedback` and expect `feedback_click` with `source_page=/faq`, `location=faq`.

Global:
- Click top navigation `Planner / Guide / About / FAQ` and expect `nav_click` with `nav_label`, `destination`.
- Click footer `Farming Guide / About / FAQ / Feedback` and expect `footer_link_click` with `link_label`, `destination`.
- Click a configured external feedback URL or any external link and expect `outbound_click` with `url`, `link_label`, `source_page`.

Expected DebugView event names:
- `page_view`
- `recipe_search`
- `recipe_filter_click`
- `facility_toggle`
- `recipe_select`
- `recipe_unselect`
- `selected_only_toggle`
- `recipe_page_change`
- `copy_plan`
- `export_txt`
- `info_panel_toggle`
- `guide_contents_click`
- `guide_learn_more_click`
- `guide_cta_click`
- `about_cta_click`
- `faq_contents_click`
- `faq_toggle`
- `faq_expand_all`
- `faq_collapse_all`
- `nav_click`
- `footer_link_click`
- `feedback_click`
- `outbound_click`

## 10. Responsive Test

Widths:
- 375px
- 390px
- 430px
- 768px
- 1024px
- 1440px
- 1920px

Homepage:
- Header does not overflow.
- Planner columns stack correctly on mobile.
- Search input works.
- Filter buttons wrap correctly.
- Recipe cards do not overflow.
- Recommendation cards do not overflow.
- Pagination buttons are clickable.

Guide/About/FAQ:
- Hero does not overflow.
- Contents pills wrap correctly.
- FAQ accordion does not overflow.
- CTA buttons do not squeeze or overlap.
- Footer remains readable on mobile.

## 11. Browser Compatibility Test

Browsers:
- Chrome
- Edge
- Safari
- Mobile Chrome
- Mobile Safari

Focus:
- Clipboard API and fallback copy work.
- TXT download works.
- FAQ accordion works.
- GA4 and Clarity load when configured.
- Scrolling is smooth.

## 12. Performance and Stability Test

Cases:
- Initial load has no obvious blank-screen delay.
- Page switching is smooth.
- FAQ Expand all does not cause noticeable lag.
- Selecting multiple recipes does not slow recommendations.
- Search input remains responsive.
- Console has no repeated warnings or errors.

Suggested tools:
- Lighthouse Performance
- Lighthouse SEO
- Lighthouse Accessibility
- Lighthouse Best Practices

Targets:
- SEO >= 90
- Accessibility >= 90
- Best Practices >= 90

## 13. Accessibility Test

Cases:
- All buttons can be reached with Tab.
- FAQ accordion works with keyboard.
- Buttons have clear text or `aria-label`.
- Checkbox labels are clickable.
- Color contrast is acceptable.
- H1/H2/H3 order is reasonable.
- Inputs have labels or accessible names.

## 14. Final Acceptance

Before release:
- `npm run build` passes.
- `/`, `/guide`, `/about`, `/faq` work.
- Planner core behavior still works.
- FAQ JSON-LD and BreadcrumbList JSON-LD still exist.
- Feedback link works.
- GA4 DebugView receives page views and core events.
- Clarity receives sessions and replay interactions.
- Cloudflare Pages deployment succeeds.
