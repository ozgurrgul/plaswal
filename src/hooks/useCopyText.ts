export const useCopyText = () => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyText = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return { copySuccess, handleCopyText };
};
