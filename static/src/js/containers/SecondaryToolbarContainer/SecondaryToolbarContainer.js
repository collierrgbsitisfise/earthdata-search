import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import actions from '../../actions/index'
import { getUrsProfile } from '../../selectors/contactInfo'

import { getEarthdataEnvironment } from '../../selectors/earthdataEnvironment'
import { locationPropType } from '../../util/propTypes/location'

import SecondaryToolbar from '../../components/SecondaryToolbar/SecondaryToolbar'

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(actions.logout()),
  onUpdateProjectName: name => dispatch(actions.updateProjectName(name)),
  onChangePath: path => dispatch(actions.changePath(path)),
  onFetchContactInfo: () => dispatch(actions.fetchContactInfo())
})

const mapStateToProps = state => ({
  authToken: state.authToken,
  earthdataEnvironment: getEarthdataEnvironment(state),
  portal: state.portal,
  projectCollectionIds: state.project.collections.allIds,
  savedProject: state.savedProject,
  ursProfile: getUrsProfile(state)
})

export const SecondaryToolbarContainer = (props) => {
  const {
    authToken,
    earthdataEnvironment,
    location,
    onChangePath,
    onLogout,
    onUpdateProjectName,
    portal,
    projectCollectionIds,
    savedProject,
    ursProfile,
    onFetchContactInfo
  } = props

  useEffect(() => {
    // If we have a authToken, but no ursProfile, request the contact info
    if (authToken && !(ursProfile && ursProfile.first_name)) {
      onFetchContactInfo()
    }
  }, [authToken])

  return (
    <SecondaryToolbar
      authToken={authToken}
      earthdataEnvironment={earthdataEnvironment}
      location={location}
      onChangePath={onChangePath}
      onLogout={onLogout}
      onUpdateProjectName={onUpdateProjectName}
      portal={portal}
      projectCollectionIds={projectCollectionIds}
      savedProject={savedProject}
      ursProfile={ursProfile}
    />
  )
}

SecondaryToolbarContainer.propTypes = {
  authToken: PropTypes.string.isRequired,
  earthdataEnvironment: PropTypes.string.isRequired,
  location: locationPropType.isRequired,
  onChangePath: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onUpdateProjectName: PropTypes.func.isRequired,
  onFetchContactInfo: PropTypes.func.isRequired,
  portal: PropTypes.shape({}).isRequired,
  projectCollectionIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  savedProject: PropTypes.shape({}).isRequired,
  ursProfile: PropTypes.shape({}).isRequired
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SecondaryToolbarContainer)
)
