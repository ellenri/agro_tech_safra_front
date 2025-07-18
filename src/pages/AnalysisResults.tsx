import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import type { AnaliseIAResponse } from '../types/api';
import type { NavigationItem } from '../types';

export default function AnalysisResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const [analysisData, setAnalysisData] = useState<AnaliseIAResponse | null>(null);

  useEffect(() => {
    const data = location.state?.analysisData as AnaliseIAResponse;
    if (!data) {
      navigate('/');
      return;
    }
    setAnalysisData(data);
  }, [location, navigate]);

  const handleNavigationClick = (item: NavigationItem) => {
    if (item.path === '/') {
      navigate('/', { replace: true });
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case 'crítica':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'alta':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'média':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'baixa':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskColor = (nivel: string) => {
    switch (nivel.toLowerCase()) {
      case 'crítico':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'alto':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'médio':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'baixo':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (!analysisData) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#f59e0b] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando resultados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#f8fafc] flex flex-col">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeItem="results" onItemClick={handleNavigationClick} />
        
        <div className="flex-1 overflow-auto">
          <div className="p-8 max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Resultados da Análise de Pragas
              </h1>
              <p className="text-gray-600">
                Análise completa realizada em {new Date(analysisData.metricas?.processadoEm || Date.now()).toLocaleString('pt-BR')}
              </p>
            </div>

            {/* Identificação da Praga */}
            {analysisData.praga && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-[#3d6b4d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Praga Identificada
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className='text-lg font-semibold text-gray-800'>
                      {analysisData.nomePropriedade}
                    </h3>
                     <h3 className="text-lg font-semibold text-gray-800">
                      {analysisData.nomeCultura || 'Cultura não especificada'}
                    </h3>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {analysisData.praga.nomePopular}
                    </h3>
                    <p className="text-sm text-gray-600 italic mb-3">
                      {analysisData.praga.nomeCientifico}
                    </p>
                    <p className="text-gray-700 mb-4">
                      {analysisData.praga.descricao}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-600">Confiança:</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-[#3d6b4d] h-2.5 rounded-full"
                          style={{ width: `${analysisData.praga.confiancaIdentificacao}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-800">
                        {analysisData.praga.confiancaIdentificacao}%
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Tipo de Dano:</h4>
                    <p className="text-gray-700 mb-3">{analysisData.praga.tipoDano}</p>
                    
                    <h4 className="font-medium text-gray-800 mb-2">Sintomas Característicos:</h4>
                    <ul className="space-y-1">
                      {analysisData.praga.sintomasCaracteristicos.map((sintoma, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-[#f59e0b] mr-2">•</span>
                          <span className="text-gray-700 text-sm">{sintoma}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Análise de Risco */}
            {analysisData.risco && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-[#f59e0b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Análise de Risco
                </h2>
                
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Nível de Infestação</p>
                    <p className={`text-lg font-semibold px-3 py-1 rounded-full border ${getRiskColor(analysisData.risco.nivelInfestacao)}`}>
                      {analysisData.risco.nivelInfestacao}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Risco Estimado</p>
                    <p className="text-2xl font-bold text-gray-800">
                      {analysisData.risco.percentualRisco}%
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Tempo de Reação</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {analysisData.risco.tempoReacao}
                    </p>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Impacto Econômico: <span className="text-gray-900">{analysisData.risco.impactoEconomico}</span>
                  </p>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Fatores de Risco:</p>
                    <div className="flex flex-wrap gap-2">
                      {analysisData.risco.fatoresRisco.map((fator, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {fator}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Recomendações de Manejo
            {analysisData.recomendacoes.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-[#3d6b4d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Recomendações de Manejo
                </h2>
                
                <div className="space-y-4">
                  {analysisData.recomendacoes.map((rec, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-800">{rec.tipo}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(rec.urgencia)}`}>
                          Urgência: {rec.urgencia}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 mb-3">{rec.descricao}</p>
                      
                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        {rec.produtosSugeridos.length > 0 && (
                          <div>
                            <span className="font-medium text-gray-700">Produtos:</span>
                            <ul className="mt-1">
                              {rec.produtosSugeridos.map((produto, idx) => (
                                <li key={idx} className="text-gray-600">• {produto}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {rec.dosagem && (
                          <div>
                            <span className="font-medium text-gray-700">Dosagem:</span>
                            <p className="text-gray-600">{rec.dosagem}</p>
                          </div>
                        )}
                        
                        {rec.melhorEpocaAplicacao && (
                          <div className="md:col-span-2">
                            <span className="font-medium text-gray-700">Melhor época:</span>
                            <p className="text-gray-600">{rec.melhorEpocaAplicacao}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )} */}

            {/* Métricas de Processamento */}
            {analysisData.metricas && (
              <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
                <div className="flex flex-wrap gap-4 justify-center">
                  <div className="text-center">
                    <p className="font-medium">Registros Processados</p>
                    <p className="text-lg text-gray-800">{analysisData.metricas.totalRegistrosProcessados}</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">Modelo IA</p>
                    <p className="text-lg text-gray-800">{analysisData.metricas.modeloIA}</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">Tokens Utilizados</p>
                    <p className="text-lg text-gray-800">{analysisData.metricas.tokensUtilizados}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Botão para novo upload */}
            <div className="mt-8 text-center">
              <button
                onClick={() => navigate('/')}
                className="bg-[#3d6b4d] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#4a7c59] transition-colors inline-flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Nova Análise</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}