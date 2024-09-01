const NoWalletDetected: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80 text-white text-center">
      <div className="p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Wallet Not Detected</h1>
        <p className="mb-4">
          It seems like you don't have a cryptocurrency wallet installed. Please
          install MetaMask or another wallet to use this app.
        </p>
        <a
          href="https://metamask.io/download.html"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          Install MetaMask
        </a>
      </div>
    </div>
  );
};

export default NoWalletDetected;
