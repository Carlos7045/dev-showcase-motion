import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Tag, Folder, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BlogPost, Category } from '@/types/blog';

interface BlogSidebarProps {
  categories: Category[];
  tags: string[];
  recentPosts: BlogPost[];
  onSearch?: (query: string) => void;
  className?: string;
}

export const BlogSidebar: React.FC<BlogSidebarProps> = ({
  categories,
  tags,
  recentPosts,
  onSearch,
  className = ''
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'short'
    }).format(date);
  };

  return (
    <aside className={`space-y-6 ${className}`}>
      {/* Search */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Search className="w-5 h-5" />
            Buscar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="Buscar artigos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="sm">
              <Search className="w-4 h-4" />
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Folder className="w-5 h-5" />
            Categorias
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/blog/categoria/${category.slug}`}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200 group"
              >
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="group-hover:text-primary transition-colors duration-200">
                    {category.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Popular Tags */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Tag className="w-5 h-5" />
            Tags Populares
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 12).map((tag) => (
              <Link key={tag} to={`/blog/tag/${tag}`}>
                <Badge 
                  variant="secondary" 
                  className="hover:bg-primary hover:text-primary-foreground transition-colors duration-200 cursor-pointer"
                >
                  #{tag}
                </Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Posts */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="w-5 h-5" />
            Artigos Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentPosts.slice(0, 5).map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="block group"
              >
                <div className="flex gap-3">
                  {post.coverImage && (
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors duration-200">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <span>{formatDate(post.publishDate)}</span>
                      <span>•</span>
                      <span>{post.readingTime} min</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Newsletter Signup */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader>
          <CardTitle className="text-lg">Newsletter</CardTitle>
          <CardDescription>
            Receba os melhores artigos sobre desenvolvimento diretamente no seu email.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-3">
            <Input
              type="email"
              placeholder="Seu melhor email"
              className="w-full"
            />
            <Button className="w-full btn-hero">
              Inscrever-se
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-2">
            Sem spam. Cancele a qualquer momento.
          </p>
        </CardContent>
      </Card>
    </aside>
  );
};