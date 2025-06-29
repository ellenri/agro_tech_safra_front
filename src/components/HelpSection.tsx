interface HelpSectionProps {
  onDownloadTemplate?: () => void;
  onViewDocumentation?: () => void;
}

export default function HelpSection({ onDownloadTemplate, onViewDocumentation }: HelpSectionProps) {
  return (
    <div className="bg-primary-600 rounded-lg p-6 text-white">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <span className="text-xl">💡</span>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">
            Precisa de ajuda com o formato do arquivo?
          </h3>
          <p className="text-primary-100 mb-4">
            Baixe nosso modelo de CSV ou consulte a documentação para estruturar seus dados corretamente.
          </p>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <button
              onClick={onDownloadTemplate}
              className="bg-white text-primary-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>Baixar Modelo</span>
            </button>
            <button
              onClick={onViewDocumentation}
              className="bg-primary-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-800 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>Documentação</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}