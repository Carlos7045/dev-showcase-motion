import React, { useState } from 'react';
import { Filter, X, Calendar, SortAsc, SortDesc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Category } from '@/types/blog';

export type SortOption = 'newest' | 'oldest' | 'popular' | 'reading-time';

interface BlogFiltersProps {
  categories: Category[];
  tags: string[];
  selectedCategories: string[];
  selectedTags: string[];
  sortBy: SortOption;
  onCategoryChange: (categories: string[]) => void;
  onTagChange: (tags: string[]) => void;
  onSortChange: (sort: SortOption) => void;
  onClearFilters: () => void;
  className?: string;
}

export const BlogFilters: React.FC<BlogFiltersProps> = ({
  categories,
  tags,
  selectedCategories,
  selectedTags,
  sortBy,
  onCategoryChange,
  onTagChange,
  onSortChange,
  onClearFilters,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryToggle = (categorySlug: string) => {
    const newCategories = selectedCategories.includes(categorySlug)
      ? selectedCategories.filter(c => c !== categorySlug)
      : [...selectedCategories, categorySlug];
    onCategoryChange(newCategories);
  };

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    onTagChange(newTags);
  };

  const getSortLabel = (sort: SortOption) => {
    switch (sort) {
      case 'newest': return 'Mais recentes';
      case 'oldest': return 'Mais antigos';
      case 'popular': return 'Mais populares';
      case 'reading-time': return 'Tempo de leitura';
      default: return 'Mais recentes';
    }
  };

  const getSortIcon = (sort: SortOption) => {
    switch (sort) {
      case 'oldest': return <SortAsc className="w-4 h-4" />;
      case 'reading-time': return <Calendar className="w-4 h-4" />;
      default: return <SortDesc className="w-4 h-4" />;
    }
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedTags.length > 0;
  const totalFilters = selectedCategories.length + selectedTags.length;

  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      {/* Sort Dropdown */}
      <Select value={sortBy} onValueChange={(value: SortOption) => onSortChange(value)}>
        <SelectTrigger className="w-[180px]">
          <div className="flex items-center gap-2">
            {getSortIcon(sortBy)}
            <SelectValue />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">
            <div className="flex items-center gap-2">
              <SortDesc className="w-4 h-4" />
              Mais recentes
            </div>
          </SelectItem>
          <SelectItem value="oldest">
            <div className="flex items-center gap-2">
              <SortAsc className="w-4 h-4" />
              Mais antigos
            </div>
          </SelectItem>
          <SelectItem value="popular">
            <div className="flex items-center gap-2">
              <SortDesc className="w-4 h-4" />
              Mais populares
            </div>
          </SelectItem>
          <SelectItem value="reading-time">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Tempo de leitura
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Filters Popover */}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="relative">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
            {totalFilters > 0 && (
              <Badge 
                variant="secondary" 
                className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {totalFilters}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="start">
          <Card className="border-0 shadow-none">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg flex items-center justify-between">
                Filtros
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClearFilters}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Limpar
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Categories */}
              <div>
                <h4 className="font-medium mb-3">Categorias</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label
                      key={category.id}
                      className="flex items-center gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.slug)}
                        onChange={() => handleCategoryToggle(category.slug)}
                        className="rounded border-border"
                      />
                      <div className="flex items-center gap-2 flex-1">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="text-sm">{category.name}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <h4 className="font-medium mb-3">Tags Populares</h4>
                <div className="flex flex-wrap gap-2">
                  {tags.slice(0, 12).map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "secondary"}
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => handleTagToggle(tag)}
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          {selectedCategories.map((categorySlug) => {
            const category = categories.find(c => c.slug === categorySlug);
            return category ? (
              <Badge
                key={categorySlug}
                variant="secondary"
                className="flex items-center gap-1"
              >
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                {category.name}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 ml-1 hover:bg-transparent"
                  onClick={() => handleCategoryToggle(categorySlug)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            ) : null;
          })}
          
          {selectedTags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="flex items-center gap-1"
            >
              #{tag}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1 hover:bg-transparent"
                onClick={() => handleTagToggle(tag)}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};