const StatusRenderer = ({ isLoading, error, loadingMessage, errorMessage }) => {
  if (isLoading) {
    return <h2 style={{ color: 'yellow' }}>{loadingMessage}</h2>;
  }

  if (error) {
    // 💡 Hata mesajını daha dinamik alabiliriz
    return <h2 style={{ color: 'red' }}>{errorMessage || `Hata: ${error}`}</h2>;
  }
  
  // Ne yükleniyor ne de hata var, yani her şey yolunda. null dönebiliriz.
  return null; 
};

export default StatusRenderer;