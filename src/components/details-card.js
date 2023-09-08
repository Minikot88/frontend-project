import React from 'react'

import PropTypes from 'prop-types'

import './details-card.css'

const DetailsCard = (props) => {
    return (
        <div className={`details-card-feature-card ${props.rootClassName} `}>
            <h2 className="details-card-text">{props.title}</h2>
            <span className="details-card-text1">{props.description}</span>
        </div>
    )
}

DetailsCard.defaultProps = {
    rootClassName: '',
    title: 'Lorem ipsum',
    description:
        '-',
}

DetailsCard.propTypes = {
    rootClassName: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
}

export default DetailsCard
