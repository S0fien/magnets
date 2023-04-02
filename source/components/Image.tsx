import React from 'react';
import BinaryImage from '../../types/binaryImage';

const Image: React.FC<BinaryImage> = ({image, className}) => {
  const {binaryData, mimeType} = image;
  const imageUrl = React.useMemo(() => {
    const blob = new Blob([binaryData], {type: mimeType});
    return URL.createObjectURL(blob);
  }, [binaryData, mimeType]);

  React.useEffect(() => {
    return (): void => {
      URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  return <img src={imageUrl} alt="Binary" className={className} />;
};

export default Image;
