import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MDXContentProps {
  content: string;
  className?: string;
}

interface CodeBlockProps {
  children: string;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className }) => {
  const [copied, setCopied] = React.useState(false);
  
  const language = className?.replace('language-', '') || 'text';
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleCopy}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-500" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </Button>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: '0.75rem',
          fontSize: '0.875rem',
          lineHeight: '1.5',
        }}
        showLineNumbers={children.split('\n').length > 5}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

// Componente para renderizar markdown simples
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const renderContent = (text: string) => {
    // Processar headers
    text = text.replace(/^### (.*$)/gim, '<h3 class="text-2xl font-bold text-foreground mb-4 mt-8">$1</h3>');
    text = text.replace(/^## (.*$)/gim, '<h2 class="text-3xl font-bold text-foreground mb-6 mt-10">$1</h2>');
    text = text.replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold text-foreground mb-8 mt-12">$1</h1>');
    
    // Processar parágrafos
    text = text.replace(/^\s*\n\n/gm, '<p class="text-muted-foreground leading-relaxed mb-6">');
    text = text.replace(/\n\n/g, '</p><p class="text-muted-foreground leading-relaxed mb-6">');
    
    // Processar listas
    text = text.replace(/^\* (.*$)/gim, '<li class="text-muted-foreground mb-2">$1</li>');
    text = text.replace(/(<li.*<\/li>)/s, '<ul class="list-disc list-inside mb-6 space-y-2">$1</ul>');
    
    // Processar links
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:text-primary/80 underline transition-colors duration-200" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Processar texto em negrito
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>');
    
    // Processar texto em itálico
    text = text.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
    
    // Processar código inline
    text = text.replace(/`([^`]+)`/g, '<code class="bg-muted px-2 py-1 rounded text-sm font-mono text-primary">$1</code>');
    
    return text;
  };

  const processCodeBlocks = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/);
    
    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        const lines = part.split('\n');
        const language = lines[0].replace('```', '');
        const code = lines.slice(1, -1).join('\n');
        
        return (
          <div key={index} className="my-6">
            <CodeBlock className={`language-${language}`}>
              {code}
            </CodeBlock>
          </div>
        );
      }
      
      return (
        <div 
          key={index}
          dangerouslySetInnerHTML={{ __html: renderContent(part) }}
        />
      );
    });
  };

  return <div className="prose-custom">{processCodeBlocks(content)}</div>;
};

export const MDXContent: React.FC<MDXContentProps> = ({ content, className = '' }) => {
  return (
    <article className={`max-w-none ${className}`}>
      <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
        <MarkdownRenderer content={content} />
      </div>
    </article>
  );
};