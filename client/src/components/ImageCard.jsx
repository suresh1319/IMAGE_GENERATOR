import React from 'react';
import styled from 'styled-components';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {AccountCircle, DownloadRounded} from '@mui/icons-material';
import FileSaver from "file-saver";

const Card = styled.div`
  position: relative;
  display: flex;
  border-radius: 20px;
  box-shadow: 1px 2px 40px 8px ${({ theme }) => theme.black + 60};
  cursor: pointer;
  transition: all 0.3s ease;
  aspect-ratio: 16/9;
  overflow: hidden;
  &:hover {
    box-shadow: 1px 2px 40px 8px ${({ theme }) => theme.black + 80};
    scale: 1.05;
  }
  &:nth-child(7n + 1) {
    grid-column: auto/span 2;
    grid-row: auto/span 2;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  .lazy-load-image-background {
    width: 100% !important;
    height: 100% !important;
  }
  img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
    display: block;
  }
`;

const HoverOverlay = styled.div`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: start;
  backdrop-filter: blur(2px);
  background: rgba(0, 0, 0, 0.5);
  color: ${({ theme }) => theme.white};
  transition: opacity 0.3s ease;
  border-radius: 20px;
  justify-content: space-between;
  padding: 16px;

  ${Card}:hover & {
    opacity: 1;
  }
`;

const TopRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const BottomRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Prompt = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.white};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
`;

const Author = styled.div`
  font-weight: 500;
  font-size: 14px;
  display: flex;
  gap: 6px;
  align-items: center;
  color: ${({ theme }) => theme.white};
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
`;

const DownloadButton = styled.div`
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s ease;
  &:hover {
    opacity: 1;
  }
`;

const ImageCard = ({ item }) => {
    const { photo, prompt, author } = item;
    
    const handleDownload = async (e) => {
        e.stopPropagation(); // Prevent card hover effect when clicking download
        try {
            const response = await fetch(photo);
            const blob = await response.blob();
            FileSaver.saveAs(blob, `${prompt.substring(0, 30)}.png`);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    };

    if (!photo) return null;

    return (
        <Card>
            <ImageContainer>
                <LazyLoadImage  
                    src={photo}
                    alt={prompt}
                    effect="blur"
                    wrapperClassName="image-wrapper"
                />
                <HoverOverlay>
                    <TopRow>
                        <DownloadButton onClick={handleDownload}>
                            <DownloadRounded style={{ fontSize: "22px" }} />
                        </DownloadButton>
                    </TopRow>
                    <BottomRow>
                        <Prompt>{prompt}</Prompt>
                        <Author>
                            <AccountCircle style={{ width: "24px", height: "24px" }} />
                            {author}
                        </Author>
                    </BottomRow>
                </HoverOverlay>
            </ImageContainer>
        </Card>
    );
};

export default ImageCard;