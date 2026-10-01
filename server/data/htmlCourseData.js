/**
 * HTML5 Complete Masterclass: From Scratch to Advanced
 * Single-source comprehensive course dataset for NextStep Academy
 */

export const htmlCourse = {
  title: "HTML5 Complete Masterclass: From Scratch to Advanced",
  courseCode: "HTML-101",
  description: "Master modern HTML5 from foundational document structures to semantic markup, complex forms, multimedia integration, SVG/Canvas graphics, accessibility (WAI-ARIA), SEO optimization, and web APIs. Complete single-source reading guide with interactive code examples.",
  image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1200&q=80",
  thumbnail: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=600&q=80",
  duration: "14 Hours",
  category: "Web Development",
  courseType: "theory",
  difficulty: "beginner",
  semester: "Semester 1",
  regulation: "2026",
  academicYear: "2025-2026",
  maxStudents: 500,
  isPublished: 1,
  status: "active",
  rating: 4.9,
  subjects: [
    {
      title: "Unit 1: HTML Fundamentals & Syntax Structure",
      code: "HTML-U1",
      description: "Learn the essential building blocks of the web, document structure, elements, tags, attributes, and text formatting.",
      sortOrder: 1,
      topics: [
        {
          title: "1.1 Web Foundations & What is HTML?",
          description: "Understanding how browsers parse HTML, the HTTP request cycle, and the role of HTML in web architecture.",
          sortOrder: 1,
          contentType: "text",
          contentData: `# 1.1 Web Foundations & What is HTML?

Welcome to the **HTML5 Complete Masterclass**! HTML (HyperText Markup Language) is the standard markup language used to structure and present content on the World Wide Web.

---

### What is HyperText and Markup?

* **HyperText**: Text that links to other pieces of text or resources, enabling interactive navigation via hyperlinks across the web.
* **Markup Language**: A system for annotating a document in a way that is syntactically distinguishable from text content. You tell the web browser *what* each piece of content represents (e.g., heading, paragraph, image, quote).

---

### The Web Client-Server Architecture

When you type a URL into your browser (such as \`https://nextstep.com\`):
1. **DNS Lookup**: Your browser finds the IP address corresponding to the server.
2. **HTTP Request**: The browser requests the page resource from the web server.
3. **HTTP Response**: The web server sends back an **HTML document** along with CSS, JavaScript, and asset files.
4. **DOM Construction**: The browser parses the raw HTML code into the **Document Object Model (DOM)** tree and renders the visual page.

---

### Basic HTML Tag Syntax

HTML uses **tags** enclosed in angle brackets (\`< >\`). Most elements have an opening tag and a closing tag:

\`\`\`html
<element-name attribute="value">Content goes here...</element-name>
\`\`\`

#### Key Syntax Rules:
* **Opening Tag**: \`<p>\` marks the start of a paragraph.
* **Closing Tag**: \`</p>\` marks the end (notice the forward slash \`/\`).
* **Attributes**: Provide metadata or configuration (e.g., \`class="highlight"\`).
* **Self-Closing / Empty Tags**: Tags that do not wrap content do not require a closing tag in HTML5 (e.g., \`<img>\`, \`<br>\`, \`<input>\`).

---

### Summary Checklist
- [x] HTML structures web content; it is not a programming language.
- [x] Browsers convert HTML text into a DOM tree.
- [x] HTML tags wrap content to define its semantics.`
        },
        {
          title: "1.2 HTML Document Anatomy",
          description: "Deconstructing DOCTYPE, html, head, title, meta, and body tags.",
          sortOrder: 2,
          contentType: "text",
          contentData: `# 1.2 HTML Document Anatomy

Every valid HTML5 document follows a standardized skeleton structure. Let's inspect each line of a minimal, valid HTML5 file.

---

### Standard HTML5 Template

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Web Page - NextStep</title>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>Welcome to HTML5 Masterclass.</p>
</body>
</html>
\`\`\`

---

### Detailed Breakdown of Core Elements

#### 1. \`<!DOCTYPE html>\`
* Must be the very first line of any HTML5 document.
* Tells the browser to render the page in **HTML5 Standards Mode** rather than legacy Quirks Mode.
* Case-insensitive, but convention dictates uppercase \`<!DOCTYPE html>\`.

#### 2. \`<html lang="en">\`
* The root element enclosing all content.
* The \`lang="en"\` attribute specifies the natural language of the document. Crucial for screen readers, accessibility (a11y), and search engines.

#### 3. \`<head>\`
* Contains **metadata** (data about data), page titles, character encodings, external stylesheets, and script dependencies.
* Content inside \`<head>\` is **not directly visible** on the rendered web page body.

#### 4. \`<meta charset="UTF-8">\`
* Sets the character encoding to UTF-8, supporting virtually all human languages, symbols, and emojis.

#### 5. \`<meta name="viewport" content="width=device-width, initial-scale=1.0">\`
* Configures mobile viewport scaling so the page renders responsively on smartphones and tablets.

#### 6. \`<title>\`
* Sets the document title displayed in browser tab bars, bookmark titles, and Google search engine results pages (SERPs).

#### 7. \`<body>\`
* Encloses **all viewable content** (text, images, forms, buttons, canvas, videos) rendered to the user screen.

---

### Best Practices & Code Conventions
* Always declare \`<!DOCTYPE html>\`.
* Always specify \`lang\` on \`<html>\`.
* Keep tags strictly lowercase (\`<div>\`, not \`<DIV>\`).`
        },
        {
          title: "1.3 Headings, Paragraphs, & Text Formatting Tags",
          description: "Mastering heading hierarchy (h1-h6), paragraphs, inline formatting, and semantic emphasis tags.",
          sortOrder: 3,
          contentType: "text",
          contentData: `# 1.3 Headings, Paragraphs, & Text Formatting Tags

Text is the primary medium of information on the web. Formatting text correctly ensures readability, accessibility, and SEO structure.

---

### Heading Hierarchy (\`<h1>\` through \`<h6>\`)

HTML provides 6 levels of headings:

\`\`\`html
<h1>Heading 1 - Primary Page Topic</h1>
<h2>Heading 2 - Major Section Topic</h2>
<h3>Heading 3 - Sub-section Topic</h3>
<h4>Heading 4 - Minor Topic</h4>
<h5>Heading 5 - Sub-minor Topic</h5>
<h6>Heading 6 - Lowest Priority Heading</h6>
\`\`\`

> **Crucial SEO & Accessibility Rule**: 
> Every page should have **exactly ONE \`<h1>\` tag** representing the page's primary title. Never skip heading levels (e.g., do not jump from \`<h1>\` directly to \`<h3>\`).

---

### Paragraphs (\`<p>\`) and Line Breaks (\`<br>\`)

Paragraphs wrap text blocks and automatically add vertical margins:

\`\`\`html
<p>This is the first paragraph of text on our web application.</p>
<p>This is a second paragraph. Browsers automatically separate paragraphs with spacing.</p>

<p>Line 1 of an address<br>Line 2 of an address</p>
\`\`\`

> **Note**: Use \`<br>\` sparingly (e.g. for postal addresses or poem lines). Do not use \`<br>\` to create spacing between layout elements—use CSS margins or paddings instead!

---

### Text Formatting Tags: Semantic vs Presentational

| Tag | Purpose | Visual Default | Semantic Meaning |
|---|---|---|---|
| \`<strong>\` | Important text | Bold | High urgency/importance |
| \`<em>\` | Emphasized text | Italic | Stress emphasis when spoken aloud |
| \`<b>\` | Offset text | Bold | Draw attention without extra importance |
| \`<i>\` | Alternate voice/term | Italic | Technical term, foreign phrase, idiom |
| \`<mark>\` | Highlighted text | Yellow background | Relevance / search result highlight |
| \`<small>\` | Side comments | Smaller font | Legal disclaimer, copyright |
| \`<code>\` | Inline code snippet | Monospace font | Computer code reference |
| \`<sub>\` | Subscript | Lowered text | Chemical formulas (H₂O) |
| \`<sup>\` | Superscript | Raised text | Exponents (x²) or ordinal numbers |

#### Code Example:

\`\`\`html
<p>Water formula is <strong>H<sub>2</sub>O</strong>.</p>
<p>In algebra, <em>e = mc<sup>2</sup></em>.</p>
<p>To view logs, run <code>npm run dev</code> in terminal.</p>
\`\`\`

---

### Hands-On Example
Try structuring a article snippet with heading, paragraphs, strong text, and inline code!`
        },
        {
          title: "1.4 HTML Comments & Special Character Entities",
          description: "Writing maintainable HTML comments and encoding special characters, symbols, and entities.",
          sortOrder: 4,
          contentType: "text",
          contentData: `# 1.4 HTML Comments & Special Character Entities

### HTML Comments Syntax

Comments allow developers to insert notes into code without rendering them to the browser UI:

\`\`\`html
<!-- This is a single line HTML comment -->

<!-- 
  =========================================
  STUDENT DASHBOARD SECTION
  =========================================
-->
<section id="dashboard">
  <h2>Welcome back!</h2>
</section>
\`\`\`

#### Rules for Comments:
* Comments are visible in page source code (\`Ctrl + U\` or Inspect Element). Never store passwords, API secret keys, or private data in HTML comments!
* Do not nest comments inside other comments.

---

### Special Characters & HTML Entities

In HTML, certain characters like \`<\`, \`>\`, and \`&\` are reserved syntax symbols. To display these characters as visible text without breaking HTML parser, use **HTML Character Entities**.

#### Entity Structure:
Entities start with an ampersand (\`&\`) and end with a semicolon (\`;\`).

#### Common HTML Entities Reference:

| Character | Entity Name | Entity Number | Description |
|---|---|---|---|
| \`<\` | \`&lt;\` | \`&#60;\` | Less than symbol |
| \`>\` | \`&gt;\` | \`&#62;\` | Greater than symbol |
| \`&\` | \`&amp;\` | \`&#38;\` | Ampersand symbol |
| \`"\` | \`&quot;\` | \`&#34;\` | Double quote |
| \`'\` | \`&apos;\` | \`&#39;\` | Single quote |
| (space) | \`&nbsp;\` | \`&#160;\` | Non-breaking space |
| \`©\` | \`&copy;\` | \`&#169;\` | Copyright symbol |
| \`®\` | \`&reg;\` | \`&#174;\` | Registered trademark |
| \`™\` | \`&trade;\` | \`&#8482;\` | Trademark symbol |
| \`€\` | \`&euro;\` | \`&#8364;\` | Euro symbol |

#### Example Usage:
\`\`\`html
<p>To start a tag, write &lt;div&gt; in your editor.</p>
<p>Copyright &copy; 2026 NextStep Academy. All rights reserved.</p>
\`\`\``
        }
      ]
    },
    {
      title: "Unit 2: Links, Navigation, Lists & Media Integration",
      code: "HTML-U2",
      description: "Master anchor navigation, relative/absolute links, ordered/unordered lists, images, audio, video, and iframe embeds.",
      sortOrder: 2,
      topics: [
        {
          title: "2.1 Hyperlinks & Navigation (Anchor Tag)",
          description: "Mastering the a tag, href attributes, absolute vs relative paths, target targets, and security rel rules.",
          sortOrder: 1,
          contentType: "text",
          contentData: `# 2.1 Hyperlinks & Navigation (\`<a>\` Tag)

Hyperlinks connect web pages, documents, sections, and external resources. The anchor tag \`<a>\` powers web navigation.

---

### Basic Anchor Tag Syntax

\`\`\`html
<a href="https://nextstep.com">Visit NextStep Academy</a>
\`\`\`

---

### Absolute vs. Relative URLs

#### 1. Absolute URLs
Points to a full external web address including protocol (\`http://\` or \`https://\`):
\`\`\`html
<a href="https://developer.mozilla.org/en-US/docs/Web/HTML">MDN Documentation</a>
\`\`\`

#### 2. Relative URLs
Points to a file relative to the current directory:
\`\`\`html
<!-- Same directory -->
<a href="about.html">About Us</a>

<!-- Subdirectory -->
<a href="courses/html.html">HTML Course</a>

<!-- Parent directory -->
<a href="../index.html">Back to Home</a>
\`\`\`

---

### Target Attribute & Security (\`target\` & \`rel\`)

To open links in a new browser tab:

\`\`\`html
<a href="https://github.com" target="_blank" rel="noopener noreferrer">
  Open GitHub Profile
</a>
\`\`\`

> **Security Alert (Reverse Tabnabbing)**:
> When using \`target="_blank"\`, always include \`rel="noopener noreferrer"\`. Without this, the newly opened window can access your original page window via \`window.opener\`, creating a security vulnerability!

---

### In-Page Bookmark Links (Anchor ID Hash)

Jump directly to a specific section on the same page using \`id\` attributes:

\`\`\`html
<!-- Link at top of page -->
<a href="#syllabus">Jump to Course Syllabus</a>

<!-- Section later in page -->
<section id="syllabus">
  <h2>Course Syllabus Details</h2>
</section>
\`\`\`

---

### Special Link Types: Email & Phone

\`\`\`html
<!-- Email link -->
<a href="mailto:support@nextstep.com?subject=HTML%20Course%20Query">Email Support</a>

<!-- Telephone link -->
<a href="tel:+918825756388">Call Admissions (+91 8825756388)</a>
\`\`\``
        },
        {
          title: "2.2 Unordered, Ordered, & Description Lists",
          description: "Structuring information using ul, ol, li, dl, dt, and dd list elements.",
          sortOrder: 2,
          contentType: "text",
          contentData: `# 2.2 Unordered, Ordered, & Description Lists

Lists group related items together cleanly. HTML provides 3 types of lists.

---

### 1. Unordered Lists (\`<ul>\` and \`<li>\`)
Used when item sequence order does not matter (bulleted list):

\`\`\`html
<ul>
  <li>HTML5 Semantics</li>
  <li>CSS Grid & Flexbox</li>
  <li>JavaScript ES6+</li>
  <li>React Framework</li>
</ul>
\`\`\`

---

### 2. Ordered Lists (\`<ol>\` and \`<li>\`)
Used when step sequence order is sequential (numbered list):

\`\`\`html
<ol type="1" start="1">
  <li>Install VS Code Editor</li>
  <li>Create index.html file</li>
  <li>Write document boilerplate</li>
  <li>Preview in Web Browser</li>
</ol>
\`\`\`

#### \`<ol>\` Attributes:
* \`type\`: Specifies marker type (\`1\` numbers, \`a\` lowercase letters, \`A\` uppercase, \`i\` roman numerals).
* \`start\`: Starting number offset (e.g. \`start="5"\`).
* \`reversed\`: Reverses list ordering numbers.

---

### 3. Description Lists (\`<dl>\`, \`<dt>\`, \`<dd>\`)
Used for glossaries, term definitions, key-value pairs, or metadata lists:

\`\`\`html
<dl>
  <dt>DOM</dt>
  <dd>Document Object Model - programmatic representation of HTML tree.</dd>

  <dt>API</dt>
  <dd>Application Programming Interface - contract between systems.</dd>
</dl>
\`\`\`

---

### Nested Lists Example

\`\`\`html
<ul>
  <li>Frontend Development
    <ol>
      <li>HTML5</li>
      <li>CSS3</li>
      <li>JavaScript</li>
    </ol>
  </li>
  <li>Backend Development
    <ol>
      <li>Node.js</li>
      <li>Express</li>
      <li>MySQL</li>
    </ol>
  </li>
</ul>
\`\`\``
        },
        {
          title: "2.3 Images, Responsive Pictures, & Alt Accessibility",
          description: "Adding images with img tag, formats (WebP, SVG), alt text, lazy loading, and responsive picture elements.",
          sortOrder: 3,
          contentType: "text",
          contentData: `# 2.3 Images, Responsive Pictures, & Alt Accessibility

Images enhance user visual experience. Optimizing image delivery and accessibility is essential for high-performance websites.

---

### Basic Image Syntax (\`<img>\`)

\`\`\`html
<img src="banner.jpg" alt="NextStep Web Development Masterclass Students" width="800" height="400" loading="lazy">
\`\`\`

#### Key Attributes:
* **\`src\`** (Source): Path to the image file (absolute or relative).
* **\`alt\`** (Alternative Text): Essential for screen readers and displayed if image fails to load.
* **\`width\`** & **\`height\`**: Pixel dimensions (prevents Cumulative Layout Shift - CLS).
* **\`loading="lazy"\`**: Native browser lazy loading; defers image fetching until scrolled near viewport.

---

### Modern Web Image Formats

| Format | Transparency | Animation | Compression | Best Use Case |
|---|---|---|---|---|
| **WebP** | Yes | Yes | High | Modern web default (smallest size) |
| **AVIF** | Yes | Yes | Ultra High | Next-gen web graphics |
| **SVG** | Yes | Yes | Vector | Logos, icons, UI diagrams |
| **PNG** | Yes | No | Lossless | Crisp screenshots, graphics with text |
| **JPG / JPEG** | No | No | Lossy | Complex photographs |

---

### Responsive Images with \`<picture>\` Tag

Deliver different image versions based on device screen sizes or image format support:

\`\`\`html
<picture>
  <!-- Serve WebP format if browser supports it -->
  <source srcset="hero-dark.webp" type="image/webp" media="(prefers-color-scheme: dark)">
  <source srcset="hero-mobile.webp" media="(max-width: 600px)">
  <source srcset="hero-desktop.webp" media="(min-width: 601px)">
  <!-- Fallback img tag mandatory -->
  <img src="hero-fallback.jpg" alt="NextStep Dashboard Preview">
</picture>
\`\`\`

---

### Accessibility Checklist for Images
- Always provide descriptive \`alt\` text explaining the visual information.
- For decorative background graphics, use empty alt (\`alt=""\`) so screen readers skip them.`
        },
        {
          title: "2.4 HTML5 Audio & Video Embeds",
          description: "Embedding audio and video natively with source tags, fallback text, controls, autoplay, and subtitles.",
          sortOrder: 4,
          contentType: "text",
          contentData: `# 2.4 HTML5 Audio & Video Embeds

HTML5 introduced native media players without requiring third-party Flash plugins.

---

### HTML5 Video Element (\`<video>\`)

\`\`\`html
<video controls poster="thumbnail.jpg" width="640" height="360" preload="metadata">
  <source src="lecture1.mp4" type="video/mp4">
  <source src="lecture1.webm" type="video/webm">
  <!-- Subtitles / Captions -->
  <track src="captions-en.vtt" kind="subtitles" srclang="en" label="English">
  Your browser does not support HTML5 video player.
</video>
\`\`\`

#### Key Attributes:
* \`controls\`: Displays play, pause, volume, and fullscreen UI buttons.
* \`poster\`: Image displayed before video plays.
* \`autoplay\`: Automatically plays video (browsers block audio-enabled autoplay; combine with \`muted\`).
* \`loop\`: Automatically restarts media when finished.
* \`muted\`: Mutes audio track by default.

---

### HTML5 Audio Element (\`<audio>\`)

\`\`\`html
<audio controls preload="auto">
  <source src="podcast-episode.mp3" type="audio/mpeg">
  <source src="podcast-episode.ogg" type="audio/ogg">
  Your browser does not support audio element.
</audio>
\`\`\`

---

### Subtitles & Closed Captions (\`<track>\`)

Tracks supply WebVTT (\`.vtt\`) formatted text files for closed captioning:

\`\`\`vtt
WEBVTT

1
00:00:01.000 --> 00:00:04.000
Welcome to NextStep Academy HTML5 Masterclass!

2
00:00:04.500 --> 00:00:08.000
In this lesson, we will learn native media elements.
\`\`\``
        },
        {
          title: "2.5 Iframes & Embedded External Content",
          description: "Embedding third-party frames, security sandboxing, responsive video embeds (YouTube/Vimeo).",
          sortOrder: 5,
          contentType: "text",
          contentData: `# 2.5 Iframes & Embedded External Content

An Inline Frame (\`<iframe>\`) embeds another HTML document inside the current page.

---

### Basic Iframe Syntax

\`\`\`html
<iframe 
  src="https://maps.google.com/maps?q=chennai&t=&z=13&ie=UTF8&iwloc=&output=embed" 
  width="100%" 
  height="400" 
  style="border:0;" 
  allowfullscreen="" 
  loading="lazy">
</iframe>
\`\`\`

---

### Embedding YouTube Videos

\`\`\`html
<iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
  title="YouTube video player" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen>
</iframe>
\`\`\`

---

### Security & The \`sandbox\` Attribute

Because iframes render third-party websites, they pose cross-site scripting (XSS) risks. Use \`sandbox\` to restrict iframe capabilities:

\`\`\`html
<iframe src="untrusted-page.html" sandbox="allow-scripts allow-same-origin"></iframe>
\`\`\`

#### Sandbox Security Options:
* \`sandbox\` (empty): Enables maximum restrictions (blocks scripts, forms, popups, top navigation).
* \`allow-scripts\`: Permits JavaScript execution.
* \`allow-forms\`: Permits form submission inside frame.
* \`allow-same-origin\`: Treats iframe document as coming from its origin.`
        }
      ]
    },
    {
      title: "Unit 3: Semantic HTML5 & Modern Layout Architecture",
      code: "HTML-U3",
      description: "Master semantic page structures, header, nav, main, article, section, figure, summary, and accessibility landmarks.",
      sortOrder: 3,
      topics: [
        {
          title: "3.1 Semantic HTML vs. Non-Semantic Containers",
          description: "Why semantic markup matters for screen readers, SEO rankings, and code maintainability over div soup.",
          sortOrder: 1,
          contentType: "text",
          contentData: `# 3.1 Semantic HTML vs. Non-Semantic Containers

### What is Semantic HTML?

A **semantic element** clearly describes its meaning to both the developer and the browser/screen reader.

* **Non-Semantic Elements**: Tell nothing about their content (e.g., \`<div>\`, \`<span>\`).
* **Semantic Elements**: Explicitly define content purpose (e.g., \`<header>\`, \`<nav>\`, \`<article>\`, \`<footer>\`).

---

### The Problem of "Div Soup"

In legacy web development, layouts were built using endless un-semantic \`<div>\` containers:

\`\`\`html
<!-- Bad: "Div Soup" anti-pattern -->
<div id="header">
  <div id="nav">...</div>
</div>
<div id="content">
  <div class="post">...</div>
</div>
<div id="footer">...</div>
\`\`\`

#### Modern Semantic HTML Replacement:

\`\`\`html
<!-- Good: Clear Semantic Structure -->
<header>
  <nav>...</nav>
</header>
<main>
  <article>...</article>
</main>
<footer>...</footer>
\`\`\`

---

### Why Semantic HTML is Essential

1. **Accessibility (a11y)**: Screen readers use landmarks to jump directly to sections (e.g. "Jump to Main Content").
2. **SEO (Search Engine Optimization)**: Search engine crawlers weigh semantic tags like \`<article>\` and \`<h1>\` higher than generic divs.
3. **Maintainability**: Code is significantly easier to read, inspect, and debug for development teams.`
        },
        {
          title: "3.2 Modern Structural Elements (header, nav, main, article, section, footer)",
          description: "Mastering layout tags, page landmarks, and proper tag selection for web app architectures.",
          sortOrder: 2,
          contentType: "text",
          contentData: `# 3.2 Modern Structural Elements

HTML5 introduces dedicated landmark elements for page layout architecture.

---

### Complete Page Landmark Blueprint

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>NextStep Tech Blog</title>
</head>
<body>

  <!-- Page Header -->
  <header>
    <a href="/" class="logo">NextStep Academy</a>
    <nav>
      <ul>
        <li><a href="/courses">Courses</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
      </ul>
    </nav>
  </header>

  <!-- Primary Content Area -->
  <main>
    <section class="hero">
      <h1>Master Web Development</h1>
      <p>From scratch to advanced mastery.</p>
    </section>

    <section class="latest-articles">
      <h2>Recent Lessons</h2>
      
      <article>
        <h3>Understanding HTML5 Semantics</h3>
        <p>Published on Feb 20, 2026 by Jayanthan</p>
        <p>Semantic tags make your code accessible...</p>
      </article>

      <article>
        <h3>Form Validation Masterclass</h3>
        <p>Published on Feb 22, 2026 by Janasruthi</p>
        <p>Native HTML5 validation requires zero JS...</p>
      </article>
    </section>

    <aside>
      <h3>Related Resources</h3>
      <ul>
        <li><a href="#cheatsheet">HTML Cheat Sheet</a></li>
      </ul>
    </aside>
  </main>

  <!-- Page Footer -->
  <footer>
    <p>&copy; 2026 NextStep Startup Platform. All rights reserved.</p>
  </footer>

</body>
</html>
\`\`\`

---

### Quick Reference: Choosing the Right Tag

* **\`<header>\`**: Introductory content, brand logo, search, header nav.
* **\`<nav>\`**: Section containing major navigation links.
* **\`<main>\`**: Unique, primary content of the document (only one per page).
* **\`<article>\`**: Self-contained, reusable content (blog post, product item, news story, comment).
* **\`<section>\`**: Thematic grouping of content, typically with a heading.
* **\`<aside>\`**: Tangentially related content (sidebar, author box, ads).
* **\`<footer>\`**: Page footer, copyright notice, legal links, back to top.`
        },
        {
          title: "3.3 Figures, Captions, Details, & Summaries",
          description: "Using figure, figcaption for illustrations/diagrams and details/summary for interactive native accordions.",
          sortOrder: 3,
          contentType: "text",
          contentData: `# 3.3 Figures, Captions, Details, & Summaries

### Figures and Captions (\`<figure>\` & \`<figcaption>\`)

The \`<figure>\` tag wraps self-contained content like diagrams, code snippets, illustrations, or photos, accompanied by a caption:

\`\`\`html
<figure>
  <img src="dom-tree-diagram.png" alt="DOM Tree structure showing HTML, Head, Body nodes">
  <figcaption>Figure 1.1: Representation of browser DOM Tree nodes.</figcaption>
</figure>

<!-- Code snippet inside figure -->
<figure>
  <pre><code>
    const app = express();
    app.listen(5000);
  </code></pre>
  <figcaption>Listing 1.2: Initializing Express server in Node.js.</figcaption>
</figure>
\`\`\`

---

### Interactive Native Accordions (\`<details>\` & \`<summary>\`)

Create expandable/collapsible accordions without a single line of JavaScript!

\`\`\`html
<details open>
  <summary>What is NextStep Academy?</summary>
  <p>NextStep Academy is an end-to-end learning workspace for engineering students covering coding, aptitude, and tech courses.</p>
</details>

<details>
  <summary>Do I receive a certificate upon course completion?</summary>
  <p>Yes! Once you reach 100% course progress, a downloadable PDF certificate is generated automatically.</p>
</details>
\`\`\`

> **Pro Tip**: Adding the \`open\` attribute renders the details section expanded by default.`
        }
      ]
    },
    {
      title: "Unit 4: Tables & Data Presentation",
      code: "HTML-U4",
      description: "Building responsive, structured tables, header/body/footer groups, colspan, rowspan, and table accessibility.",
      sortOrder: 4,
      topics: [
        {
          title: "4.1 Anatomy of HTML Tables & Structure",
          description: "Understanding table, tr, th, td, thead, tbody, tfoot, and caption tags.",
          sortOrder: 1,
          contentType: "text",
          contentData: `# 4.1 Anatomy of HTML Tables & Structure

Tables organize complex multi-dimensional data into rows and columns.

---

### Standard Table Template

\`\`\`html
<table>
  <caption>Student Academic Performance Overview</caption>
  
  <thead>
    <tr>
      <th scope="col">Roll No</th>
      <th scope="col">Student Name</th>
      <th scope="col">Course</th>
      <th scope="col">Grade</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>SB-101</td>
      <td>Vishalini</td>
      <td>HTML5 Masterclass</td>
      <td>A+</td>
    </tr>
    <tr>
      <td>SB-102</td>
      <td>Jayanthan</td>
      <td>Full Stack JS</td>
      <td>O</td>
    </tr>
  </tbody>

  <tfoot>
    <tr>
      <td colspan="3">Total Active Enrolled Students</td>
      <td>2 Students</td>
    </tr>
  </tfoot>
</table>
\`\`\`

---

### Table Element Glossary
* **\`<table>\`**: Container table element.
* **\`<caption>\`**: Title describing table contents (crucial for screen reader accessibility).
* **\`<thead>\`**: Table header section containing column titles.
* **\`<tbody>\`**: Table body containing data rows.
* **\`<tfoot>\`**: Table footer containing summaries or calculations.
* **\`<tr>\`**: Table row.
* **\`<th>\`**: Header cell (bold and centered by default).
* **\`<td>\`**: Standard data cell.`
        },
        {
          title: "4.2 Merging Cells: Colspan & Rowspan",
          description: "Combining adjacent table cells horizontally across columns or vertically across rows.",
          sortOrder: 2,
          contentType: "text",
          contentData: `# 4.2 Merging Cells: Colspan & Rowspan

In complex data tables, cells often span multiple columns or rows.

---

### 1. Merging Columns (\`colspan\`)

The \`colspan\` attribute spans a cell horizontally across multiple columns:

\`\`\`html
<table border="1">
  <tr>
    <th colspan="2">Student Name</th>
    <th>Grade</th>
  </tr>
  <tr>
    <td>First: Vishalini</td>
    <td>Last: Senthil</td>
    <td>98%</td>
  </tr>
</table>
\`\`\`

---

### 2. Merging Rows (\`rowspan\`)

The \`rowspan\` attribute spans a cell vertically across multiple rows:

\`\`\`html
<table border="1">
  <tr>
    <th>Department</th>
    <th>Course</th>
    <th>Duration</th>
  </tr>
  <tr>
    <td rowspan="2">Computer Science</td>
    <td>HTML5 & Web Architecture</td>
    <td>14 Hours</td>
  </tr>
  <tr>
    <td>Database Systems (MySQL)</td>
    <td>20 Hours</td>
  </tr>
</table>
\`\`\`

---

### Table Accessibility Best Practices
* Always include \`scope="col"\` or \`scope="row"\` on \`<th>\` header cells.
* Use tables **only for tabular data**, never for page layouts!`
        }
      ]
    },
    {
      title: "Unit 5: Interactive Forms, Inputs, & Client-Side Native Validation",
      code: "HTML-U5",
      description: "Mastering form attributes, text/email/password inputs, pickers, radio/checkboxes, fieldsets, and regex validation.",
      sortOrder: 5,
      topics: [
        {
          title: "5.1 Form Architecture & Action/Method Attributes",
          description: "Understanding form element, GET vs POST HTTP methods, form encoding, and submit handling.",
          sortOrder: 1,
          contentType: "text",
          contentData: `# 5.1 Form Architecture & Action/Method Attributes

Forms allow users to input data, interact with web applications, register, login, submit feedback, and place orders.

---

### Form Element Anatomy

\`\`\`html
<form action="/api/auth/login" method="POST">
  <label for="user-email">Email Address:</label>
  <input type="email" id="user-email" name="email" required>

  <button type="submit">Log In</button>
</form>
\`\`\`

---

### HTTP Methods: GET vs. POST

#### 1. \`method="GET"\`
* Appends form data to the URL as query parameters (\`/search?query=html5&category=web\`).
* Used for search forms and data filtering where URL can be bookmarked.
* **Never use GET for passwords or sensitive user data!**

#### 2. \`method="POST"\`
* Sends form data inside HTTP Request Body.
* Used for logins, registrations, payments, and file uploads.

---

### Form Encoding Types (\`enctype\`)

* **\`application/x-www-form-urlencoded\`** (Default): Encodes text strings into URL pairs.
* **\`multipart/form-data\`**: Mandatory when uploading files via \`<input type="file">\`.`
        },
        {
          title: "5.2 Essential Input Controls & Pickers",
          description: "Mastering input types: text, email, password, number, date, color, file, range, search, radio, checkbox.",
          sortOrder: 2,
          contentType: "text",
          contentData: `# 5.2 Essential Input Controls & Pickers

HTML5 introduced specialized input types with native touch keyboards and UI pickers on mobile devices.

---

### Comprehensive Input Types Code Showcase

\`\`\`html
<form>
  <!-- Text Input -->
  <label for="username">Username:</label>
  <input type="text" id="username" name="username" placeholder="e.g. jayanthan">

  <!-- Password Input -->
  <label for="pass">Password:</label>
  <input type="password" id="pass" name="password" minlength="8">

  <!-- Email Input (Activates @ key on mobile keyboards) -->
  <label for="email">Email Address:</label>
  <input type="email" id="email" name="email">

  <!-- Number Input with min/max/step -->
  <label for="age">Age:</label>
  <input type="number" id="age" name="age" min="18" max="100" step="1">

  <!-- Date Picker -->
  <label for="dob">Date of Birth:</label>
  <input type="date" id="dob" name="dob">

  <!-- Color Picker -->
  <label for="theme">Choose Brand Color:</label>
  <input type="color" id="theme" name="themeColor" value="#3b82f6">

  <!-- Slider Range -->
  <label for="volume">Volume Level:</label>
  <input type="range" id="volume" name="volume" min="0" max="100" value="75">

  <!-- Checkbox (Multiple choices) -->
  <fieldset>
    <legend>Select Programming Skills:</legend>
    <input type="checkbox" id="html" name="skills" value="html">
    <label for="html">HTML5</label>

    <input type="checkbox" id="js" name="skills" value="js">
    <label for="js">JavaScript</label>
  </fieldset>

  <!-- Radio Buttons (Single choice per group name) -->
  <fieldset>
    <legend>Account Type:</legend>
    <input type="radio" id="student" name="role" value="student" checked>
    <label for="student">Student</label>

    <input type="radio" id="mentor" name="role" value="mentor">
    <label for="mentor">Mentor</label>
  </fieldset>
</form>
\`\`\``
        },
        {
          title: "5.3 Native Form Validation & Pattern Regex",
          description: "Enforcing validation with required, pattern, min, max, minlength, maxlength, and custom error styling.",
          sortOrder: 3,
          contentType: "text",
          contentData: `# 5.3 Native Form Validation & Pattern Regex

HTML5 enables powerful client-side form validation before data reaches server endpoints.

---

### Native HTML5 Validation Attributes

\`\`\`html
<form action="/api/register" method="POST">
  <!-- Required field -->
  <input type="text" name="fullname" required minlength="3" maxlength="50">

  <!-- Regular Expression Pattern (e.g. Phone Number validation) -->
  <label for="phone">Phone Number (10 Digits):</label>
  <input type="tel" id="phone" name="phone" pattern="[0-9]{10}" placeholder="9876543210" required>

  <!-- Custom Password Requirements: At least 8 chars, 1 number, 1 uppercase -->
  <label for="pwd">Password:</label>
  <input 
    type="password" 
    id="pwd" 
    name="pwd" 
    pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
    title="Must contain at least one number, one uppercase letter, and at least 8 characters"
    required
  >

  <button type="submit">Create Account</button>
</form>
\`\`\`

---

### CSS Pseudo-Classes for Valid/Invalid States

Format inputs automatically based on validation state:

\`\`\`css
input:valid {
  border-color: #22c55e; /* Green border when valid */
}
input:invalid {
  border-color: #ef4444; /* Red border when invalid */
}
\`\`\``
        }
      ]
    },
    {
      title: "Unit 6: Advanced HTML5 Graphics & Interactive Web APIs",
      code: "HTML-U6",
      description: "Master Scalable Vector Graphics (SVG), 2D Canvas, Web Storage API, Geolocation, and Drag & Drop.",
      sortOrder: 6,
      topics: [
        {
          title: "6.1 Scalable Vector Graphics (SVG) Embeds",
          description: "Inline SVG tags, paths, shapes (circle, rect, path), stroke, fill, and scalable resolution graphics.",
          sortOrder: 1,
          contentType: "text",
          contentData: `# 6.1 Scalable Vector Graphics (SVG) Embeds

SVG (Scalable Vector Graphics) is an XML-based vector image format for two-dimensional graphics. SVG scales infinitely without loss of resolution!

---

### Inline SVG Example

\`\`\`html
<svg width="200" height="200" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <!-- Circle shape -->
  <circle cx="50" cy="50" r="40" fill="#3b82f6" stroke="#1d4ed8" stroke-width="4" />
  
  <!-- Rectangle shape -->
  <rect x="30" y="30" width="40" height="40" fill="#ffffff" rx="5" />
</svg>
\`\`\`

---

### Advantages of SVG in HTML5
1. **Resolution Independent**: Looks ultra crisp on 4K & Retina displays.
2. **Stylable via CSS**: Change \`fill\`, \`stroke\`, and hover states dynamically.
3. **Animatable**: Manipulate vector coordinates via CSS animations or JS.`
        },
        {
          title: "6.2 HTML5 Canvas API Basics",
          description: "Creating interactive pixel raster graphics, games, and dynamic charts with canvas element.",
          sortOrder: 2,
          contentType: "text",
          contentData: `# 6.2 HTML5 Canvas API Basics

The \`<canvas>\` tag provides a resolution-dependent bitmap canvas for rendering graphics, charts, and 2D games via JavaScript.

---

### HTML Canvas Setup

\`\`\`html
<canvas id="myCanvas" width="400" height="200" style="border:1px solid #ccc;"></canvas>

<script>
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');

  // Draw filled rectangle
  ctx.fillStyle = '#3b82f6';
  ctx.fillRect(20, 20, 150, 100);

  // Draw text
  ctx.font = '20px Inter, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('HTML5 Canvas', 30, 75);
</script>
\`\`\``
        },
        {
          title: "6.3 Web Storage API & Custom Data Attributes",
          description: "Storing client data with localStorage/sessionStorage and using data-* attributes.",
          sortOrder: 3,
          contentType: "text",
          contentData: `# 6.3 Web Storage API & Custom Data Attributes

### Custom Data Attributes (\`data-*\`)

HTML5 lets you store custom data directly on any HTML element without non-standard hacks:

\`\`\`html
<button 
  class="course-btn" 
  data-course-id="HTML-101" 
  data-category="web-dev" 
  data-enrolled="true"
>
  View HTML Course
</button>

<script>
  const btn = document.querySelector('.course-btn');
  console.log(btn.dataset.courseId); // "HTML-101"
  console.log(btn.dataset.category); // "web-dev"
</script>
\`\`\`

---

### HTML5 Web Storage API (\`localStorage\` & \`sessionStorage\`)

Save key-value data directly inside user browsers:

\`\`\`html
<script>
  // localStorage persists even after browser restarts
  localStorage.setItem('userTheme', 'dark');
  const theme = localStorage.getItem('userTheme');

  // sessionStorage expires when tab is closed
  sessionStorage.setItem('activeTab', 'enrolled');
</script>
\`\`\``
        }
      ]
    },
    {
      title: "Unit 7: SEO, Accessibility (WAI-ARIA), Performance & Best Practices",
      code: "HTML-U7",
      description: "Meta tags, Open Graph og tags, WCAG 2.2 accessibility, ARIA roles, script async/defer, and W3C validation.",
      sortOrder: 7,
      topics: [
        {
          title: "7.1 Search Engine Optimization (SEO) & Meta Tags",
          description: "Meta description, viewport, Open Graph social share cards, Twitter cards, and canonical tags.",
          sortOrder: 1,
          contentType: "text",
          contentData: `# 7.1 Search Engine Optimization (SEO) & Meta Tags

Meta tags supply search engine crawlers (Googlebot) and social networks with information about your web pages.

---

### Essential SEO Meta Tag Suite

\`\`\`html
<!-- Primary Meta Tags -->
<title>HTML5 Complete Masterclass | NextStep Academy</title>
<meta name="title" content="HTML5 Complete Masterclass | NextStep Academy">
<meta name="description" content="Learn HTML5 from scratch to advanced level with comprehensive lessons, form validation, graphics, and accessibility standards.">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://nextstep.prisoltech.app/courses/html101">

<!-- Open Graph / Facebook / LinkedIn -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://nextstep.prisoltech.app/courses/html101">
<meta property="og:title" content="HTML5 Complete Masterclass | NextStep Academy">
<meta property="og:description" content="Master modern HTML5 with hands-on reading guides and quizzes.">
<meta property="og:image" content="https://nextstep.prisoltech.app/og-html5.jpg">

<!-- Twitter Card -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:title" content="HTML5 Complete Masterclass">
<meta property="twitter:description" content="Master modern HTML5 from scratch to advanced level.">
<meta property="twitter:image" content="https://nextstep.prisoltech.app/og-html5.jpg">
\`\`\``
        },
        {
          title: "7.2 Web Accessibility (WAI-ARIA & WCAG 2.2)",
          description: "Making websites usable for all people including those with screen readers, aria-* attributes, and keyboard focus.",
          sortOrder: 2,
          contentType: "text",
          contentData: `# 7.2 Web Accessibility (WAI-ARIA & WCAG 2.2)

Web accessibility ensures that websites remain fully functional for people with disabilities (visual, auditory, motor, or cognitive impairments).

---

### WAI-ARIA Attributes (\`aria-*\`)

Accessible Rich Internet Applications (ARIA) attributes augment HTML tags when standard native semantics are insufficient:

\`\`\`html
<!-- Accessible Modal Popup -->
<div role="dialog" aria-labelledby="modal-title" aria-modal="true">
  <h2 id="modal-title">Course Enrollment Complete</h2>
  <button aria-label="Close dialog window">X</button>
</div>

<!-- Accessible Progress Indicator -->
<div role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
  75% Completed
</div>
\`\`\`

---

### Key Accessibility Rules
1. **Keyboard Navigability**: Every interactive element (button, link, form control) must be accessible via \`Tab\` key focus.
2. **Color Contrast**: Ensure text contrast ratio is at least 4.5:1 against background colors.
3. **Form Labels**: Every \`<input>\` must have a corresponding \`<label for="">\`.`
        },
        {
          title: "7.3 Web Performance, Asset Loading, & Final Architecture Blueprint",
          description: "Async vs defer script execution, preloading, W3C validation, and masterclass code standards.",
          sortOrder: 3,
          contentType: "text",
          contentData: `# 7.3 Web Performance, Asset Loading, & Final Architecture Blueprint

Optimize script loading to eliminate render-blocking bottlenecks.

---

### Script Loading Strategies: \`async\` vs. \`defer\`

\`\`\`html
<!-- Render Blocking (Avoid in head) -->
<script src="app.js"></script>

<!-- Asynchronous Execution (Executes as soon as downloaded, non-sequential) -->
<script src="analytics.js" async></script>

<!-- Deferred Execution (Downloads in background, executes after DOM is fully parsed - BEST PRACTICE) -->
<script src="main.js" defer></script>
\`\`\`

---

### Final Masterclass Blueprint Checklist
- [x] Validated document against W3C HTML Validator.
- [x] Exactly one \`<h1>\` tag per document.
- [x] All images contain descriptive \`alt\` text.
- [x] All form controls have associated \`<label>\` tags.
- [x] Used semantic structural tags (\`<header>\`, \`<main>\`, \`<nav>\`, \`<footer>\`).
- [x] Configured viewport and meta tags for responsive devices.

Congratulations on completing the **HTML5 Complete Masterclass reading material**!`
        }
      ]
    }
  ]
};
