import { lowlight } from 'lowlight/lib/core';
import { useMemo } from 'react';

/**
 * This is a runtime version of React 17+ new JSX transform.
 * So we are accessing those exports that "doesn't exist"
 */
// @ts-expect-error -- This is something really stupid
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';

import md from 'highlight.js/lib/languages/markdown';
import ini from 'highlight.js/lib/languages/ini';
import properties from 'highlight.js/lib/languages/properties';
import bash from 'highlight.js/lib/languages/bash';
import yaml from 'highlight.js/lib/languages/yaml';
import lisp from 'highlight.js/lib/languages/lisp';
import julia from 'highlight.js/lib/languages/julia';
import nix from 'highlight.js/lib/languages/nix';
import xml from 'highlight.js/lib/languages/xml';
import r from 'highlight.js/lib/languages/r';
import powershell from 'highlight.js/lib/languages/powershell';
import clojure from 'highlight.js/lib/languages/clojure';
import dos from 'highlight.js/lib/languages/dos';
import perl from 'highlight.js/lib/languages/perl';

import clsx from 'clsx';

lowlight.registerLanguage('markdown', md);
lowlight.registerAlias({ markdown: ['mdown', 'mkdn', 'mdwn', 'ron'] });

lowlight.registerLanguage('ini', ini);
lowlight.registerAlias({ ini: ['toml', 'conf'] });

lowlight.registerLanguage('properties', properties);

lowlight.registerLanguage('bash', bash);
lowlight.registerAlias({ bash: ['sh', 'zsh', 'fish', 'shell'] });

lowlight.registerLanguage('yaml', yaml);
lowlight.registerAlias({ yaml: ['yml'] });

lowlight.registerLanguage('lisp', lisp);

lowlight.registerLanguage('julia', julia);

lowlight.registerLanguage('nix', nix);

lowlight.registerLanguage('xml', xml);

lowlight.registerLanguage('r', r);

lowlight.registerLanguage('powershell', powershell);

lowlight.registerLanguage('clojure', clojure);

lowlight.registerLanguage('dos', dos);

lowlight.registerLanguage('perl', perl);

const alias: Record<string, string> = {
  mdown: 'markdown',
  mkdn: 'markdown',
  mdwn: 'markdown',
  ron: 'markdown',

  toml: 'ini',
  sh: 'bash',
  zsh: 'bash',
  fish: 'bash',
  shell: 'bash',
  console: 'bash',

  yml: 'yaml',

  text: 'plain'
};

interface LowlightProps {
  code: string;
  language: string;
}

export default function Lowlight({ code, language }: LowlightProps) {
  const tree = useMemo(() => toJsxRuntime(lowlight.highlight(language, code), { Fragment, jsx, jsxs }), [code, language]);
  return (
    <pre className={clsx('hljs', `language-${alias[language] || language}`)}>
      <code>
        {tree}
      </code>
    </pre>
  );
}
