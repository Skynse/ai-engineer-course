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
  subtitle:
    'A polished static syllabus shell for a beginner full-stack AI engineering course where you use Codex to build real product features with verification.',
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
      slug: 'optional-paths',
      code: 'GX',
      title: 'Optional Paths',
      description: 'Setup material that is useful for a minority of learners, including running Appwrite locally instead of using the default Cloud path.',
      image: withBase('/assets/screenshots/social/social1.png'),
      lessons: [
        { slug: 'guide-self-hosting-appwrite', source: 'guide-self-hosting-appwrite.md', number: 'X.1' },
      ],
    },
    {
      slug: 'foundation',
      code: 'M2',
      title: 'Build an Imageboard',
      description: 'One continuous imageboard app that grows through threads, auth, profiles, boards, replies, uploads, permissions, and search.',
      image: withBase('/assets/screenshots/recipe/home1.png'),
      lessons: [
        { slug: 'session-03', source: 'session-03.md', number: '2.1' },
        { slug: 'session-04', source: 'session-04.md', number: '2.2' },
        { slug: 'session-05', source: 'session-05.md', number: '2.3' },
        { slug: 'session-06', source: 'session-06.md', number: '2.4' },
        { slug: 'session-07', source: 'session-07.md', number: '2.5' },
        { slug: 'session-08', source: 'session-08.md', number: '2.6' },
        { slug: 'session-09', source: 'session-09.md', number: '2.7' },
        { slug: 'session-10', source: 'session-10.md', number: '2.8' },
      ],
    },
    {
      slug: 'demo-apps',
      code: 'M3',
      title: 'Demo Projects',
      description: 'Three larger demo apps that combine the earlier patterns into real product shapes instead of isolated lessons.',
      image: withBase('/assets/screenshots/kanban/kanban.png'),
      lessons: [
        { slug: 'session-11', source: 'session-11.md', number: '3.1', image: withBase('/assets/screenshots/kanban/kanban.png') },
        { slug: 'session-12', source: 'session-12.md', number: '3.2' },
      ],
    },
    {
      slug: 'final-project',
      code: 'M4',
      title: 'Final Project',
      description: 'Planning, building, and presenting a complete static or full-stack project using the same systems taught throughout the course.',
      image: withBase('/assets/screenshots/social/social3.png'),
      lessons: [
        { slug: 'session-13', source: 'session-13.md', number: '4.1' },
        { slug: 'session-14', source: 'session-14.md', number: '4.2' },
        { slug: 'session-15', source: 'session-15.md', number: '4.3' },
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
