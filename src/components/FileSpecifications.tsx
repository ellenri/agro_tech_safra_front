export default function FileSpecifications() {
  const specifications = [
    { label: 'Formato: CSV (.csv)', icon: '✓', color: 'text-green-600' },
    { label: 'Tamanho máximo: 50MB', icon: '✓', color: 'text-green-600' },
    { label: 'Colunas obrigatórias: Id, DataAvaliacao, Propriedade, NomeCultura', icon: '✓', color: 'text-green-600' },
    { label: 'Codificação: UTF-8', icon: '✓', color: 'text-green-600' },
    { label: 'Datas no formato: YYYY-MM-DD', icon: '✓', color: 'text-green-600' },
    { label: 'Campos booleanos: true/false', icon: '✓', color: 'text-green-600' },
  ];

  return (
    <div className="bg-gray-50 rounded-lg p-6 mt-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Especificações do arquivo:
      </h3>
      <div className="space-y-3">
        {specifications.map((spec, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className={`w-5 h-5 rounded-full bg-green-100 flex items-center justify-center ${spec.color}`}>
              <span className="text-xs font-bold">{spec.icon}</span>
            </div>
            <span className="text-gray-700">{spec.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}