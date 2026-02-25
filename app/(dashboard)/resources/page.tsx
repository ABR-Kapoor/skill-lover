'use client';

import { useState, useMemo } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { ResourceCard } from '@/components/resources/resource-card';
import { ResourceFilters } from '@/components/resources/resource-filters';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, BookOpen } from 'lucide-react';
import { 
  CURATED_RESOURCES, 
  getFeaturedResources, 
  searchResources, 
  filterResources,
  type Resource 
} from '@/lib/data/resources';

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<{
    category?: string;
    type?: string;
    difficulty?: string;
    isFree?: boolean;
  }>({});

  const featuredResources = useMemo(() => getFeaturedResources(), []);

  const filteredResources = useMemo(() => {
    let resources = CURATED_RESOURCES;

    // Apply search
    if (searchQuery) {
      resources = searchResources(searchQuery);
    }

    // Apply filters
    if (Object.keys(filters).some(key => filters[key as keyof typeof filters] !== undefined)) {
      resources = filterResources(filters as any);
    }

    return resources;
  }, [searchQuery, filters]);

  const stats = useMemo(() => {
    const total = CURATED_RESOURCES.length;
    const free = CURATED_RESOURCES.filter(r => r.isFree).length;
    const courses = CURATED_RESOURCES.filter(r => r.type === 'course').length;
    const avgRating = (CURATED_RESOURCES.reduce((sum, r) => sum + (r.rating || 0), 0) / CURATED_RESOURCES.filter(r => r.rating).length).toFixed(1);

    return { total, free, courses, avgRating };
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader
        title="Learning Resources"
        description="Curated collection of high-quality resources to accelerate your career growth"
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold text-primary">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total Resources</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold text-green-600">{stats.free}</div>
            <div className="text-sm text-muted-foreground">Free Resources</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold text-blue-600">{stats.courses}</div>
            <div className="text-sm text-muted-foreground">Courses</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="flex items-center justify-center gap-1">
              <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              <span className="text-3xl font-bold">{stats.avgRating}</span>
            </div>
            <div className="text-sm text-muted-foreground">Avg Rating</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">
            <BookOpen className="h-4 w-4 mr-2" />
            All Resources
          </TabsTrigger>
          <TabsTrigger value="featured">
            <Star className="h-4 w-4 mr-2" />
            Featured
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {/* Filters */}
          <ResourceFilters
            onSearch={setSearchQuery}
            onFilterChange={setFilters}
          />

          {/* Results */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                Showing {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''}
              </p>
            </div>

            {filteredResources.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No resources found. Try adjusting your filters.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="featured" className="space-y-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">⭐ Featured Resources</h3>
            <p className="text-sm text-muted-foreground">
              Hand-picked resources with the highest ratings and best learning outcomes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
