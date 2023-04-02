type BinaryImage = {
  image: {
    binaryData: Uint8Array;
    mimeType: string;
  };
  className: string;
};

export default BinaryImage;
