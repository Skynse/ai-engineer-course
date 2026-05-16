import matter from 'gray-matter';
import { marked } from 'marked';
import { createHighlighter } from 'shiki';

type LessonSource = {
  slug: string;
  source: string;
  number: string;
  image?: string;
};

type ModuleSource = {
  slug: string;
  code: string;
  title: string;
  description: string;
  image?: string;
  lessons: LessonSource[];
};

export type Lesson = LessonSource & {
  id: string;
  moduleSlug: string;
  moduleCode: string;
  moduleTitle: string;
  title: string;
  html: string;
  excerpt: string;
};

export type CourseModule = ModuleSource & {
  lessons: Lesson[];
};

type Course = {
  title: string;
  subtitle: string;
  modules: CourseModule[];
  lessons: Lesson[];
};

const markdownFiles = import.meta.glob('../../../src/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const BASE_URL = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

export function withBase(path: string) {
  if (!path.startsWith('/')) {
    return path;
  }

  return BASE_URL ? `${BASE_URL}${path}` : path;
}

const highlighter = await createHighlighter({
  themes: ['github-dark'],
  langs: [
    'typescript',
    'tsx',
    'javascript',
    'jsx',
    'bash',
    'shell',
    'json',
    'html',
    'css',
    'yaml',
    'markdown',
    'text',
  ],
});

const languageAliases: Record<string, string> = {
  ts: 'typescript',
  tsx: 'tsx',
  js: 'javascript',
  jsx: 'jsx',
  sh: 'bash',
  shell: 'bash',
  bash: 'bash',
  yml: 'yaml',
  md: 'markdown',
  text: 'text',
  plaintext: 'text',
};

const supportedLanguages = new Set(highlighter.getLoadedLanguages().map(String));

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function renderPlainCode(text: string, language: string) {
  const languageClass = language ? ` language-${escapeHtml(language)}` : '';
  return `<pre class="shiki fallback-code"><code class="${languageClass}">${escapeHtml(text)}</code></pre>`;
}

const renderer = new marked.Renderer();
renderer.code = ({ text, lang }) => {
  const requested = (lang ?? '').trim().toLowerCase();
  const language = languageAliases[requested] ?? requested;
  const resolvedLanguage = supportedLanguages.has(language) ? language : 'text';

  try {
    return highlighter.codeToHtml(text, {
      lang: resolvedLanguage,
      theme: 'github-dark',
    });
  } catch (error) {
    console.error(`Shiki failed for language "${resolvedLanguage}". Falling back to plain code.`, error);
    return renderPlainCode(text, requested || resolvedLanguage);
  }
};

marked.use({ renderer });

const courseSource: { title: string; subtitle: string; modules: ModuleSource[] } = {
  title: 'AI Engineer: From Zero to Full-Stack',
  subtitle: 'Build a real, deployed social media site by prompting an AI — not by copying code.',
  modules: [
    {
      slug: 'setup',
      code: 'M1',
      title: 'Setup & Infrastructure',
      description: 'Full-stack vocabulary, Next.js setup, the default Appwrite Cloud path, and the Codex, MCP, and CLI patterns used before building Appwrite-backed features.',
      image: withBase('/assets/screenshots/social/social1.png'),
      lessons: [
        { slug: 'session-01', source: 'session-01.md', number: '1.1' },
        { slug: 'guide-codex-install', source: 'guide-codex-install.md', number: '1.2' },
        { slug: 'session-02', source: 'session-02.md', number: '1.3' },
        { slug: 'guide-codex-website-workflow', source: 'guide-codex-website-workflow.md', number: '1.4' },
        { slug: 'guide-codex-appwrite-mcp', source: 'guide-codex-appwrite-mcp.md', number: '1.5' },
        { slug: 'guide-ai-appwrite-cli', source: 'guide-ai-appwrite-cli.md', number: '1.6' },
      ],
    },
    {
      slug: 'basics',
      code: 'M2',
      title: 'Back to Basics',
      description: 'Start fresh with a stripped-back static mockup of the Reddit-style site you\'re going to build.',
      image: withBase('/assets/screenshots/social/social1.png'),
      lessons: [
        { slug: 'basics-01-new-site', source: 'basics-01-new-site.md', number: '2.1' },
        { slug: 'basics-02-mockup', source: 'basics-02-mockup.md', number: '2.2' },
      ],
    },
    {
      slug: 'data-crud',
      code: 'M3',
      title: 'Data & CRUD',
      description: 'Learn what data models are, define the posts and comments collections, and wire them up with real CRUD operations.',
      image: withBase('/assets/screenshots/social/social1.png'),
      lessons: [
        { slug: 'data-02-our-models', source: 'data-02-our-models.md', number: '3.1' },
        { slug: 'crud-01-what-is', source: 'crud-01-what-is.md', number: '3.2' },
        { slug: 'crud-02-posts', source: 'crud-02-posts.md', number: '3.3' },
      ],
    },
    {
      slug: 'auth',
      code: 'M4',
      title: 'Authentication',
      description: 'Add signup, login, and logout. Connect posts and comments to the logged-in user and show different UI for each state.',
      image: withBase('/assets/screenshots/social/social1.png'),
      lessons: [
        { slug: 'auth-01-what-is', source: 'auth-01-what-is.md', number: '4.1' },
        { slug: 'auth-02-integrate', source: 'auth-02-integrate.md', number: '4.2' },
        { slug: 'auth-03-connect', source: 'auth-03-connect.md', number: '4.3' },
        { slug: 'auth-04-ui', source: 'auth-04-ui.md', number: '4.4' },
      ],
    },
    {
      slug: 'uploads',
      code: 'M5',
      title: 'Media Uploads',
      description: 'Create an Appwrite storage bucket and let users attach images to their posts.',
      image: withBase('/assets/screenshots/social/social1.png'),
      lessons: [
        { slug: 'uploads-01-buckets', source: 'uploads-01-buckets.md', number: '5.1' },
        { slug: 'uploads-02-create', source: 'uploads-02-create.md', number: '5.2' },
        { slug: 'uploads-03-upload', source: 'uploads-03-upload.md', number: '5.3' },
      ],
    },
    {
      slug: 'security',
      code: 'M6',
      title: 'Security',
      description: 'Lock down the app with proper permissions and have your AI perform a security audit.',
      image: withBase('/assets/screenshots/social/social1.png'),
      lessons: [
        { slug: 'security-01-permissions', source: 'security-01-permissions.md', number: '6.1' },
        { slug: 'security-02-audit', source: 'security-02-audit.md', number: '6.2' },
      ],
    },
    {
      slug: 'deploy',
      code: 'M7',
      title: 'Deploy',
      description: 'Push to GitHub and ship the live site to Vercel.',
      image: withBase('/assets/screenshots/social/social1.png'),
      lessons: [
        { slug: 'deploy-01-github', source: 'deploy-01-github.md', number: '7.1' },
        { slug: 'deploy-02-vercel', source: 'deploy-02-vercel.md', number: '7.2' },
      ],
    },
  ],
};

function extractTitle(markdown: string, fallback: string) {
  const titleMatch = markdown.match(/^#\s+(.+)$/m);
  return titleMatch ? titleMatch[1].trim() : fallback;
}

function stripLeadingH1(markdown: string) {
  return markdown.replace(/^\uFEFF?\s*#\s+.+(?:\r?\n)+/, '');
}

function extractExcerpt(markdown: string) {
  const body = markdown
    .replace(/^#\s+.+$/m, '')
    .split('\n')
    .map((line) => line.trim())
    .find((line) => line.length > 0 && !line.startsWith('**') && !line.startsWith('---'));

  return body ?? '';
}

function rewriteInternalLinks(html: string) {
  const rewrittenMarkdownLinks = html.replace(/href="([^"]+)\.md"/g, (_match, href) => {
    const cleaned = href.replace(/^\.?\//, '');
    return `href="${withBase(`/lessons/${cleaned}/`)}"`;
  });

  return rewrittenMarkdownLinks.replace(/(src|href)="\/(?!\/)([^"]+)"/g, (_match, attr, path) => {
    if (BASE_URL && path.startsWith(`${BASE_URL.replace(/^\//, '')}/`)) {
      return `${attr}="/${path}"`;
    }

    return `${attr}="${withBase(`/${path}`)}"`;
  });
}

