import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SubtitleContainer = styled.div`
    padding: 0.2rem 0.5rem;
`;

const SubtitleText = styled.h4`
    font-weight: bolder;
    text-align: left;
`;

const Subtitle = ({ text }) => {
    return (
        <SubtitleContainer>
            <SubtitleText className="text-muted">
                {text}
            </SubtitleText>
        </SubtitleContainer>
    );
}

Subtitle.propTypes = {
    text: PropTypes.string.isRequired
}

export default Subtitle;