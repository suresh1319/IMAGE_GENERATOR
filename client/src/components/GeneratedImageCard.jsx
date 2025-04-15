import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  width: 100%;
  max-width: 512px;
  margin: 20px auto;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background: ${({ theme }) => theme.card};
  padding: 16px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: 4px;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 12px;
`;

const GeneratedImageCard = ({ imageUrl }) => {
  if (!imageUrl) return null;

  return (
    <Card>
      <Title>Generated Image</Title>
      <Image src={imageUrl} alt="Generated image" />
    </Card>
  );
};

export default GeneratedImageCard;