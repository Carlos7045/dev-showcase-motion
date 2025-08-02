import React, { useState } from 'react';
import { Filter, X, SortAsc, SortDesc, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ProjectCategory, Technology } from '@/types/portfolio';

export type SortOption = 'newest' | 'oldest' | 'featured' | 'alphabetical';
export type ViewMode = 'grid' | 'list';

interface PortfolioFiltersProps {
  categories: ProjectCategory[];
  technologies: Technology[];
  selectedCategories: string[];
  selectedTechnologies: string[];
  selectedStatus: string[];
  sortBy: SortOption;
  viewMode: ViewMode;
  onCategoryChange: (categories: string[]) => void;
  onTechnologyChange: (technologies: string[]) => void;
  onStatusChange: (status: string[]) => void;
  onSortChange: (sort: SortOption) => void;
  onViewModeChange: (mode: ViewMode) => void;
  onClearFilters: () => void;
  className?: string;
}

export const PortfolioFilters: React.FC<PortfolioFiltersProps> = ({
  categories,
  technologies,
  selectedCategories,
  selectedTechnologies,
  selectedStatus,
  sortBy,
  viewMode,
  onCategoryChange,
  onTechnologyChange,
  onStatusChange,
  onSortChange,
  onViewModeChange,
  onClearFilters,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const statusOptions = [
    { value: 'completed', label: 'Concluído', color: '#10B981' },
    { value: 'in-progress', label: 'Em Andamento', color: '#F59E0B' },
    { value: 'concept', label: 'Conceito', color: '#3B82F6' }
  ];

  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(c => c !== categoryId)
      : [...selectedCategories, categoryId];
    onCategoryChange(newCategories);
  };

  const handleTechnologyToggle = (techName: string) => {
    const newTechnologies = selectedTechnologies.includes(techName)
      ? selectedTechnologies.filter(t => t !== techName)
      : [...selectedTechnologies, techName];
    onTechnologyChange(newTechnologies);
  };

  const handleStatusToggle = (status: string) => {
    const newStatus = selectedStatus.includes(status)
      ? selectedStatus.filter(s => s !== status)
      : [...selectedStatus, status];
    onStatusChange(newStatus);
  };

  const getSortLabel = (sort: SortOption) => {
    switch (sort) {
      case 'newest': return 'Mais recentes';
      case 'oldest': return 'Mais antigos';
      case 'featured': return 'Em destaque';
      case 'alphabetical': return 'Alfabética';
      default: return 'Mais recentes';
    }
  };

  const getSortIcon = (sort: SortOption) => {
    switch (sort) {
      case 'oldest': return <SortAsc className="w-4 h-4" />;
      case 'alphabetical': return <SortAsc className="w-4 h-4" />;
      default: return <SortDesc className="w-4 h-4" />;
    }
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedTechnologies.length > 0 || selectedStatus.length > 0;
  const totalFilters = selectedCategories.length + selectedTechnologies.length + selectedStatus.length;

  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      {/* View Mode Toggle */}
      <div className="flex items-center border border-border rounded-lg p-1">
        <Button
          variant={viewMode === 'grid' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewModeChange('grid')}
          className="h-8 w-8 p-0"
        >
          <Grid className="w-4 h-4" />
        </Button>
        <Button
          variant={viewMode === 'list' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewModeChange('list')}
          className="h-8 w-8 p-0"
        >
          <List className="w-4 h-4" />
        </Button>
      </div>

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
          <SelectItem value="featured">
            <div className="flex items-center gap-2">
              <SortDesc className="w-4 h-4" />
              Em destaque
            </div>
          </SelectItem>
          <SelectItem value="alphabetical">
            <div className="flex items-center gap-2">
              <SortAsc className="w-4 h-4" />
              Alfabética
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
        <PopoverContent className="w-96" align="start">
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
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => handleCategoryToggle(category.id)}
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

              {/* Status */}
              <div>
                <h4 className="font-medium mb-3">Status</h4>
                <div className="space-y-2">
                  {statusOptions.map((status) => (
                    <label
                      key={status.value}
                      className="flex items-center gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedStatus.includes(status.value)}
                        onChange={() => handleStatusToggle(status.value)}
                        className="rounded border-border"
                      />
                      <div className="flex items-center gap-2 flex-1">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: status.color }}
                        />
                        <span className="text-sm">{status.label}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="font-medium mb-3">Tecnologias</h4>
                <div className="flex flex-wrap gap-2">
                  {technologies.slice(0, 12).map((tech) => (
                    <Badge
                      key={tech.name}
                      variant={selectedTechnologies.includes(tech.name) ? "default" : "secondary"}
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => handleTechnologyToggle(tech.name)}
                      style={selectedTechnologies.includes(tech.name) ? {} : { 
                        borderColor: `${tech.color}40`, 
                        color: tech.color 
                      }}
                    >
                      {tech.name}
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
          {selectedCategories.map((categoryId) => {
            const category = categories.find(c => c.id === categoryId);
            return category ? (
              <Badge
                key={categoryId}
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
                  onClick={() => handleCategoryToggle(categoryId)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            ) : null;
          })}
          
          {selectedTechnologies.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {tech}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1 hover:bg-transparent"
                onClick={() => handleTechnologyToggle(tech)}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          ))}

          {selectedStatus.map((status) => {
            const statusOption = statusOptions.find(s => s.value === status);
            return statusOption ? (
              <Badge
                key={status}
                variant="secondary"
                className="flex items-center gap-1"
              >
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: statusOption.color }}
                />
                {statusOption.label}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 ml-1 hover:bg-transparent"
                  onClick={() => handleStatusToggle(status)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            ) : null;
          })}
        </div>
      )}
    </div>
  );
};