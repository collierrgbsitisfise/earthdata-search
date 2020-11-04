import React from 'react'
import PropTypes from 'prop-types'
import { FaMap } from 'react-icons/fa'

import { granuleTitle } from './skeleton'

import PortalLinkContainer from '../../containers/PortalLinkContainer/PortalLinkContainer'
import Skeleton from '../Skeleton/Skeleton'
import { locationPropType } from '../../util/propTypes/location'
import EDSCIcon from '../EDSCIcon/EDSCIcon'

import './GranuleDetailsHeader.scss'

/**
 * Renders GranuleDetailsHeader.
 * @param {Object} props - The props passed into the component.
 * @param {Object} props.granuleMetadata - The focused granule granuleMetadata.
 * @param {Object} props.location - Location passed from react router.
 */
const GranuleDetailsHeader = ({ granuleMetadata, location }) => {
  // TODO: Implement and use a focused granule loading state
  const { title } = granuleMetadata

  return (
    <div className="granule-details-header">
      <div className="granule-details-header__primary">
        <div className="row">
          <div className="col align-self-start">
            <div className="granule-details-header__title-wrap">
              {
                title
                  ? (
                    <>
                      <h2 className="granule-details-header__title">{title}</h2>
                      <PortalLinkContainer
                        className="collection-details-header__title-link collection-details-header__title-link-icon"
                        to={{
                          pathname: '/search/granules',
                          search: location.search
                        }}
                      >
                        <EDSCIcon icon={FaMap} />
                        {' View Granules'}
                      </PortalLinkContainer>
                    </>
                  )
                  : (
                    <Skeleton
                      className="granule-details-header__title"
                      containerStyle={{ display: 'inline-block', height: '1.375rem', width: '17.5rem' }}
                      shapes={granuleTitle}
                    />
                  )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

GranuleDetailsHeader.propTypes = {
  granuleMetadata: PropTypes.shape({}).isRequired,
  location: locationPropType.isRequired
}

export default GranuleDetailsHeader