function sourcePath(source: string) {
  return `../../../src/${source}`;
}

function buildCourse(): Course {
  const lessons: Lesson[] = [];

  const modules = courseSource.modules.map((module) => {
    const moduleLessons = module.lessons.map((lesson) => {
      const raw = markdownFiles[sourcePath(lesson.source)];
      if (!raw) {
        throw new Error(`Missing lesson source: ${lesson.source}`);
      }

      const { content } = matter(raw);
      const title = extractTitle(content, lesson.slug);
      const html = rewriteInternalLinks(marked.parse(stripLeadingH1(content)));
      const builtLesson: Lesson = {
        ...lesson,
        id: `${module.slug}:${lesson.slug}`,
        moduleSlug: module.slug,
        moduleCode: module.code,
        moduleTitle: module.title,
        title,
        html,
        excerpt: extractExcerpt(content),
      };

      lessons.push(builtLesson);
      return builtLesson;
    });

    return {
      ...module,
      lessons: moduleLessons,
    };
  });

  return {
    title: courseSource.title,
    subtitle: courseSource.subtitle,
    modules,
    lessons,
  };
}

export const course = buildCourse();

export function getLesson(slug: string) {
  return course.lessons.find((lesson) => lesson.slug === slug) ?? null;
}

export function getModule(slug: string) {
  return course.modules.find((module) => module.slug === slug) ?? null;
}

export function getAdjacentLessons(slug: string) {
  const index = course.lessons.findIndex((lesson) => lesson.slug === slug);
  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: course.lessons[index - 1] ?? null,
    next: course.lessons[index + 1] ?? null,
  };
}
