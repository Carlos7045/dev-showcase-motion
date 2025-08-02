import React from 'react';
import { AlertTriangle, CheckCircle, Lightbulb, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ProjectChallengesProps {
  challenges: string[];
  solutions: string[];
  learnings: string[];
  className?: string;
}

export const ProjectChallenges: React.FC<ProjectChallengesProps> = ({
  challenges,
  solutions,
  learnings,
  className = ''
}) => {
  return (
    <section className={`space-y-8 ${className}`}>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gradient mb-4">Desafios e Soluções</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Os principais obstáculos enfrentados e como foram superados durante o desenvolvimento.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Challenges */}
        <Card className="border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-700 transition-colors duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-red-600 dark:text-red-400">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              Desafios
            </CardTitle>
            <CardDescription>
              Principais obstáculos e complexidades do projeto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {challenges.map((challenge, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm leading-relaxed">{challenge}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Solutions */}
        <Card className="border-green-200 dark:border-green-800 hover:border-green-300 dark:hover:border-green-700 transition-colors duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-green-600 dark:text-green-400">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5" />
              </div>
              Soluções
            </CardTitle>
            <CardDescription>
              Abordagens e estratégias utilizadas para resolver os problemas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {solutions.map((solution, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm leading-relaxed">{solution}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Learnings */}
        <Card className="border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-5 h-5" />
              </div>
              Aprendizados
            </CardTitle>
            <CardDescription>
              Insights e conhecimentos adquiridos durante o projeto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {learnings.map((learning, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-sm leading-relaxed">{learning}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Process Flow */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-3">
            <TrendingUp className="w-6 h-6 text-primary" />
            Processo de Resolução
          </CardTitle>
          <CardDescription>
            Como transformamos desafios em oportunidades de inovação
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-red-600 dark:text-red-400 font-bold">1</span>
              </div>
              <h4 className="font-semibold mb-2 text-red-600 dark:text-red-400">Identificação</h4>
              <p className="text-sm text-muted-foreground">
                Mapeamento detalhado dos desafios e suas implicações
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-yellow-600 dark:text-yellow-400 font-bold">2</span>
              </div>
              <h4 className="font-semibold mb-2 text-yellow-600 dark:text-yellow-400">Análise</h4>
              <p className="text-sm text-muted-foreground">
                Pesquisa de soluções e avaliação de alternativas
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 dark:text-green-400 font-bold">3</span>
              </div>
              <h4 className="font-semibold mb-2 text-green-600 dark:text-green-400">Implementação</h4>
              <p className="text-sm text-muted-foreground">
                Desenvolvimento e teste das soluções propostas
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 dark:text-blue-400 font-bold">4</span>
              </div>
              <h4 className="font-semibold mb-2 text-blue-600 dark:text-blue-400">Otimização</h4>
              <p className="text-sm text-muted-foreground">
                Refinamento baseado em feedback e métricas
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};