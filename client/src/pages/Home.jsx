import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
import ImageCard from '../components/ImageCard';
import { GetPosts } from '../api';

const Container = styled.div`
    height: 100%;
    overflow-y: scroll;
    background: ${({theme}) => theme.bg};
    padding: 30px 30px;
    padding-bottom: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    @media (max-width: 768px){
        padding: 6px 10px;
    }
`; 

const Headline = styled.div`
    font-size: 34px;
    font-weight: 500;
    color: ${({theme}) => theme.text_primary};
    display: flex;
    align-items: center;
    flex-direction: column;
    @media (max-width: 600px){
        font-size: 22px;
    }
`;

const Wrapper = styled.div`
    width: 100%;
    max-width: 1400px;
    padding: 20px 30px;
    display: flex;
    justify-content: center;
`;

const CardWrapper = styled.div`
    display: grid;
    gap: 20px;
    width: 100%;
    @media (min-width: 1200px) {
        grid-template-columns: repeat(4, 1fr);
    };
    @media (min-width: 640px) and (max-width: 1190px) {
        grid-template-columns: repeat(3, 1fr); 
    }; 
    @media (max-width: 639px) {
        grid-template-columns: repeat(2, 1fr); 
    };
`;

const Span = styled.div`
    font-size: 34px;
    font-weight: 800;
    color: ${({theme}) => theme.secondary};
`;

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await GetPosts();
                setPosts(response.data);
                setFilteredPosts(response.data);
            } catch (err) {
                setError(err.message || 'Failed to fetch posts');
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredPosts(posts);
        } else {
            const query = searchQuery.toLowerCase();
            const filtered = posts.filter(post => 
                (post?.prompt?.toLowerCase()?.includes(query) || false) ||
                (post?.author?.toLowerCase()?.includes(query) || false)
            );
            setFilteredPosts(filtered);
        }
    }, [searchQuery, posts]);
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return(
        <Container>
            <Headline>
                Explore Popular posts in Community!
            </Headline>
            <Span>
                Generated with AI
            </Span>
            <SearchBar onSearch={handleSearch} />
            <Wrapper>
                {loading ? (
                    <div>Loading posts...</div>
                ) : error ? (
                    <div>{error}</div>
                ) : (
                    <CardWrapper>
                        {filteredPosts.length === 0 ? (
                            <div>No Posts Found</div>
                        ) : (
                            filteredPosts.map((post) => (
                                <ImageCard 
                                    key={post._id} 
                                    item={{
                                        photo: post.photo,
                                        prompt: post.prompt,
                                        author: post.name
                                    }} 
                                />
                            ))
                        )}
                    </CardWrapper>
                )}
            </Wrapper>
        </Container>
    );
};

export default Home;